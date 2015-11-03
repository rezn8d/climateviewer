import sys
import urllib
import simplejson
import csv

googleGeocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'

csv_file = 'ebola_data_db_format2.csv'

def get_coordinates(query, from_sensor=False):
    query = query.encode('utf-8')
    params = {
        'address': query,
        'sensor': "true" if from_sensor else "false"
    }
    url = googleGeocodeUrl + urllib.urlencode(params)
    json_response = urllib.urlopen(url)
    response = simplejson.loads(json_response.read())
    if response['results']:
    	print response
        location = response['results'][0]['geometry']['location']
        form_address = response['results'][0]['formatted_address']
        latitude, longitude = location['lat'], location['lng']
        print "Found", len(response['results']), "for:\n", query, "\nFormatted Address::\n", form_address, "\nHighest Accuracy:\n", latitude, longitude
    else:
        #latitude, longitude = None, None
        print query, "<no results>"
        return None
    return [latitude, longitude]


def build_table():
    countries_seen = {}

    # open csv file
    with open(csv_file, 'rb') as csvfile:
        with open('OUT_' + csv_file, 'w+') as csvfileW:
            reader = csv.DictReader(csvfile)
            writer = csv.DictWriter(csvfileW, ['Latitude', 'Longitude'])
            for row in reader:
                country = row['Country']    
                print(country)
                if not country in countries_seen:
                    coords = get_coordinates(country)
                    countries_seen[country] = coords
                else: 
                    coords = countries_seen[country]
                print(coords)
                writer.writerow({'Latitude': coords[0], 'Longitude': coords[1]})
    

if __name__=='__main__':
    build_table()
