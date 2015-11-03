FROM redis:latest
RUN apt-get -y update && apt-get install -y python python-pip
RUN pip install -r requirements.txt
ADD . /proxy/
COPY * /proxy/
EXPOSE 8888
CMD redis-server & cd /proxy && python app.py --allow-proxy ALL --allow-origin ALL

