#!/usr/bin/python
# -*- coding: utf-8 -*-

from __future__ import print_function
try:
    import urllib.parse as urlparse
except ImportError:
    # py2
    import urlparse

import re
import sys

import tornado.ioloop
import tornado.web
import tornado.log
import tornado.httpclient
import tornado.httputil

import datetime
import redis
import base64

REDIS = redis.Redis()

CACHE_MIN = 5 # only for dev go for a dict with individual TTLs
# from chache_times import CACHE_MIN # Production
FILTER = False # To only accept urls in urls.txt

if FILTER == True:
    with open('urls.txt') as f:
        VALID_URLS = f.read().splitlines()
    f.close()

# headers to remove as of HTTP 1.1 RFC2616
# http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html
hop_by_hop_headers = set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
])


class ProxyHandler(tornado.web.RequestHandler):

    def response_handler(self, response):
        if response.error and not isinstance(response.error, tornado.httpclient.HTTPError):
            self.set_status(500)
            print('Internal server error:\n' + str(response.error))
            self.write('Internal server error:\n' + str(response.error))
            self.finish()
            return

        if response.code == 599:
            # connection closed
            self.set_status(502)
            print('Bad gateway:\n' + str(response.error))
            self.write('Bad gateway:\n' + str(response.error))
            self.finish()
            return

        self.set_status(response.code)
        # copy all but hop-by-hop headers
        for header, v in response.headers.items():
            if header.lower() not in hop_by_hop_headers:
                self.set_header(header, v)

        origin = self.request.headers.get('Origin', '*')
        self.set_header('Access-Control-Allow-Origin', origin)

        if self.request.method == 'OPTIONS':
            if 'Access-Control-Request-Headers' in self.request.headers:
                # allow all requested headers
                self.set_header('Access-Control-Allow-Headers', self.request.headers.get('Access-Control-Request-Headers', ''))

            self.set_header('Access-Control-Allow-Methods', response.headers.get('Allow', ''))

            if response.code == 405:
                # fake OPTIONS response when source doesn't support it
                # as OPTIONS is required for CORS preflight requests.
                # the 405 response should contain the supported methods
                # in the Allow header.
                self.set_status(200)
                self.clear_header('Content-Length')
                self.finish()
                return

        if response.body:
            # SAVE RESPONSE IN REDIS AND RETURN IT
            content = base64.b64encode(response.body) # Save space!
            type_content = response.headers.get('Content-Type', '')
            redis_obj = [type_content, content]
            # TODO: Write to file as well for long term storage
            REDIS.setex(self.url, redis_obj, CACHE_MIN*60) # CACHE_MIN[url]
            print("\nURL: {0} was inserted in REDIS-Cache with TTL: {1} minutes!\n".format(self.url, CACHE_MIN)) # CACHE_MIN[url]
            print("Content-Type: {0}".format(type_content))
            self.write(response.body)
            self.finish()

    @tornado.web.asynchronous
    def request_handler(self):
        # Remove the ? Added by Cesium:
        if '?' in self.request.uri:
            url = self.request.arguments.keys()[0]
        else:
            url = self.request.uri[6:]
        url_parts = urlparse.urlparse(url)

        # Check for Origin of the Request:
        #if url_parts.netloc != 'nostradamiq.org':
        #    raise tornado.web.HTTPError(403)

        # We are from your side ;)
        self.request.headers['Host'] = url_parts.netloc

        if self.request.query:
            url = url + '?' + self.request.query
        req = tornado.httpclient.HTTPRequest(
            url=url,
            method=self.request.method,
            body=self.request.body,
            headers=self.request.headers,
            follow_redirects=True, #False
            allow_nonstandard_methods=True,
            use_gzip=False, # otherwise tornado will decode proxied data
        )

        # For saving it in Redis
        self.url = url
        client = tornado.httpclient.AsyncHTTPClient()
        try:
            redis_response = REDIS.get(self.url)
            if redis_response == None:
                # Have the AJAX Client fetch the content
                client.fetch(req, self.response_handler)
            else:
                # REDIS hold everything as a string, so get rid of all the stuff...
                redis_obj = redis_response.split(',')
                type_content = redis_obj[0]
                self.set_header('Content-Type', type_content)
                content = base64.b64decode(redis_obj[1]) # Get content from Redis, decode and finish request
                print("Got Request handeled by Redis! TTL left: {0}".format(REDIS.ttl(self.url)))
                self.write(content)
                self.finish()    

        except tornado.httpclient.HTTPError as e:
            # pass regular HTTP errors from server to client
            if hasattr(e, 'response') and e.response:
                self.response_handler(e.response)
            else:
                raise

    # alias HTTP methods to generic request handler
    SUPPORTED_METHODS = ['GET', 'POST', 'PUT', 'HEAD', 'OPTIONS']
    get = request_handler
    post = request_handler
    put = request_handler
    head = request_handler
    options = request_handler


def run_proxy(bind, debug=False):
    #  /proxy/[?](?P<url>.*) # r'/proxy/[?](.*)' # r'/proxy/(.*)'
    handler = [(r'/proxy/', ProxyHandler, {})]
    app = tornado.web.Application(handler, debug=debug)
    app.listen(bind[1], bind[0])
    ioloop = tornado.ioloop.IOLoop.instance()
    ioloop.start()


def parse_bind_address(address, default=('localhost', 8080)):
    """
    >>> parse_bind_address('80')
    ('localhost', 80)
    >>> parse_bind_address('0.0.0.0')
    ('0.0.0.0', 8080)
    >>> parse_bind_address('0.0.0.0:8081')
    ('0.0.0.0', 8081)
    """
    if ':' in address:
        host, port = address.split(':', 1)
        port = int(port)
    elif re.match('^\d+$', address):
        host = default[0]
        port = int(address)
    else:
        host = address
        port = default[1]
    return host, port



def main():
    import optparse

    parser = optparse.OptionParser()
    parser.add_option('-b', '--bind', default='localhost:8080')
    parser.add_option('--debug', default=False, action='store_true')

    options, args = parser.parse_args()

    host, port = parse_bind_address(options.bind)

    tornado.log.enable_pretty_logging()

    print("\nStarting CORS-Proxy...", file=sys.stderr)
    print("CORS proxy at http://%s:%d/proxy/\n" % (host, port), file=sys.stderr)


    try:
        run_proxy((host, port), debug=options.debug)
    except KeyboardInterrupt:
        print("\nExiting", file=sys.stderr)


if __name__ == '__main__':
    main()
