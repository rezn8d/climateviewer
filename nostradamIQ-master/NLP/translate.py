#! /usr/bin/env python 

import json, requests
import urllib3
import sys
import time

from API_KEYS import YANDEX_API_KEY 

#Get annoying warnings... not secure! but enough for this purpose...
urllib3.disable_warnings()


url = "https://translate.yandex.net/api/v1.5/tr.json/translate"


languages = {   "Albanian":"sq",
                "Arabian":"ar",
                "Armenian":"hy",
                "Azeri":"az",
                "Belarusian":"be",
                "Bosnian":"bs",
                "Bulgarian":"bg",
                "Catalan":"ca",
                "Croatian":"hr",
                "Czech":"cs",
                "Chinese":"zh",
                "Danish":"da",
                "Dutch":"nl",
                "English":"en",
                "Estonian":"et",
                "Finnish":"fi",
                "French":"fr",
                "Georgian":"ka",
                "German":"de",
                "Greek":"el",
                "Hebrew":"he",
                "Hungarian":"hu",
                "Icelandic":"is",
                "Indonesian":"id",
                "Italian":"it",
                "Japanese":"ja",
                "Korean":"ko",
                "Latvian":"lv",
                "Lithuanian":"lt",
                "Macedonian":"mk",
                "Malay":"ms",
                "Maltese":"mt",
                "Norwegian":"no",
                "Polish":"pl",
                "Portuguese":"pt",
                "Romanian":"ro",
                "Russian":"ru",
                "Spanish":"es",
                "Serbian":"sr",
                "Slovak":"sk",
                "Slovenian":"sl",
                "Swedish":"sv",
                "Thai":"th",
                "Turkish":"tr",
                "Ukrainian":"uk",
                "Vietnamese":"vi",
} #All the supported ones by Yandex


def translate(translate_text, ToLang, FromLang="en"):
        langPair = "{0}-{1}".format(str(FromLang), str(ToLang))
        params = dict(
            key=YANDEX_API_KEY,
            lang=langPair,
            text=translate_text)
        try:
                resp = requests.get(url=url, params=params)
        except requests.exceptions.SSLError: 
                return "Falied to translate {0} from {1} to {2}".format(translate_text, FromLang, ToLang)
        except requests.exceptions.ConnectionError:
                # Retry every few seconds:
                print "Connection Failed!\nRetry..."
                time.sleep(10)
                return translate(translate_text, ToLang, FromLang)
        data = json.loads(resp.text)
        translation = data['text']

        return str(translation)      

# Main treat:
if __name__=='__main__':
        if len(sys.argv) > 1:
                files = sys.argv[1:] #["animals_unique.txt", "adjectives_unique.txt", "synonyms_unique.txt"]
        else:
                print "Usage:\nType 'python translate.py <list of .txt files to translate>\n"
                files = []
        wroteAll = 0

        for File in files:
                outfile = "translated_" + File
                with open(outfile, 'wb') as outF:
                        print "Writing translations of {0} to {1}...".format(File, outfile)
                        words = []
                        with open(File, 'r') as infile:
                                for line in infile:
                                        words.append(line)
                                        outF.write(line)
                        infile.close()
                        print "Read {0} words...".format(len(words))
                        for language in languages:
                                print "Translating {0} to {1}".format(File, language)
                                #outF.write("\n\n" + "_"*10 + "\nTranslating to {0}\n".format(language) + "_"*10 +"\n")
                                wrote = 0 
                                for word in words:
                                        outF.write(translate(word, languages[language])[3:-4] + '\n')
                                        wrote += 1
                                        wroteAll += 1
                                        if (wroteAll%100==0): print "Translated & Wrote {0} words so far...".format(wroteAll)
                                print "Wrote {0} words...".format(wrote)
                outF.close()                        
                                        
                                
                                
                
