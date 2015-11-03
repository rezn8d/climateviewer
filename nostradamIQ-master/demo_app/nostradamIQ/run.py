#! /usr/bin/env python
import csv
from collections import deque, namedtuple
import datetime
import json
import os
import sys
import subprocess
import numpy
import redis
import pprint

from nupic.frameworks.opf.modelfactory import ModelFactory
from nupic.algorithms.anomaly_likelihood import AnomalyLikelihood
from nupic.data.inference_shifter import InferenceShifter


THISDIR = os.getcwd()
BASEFILENAME = "eq_01011900_04072015_6.csv"
INPUTFILE = os.path.join("data", BASEFILENAME)
MODELSTATE = str(os.path.join(os.getcwd(), "modelstate"))
OUTPUTFILE = csv.writer(open(os.path.join("data", str("OUT_" + BASEFILENAME)), "wb"))
OUTPUTFILE.writerow(["iterCount", "type", "time", "latitude", "longitude", "depth", "scalar", "AnomalyScore", "AnomalyMean_Windowsize", "AnomalyLikelihood", "logLikelihood", "place", "id", "prediction"])

LOAD = 0 # Load Model or create a new One?

# Number of samples over which to calculate the moving average
WINDOWSIZE = None 

# Cluster events?
CLUSTERING = 1

# Predicting? # TODO Needs: Bins & PredictAheadTime
PREDICT = 0

# Visualize the model over a Cerebro2
VISUALIZE = 0 # TODO: a bit buggy :/
if VISUALIZE: 
  CEREBRO_PATH = "/home/pascal/nupic.cerebro2/" # Specify the absolut Path in your Cerebro2 Dir
  VIS_INTERVAL = 10 # the interval in which the model is patched for visualisation

# Maybe run swarm programmatically for different eventTypes TODO

# Save to a Database? TODO
DATABASE = 0 

# Publish via Redis? - Neccassary for the webapp to work!
REDIS = 0

if VISUALIZE:
  from cerebro2.patcher import Patcher
  def update_cerebro(): 
    os.chdir(os.path.realpath(CEREBRO_PATH))
    subprocess.Popen(["python", "run_server.py", "8000"])
    os.chdir(THISDIR)

# use Mongodb: http://api.mongodb.org/python/current/index.html && http://docs.mongodb.org/master/tutorial/install-mongodb-on-ubuntu/?_ga=1.3893173.422718975.1436026551
if DATABASE:
  class database:
    def __init__(self):
      from pymongo import MongoClient, GEO2D
      pass

    def insert(self, obj):
      loc = [obj.lat, obj.lng]
      pass


if DATABASE:
  # TODO: Too slow. MySQL probably not the best for this...
  import MySQLdb
  def insert_event(eventObj):
    # connect to db
    conn = MySQLdb.connect(host="localhost", user="NuCat", passwd="NuCat", db="NuCat")

    # setup cursor
    cursor = conn.cursor()
   
    # insert to table
    try:
      cursor.execute("""INSERT INTO events (id, type, time, longitude, latitude, depth, scalar, place, AnomalyScore, AnomalyMean_Windowsize, AnomalyLikelihood, logLikelihood, prediction, iterCount) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);""",(eventObj['id'], eventObj['eventType'], eventObj['time'], eventObj['lng'], eventObj['lat'], eventObj['depth'], eventObj['scalar'], eventObj['place'], eventObj['AnomalyScore'], eventObj['Anomaly_mean'], eventObj['AnomalyLikelihood'], eventObj['logLikelihood'], eventObj['prediction'], eventObj['iterCount']))          
      conn.commit()
    except:     
      conn.rollback()
      print "\nDB insert FAIL:"
      print str(eventObj) + "\n"

    # show table
    cursor.execute("""SELECT * FROM events;""")
    # print cursor.fetchall()
    conn.close()
    # print "\n" + str(eventObj) + "\n"


# Create the event objects:
events = deque()
# Might also use input from querys! TODO
with open(INPUTFILE) as inp:
  csvin = csv.reader(inp)
  Event = namedtuple("Event", next(csvin))
  
  for line in csvin:
    event = Event._make(line)
    events.append(event)

  inp.seek(0)
  next(inp)

# LIFO - important for learning the correct sequences!
events = reversed(events)

# Cluster the events:
if CLUSTERING: 
  from clustering import cluster, scipy_cluster
  events, minLatitudes, maxLatitudes, minLongitudes, maxLongitudes = cluster(events)


#if PREDICT: import PREDICTmodel_params as model_params


import TESTmodel_params as model_params

if LOAD: model = ModelFactory.loadFromCheckpoint(MODELSTATE)  
else: model = ModelFactory.create(model_params.MODEL_PARAMS)

if VISUALIZE: Patcher().patchCLAModel(model)

model.enableInference({"predictedField": "event"}) # Predict not only event but also scalar! TODO
# model.enableInference({"predictedField": "scalar"})
# model.enableInference({"predictedField": "timestamp"})
print "Model created!\n"

# Get the Model-Classes:
anomalyLikelihood = AnomalyLikelihood()

if (WINDOWSIZE != None): AnomalyScores = deque(numpy.ones(WINDOWSIZE), maxlen=WINDOWSIZE)  
else: AnomalyScores = deque() 
LikelihoodScores = deque()

if REDIS:
  r = redis.Redis(host=os.environ.get("REDIS_HOST", "127.0.0.1"),
                port=int(os.environ.get("REDIS_PORT", 6379)),
                db=int(os.environ.get("REDIS_DB", 0)))


print "Start Data-Feed...\n"
for n, event in enumerate(events):
  # Cluster or not? // Convert all Coords. to non-neg Ints (better handeled by the model):
  if CLUSTERING:
    # Compute for each model... TODO
    x = int(10000 * abs(float(event.longitude) - minLongitudes))
    y = int(10000 * abs(float(event.latitude) - minLatitudes))
  else:
    x = int(10000 * abs(float(event.longitude) + 180))
    y = int(10000 * abs(float(event.latitude) + 180))
  # adjust multiplicators if neccessary...
  z = int(10 * float(event.depth))
  # logarithmic scale for earthquakes... TODO: Encode for general Events, like air-pressure -> no log. scale...
  magnitude = int(10**float(event.mag))
  radius = int(10*float(event.mag)) # float(event.mag)

  try:
    input_event = (numpy.array([x, y, z]), radius) # for GCE: (float(radius), float(x), float(y), float(z))
    timestamp = datetime.datetime.strptime(event.time, "%Y-%m-%dT%H:%M:%S.%fZ")
    modelInput = {}
    modelInput["event"] = input_event
    modelInput["scalar"] = magnitude
    modelInput["timestamp"] = timestamp
    # TODO: May reset the model after some time?
    # TODO: May cluster inputs for adjustable bins?
    result = model.run(modelInput)
    model.save(MODELSTATE)
    print result

    if True: # not PREDICT or prediction == 'None': TODO
      # Anomaly-Stats: 
      anomalyScore = result.inferences["anomalyScore"]
      AnomalyScores.append(anomalyScore)
      # By default 0.5 for the first 600 iterations! TODO: Still not quite sure if that's alright...

      try:
        likelihood = anomalyLikelihood.anomalyProbability(input_event[0] + numpy.array([input_event[1]]), anomalyScore, modelInput["timestamp"])
        logLikelihood = anomalyLikelihood.computeLogLikelihood(likelihood)
        LikelihoodScores.append([modelInput["timestamp"], modelInput["event"], likelihood])
      
      except ValueError:
        print "\nValueError in likelihood: \n" + str(event)
        likelihood = 0.5
        logLikelihood = anomalyLikelihood.computeLogLikelihood(likelihood)
        LikelihoodScores.append([modelInput["timestamp"], modelInput["event"], likelihood])
        pass

      prediction = 'None'

    if PREDICT:
      # Handle Anomaly:
      anomalyScore, likelihood, logLikelihood = 'None', 'None', 'None'
      # TODO!
      # model.disable_learning()
      # for spaceBin in spaceBins: # where spacebins is a NxNxD matrix of all 0's
        # for magnitude in magnitudes: # where magnitudes is a scale of all possible mags in a certain resulution
          #model.run() next time interval in the middle of the space bin with matching resulution!
          #prediction[spaceBin][magnitude] = (1 - anomalyScore of this event) # Or a better metric?


    # NOTE: change mag to scalar -more general! -Typecasting for DB
    data = {"eventType": str(event.type),
            "lat": float(event.latitude),
            "lng": float(event.longitude),
            "depth": float(event.depth),
            "scalar": float(event.mag),
            "timestamp": str(event.time),
            "AnomalyScore": float(anomalyScore),
            "Anomaly_mean": (float(numpy.mean(AnomalyScores)), WINDOWSIZE),
            "AnomalyLikelihood": float(likelihood),
            "logLikelihood": float(logLikelihood),
            "place": str(event.place),
            "id": str(event.id),
            "prediction": prediction, # Should be a JSON-Object itself TODO
            "iterCount": int(n),
            }

    if REDIS: r.publish("nupic", json.dumps(data))
    OUTPUTFILE.writerow([n, event.type, event.time, event.latitude, event.longitude, event.depth, event.mag, anomalyScore, (numpy.mean(AnomalyScores), WINDOWSIZE), likelihood, logLikelihood, event.place, event.id, prediction])
    if DATABASE: insert_event(data)
    print data
    print ""
    
  except ValueError:
    print "\nValueError: \n" + str(event)
    pass

  except KeyboardInterrupt:
    print "\nYou interrupted the process. \nExited."
    break

  # update the model every intervall:
  if (VISUALIZE and n%VIS_INTERVAL==0): update_cerebro()