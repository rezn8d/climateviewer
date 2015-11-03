import sys
import urllib
import simplejson
import csv

reload(sys)
sys.setdefaultencoding('utf8')

googleGeocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'

csv_file = 'unhcr_popstats_export_demographics_all_data.csv'


def get_coordinates(query, from_sensor=False):
    query = query.encode('utf-8')
    if query == 'Central and Southern Serbia':
        return [44.0, 21.0]
    if query == 'Kyrgyzstan':
        return [42.8667, 74.6000]
    params = {
        'address': query,
        'sensor': "true" if from_sensor else "false"
    }
    url = googleGeocodeUrl + urllib.urlencode(params)
    json_response = None
    while json_response == None:
        try:
            json_response = urllib.urlopen(url)
        except:
            pass
    response = simplejson.loads(json_response.read())
    if response['results']:
    	# print response
        location = response['results'][0]['geometry']['location']
        form_address = response['results'][0]['formatted_address']
        latitude, longitude = location['lat'], location['lng']
        print "Found", len(response['results']), "for:\n", query, "\nFormatted Address::\n", form_address, "\nHighest Accuracy:\n", latitude, longitude
    else:
        #latitude, longitude = None, None
        print query, "<no results>"
        return None
    return [latitude, longitude]
    
   
#def swap_encoding():
#    reload(sys)
#    if encoding == 'ascii':                                
#        sys.setdefaultencoding('utf8')
#        encoding = 'utf8'
#        
#    elif encoding == 'utf8':
#        sys.setdefaultencoding('ascii')
#        encoding = 'ascii'        

def build_table():
    queries_seen = {}

    # open csv file
    with open(csv_file, 'rb') as csvfile:
        with open('OUT_' + csv_file, 'w+') as csvfileW:
            reader = csv.DictReader(csvfile)
            writer = csv.DictWriter(csvfileW, ['Latitude', 'Longitude'])
            for row in reader:
                print "\n"
                country = row['Country'] #.trim()  
                place = row['Location'] #.trim()
                query = str(str(place) + ', ' + str(country))
                print(query)
                if not query in queries_seen:
                   coords = None
                   while coords == None or len(coords) == 0: # If country returns none, we have a connection Problem :S
                        coords = get_coordinates(query)
                        if coords == None:
                            if place not in ['Central', 'West', 'East', 'North', 'South', 'Middle', 'Mid']: 
                                coords = get_coordinates(place)
                                if coords == None:
                                    coords = get_coordinates(country)
                                    if coords == None:
                                        coords = get_coordinates(country.split(' ')[0])
                            else:
                                coords = get_coordinates(country)
                                if coords == None:
                                    coords = get_coordinates(country.split(' ')[0])

                                            
                   queries_seen[query] = coords
                else: 
                    coords = queries_seen[query]
                if len(coords) == 2:
                    print(coords)
                    writer.writerow({'Latitude': coords[0], 'Longitude': coords[1]})
                else:
                    print "ERROR\n"
                    writer.writerow({'Latitude': '', 'Longitude': ''})
                    
                    
    

if __name__=='__main__':
    build_table()
