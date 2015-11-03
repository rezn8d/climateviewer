FROM redis:latest

RUN apt-get -y update && \
  apt-get install -y python python-pip && \
  apt-get -y upgrade

RUN pip install --upgrade pip
ADD * /twitter/
RUN pip install -r /twitter/requirements.txt

# Install pyner to bind to the NER server
RUN git clone https://github.com/dat/pyner.git
RUN \
  cd pyner && \
  python setup.py install && \
  cd ..

# Install Java
RUN \
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java8-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk8-installer


# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# Download the NER models http://nlp.stanford.edu/software/CRF-NER.shtml#Models
RUN mkdir /classifiers && \
  cd /classifiers && \


# Run the NER server
RUN \
  java -mx1000m -cp stanford-ner.jar edu.stanford.nlp.ie.NERServer \
  -loadClassifier classifiers/english.all.3class.distsim.crf.ser.gz -port 9191

# Needed fo server.py
EXPOSE 8088
RUN redis-server &

WORKDIR /twitter

# Start the services
CMD python server.py & \
  python twitter_docker.py & 
