#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
SCHEME:

{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.09,37.64 ]
  },
  "properties": {
    "name": "@BrianLehman",
    "tweet_body": "I freaking love maps!",
  }
}


MAYBE WORK WITH:
http://wiki.geojson.org/RFC-001

 "geometry": {
    "type": "MultiLineString",
    "crs": "EPSG:4326",
    "members": [
      "geometry": {
        "type": "LineString",
        "coordinates": [[0.0,0.0],[1.0,0.0],[1.0,1.0]]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [[2.0,2.0],[3.0,2.0],[3.0,3.0]]
      }
    ]
  }


http://geojson.org/geojson-spec.html#bounding-boxes

 	
CITATION: arXiv:1205.6396 
""" 
from getLocation import get_coordinates
#import ner

# TODO // Depends on the call for:
# java -mx1000m -cp stanford-ner.jar edu.stanford.nlp.ie.NERServer \
# -loadClassifier classifiers/english.all.3class.distsim.crf.ser.gz -port 9191
#tagger = ner.SocketNER(host='localhost', port=9191)

RETURN_ON_FIRST = True

DOUBLE_CHECK = False

USER_LOCATION = False

# The places_db Object filled in twitter_docker.py // connect & query ONLY!
#from places_DB import sqlite3_DB
#places_db = sqlite3_DB('places.db')

"""
# http://stackoverflow.com/questions/18371092/stanford-named-entity-recognizer-ner-functionality-with-nltk
def check_text_for_location(text):
	# Search the tweet for possible geolocations by checkin if google knows the string:
	tagged_tweet = tagger.json_entities(text)
	loc_tweet = tagged_tweet['LOCATION']
	if loc_tweet == None:
		return None
	else:
		coords_array_all = [get_coordinates(loc_tweet) for loc_name in loc_tweet]
		coords_array = [coordinates if (not coordinates in coords_array) for coordinates in coords_array_all]
		if RETURN_ON_FIRST: 
			return coords_array[0]
		return coords_array
"""
""" or a brute-force approach? // Maybe better for more languages...
	coords_array = [] # What to do when we find multiple?
	for word in text.split(' '):
		if (not word in BLACKLIST):
			# http://stackoverflow.com/questions/6219141/searching-for-a-string-in-a-large-text-file-profiling-various-methods-in-pytho
			# Check if the word is a place name // combine words?
			# Get the Coords for the place
			query = word # TODO: Smarter combinations
			coords = places_db.query_db(query)
			#coords = get_coordinates(query) # Returns [lat, lng] or None if not found
			if coords != None:
				coords_array.append(coords)
				if RETURN_ON_FIRST: 
					return coords_array
	# Return the found coords on None if tweet didn't contain any useful information
	if len(coords_array) > 0:
		return coords_array
	else:
		return None
"""



def place_lookup(tweet):
	# https://twittercommunity.com/t/schema-of-boundingbox-in-places-section/8663
	boundingBox = tweet["place"]["bounding_box"]["coordinates"][0]
	lat = float((boundingBox[0][0] + boundingBox[1][0]) / 2.0)
	lng = float((boundingBox[1][1] + boundingBox[2][1]) / 2.0)
	return [lat, lng]

def format2geoJSON(tweet):
	# check for all possibilities:
	# 1: tweet contains Coord info AND tweets about another loation
	# 2. tweet contains coord info and no location in the body
	# 3. tweet contains place info AND location in body
	# 4. tweet contains place and no location in the body
	# 5. tweet contains no location info, but tweets about another place
	# 6. tweet is useless; no location info at all
	try:
		if tweet["coordinates"] != None: # Twitter already did the job!
			# get lat,lng and create geoJSON object:
			if DOUBLE_CHECK: coords_in_tweet = check_text_for_location(tweet["text"])
			if coords_in_tweet == None: # (2) Nothing found in the text, use only the coords
				tweet_geoJSON = {
								  "type": "Feature",
								  "geometry": {
								    "type": "Point",
								    "coordinates": tweet["coordinates"]
								  },
								  "properties": {
								    "name": tweet["user"]["screen_name"],
								    "user_description": tweet["user"]["description"],
								    "user_img": tweet["user"]["profile_image_url"],
								    "place": tweet["place"],
								    "user_place": tweet["user"]["location"],
								    "default_profile": tweet["user"]["default_profile"],
								    "followers_count": tweet["user"]["followers_count"],
								    "verified": tweet["user"]["verified"],
								    "lang": tweet["user"]["lang"],
								    "tweet_body": tweet["text"],
								    "time": tweet["created_at"],
								    "favorite_count": tweet["favorite_count"],
								    "retweeted": tweet["retweeted"],
								    "in_reply_to_user_id_str": tweet["in_reply_to_user_id_str"],
								    "in_reply_to_status_id_str": tweet["in_reply_to_status_id_str"],
								    "possibly_sensitive": tweet["possibly_sensitive"],
								    "hashtags": tweet["entities"]["hashtags"],
								    "symbols": tweet["entities"]["symbols"],
								    "user_mentions": tweet["entities"]["user_mentions"],
								    "urls": tweet["entities"]["urls"],
								  }
								}
				return tweet_geoJSON
			else: # tweets about another location (1)
				# Build a line between the two coords:
				tweet_line_geoJSON = {
									  "type": "Feature",
									  "geometry": {
									    "type": "LineString",
									    "coordinates": coords_in_tweet.append(tweet["coordinates"]) #[tweet["coordinates"], coords_in_tweet]
									  },
									  "style":{
										        "fill": "blue"
									  },
									  "properties": {
									    "name": tweet["user"]["screen_name"],
									    "user_description": tweet["user"]["description"],
									    "user_img": tweet["user"]["profile_image_url"],
									    "place": tweet["place"],
									    "user_place": tweet["user"]["location"],
									    "default_profile": tweet["user"]["default_profile"],
									    "followers_count": tweet["user"]["followers_count"],
									    "verified": tweet["user"]["verified"],
									    "lang": tweet["user"]["lang"],
									    "tweet_body": tweet["text"],
									    "time": tweet["created_at"],
									    "favorite_count": tweet["favorite_count"],
									    "retweeted": tweet["retweeted"],
									    "in_reply_to_user_id_str": tweet["in_reply_to_user_id_str"],
									    "in_reply_to_status_id_str": tweet["in_reply_to_status_id_str"],
									    "possibly_sensitive": tweet["possibly_sensitive"],
									    "hashtags": tweet["entities"]["hashtags"],
									    "symbols": tweet["entities"]["symbols"],
									    "user_mentions": tweet["entities"]["user_mentions"],
									    "urls": tweet["entities"]["urls"],
									  }
									}
				return tweet_line_geoJSON

		elif tweet["place"] != None: # Find the associated Place
			# convert place to lat,lng and create geoJSON object:
			coords = place_lookup(tweet)
			if DOUBLE_CHECK: coords_in_tweet = check_text_for_location(tweet["text"])
			if coords_in_tweet == None: # (4)
				tweet_geoJSON = {
								  "type": "Feature",
								  "geometry": {
								    "type": "Point",
								    "coordinates": coords
								  },
								  "properties": {
								    "name": tweet["user"]["screen_name"],
								    "user_description": tweet["user"]["description"],
								    "user_img": tweet["user"]["profile_image_url"],
								    "place": tweet["place"],
								    "user_place": tweet["user"]["location"],
								    "default_profile": tweet["user"]["default_profile"],
								    "followers_count": tweet["user"]["followers_count"],
								    "verified": tweet["user"]["verified"],
								    "lang": tweet["user"]["lang"],
								    "tweet_body": tweet["text"],
								    "time": tweet["created_at"],
								    "favorite_count": tweet["favorite_count"],
								    "retweeted": tweet["retweeted"],
								    "in_reply_to_user_id_str": tweet["in_reply_to_user_id_str"],
								    "in_reply_to_status_id_str": tweet["in_reply_to_status_id_str"],
								    "possibly_sensitive": tweet["possibly_sensitive"],
								    "hashtags": tweet["entities"]["hashtags"],
								    "symbols": tweet["entities"]["symbols"],
								    "user_mentions": tweet["entities"]["user_mentions"],
								    "urls": tweet["entities"]["urls"],
								  }
								}
				return tweet_geoJSON
			else: # (3)
				# Build a line between the two coords:
				tweet_line_geoJSON = {
									  "type": "Feature",
									  "geometry": {
									    "type": "LineString",
									    "coordinates": coords_in_tweet.append(coords) #[coords, coords_in_tweet]
									  },
									  "style":{
										        "fill": "blue"
									  },
									  "properties": {
									    "name": tweet["user"]["screen_name"],
									    "user_description": tweet["user"]["description"],
									    "user_img": tweet["user"]["profile_image_url"],
									    "place": tweet["place"],
									    "user_place": tweet["user"]["location"],
									    "default_profile": tweet["user"]["default_profile"],
									    "followers_count": tweet["user"]["followers_count"],
									    "verified": tweet["user"]["verified"],
									    "lang": tweet["user"]["lang"],
									    "tweet_body": tweet["text"],
									    "time": tweet["created_at"],
									    "favorite_count": tweet["favorite_count"],
									    "retweeted": tweet["retweeted"],
									    "in_reply_to_user_id_str": tweet["in_reply_to_user_id_str"],
									    "in_reply_to_status_id_str": tweet["in_reply_to_status_id_str"],
									    "possibly_sensitive": tweet["possibly_sensitive"],
									    "hashtags": tweet["entities"]["hashtags"],
									    "symbols": tweet["entities"]["symbols"],
									    "user_mentions": tweet["entities"]["user_mentions"],
									    "urls": tweet["entities"]["urls"],
									  }
									}
				return tweet_line_geoJSON

		elif tweet["user"]["location"] != None: # Find the associated Place of the user
			# convert place to lat,lng and create geoJSON object:
			coords = get_coordinates(tweet["user"]["location"]) # Or query your own DB? TODO
			if DOUBLE_CHECK: coords_in_tweet = check_text_for_location(tweet["text"])
			if coords_in_tweet == None: # 
				tweet_geoJSON = {
								  "type": "Feature",
								  "geometry": {
								    "type": "Point",
								    "coordinates": coords
								  },
								  "properties": {
								    "name": tweet["user"]["screen_name"],
								    "user_description": tweet["user"]["description"],
								    "user_img": tweet["user"]["profile_image_url"],
								    "place": tweet["place"],
								    "user_place": tweet["user"]["location"],
								    "default_profile": tweet["user"]["default_profile"],
								    "followers_count": tweet["user"]["followers_count"],
								    "verified": tweet["user"]["verified"],
								    "lang": tweet["user"]["lang"],
								    "tweet_body": tweet["text"],
								    "time": tweet["created_at"],
								    "favorite_count": tweet["favorite_count"],
								    "retweeted": tweet["retweeted"],
								    "in_reply_to_user_id_str": tweet["in_reply_to_user_id_str"],
								    "in_reply_to_status_id_str": tweet["in_reply_to_status_id_str"],
								    "possibly_sensitive": tweet["possibly_sensitive"],
								    "hashtags": tweet["entities"]["hashtags"],
								    "symbols": tweet["entities"]["symbols"],
								    "user_mentions": tweet["entities"]["user_mentions"],
								    "urls": tweet["entities"]["urls"],
								  }
								}
				return tweet_geoJSON
			else: # 
				# Build a line between the two coords:
				tweet_line_geoJSON = {
									  "type": "Feature",
									  "geometry": {
									    "type": "LineString",
									    "coordinates": coords_in_tweet.append(coords) #[coords, coords_in_tweet]
									  },
									  "style":{
										        "fill": "blue"
									  },
									  "properties": {
									    "name": tweet["user"]["screen_name"],
									    "user_description": tweet["user"]["description"],
									    "user_img": tweet["user"]["profile_image_url"],
									    "place": tweet["place"],
									    "user_place": tweet["user"]["location"],
									    "default_profile": tweet["user"]["default_profile"],
									    "followers_count": tweet["user"]["followers_count"],
									    "verified": tweet["user"]["verified"],
									    "lang": tweet["user"]["lang"],
									    "tweet_body": tweet["text"],
									    "time": tweet["created_at"],
									    "favorite_count": tweet["favorite_count"],
									    "retweeted": tweet["retweeted"],
									    "in_reply_to_user_id_str": tweet["in_reply_to_user_id_str"],
									    "in_reply_to_status_id_str": tweet["in_reply_to_status_id_str"],
									    "possibly_sensitive": tweet["possibly_sensitive"],
									    "hashtags": tweet["entities"]["hashtags"],
									    "symbols": tweet["entities"]["symbols"],
									    "user_mentions": tweet["entities"]["user_mentions"],
									    "urls": tweet["entities"]["urls"],
									  }
									}
				return tweet_line_geoJSON


		else: # Twitter finds no geoLoc:
			if DOUBLE_CHECK: coords = check_text_for_location(tweet["text"])
			if coords == None: # (6)
				return None
			else: # (5)
				tweet_geoJSON = {
							  "type": "Feature",
							  "geometry": {
							    "type": "Point",
							    "coordinates": coords[0] # or a LineString and pass the entire coords array
							  },
							  "properties": {
							    "name": tweet["user"]["screen_name"],
							    "user_description": tweet["user"]["description"],
							    "user_img": tweet["user"]["profile_image_url"],
							    "place": tweet["place"],
							    "user_place": tweet["user"]["location"],
							    "default_profile": tweet["user"]["default_profile"],
							    "followers_count": tweet["user"]["followers_count"],
							    "verified": tweet["user"]["verified"],
							    "lang": tweet["user"]["lang"],
							    "tweet_body": tweet["text"],
							    "time": tweet["created_at"],
							    "favorite_count": tweet["favorite_count"],
							    "retweeted": tweet["retweeted"],
							    "in_reply_to_user_id_str": tweet["in_reply_to_user_id_str"],
							    "in_reply_to_status_id_str": tweet["in_reply_to_status_id_str"],
							    "possibly_sensitive": tweet["possibly_sensitive"],
							    "hashtags": tweet["entities"]["hashtags"],
							    "symbols": tweet["entities"]["symbols"],
							    "user_mentions": tweet["entities"]["user_mentions"],
							    "urls": tweet["entities"]["urls"],
							  }
							}
			return tweet_geoJSON
	# Don't fail on errors
	except: return None 

