/*
SAMPLE:
SRC: PDC's live feed:  
http://hpxml.pdc.org/public.xml

<hazardBeans>
	<hazardBean>
		<app_ID>0</app_ID>
		<app_IDs/>
		<autoexpire>Y</autoexpire>
		<category_ID>EVENT</category_ID>
		<charter_Uri/>
		<comment_Text>201511EP</comment_Text>
		<create_Date_hst>2015-08-15T16:37:21-10:00</create_Date_hst>
		<create_Date>2015-08-16T02:37:21-10:00</create_Date>
		<creator>D2P2</creator>
		<end_Date_hst>2015-08-16T23:00:00-10:00</end_Date_hst>
		<end_Date>2015-08-17T09:00:00-10:00</end_Date>
		<glide_Uri/>
		<hazard_ID>56534</hazard_ID>
		<hazard_Name>Tropical Depression - Eleven-e</hazard_Name>
		<last_Update_hst>2015-08-15T23:10:33-10:00</last_Update_hst>
		<last_Update>2015-08-16T09:10:33-10:00</last_Update>
		<latitude>17.6</latitude>
		<longitude>-114.6</longitude>
		<master_Incident_ID>35.1439714223999.1</master_Incident_ID>
		<message_ID>35.1439714223999</message_ID>
		<org_ID>-1</org_ID>
		<severity_ID>ADVISORY</severity_ID>
		<snc_url>http://dynamic.pdc.org/snc/prod/56534</snc_url>
		<start_Date_hst>2015-08-15T17:00:00-10:00</start_Date_hst>
		<start_Date>2015-08-16T03:00:00-10:00</start_Date>
		<status>A</status>
		<type_ID>CYCLONE</type_ID>
		<update_Date_hst>2015-08-15T22:37:18-10:00</update_Date_hst>
		<update_Date>2015-08-16T08:37:18-10:00</update_Date>
		<product_total>9</product_total>
		<uuid>0fb72408-ac31-4945-9ab8-08e5976802cb</uuid>
	</hazardBean>
	<hazardBean>
		...
	</hazardBean>
	...
</hazardBeans>



needs to become of the sort:

{"type":"FeatureCollection","features":[
	{
	  "type": "Feature",
	  "geometry": {
	    "type": "Point",
	    "coordinates": [125.6, 10.1]
	  },
	  "properties": {
	    "name": "Dinagat Islands"
	  }
	}, 
	...
]}

*/

// TODO

// Changes XML to geoJSON
/*
function xml2geojson(xml) {
	
	// Create the return object
	var features = [];
	var obj = {"type":"FeatureCollection","features":features};

	// for each hazardBean, append a obj to features:
	var hazardObj = {
					  "type": "Feature",
					  "geometry": {
					    "type": "Point",
					    "coordinates": [latitide, longitude]
					  },
					  "properties": {}
		}

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] =xml2geojson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xml2geojson(item));
			}
		}
	}
	return obj;
};
*/

var xml2geojson = function(xml){
    // Initialize the empty GeoJSON object
    var geo = {
        "type" : "FeatureCollection",
        "features" : []
    };
    // Function to set props for a feature TODO
    function setProps(element){
        var properties = {};
        var tags = $(element).find("tag");
        tags.each(function(index, tag){
            properties[$(tag).attr("k")] = $(tag).attr("v");
        });
        return properties;
    }
    // Generic function to create a feature of given type
    function getFeature(element, type){
        return {
            "geometry" : {
                "type" : type,
                "coordinates" : []
            },
            "type" : "Feature",
            "properties" : setProps(element)
        };
    }
    // Read out the hazardBeans Object (??)

    // Get the Points for Hazards
    var points = $("node:hazardBean", xml);
    points.each(function(index, ele){
        var feature = getFeature(ele, "Point");
        feature.geometry.coordinates.push(parseFloat($(ele).attr('longitude')));
        feature.geometry.coordinates.push(parseFloat($(ele).attr('latitude')));
       // Save the point in Main object
        geo.features.push(feature);
    });
    // Finally return the GeoJSON object
    return geo;
};