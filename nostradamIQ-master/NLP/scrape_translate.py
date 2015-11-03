#! /usr/bin/env python

import urllib2
import urllib
import json
from bs4 import BeautifulSoup

langCode={
                "afrikaans":"af",
                "albanian":"sq",
                "arabic":"ar",
                "azerbaijani":"az",
                "basque":"eu",
                "bengali":"bn",
                "belarusian":"be",
                "bulgarian":"bg",
                "catalan":"ca",
                "chinese Simplified":"zh-CN",
                "chinese Traditional":"zh-TW",
                "croatian":"hr",
                "czech":"cs",
                "danish":"da",
                "dutch":"nl",
                "english":"en",
                "esperanto":"eo",
                "estonian":"et",
                "filipino":"tl",
                "finnish":"fi",
                "french":"fr",
                "galician":"gl",
                "georgian":"ka",
                "german":"de",
                "greek":"el",
                "gujarati":"gu",
                "haitian Creole":"ht",
                "hebrew":"iw",
                "hindi":"hi",
                "hungarian":"hu",
                "icelandic":"is",
                "indonesian":"id",
                "irish":"ga",
                "italian":"it",
                "japanese":"ja",
                "kannada":"kn",
                "korean":"ko",
                "latin":"la",
                "latvian":"lv",
                "lithuanian":"lt",
                "macedonian":"mk",
                "malay":"ms",
                "maltese":"mt",
                "norwegian":"no",
                "persian":"fa",
                "polish":"pl",
                "portuguese":"pt",
                "romanian":"ro",
                "russian":"ru",
                "serbian":"sr",
                "slovak":"sk",
                "slovenian":"sl",
                "spanish":"es",
                "swahili":"sw",
                "swedish":"sv",
                "tamil":"ta",
                "telugu":"te",
                "thai":"th",
                "turkish":"tr",
                "ukrainian":"uk",
                "urdu":"ur",
                "vietnamese":"vi",
                "welsh":"cy",
                "yiddish":"yi",                            
}
                

def fromHtml(text, languageFrom, languageTo):
        """
        Returns translated text that is scraped from Google Translate's HTML
        source code.
        """

        #Set the user agent.
        urllib.FancyURLopener.version = "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008070400 SUSE/3.0.1-0.1 Firefox/3.0.1"
 
        #Encode the parameters we're going to send to the Google servers.
        try:
            postParameters = urllib.urlencode({"langpair":"%s|%s" %(langCode[languageFrom.lower()],langCode[languageTo.lower()]), "text":text,"ie":"UTF8", "oe":"UTF8"})
        except KeyError, error:
            print "Currently we do not support %s" %(error.args[0])
            return
            
        #Send the request with the above parameters and save to 'page' variable.
        page = urllib.urlopen("http://translate.google.com/translate_t", postParameters)
        #content now contains the HTML source code of the website.
        print page
        content = page.read()
        #Don't forget to close the connection!
        page.close()
        #content now contains the HTML source code of the website.
        content = page.read()
        htmlSource = BeautifulSoup(content)
        #Google creates a span with title the same as the text you wanted to translate.
        #So let's find a 'span' that has as a Title the 'text' we passed to this method.
        translation = htmlSource.find('span', title=text )
        #the renderContents() method returns the body that is inside of the span we found.
        return translation.renderContents()



def fromAjax(text, languageFrom, languageTo):
        """
        Returns a simple string translating the text from "languageFrom" to
        "LanguageTo" using Google Translate AJAX Service.
        """
        LANG = langCode
 
        base_url = 'http://ajax.googleapis.com/ajax/services/language/translate?'
        langpair = '%s|%s'%(LANG.get(languageFrom.lower(),languageFrom),
                          LANG.get(languageTo.lower(),languageTo))
        try:
                params=urllib.urlencode( (('v',1.0),
                                   ('q',text.encode('utf-8')),
                                   ('langpair',langpair),) )
                # print params
        except UnicodeDecodeError:
                pass
        url = base_url+params
        content = urllib2.urlopen(url).read()
        try: trans_dict=json.loads(content)
        except AttributeError:
            try: trans_dict=json.load(content)
            except AttributeError: trans_dict=json.read(content)
        try:
            return trans_dict['responseData']['translatedText']
        except TypeError: pass
        
        
############################################################################################

# Main treat:

files = ["animals.txt", "adjectives.txt"]


for File in files:
        words = []
        with open(File, 'r') as infile:
                for line in infile:
                        words.append(line)
        infile.close()
        
        with open(File, 'a') as outfile:
                for language in langCode:
                        for word in words:
                                word = str(word)
                                transWord = str(fromAjax(word, "english", language))
                                print word + 'is ' + transWord + ' in ' + language
                                if transWord != None and transWord != 'None': 
                                        outfile.write(transWord + '\n')
                                        print '\n' 
                                else: print "Did not write!" + '\n'                 
        outfile.close()      







































