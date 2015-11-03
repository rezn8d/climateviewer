# nostradamIQ - sensing our worlds disasters.

# DEMO APP (used in the pitch) 

## Requirements

- [NuPIC](https://github.com/numenta/nupic)
- [Redis](http://redis.io/) running locally
- Python, and [dependencies](requirements.txt)
- [Google Maps Javascript API Key](https://developers.google.com/maps/documentation/javascript/tutorial#api_key)
- Possibly: 
- [Cerebro2](https://github.com/numenta/nupic.cerebro2)
- [MySQLdb](http://mysql-python.sourceforge.net/MySQLdb.html)

## Usage

Include your API-Keys in webapp/API_KEYS.py (MAPS_API_KEY=< your API_KEY>)

- Start redis

  ```bash
  $ redis-server
  ```

- Start `run.py`

  ```bash
  $ python run.py
  ```

- Start webapp

  ```bash
  $ cd webapp
  $ python serve.py
  ```

- Open [http://localhost:8080](http://localhost:8080) in browser

## Usage via VM:

Include your API-Keys in webapp/API_KEYS.py (MAPS_API_KEY=< your API_KEY>) 
Download and install Docker client, Virtualbox, and Vagrant, and then:

```
source env.sh
vagrant up
docker build -t nostradamIQ .
docker run --name nostradamIQ-redis -d -p 0.0.0.0:6379:6379 redis
docker run \
  --name nostradamIQ-server \
  --link nostradamIQ-redis:broker \
  -e REDIS_HOST=broker \
  -d \
  -p 0.0.0.0:8080:8080 \
  -w /opt/numenta/nostradamIQ/webapp \
  nostradamIQ \
  python serve.py
docker run \
  --link nostradamIQ-redis:broker \
  -e REDIS_HOST=broker \
  nostradamIQ \
  python run.py
```

Redis, the nostradamIQ web service, and the nostradamIQ entry point are now running
in separate containers in a vm.  You should be able to access the web service
in a browser at [http://localhost:8080](http://localhost:8080)

__________________________________________________________________________________________________________________

Thanks to the NuPIC-Community, Austin, Lab75 and many more for help!
