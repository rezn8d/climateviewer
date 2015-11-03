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

TTL = 60*60*24*7 # Time to save tweets in redis // 1 Week

#from places_DB import sqlite3_DB
# TODO BUILD SQLITE3 DB once for the geoJSON builder
#sqlite3_DB('places.db').create_db('corpori/places/allCountries.txt')

# Delete old file?
DELETE_OLD = False

 # tweets_ARRAY_HOUR_DATE.geojson
OUTPUTGEO_TPL = "tweets_%s_%s_%s.geojson"



# TODO : Minute only for testing!! Go for hour!
def getCurrentDateKey():
    # Returns: str: HH:DD-MM-YYYY 
    hour = datetime.datetime.now().hour
    minute = datetime.datetime.now().minute
    date = "{0}-{1}-{2}".format(datetime.datetime.now().day, datetime.datetime.now().month, datetime.datetime.now().year)
    print "getCurrentDateKey: %s" % ("{0}:{1}".format(minute, date)) #"{0}:{1}".format(hour, date))
    #print "currentKeyDateTime: %s" % (listener.currentKeyDateTime)
    return "{0}:{1}".format(minute, date) #"{0}:{1}".format(hour, date)


class StdOutListener(StreamListener):
    def __init__(self, DELETE_OLD):
        self.outputgeo = None
        self.DELETE_OLD = DELETE_OLD
        self.countLoc = 0
        self.countAll = 0 
        self.countAll_intervall = 0 
        self.countLoc_intervall = 0
        self.nowDateTime = getCurrentDateKey()
        self.currentKeyDateTime = None


    def handle_tweet(self, data):
        tweet = json.loads(data)
        print("\n\n")
        print('@%s tweeted: %s\nPlace: %s (%s)\n' % ( tweet['user']['screen_name'], tweet['text'], tweet['place'], tweet['coordinates']))
        self.countAll += 1
        self.countAll_intervall += 1
        # convert to and write as .geojson // returns None if no geoInfo is provided
        geoJson = format2geoJSON(tweet)
        if geoJson != None:
            with open(self.outputgeo, 'a+') as outPgeo:
                json.dump(geoJson, outPgeo)
                outPgeo.write(',')
            outPgeo.close()
            self.countLoc += 1
            self.countLoc_intervall += 1

    def change_output_file(self):
        print "WRITING TO NEW FILE!"
        if os.path.isfile(self.outputgeo):
            print"CHECK: is already a file" 

            # write last line of old one:
            with open(self.outputgeo, 'a+') as outPgeo:
                outPgeo.write(']}')
            outPgeo.close()

            # publish old one for one week
            with open(self.outputgeo, 'r') as uploadFile:
                uploadFileJSON = json.loads(uploadFile)
            uploadFile.close()
            REDIS.setex(self.outputgeo, uploadFileJSON, TTL)
            # stats_ARRAY_HOUR_DATE ->  {"All_Tweets_seen":countAll, "Location_Tweets_seen":countLoc, "All_Tweets_Intervall":countAll_intervall, "Location_Tweets_Intervall":countLoc_intervall}
            REDIS.set("stats_{0}_{1}_{2}".format(SEARCH_ARRAY, self.currentKeyDateTime.split(':')[0], self.currentKeyDateTime.split(':')[1]), {"All_Tweets_seen":self.countAll, "Location_Tweets_seen":self.countLoc, "All_Tweets_Intervall":self.countAll_intervall, "Location_Tweets_Intervall":self.countLoc_intervall})
            self.countAll_intervall = 0 
            self.countLoc_intervall = 0             
            # Delete old file?
            if self.DELETE_OLD: 
                os.remove(self.outputgeo)

        # update KeyDateTime and nowDateTime:
        self.currentKeyDateTime = getCurrentDateKey()
        self.nowDateTime = getCurrentDateKey()        
        # set new filename:
        self.outputgeo = OUTPUTGEO_TPL % (SEARCH_ARRAY, self.currentKeyDateTime.split(':')[0], self.currentKeyDateTime.split(':')[1])
        print "FILENAME: %s\n" % (self.outputgeo)

        # write first line of new one
        with open(self.outputgeo, 'a+') as outPgeo:
            outPgeo.write('{"type":"FeatureCollection","features":[')
        outPgeo.close()        


    def on_data(self, data):
        try:
            if str(self.nowDateTime) == str(self.currentKeyDateTime): # Changes every hour, so that we publish hourly
                self.handle_tweet(data)
                # Update time
                self.nowDateTime = getCurrentDateKey() 

            else:
                self.change_output_file()
                self.handle_tweet()

            # Print Notification
            if self.countAll%100 == 0:
                print "Saw {0} tweets; {1} of them had location information!\n".format(self.countAll, self.countLoc)

        except: pass

        return True

    def on_error(self, status):
        if status == 420:
            print "Status Code 420: Enhance Your Calm\nTwitter's Restriction set in... :'(\nALL THAT BEAUTIFUL DATA!!!\nRetrying...\n"
        else:
            print 'Error: ', status



if __name__ == '__main__':
    """
    # https://dev.twitter.com/rest/public/search
    KEYWORDS = {
            "quake": ["#earthquake", "#quake", "#shakeAlert", "#quakeAlert", "shakeAlert", "quakeAlert", "earthquake", "quake", "from:USGSted", "from:everyEarthquake"]
    }
    # Get SysArgs and the keyword array:
    SEARCH_ARRAY = sys.argv[1:]
    try: 
        KEYWORD_ARRAY = KEYWORDS[str(SEARCH_ARRAY)]
    except:
        print "keywordArray with the name {0} does not exsist!\n".format(SEARCH_ARRAY)
        exit(0)
    """
    SEARCH_ARRAY = "quake"
    KEYWORD_ARRAY = ["#earthquake", "#quake", "#shakeAlert", "#quakeAlert", "shakeAlert", "quakeAlert", "earthquake", "quake", "from:USGSted", "from:everyEarthquake"]
    
    try:
        listener = StdOutListener(DELETE_OLD)
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        stream = Stream(auth, listener)
        stream.filter(track=KEYWORD_ARRAY)#, async=True) #async for multithreating

    except KeyboardInterrupt:
        print "\n\nYOU INTERRUPTED!\n"
        print "Saw {0} tweets; {1} of them had location information!".format(listener.countAll, listener.countLoc)
        if listener.outputgeo != None:
            print "FINISH WRITING FILE"
            with open(listener.outputgeo, 'a+') as outPgeo:
                outPgeo.write(']}')
            outPgeo.close()
        else:
            print "NOTHING WRITTEN TO FILE!"

    except IncompleteRead: 
        print "Twitter Restriction set in... \nALL THAT BEAUTIFUL DATA :'("
        time.sleep(10) # sleep for 10 seconds twitters restrictions