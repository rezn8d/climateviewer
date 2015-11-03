def scipy_cluster(input_events):
	# see: http://scikit-learn.org/stable/auto_examples/cluster/plot_dbscan.html
	import numpy as np
	from collections import deque

	from sklearn.cluster import DBSCAN
	from sklearn import metrics
	from sklearn.preprocessing import StandardScaler

	# Copy the inputs:
	out_events = deque()

	len_events = 0
	points = []
	for event in input_events:
		out_events.append(event)
		lat = float(event.latitude)
		lng = float(event.longitude)
		point = [lat, lng]
		points.append(point)
		len_events += 1

	X = StandardScaler().fit_transform(points)

	# Compute DBSCAN
	db = DBSCAN(eps=0.3, min_samples=2).fit(X)
	core_samples_mask = np.zeros_like(db.labels_, dtype=bool)
	core_samples_mask[db.core_sample_indices_] = True
	labels = db.labels_

	# Number of clusters in labels, ignoring noise if present.
	n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)

	print('Estimated number of clusters: %d' % n_clusters_)
	print("Silhouette Coefficient: %0.3f"
	      % metrics.silhouette_score(X, labels))

	# Plot result
	import matplotlib.pyplot as plt

	# Black removed and is used for noise instead.
	unique_labels = set(labels)
	colors = plt.cm.Spectral(np.linspace(0, 1, len(unique_labels)))
	for k, col in zip(unique_labels, colors):
	    if k == -1:
	        # Black used for noise.
	        col = 'k'

	    class_member_mask = (labels == k)

	    xy = X[class_member_mask & core_samples_mask]
	    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=col,
	             markeredgecolor='k', markersize=14)

	    xy = X[class_member_mask & ~core_samples_mask]
	    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=col,
	             markeredgecolor='k', markersize=6)

	plt.title('Estimated number of clusters: %d' % n_clusters_)
	plt.show()

	# TODO: model each cluster seperately; get better clustering
	minLatitudes, maxLatitudes, minLongitudes, maxLongitudes = -180, 180, -180, 180

	return out_events, minLatitudes, maxLatitudes, minLongitudes, maxLongitudes





def cluster(input_events):
	# TODO implement DBSCAN-Clustering ? 
	# see: https://pypi.python.org/pypi/ddbscan/
	# import ddbscan
	from collections import deque
	import matplotlib.pyplot as plt

	print "CLUSTERING is set to True.\nThis will feed the events in as clusters -i.e. in relative Coordintes...\n"
	
	# Copy the inputs:
	out_events = deque()

	minLatitudes = float("inf")
	maxLatitudes = float("-inf")
	minLongitudes = float("inf")
	maxLongitudes = float("-inf")

	len_events = 0
	points = []
	for event in input_events:
		out_events.append(event)
		lat = float(event.latitude)
		lng = float(event.longitude)
		scl = 1.5**float(event.mag)
		point = [lat, lng]
		points.append(point)
		len_events += 1

		plt.plot(point[1], point[0], 'o', markersize=scl)
        
        if lat > maxLatitudes:
        	maxLatitudes = lat

      	if lat < minLatitudes:
        	minLatitudes = lat

      	if lng > maxLongitudes:
        	maxLongitudes = lng

      	if lng < minLongitudes:
        	minLongitudes = lng
        
	print "There are {0} events in the given dataset\n".format(len_events)
		
	print "Max. Longitudes: {maxLng} ; Min. Longitudes: {minLng}".format(maxLng=str(maxLongitudes), minLng=str(minLongitudes)) 
	print "Max. Latitudes: {maxLat} ; Min. Latitudes: {minLat}\n".format(maxLat=str(maxLatitudes), minLat=str(minLatitudes))
	plt.show(block=True)
	print len_events

	#import subprocess
	plt.show(block=False)

	return out_events, minLatitudes, maxLatitudes, minLongitudes, maxLongitudes