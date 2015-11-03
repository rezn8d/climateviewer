// have the map object availible globally!
var map;
// EventMarkers only:
var event_markers = [];
// the News-Markers:
var markers = [];
 // for News-Toggle: 
var NewsON = false;
// the news info window:
var info = new google.maps.InfoWindow();
// socket.io-nupic object:
var nupic_socket;

// count the occurences of events:
var count = 1;
var PredCount = 1;


// converts timestamps of the form: 2004-11-24T08:24:42.760Z to prettier formats TODO
/*
function formatTime(timestamp) {
    var unixTimestamp = Date.parse(timestamp);
    var dt = new Date(unixTimestamp * 1000);

    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    var date = dt.getDate() + ". " + months[dt.getMonth()] + " " + dt.getFullYear();
    // the above dt.get...() functions return a single digit
    if (hours < 10) 
     hours = "0" + hours;
    if (minutes < 10) 
     minutes = "0" + minutes;
    if (seconds < 10) 
     seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds + " at " + date;
} 
*/      

function handle_obj(obj) {

    var gradient = ["#00FF00",
                    "#32FF00",
                    "#66FF00",
                    "#99FF00",
                    "#CCFF00",
                    "#FFFF00",
                    "#FFCC00",
                    "#FF9900",
                    "#FF6600",
                    "#FF3300",
                    "#FF0000"]

    var predColor = ["#0000FF",
                     "#000070",
                     "#000000"]

    console.log(obj)
    
    // Anomaly Handler: 
    if (obj.prediction == 'None') {
          var contentString = '<div id="content"><b>' + obj.eventType + ' No. ' + (obj.iterCount + 1) + ':<br/>Place</b> (Lat, Lng): (' + obj.lat + ', ' + obj.lng + ')<br/><b>Depth:</b> ' + obj.depth + 'km<br/><b>TimeStamp:</b> ' + obj.timestamp + '<br/><b>Magnitude:</b> ' + obj.scalar + '<br/><b>Event-ID:</b> ' + obj.id + '<br/><b>Anomaly-Score:</b> ' + obj.AnomalyScore + '<br/><b>Anomaly-Likelihood:</b> ' + obj.AnomalyLikelihood + '<br/><b>Anomaly-Mean:</b> ' +  obj.Anomaly_mean + '<br/></div>'
          var infowindow = new google.maps.InfoWindow({content: contentString})
          var myLatlng = new google.maps.LatLng(obj.lat, obj.lng)
          var color = gradient[Math.floor(10*parseFloat(obj.AnomalyScore))]
          var marker = new google.maps.Marker({position: myLatlng,
                                               map: map,
                                               animation: google.maps.Animation.DROP,
                                               icon: {path: google.maps.SymbolPath.CIRCLE,
                                                      scale: Math.exp(1.5, parseFloat(obj.scalar)),
                                                      fillColor: color,
                                                      fillOpacity: 1,
                                                      strokeWeight: 2,
                                                      strokeColor: color}})
            google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker)})
            // add this marker to event_markers[]
            event_markers.push(marker)
            count += 1
    }
    // Prediction Handeling: TODO
    else {
          var contentString = '<div id="content"><b>Predicting:<br/>' + obj.eventType + ' No. ' + PredCount + ' after ' + (obj.iterCount + 1) + ':<br/>Place</b> (Lat, Lng): (' + obj.lat + ', ' + obj.lng + ')<br/><b>Depth:</b> ' + obj.depth + 'km<br/><b>TimeStamp:</b> ' + obj.timestamp + '<br/><b>Magnitude:</b> ' + obj.scalar + '<br/><b>Anomaly-Score:</b> ' + obj.AnomalyScore + '<br/><b>Anomaly-Likelihood:</b> ' + obj.AnomalyLikelihood + '<br/><b>Anomaly-Mean:</b> ' +  obj.Anomaly_mean + '<br/></div>'
          var infowindow = new google.maps.InfoWindow({content: contentString})
          var myLatlng = new google.maps.LatLng(obj.lat, obj.lng)
          var color = predColor[0] // TODO show how sure you are about this prediction!
          var marker = new google.maps.Marker({position: myLatlng,
                                               map: map,
                                               animation: google.maps.Animation.DROP,
                                               icon: {path: google.maps.SymbolPath.CIRCLE,
                                                      scale: Math.exp(1.5, parseFloat(obj.scalar)),
                                                      fillColor: color,
                                                      fillOpacity: 1,
                                                      strokeWeight: 2,
                                                      strokeColor: color}})
            google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker)})
            // add this marker to event_markers[]
            event_markers.push(marker)            
            PredCount += 1
    }
}

function initialize() {
  // styles for map
  // https://developers.google.com/maps/documentation/javascript/styling
  var styles = [
      // hide Google's labels
      {
          featureType: "all",
          elementType: "labels",
          stylers: [
              {visibility: "off"}
         ]
      },
  ];
  var mapOptions = {center: {lat: 50.1907878,
                             lng: 8.5195414},
                      zoom: 2,
                      mapTypeId: google.maps.MapTypeId.HYBRID,
                      styles: styles,
                      panControl: true, 
                      zoomControl: true,
                      // disableDefaultUI: true
                    };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)
  // configure UI once Google Map is idle (i.e., loaded)
  google.maps.event.addListenerOnce(map, "idle", configure);

  // Create the DIV to hold the control and
  // call the NewsControl() constructor passing
  // in this DIV.
  var NewsControlDiv = document.createElement('div');
  var NewsControl = new CenterControl(NewsControlDiv, map);
  NewsControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(NewsControlDiv);
  
  // Main Event-Listener for the Redis-Server
  $(function() {
    WEB_SOCKET_SWF_LOCATION = "/static/WebSocketMain.swf"
    WEB_SOCKET_DEBUG = true 

    // the socket.io objects:
    nupic_socket = io.connect('/nupic')
    nupic_socket.on('nupic_data', function(data) {
      obj = $.parseJSON(data.data)
      if(obj){
        handle_obj(obj);
      }
    })
  })
}
// load that function once the window is loaded
google.maps.event.addDomListener(window, 'load', initialize);