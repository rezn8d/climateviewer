#!/usr/bin/env python
# -*- coding: UTF-8 -*-

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

http://geojson.org/geojson-spec.html#bounding-boxes

""" 


def place_lookup(tweet):
	#TODO https://twittercommunity.com/t/schema-of-boundingbox-in-places-section/8663
	boundingBox = tweet["place"]["bounding_box"]["coordinates"][0]
	lat = float((boundingBox[0][0] + boundingBox[1][0]) / 2.0)
	lng = float((boundingBox[1][1] + boundingBox[2][1]) / 2.0)
	return [lat, lng]

def format2geoJSON(tweet):

	try:

		if tweet["coordinates"] != None:
			# get lat,lng and create geoJSON object:
			tweet_geoJSON = {"type": "Feature",
								  "geometry": {
								    "type": "Point",
								    "coordinates": tweet["coordinates"]["coordinates"], #[lat,lng]
								  },
								  "properties": {
								    "name": tweet["user"]["screen_name"],
								    "user_description": tweet["user"]["description"],
								    "place": tweet["place"],
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
								    "img": tweet["user"]["profile_image_url"]
								  }
							}

			return tweet_geoJSON


		elif tweet["place"] != None:
			# convert place to lat,lng and create geoJSON object:
			coords = place_lookup(tweet)
			tweet_geoJSON = {
							  "type": "Feature",
							  "geometry": {
							    "type": "Point",
							    "coordinates": coords,
							    "img": tweet["user"]["profile_image_url"]
							  },
							  "properties": {
							    "name": tweet["user"]["screen_name"],
							    "user_description": tweet["user"]["description"],
							    "place": tweet["place"],
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


		else: 
			# TODO Add a search in the text to look for mentions of locations!
			# text = tweet["text"]

			return None

	except: return None

