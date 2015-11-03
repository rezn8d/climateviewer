"""
GEODATA FROM: http://download.geonames.org/export/dump/ (08/21/2015)

https://docs.python.org/2/library/sqlite3.html
http://sebastianraschka.com/Articles/sqlite3_database.html

########### CREATE ############################################
import sqlite3

place_file = "corpori/places/allCountries.txt"

# create new db and make connection
conn = sqlite3.connect('place_names.db')
c = conn.cursor()

# create table
c.execute('''CREATE TABLE place_names
             (id TEXT, latitude FLOAT, longitude FLOAT)''')

# insert one row of data
c.execute("INSERT INTO my_db VALUES ('ID_2352532','YES', 4)")

# insert multiple lines of data
multi_lines =[ ('ID_2352533','YES', 1),
               ('ID_2352534','NO', 0),
               ('ID_2352535','YES', 3),
               ('ID_2352536','YES', 9),
               ('ID_2352537','YES', 10)
              ]
c.executemany('INSERT INTO place_names VALUES (?,?,?)', multi_lines)

# save (commit) the changes
conn.commit()

# close connection
conn.close()


######### QUERY #################################################
import sqlite3

# open existing database
conn = sqlite3.connect('place_names.db')

c = conn.cursor()

# print all lines ordered by integer value in my_var2
for row in c.execute('SELECT * FROM place_names ORDER BY my_var2'):
    print row

# print all lines that have "YES" as my_var1 value 
# and have an integer value <= 7 in my_var2
t = ('YES',7,)
for row in c.execute('SELECT * FROM my_db WHERE my_var1=? AND my_var2 <= ?', t):
    print row

# print all lines that have "YES" as my_var1 value 
# and have an integer value <= 7 in my_var2
t = ('YES',7,)
c.execute('SELECT * FROM my_db WHERE my_var1=? AND my_var2 <= ?', t)
rows = c.fetchall()
for r in rows:
    print r

# close connection
conn.close()

"""
import sqlite3
import time
from getLocation import get_coordinates


class sqlite3_DB():
	def __init__(self, db_name):
		"""
		Creates a SQLLite3 DB Object with db_name
		"""
		self.db_name = db_name


	def create_db(self, input_file):
		"""
		Imports the input_file into the SQLLite3 DB for this DB Object
		"""
		start_time = time.clock()
		lines = 0

		try:
			print "\n\n\nCP 0"
			conn = sqlite3.connect(self.db_name)
			c = conn.cursor()
			print "CP 1"

			c.execute('''CREATE TABLE place_names (id TEXT, coordinates TEXT)''')
			print "CP 2"

			lst = list()
			with open(input_file, "rb") as in_file:
				for line in in_file:
				    place = line.strip()
				    print place
				    coordinates = get_coordinates(place)
				    lst.append((place, coordinates))
				    lines += 1
			print "CP 3"

			c.executemany("INSERT INTO place_names VALUES (?,?)", lst)
			print "CP 4"
			conn.commit()
			conn.close()
			print "CP 5"
			ret_code = 0

		except:
			print "ERROR BUILDING DATABASE!\n"
			conn.rollback()
			ret_code = -1

		elapsed_time = time.clock() - start_time
		print "Time elapsed: {} seconds".format(elapsed_time)
		print "Read {} lines".format(lines)
		return ret_code


	def query_db(self, query_string):
		"""
		Returns (latitude, longitude) if the place query_string exsists, None otherwise; ERROR CODE -1
		"""
		start_time = time.clock()
		lines = 0

		try:
			print "\n\n\nCP 0"
			conn = sqlite3.connect(self.db_name)
			c = conn.cursor()
			print "CP 1"
			places_found = []
			for placename, coords in c.execute('SELECT * FROM place_names WHERE id LIKE ?', '%' + query_string + '%'):
			    places_found.append((placename, coords)) 
			    lines += 1
			print "CP 2"
			conn.close()
			print "CP 3"
			if len(places_found) > 0:
				ret_value = places_found[0][1] # the ccords in the first one found ? Return ALL: places_found[:][1] ? TODO
			else:
				ret_value = None

		except:
			print "ERROR QUERYING DATABASE!\n"
			ret_value = -1

		elapsed_time = time.clock() - start_time
		print "Time elapsed: {} seconds".format(elapsed_time)
		print "Read {} lines".format(lines)
		return ret_value


def test_db():
	test_db = sqlite3_DB('test.db')
	print test_db.create_db('test_places.txt')
	print test_db.query_db('Frankfurt')
	return

if __name__ == '__main__':
	test_db()

	
