#! /usr/bin/env python

import lxml.html
import os
import sys
import urllib2
from bs4 import BeautifulSoup

class SkipException (Exception):
	def __init__(self, value):
		 self.value = value
		 
print "Please enter the word you want to find synonyms for:\n"
searchWord = raw_input()

outfile = "synonyms.txt"
visited = []

def getUrl(SomeWord):
        with open(outfile, 'a') as outF:
                outF.write(SomeWord + '\n')
        outF.close()
        return "http://www.thesaurus.com/browse/{0}".format(SomeWord)

start_url = getUrl(searchWord)

def write_fromUrl(url=start_url, queue=False):
        errors = 0
        wrote = 0
        links = []
        
        try:
            header = {'User-Agent': 'Mozilla/5.0'} 
            req = urllib2.Request(url,headers=header)
            page = urllib2.urlopen(req)
            soup = BeautifulSoup(page)
            soup.prettify()
            lists = soup.find_all("div", { "class" : "relevancy-block" })
            with open(outfile, 'a') as outF:
	             for i in range(len(lists)):
	                     for row in lists[i].findAll("ul"):
                         		li = row.findAll("li")
                         		for j in range(len(li)):
                                 		spans = li[j].findAll("span")
                                        	try:
                                               	        word = str(spans[0].findAll(text=True))
	                                	        if len(word) > 1:
	                                	                word = word[3:-2]
	                                	                links.append(getUrl(word))
	                               		                # print word
	                               			        outF.write(word + '\n')
	                               			        wrote += 1
			                        except UnicodeEncodeError, AttributeError:
			                                errors += 1
		                                        print "FAIL"
		                                        pass            
        except SkipException:  
            pass  
            
        outF.close()
        print "\nGot {0} erros while parsing synonyms for {1}\nWrote {2} words.".format(errors, searchWord, wrote)
        print "Gathered {0} Links to other Synonyms!\n".format(len(links))
        visited.append(url)
        if len(links) > 0 and queue:
                for link in links:
                        if link not in visited:
                                write_fromUrl(link) 
        
        return 0
        

if __name__=="__main__":
        if "--crawl" in sys.argv:
                write_fromUrl(queue=True)
        else:
                write_fromUrl()
