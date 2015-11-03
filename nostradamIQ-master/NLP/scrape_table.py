#! /usr/bin/env python

from bs4 import BeautifulSoup
import urllib2


wiki = "http://en.wikipedia.org/wiki/List_of_animal_names"
header = {'User-Agent': 'Mozilla/5.0'} #Needed to prevent 403 error on Wikipedia
req = urllib2.Request(wiki,headers=header)
page = urllib2.urlopen(req)
soup = BeautifulSoup(page)
soup.prettify()

outfile = "animals.txt"
errors = 0

tables = soup.find_all("table", { "class" : "wikitable sortable" })
print len(tables)

with open(outfile, 'a') as outF:
	for i in range(len(tables)):
	        for row in tables[i].findAll("tr"):
            		cells = row.findAll("td")
            		#For each "tr", assign each "td" to a variable.
            		if len(cells) == 7:
                		try:
                        		animal = str(cells[0].find(text=True))
	        		        if len(animal) > 1:
	        		                print animal
	        			        outF.write(animal + '\n')
				except UnicodeEncodeError:
				        errors += 1
		                        print "FAIL"
			                pass

outF.close()
print "\nGot {0} erros while parsing {1}".format(errors, wiki)
