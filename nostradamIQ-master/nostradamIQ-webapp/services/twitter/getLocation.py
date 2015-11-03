#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import urllib
import simplejson

googleGeocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'


def make_geoRequest(query, from_sensor=False):
    query = query.encode('utf-8')
    params = {
        'address': query,
        'sensor': "true" if from_sensor else "false"
    }
    url = googleGeocodeUrl + urllib.urlencode(params)
    json_response = urllib.urlopen(url)
    response = simplejson.loads(json_response.read())
    return response

def get_coordinates(query, from_sensor=False):
    response = None
    while response == None:
        response = make_geoRequest(query, from_sensor)
    if response['results']:
    	#print response
        location = response['results'][0]['geometry']['location']
        form_address = response['results'][0]['formatted_address']
        latitude, longitude = location['lat'], location['lng']
        print "Found", len(response['results']), "for:\n", query, "\nFormatted Address:\n", form_address, "\nHighest Accuracy:\n", latitude, longitude
    else:
        # Maybe make a different query?
        print query, "<no results>"
        return None
    return [latitude, longitude]

def main():
    if 1 < len(sys.argv):
        address = sys.argv[1]
    else:
        address = 'Kronberg'

    coordinates = get_coordinates(address)
    print coordinates
    return 0

if __name__ ==  '__main__':
    main()


