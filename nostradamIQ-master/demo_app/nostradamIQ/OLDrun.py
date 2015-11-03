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
import MySQLdb

from nupic.frameworks.opf.modelfactory import ModelFactory
from nupic.algorithms.anomaly_likelihood import AnomalyLikelihood
from nupic.data.inference_shifter import InferenceShifter

THISDIR = os.getcwd()
BASEFILENAME = "usgs.csv"
INPUTFILE = os.path.join("data", BASEFILENAME)
MODELSTATE = str(os.path.join(os.getcwd(), "modelstate"))
OUTPUTFILE = csv.writer(open(os.path.join("data", str("OUT" + BASEFILENAME)), "wb"))
OUTPUTFILE.writerow(["iterCount", "type", "time", "latitude", "longitude", "depth", "scalar", "AnomalyScore", "AnomalyMean_Windowsize", "AnomalyLikelihood", "logLikelihood", "place", "id", "prediction"])

LOAD = 0 # Load Model or create a new One ?
# Number of samples over which to calculate average
WINDOWSIZE = None 

# Cluster events?
CLUSTERING = 0

# Predicting? # TODO: Not working properly
PREDICT = 0

# Visualize the model over a Cerebro2
VISUALIZE = 0 # TODO: Not working properly
CEREBRO_PATH = "/home/pascal/nupic.cerebro2/" # Specify the absolut Path in your Cerebro2 Dir
VIS_INTERVAL= 10 # the interval in which the model is patched for visualisation


DATABASE = 0 

if VISUALIZE:
  from cerebro2.patcher import Patcher
  def update_cerebro(): 
    os.chdir(os.path.realpath(CEREBRO_PATH))
    subprocess.Popen(["python", "run_server.py", "8000"])
    os.chdir(THISDIR)

if DATABASE:
  # TODO: Not yet working properly!
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


# Need statistics to recompute coords (when Clustering) / Buffer events
events = deque()
# Might also use input from querys! TODO
with open(INPUTFILE) as inp:
  csvin = csv.reader(inp)

  Event = namedtuple("Event", next(csvin))

  if CLUSTERING:
    print "CLUSTERING is set to True.\nThis will feed the events in as clusters -i.e. in relative Coordintes...\n"
    minLatitude = float("inf")
    maxLatitude = float("-inf")
    minLongitude = float("inf")
    maxLongitude = float("-inf")

  for line in csvin:
    event = Event._make(line)
    # Buffer event events for processing
    events.append(event)

    # Stats for Clustering: 
    if CLUSTERING:
      lat = float(event.latitude)
      lng = float(event.longitude)

      if float(event.latitude) > maxLatitude:
        maxLatitude = lat

      if float(event.latitude) < minLatitude:
        minLatitude = lat

      if float(event.longitude) > maxLongitude:
        maxLongitude = lng

      if float(event.longitude) < minLongitude:
        minLongitude = lng

  inp.seek(0)
  next(inp)
  if CLUSTERING:
    print "Max. Long: %s ; Min. Long: %s\n" %str(maxLongitude) %str(minLongitude) 
    print "Max. Lat: %s ; Min. Lat: %s\n" %str(maxLatitude) %str(minLatitude) 

# FIFO
events = reversed(events)

if PREDICT: import PREDICTmodel_params as model_params

else: import model_params as model_params


if LOAD: model = ModelFactory.loadFromCheckpoint(MODELSTATE)  
else: model = ModelFactory.create(model_params.MODEL_PARAMS)
if VISUALIZE: Patcher().patchCLAModel(model)
model.enableInference({"predictedField": "event"})
print "Model created!\n"

# Get the Model-Classes:
anomalyLikelihood = AnomalyLikelihood()
if PREDICT: 
  from nupic.data.inference_shifter import InferenceShifter
  shifter = InferenceShifter()

if (WINDOWSIZE != None): AnomalyScores = deque(numpy.ones(WINDOWSIZE), maxlen=WINDOWSIZE)
else: AnomalyScores = deque() # numpy.ones(len(events)), maxlen=len(events) ?
LikelihoodScores = deque()

r = redis.Redis(host=os.environ.get("REDIS_HOST", "127.0.0.1"),
                port=int(os.environ.get("REDIS_PORT", 6379)),
                db=int(os.environ.get("REDIS_DB", 0)))


# Feed data into the model:
print "Start Data-Feed...\n"
for n, event in enumerate(events):
  # Cluster or not? // Convert all Coords. to non-neg Ints:
  if CLUSTERING:
    x = int(10000 * abs(float(event.longitude) - minLongitude))
    y = int(10000 * abs(float(event.latitude) - minLatitude))
  else:
    x = int(10000 * abs(float(event.longitude) + 180))
    y = int(10000 * abs(float(event.latitude) + 180))
  # adjust multiplicators if neccessary...
  z = int(10*float(event.depth))
  radius = int(10*float(event.mag))
  magnitude = int(10**float(event.mag))

  try:
    input_event = (numpy.array([x, y, z]), radius)
    timestamp = datetime.datetime.strptime(event.time, "%Y-%m-%dT%H:%M:%S.%fZ")
    # input_event = (timestamp, input_event)
    modelInput = {}
    modelInput["event"] = input_event
    modelInput["timestamp"] = (timestamp)
    result = model.run(modelInput)
    model.save(MODELSTATE)
    # print result

    
    if not PREDICT:
      # Anomaly-Stats: 
      anomalyScore = result.inferences["anomalyScore"]
      # By default 0.5 for the first 600 iterations!
      likelihood = anomalyLikelihood.anomalyProbability(modelInput["event"], anomalyScore, modelInput["timestamp"])
      logLikelihood = anomalyLikelihood.computeLogLikelihood(likelihood)
      AnomalyScores.append(anomalyScore)
      LikelihoodScores.append([modelInput["timestamp"], modelInput["event"], likelihood])
      prediction = 'None'


    if PREDICT:
      # Handle Anomaly:
      anomalyScore, likelihood, logLikelihood = 'None', 'None', 'None'
      pred_result = shifter.shift(result)
      if result.inferences["multiStepBestPredictions"][1]:
        prediction = result.inferences["multiStepBestPredictions"][1]
        print prediction
      else:
        prediction = 'None'

    # NOTE: change mag to scalar - more general! -- Typecasting for DB
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
            "prediction": prediction,
            "iterCount": int(n),
            }

    # r.publish("nupic", json.dumps(data))
    OUTPUTFILE.writerow([n, event.type, event.time, event.latitude, event.longitude, event.depth, event.mag, anomalyScore, (numpy.mean(AnomalyScores), WINDOWSIZE), likelihood, logLikelihood, event.place, event.id, prediction])
    if DATABASE: insert_event(data)
    print data
    print "\n"
    

  except ValueError:
    print "\nValueError: \n" + str(event)
    pass

  except KeyboardInterrupt:
    print "\nYou interrupted the process. \nExited."
    break

  # update the model every intervall:
  if (n%VIS_INTERVAL==0 and VISUALIZE): update_cerebro()


