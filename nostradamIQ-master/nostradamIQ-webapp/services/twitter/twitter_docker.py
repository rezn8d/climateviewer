#!/usr/bin/python
# -*- coding: utf-8 -*-

# http://tweepy.readthedocs.org/en/v3.2.0/streaming_how_to.html?highlight=stream

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
import re
import time
import datetime
import sys
import os
import redis

from tweet2geoJSON import format2geoJSON
from httplib import IncompleteRead

from API_KEYS import consumer_key, consumer_secret, access_token, access_token_secret

REDIS = redis.Redis()

from places_DB import sqlite3_DB
# TODO BUILD SQLITE3 DB once for the geoJSON builder
sqlite3_DB('places.db').create_db('corpori/places/allCountries.txt')

# Delete old file?
DELETE_OLD = False

countAll = 0
countLoc = 0
countAll_intervall = 0 
countLoc_intervall = 0

# holds the name of the searcharray
searchArray = None

 # tweets_ARRAY_HOUR_DATE.geojson
outputgeo_tpl = "tweets_%s_%s_%s.geojson"
# name of current file:
outputgeo = None
# Initialize currentKeyDateTime Variable
currentKeyDateTime = None

# TODO : Minute only for testing!! Go for hour!
def getCurrentDateKey():
    # Returns: str: HH:DD-MM-YYYY 
    hour = datetime.datetime.now().hour
    minute = datetime.datetime.now().minute
    date = "{0}-{1}-{2}".format(datetime.datetime.now().day, datetime.datetime.now().month, datetime.datetime.now().year)
    print "getCurrentDateKey: %s" % ("{0}:{1}".format(minute, date)) #"{0}:{1}".format(hour, date))
    #print "currentKeyDateTime: %s" % (currentKeyDateTime)
    return "{0}:{1}".format(minute, date) #"{0}:{1}".format(hour, date)

# to check validity and update every hour
nowDateTime = getCurrentDateKey()


class StdOutListener(StreamListener):

    def on_data(self, data):
        global countLoc, countAll, countAll_intervall, countLoc_intervall, outputgeo, nowDateTime, currentKeyDateTime

        try:
            if str(nowDateTime) == str(currentKeyDateTime): # Changes every hour, so that we publish hourly
                tweet = json.loads(data)
                print("\n\n")
                print('@%s tweeted: %s\nPlace: %s (%s)\n' % ( tweet['user']['screen_name'], tweet['text'], tweet['place'], tweet['coordinates']))
                countAll += 1
                countAll_intervall += 1
                # convert to and write as .geojson // returns None if no geoInfo is provided
                geoJson = format2geoJSON(tweet)
                if geoJson != None:
                    with open(outputgeo, 'a+') as outPgeo:
                        json.dump(geoJson, outPgeo)
                        outPgeo.write(',')
                    outPgeo.close()
                    countLoc += 1
                    countLoc_intervall += 1
                # Update time
                nowDateTime = getCurrentDateKey() 


            else:
                print "WRITING TO NEW FILE!"
                if os.path.isfile(outputgeo):

                    print"CHECK: is already a file"
                    
                    # write last line of old one:
                    with open(outputgeo, 'a+') as outPgeo:
                        outPgeo.write(']}')
                    outPgeo.close()
                    # publish old one for one week
                    with open(outputgeo, 'r') as uploadFile:
                        # use a blob in redis to keep structure for better reading in the app
                        uploadFileJSON = json.loads(uploadFile)
                    uploadFile.close()
                    REDIS.setex(outputgeo, uploadFileJSON, 60*60*24*7) # a week in seconds
                    # stats_ARRAY_HOUR_DATE ->  {"All_Tweets_seen":countAll, "Location_Tweets_seen":countLoc, "All_Tweets_Intervall":countAll_intervall, "Location_Tweets_Intervall":countLoc_intervall}
                    REDIS.set("stats_{0}_{1}_{2}".format(searchArray, currentKeyDateTime.split(':')[0], currentKeyDateTime.split(':')[1]), {"All_Tweets_seen":countAll, "Location_Tweets_seen":countLoc, "All_Tweets_Intervall":countAll_intervall, "Location_Tweets_Intervall":countLoc_intervall})
                    countAll_intervall = 0 
                    countLoc_intervall = 0             
                    # Delete old file?
                    if DELETE_OLD: 
                        os.remove(outputgeo)

                print "CHECKPOINT 1"
                # update KeyDateTime and nowDateTime:
                currentKeyDateTime = getCurrentDateKey()
                nowDateTime = getCurrentDateKey()        
                # set new filename:
                outputgeo = outputgeo_tpl % (searchArray, currentKeyDateTime.split(':')[0], currentKeyDateTime.split(':')[1])
                print "FILENAME: %s\n" % (outputgeo)

                # write first line of new one
                with open(outputgeo, 'a+') as outPgeo:
                    outPgeo.write('{"type":"FeatureCollection","features":[')
                outPgeo.close()

                # Handle the tweet
                tweet = json.loads(data)
                print("\n\n")
                print('@%s tweeted: %s\nPlace: %s (%s)\n' % ( tweet['user']['screen_name'], tweet['text'], tweet['place'], tweet['coordinates']))
                countAll += 1
                countAll_intervall += 1
                # convert to and write as .geojson // returns None if no geoInfo is provided
                geoJson = format2geoJSON(tweet)
                if geoJson != None:
                    with open(outputgeo, 'a+') as outPgeo:
                        json.dump(geoJson, outPgeo)
                        outPgeo.write(',')
                    outPgeo.close()
                    countLoc += 1
                    countLoc_intervall += 1

            # Print Notification
            if countAll%100 == 0:
                print "Saw {0} tweets; {1} of them had location information!\n".format(countAll, countLoc)

        except: pass

        return True

    def on_error(self, status):
        print 'Error: ', status

if __name__ == '__main__':
    #global countLoc, countAll, countAll_intervall, countLoc_intervall, outputgeo, nowDateTime, currentKeyDateTime
    """
    # https://dev.twitter.com/rest/public/search
    KEYWORDS = {
            "quake": ["#earthquake", "#quake", "#shakeAlert", "#quakeAlert", "shakeAlert", "quakeAlert", "earthquake", "quake", "from:USGSted", "from:everyEarthquake"]
    }
    # Get SysArgs and the keyword array:
    searchArray = sys.argv[1:]
    try: 
        keywordArray = KEYWORDS[str(searchArray)]
    except:
        print "keywordArray with the name {0} does not exsist!\n".format(searchArray)
        exit(0)
    """
    searchArray = "quake"
    keywordArray = ["#earthquake", "#quake", "#shakeAlert", "#quakeAlert", "shakeAlert", "quakeAlert", "earthquake", "quake", "from:USGSted", "from:everyEarthquake"]
    
    try:
        l = StdOutListener()
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        stream = Stream(auth, l)
        stream.filter(track=keywordArray)#, async=True) #async for multithreating
    except KeyboardInterrupt:
        print "\n\nYOU INTERRUPTED!\nFINISH WRITING FILE\n"
        print "Saw {0} tweets; {1} of them had location information!\n".format(countAll, countLoc)
        with open(outputgeo, 'a+') as outPgeo:
            outPgeo.write(']}')
        outPgeo.close()
    except IncompleteRead: 
        print "Twitter Restriction set in... \nALL THAT BEAUTIFUL DATA :'(\n"
        time.sleep(10) # sleep for 10 seconds twitters restrictions
    except:
        print "\nAN ERROR OCCURED!\n"
        print "Saw {0} tweets; {1} of them had location information!\n".format(countAll, countLoc)
        with open(outputgeo, 'a+') as outPgeo:
            outPgeo.write(']}')
        outPgeo.close()