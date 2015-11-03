import os
import subprocess
from gevent import monkey; monkey.patch_all()

from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace
from socketio.mixins import BroadcastMixin
import redis
 

from API_KEYS import MAPS_API_KEY

files = ['index.html', 'favicon.ico']

CORS = ("Access-Control-Allow-Origin", "*") # http://localhost:8080
CORS_METHODS = ("Access-Control-Allow-Methods", "GET, POST, PUT") #TODO
CONNECTION = ("Connection", "keep-alive")

def start_php_server(port_number):
  hostname = str("localhost:%s" %port_number)
  subprocess.Popen(["php", "-S", hostname])


class NupicNamespace(BaseNamespace, BroadcastMixin):
  def recv_connect(self):
    def sendNupic():
      r = redis.Redis(host=os.environ.get("REDIS_HOST", "127.0.0.1"),
                      port=int(os.environ.get("REDIS_PORT", 6379)),
                      db=int(os.environ.get("REDIS_DB", 0)))

      ps_obj=r.pubsub()
      # subscribe to output from run.py
      ps_obj.subscribe("nupic")

      for item in ps_obj.listen():
        self.emit('nupic_data', item)

    self.spawn(sendNupic)


class Application(object):
  def __init__(self):
    self.buffer = []

  def __call__(self, environ, start_response):
    path = environ['PATH_INFO'].strip('/') or 'index.html'
    
    if '.php' in path:
      try:
        data = (open(path)
                    .read())
        content_type = "application/json"
        start_response('200 OK', [('Content-Type', content_type), CORS, CORS_METHODS, CONNECTION])
        return [data]
      except Exception:
        return not_found(start_response)

    elif path.startswith('static/') or path in files:
      try:
        data = (open(path)
                .read()
                .replace("https://maps.googleapis.com/maps/api/js?key=API_KEY", "https://maps.googleapis.com/maps/api/js?key=%s" % (MAPS_API_KEY)))

      except Exception:
        return not_found(start_response)

      if path.endswith(".js"):
        content_type = "text/javascript"
      elif path.endswith(".css"):
        content_type = "text/css"
      elif path.endswith(".swf"):
        content_type = "application/x-shockwave-flash"
      else:
        content_type = "text/html"

      start_response('200 OK', [('Content-Type', content_type)])
      return [data]

    if path.startswith("socket.io"):
      socketio_manage(environ, {'/nupic': NupicNamespace})
    else:
      return not_found(start_response)


def not_found(start_response):
  start_response('404 Not Found', [])
  return ['<h1>Not Found</h1>']


if __name__ == '__main__':
  port_number = 8081
  print 'Listening on port http://0.0.0.0:8080 and on port 10843 (flash policy server) with the php server running on %s\n' %port_number
  # start_php_server(port_number) # Better run 'sudo php -S localhost:8081' in the /webapp directory, though! - Neccessary for Searching and News!
  # Also consider running 'google-chrome --disable-web-security' so that the CORS requests are working! TODO
  print "\n"
  SocketIOServer(('0.0.0.0', 8080),
                 Application(),
                 resource="socket.io",
                 policy_server=True,
                 policy_listener=('0.0.0.0', 10843)).serve_forever()

