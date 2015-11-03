// Check the input format:
// TODO enable more formats!
var _validFileExtensions = [".csv"];    
function ValidateSingleInput(oInput) {
    if (oInput.type == "file") {
        var sFileName = oInput.value;
         if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
             
            if (!blnValid) {
                alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                oInput.value = "";
                return false;
            }
        }
    }
    upload_csv(oInput);
    return true;
}

// Upload and read the csv File: TODO: Throws: Uncaught TypeError: Cannot read property 'call' of undefined
function upload_csv(oInput) {
    // Get the csv selected in the input CSVINPUT: http://papaparse.com/
    // var csvData = document.getElementById("CSVINPUT");
    Papa.parse(oInput, {
        header: true,
        dynamicTyping: true,
        step: function(row) {
            console.log("Row:", row.data);
            handle_obj(row.data);
        },
        complete: function() {
            console.log("All done! Your data is parsed!");
        }
    });
}


/**
 * The CenterControl adds button to toggle on/off the news markers.
 * This constructor takes the control DIV as an argument.
 * https://developers.google.com/maps/documentation/javascript/examples/control-custom
 * @constructor
 */
function CenterControl(controlDiv, map) {

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to toggle news on/off';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '14px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  if (NewsON) {controlText.innerHTML = 'Hide News';} else {controlText.innerHTML = 'Show News'};
  controlUI.appendChild(controlText);

  // Setup the click event listeners: toggle news:
  google.maps.event.addDomListener(controlUI, 'click', function() {
    NewsON = !NewsON;
    if (NewsON) {
        update();
        controlText.innerHTML = 'Hide News';
    }
    else {
        removeMarkers();  
        controlText.innerHTML = 'Show News';
    }
  });
}




/**
* Possible to reuse for Add-Function? TODO
* Inserts a Event Object into the event db 
* NOW HANDLED IN run.py! 
function insert_event(EventObject) 
{
    // pass the EventObject to insert_event via ajax:
    var data = {
      "event": EventObject  // JSON.stringify(EventObject)
    };
    $.ajax({
        url: "http://localhost:8081/static/includes/insert_event.php",
        type: "POST",
        contentType: "application/json",
        data: data,
        dataType: "json"
    })
    .done(function() {
        // All good :)
    })
    .fail(function() {
        // log error to browser's console
        console.log("Event-Insert failed: ");
        console.log(JSON.stringify(EventObject));
    })
}
*/

/**
 * Adds marker for place to map.
 */
function addMarker(place)
{
    // set LagLng for place:
    var placeLatLng = new google.maps.LatLng(parseFloat(place.latitude), parseFloat(place.longitude));

    // add it to the map:
    var image = "/static/img/Onews.png";

    var marker = new MarkerWithLabel({
            position: placeLatLng,
            map: map,
            icon: image,
            animation: google.maps.Animation.DROP,
            labelContent: place.place_name + ", " + place.admin_code1,
            labelAnchor: new google.maps.Point(22, 0),
            labelClass: "label",
            labelStyle: {opacity: 0.75}
    });
    // listener for info window:
    google.maps.event.addListener(marker, "click", function() { infoData(marker, place.place_name + "," + place.admin_code1); });
    // add this marker to markers[]
    markers.push(marker);
}

/**
 * Configures application.
 */
function configure()
{
    // console.log("Configuring...");
    // update UI after map has been dragged
    google.maps.event.addListener(map, "dragend", function() {
        update();
    });

    // update UI after zoom level changes
    google.maps.event.addListener(map, "zoom_changed", function() {
        update();
    });

    // remove markers whilst dragging
    google.maps.event.addListener(map, "dragstart", function() {
        removeMarkers();
    });

    // configure typeahead
    // https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md
    $("#q").typeahead({
        autoselect: true,
        highlight: true,
        minLength: 1
    },
    {
        source: search,
        templates: {
            empty: "no places found yet",
            suggestion: _.template("<p><%- place_name %>, <%- country_code %>, <%- admin_name1 %>, <%- postal_code %></p>")
        }
    });

    // update value with changing cursor value:
    $("#q").on("typeahead:cursorchanged", function(eventObject, suggestion, name) {
        $('#q').val(suggestion.place_name + ', ' + suggestion.country_code + ', ' + suggestion.admin_name1 + ', ' + suggestion.postal_code);
    });

    // re-center map after place is selected from drop-down
    $("#q").on("typeahead:selected", function(eventObject, suggestion, name) {

        // ensure coordinates are numbers
        var latitude = (_.isNumber(suggestion.latitude)) ? suggestion.latitude : parseFloat(suggestion.latitude);
        var longitude = (_.isNumber(suggestion.longitude)) ? suggestion.longitude : parseFloat(suggestion.longitude);

        // set map's center
        map.setCenter({lat: latitude, lng: longitude});

        // update UI
        update();
    });

    // hide info window when text box has focus
    $("#q").focus(function(eventData) {
        hideInfo();
    });

    // re-enable ctrl- and right-clicking (and thus Inspect Element) on Google Map
    // https://chrome.google.com/webstore/detail/allow-right-click/hompjdfbfmmmgflfjdlnkohcplmboaeo?hl=en
    document.addEventListener("contextmenu", function(event) {
        event.returnValue = true; 
        event.stopPropagation && event.stopPropagation(); 
        event.cancelBubble && event.cancelBubble();
    }, true);

    // update UI
    update();

    // give focus to text box
    $("#q").focus();
}

/**
 * Hides info window.
 */
function hideInfo()
{
    info.close();
}

/**
 * Removes markers from map.
 */
function removeMarkers()
{
    // iterate over all markers[] and remove each by setting null:
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
        markers[i] = null;
    }
    //  empty array
    markers.length = 0;
}

// only showing nEvents events (no pun intended...:P)!
function control_n_events() {
    var nEvents = document.getElementById('event_markers_length').value;
    if (nEvents != '') {
        console.log("Displaying ", nEvents, " events!")
        if (event_markers.length >= nEvents) {
            // remove the first marker
            event_markers[0].setMap(null);
            event_markers[0] = null;
            event_markers.length -= 1; 
        }
    }
}

/**
 * Searches database for typeahead's suggestions. TODO: maybe another API availible?
 * Possibly implemented with: http://www.geonames.org/export/web-services.html
 * to reduce Programm size (no places DB required)
 */
function search(query, cb)
{
    // get places matching query (asynchronously)
    var parameters = {
        geo: query
    };
    $.getJSON("http://localhost:8081/static/includes/search.php", parameters)
    .done(function(data, textStatus, jqXHR) {

        // call typeahead's callback with search results (i.e., places)
        cb(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {

        // log error to browser's console
        console.log(errorThrown.toString());
    });
}


/**
 * gets JSON of local weather
 */
function infoData(marker, query)
{
    // get weather for query
    var parameters = { q: query };

    $.getJSON("http://api.openweathermap.org/data/2.5/weather", parameters)
    .done(function(data, textStatus, jqXHR) {

        // build weather display data
        var weatherInfo;
        if (data) {
            var temp_c = Math.round(data.main.temp - 273.15);
            var temp_f = Math.round((temp_c * 9) / 5 + 32);
            weatherInfo = "<p><b>Current Weather:</b><br/>" + temp_f + "&degF / " + temp_c + "&degC, " + data.weather[0].description + "</p>";
        } else {
            weatherInfo = "<p>(No weather data available)</p>";
        }

        // forward on to append news articles
        articles(marker, query, weatherInfo);
     })
     .fail(function(jqXHR, textStatus, errorThrown) {

         // log error to browser's console
         console.log(errorThrown.toString());
     });
}


/**
 * gets JSON of news articles TODO: maybe process News-API directly? But lots of work for client...
 */
function articles(marker, query, weatherInfo)
{
    // get articles for query
    var parameters = { geo: query };

    $.getJSON("http://localhost:8081/static/includes/articles.php", parameters)
    .done(function(data, textStatus, jqXHR) {

        // build HTML list of articles for query
        var articleList = "";

        if (data.length > 0) {
            articleList = "<ul>";

            for (var i = 0; i < data.length; i++) {
                articleList += "<li><a href='" + data[i].link + "' target=_blank>" + data[i].title + "</a></li>";
            }

            articleList += "</ul>";
        } else {
            articleList = "No news for this place available";
        }

        //showInfo(marker, articleList);
        showInfo(marker, weatherInfo + articleList);
     })
    .fail(function(jqXHR, textStatus, errorThrown) {

         // log error to browser's console
         console.log(errorThrown.toString());
     });
};

/**
 * Shows info window at marker with content.
 */
function showInfo(marker, content)
{
    // start div
    var div = "<div id='info'>";
    if (typeof(content) === "undefined")
    {
        // http://www.ajaxload.info/
        div += "<img alt='loading' src='/static/img/ajax-loader.gif'/>";
    }
    else
    {
        div += content;
    }

    // end div
    div += "</div>";

    // set info window's content
    info.setContent(div);

    // open info window (if not already open)
    info.open(map, marker);
}

/**
 * Updates UI's markers.
 */
function update() 
{
    // get map's bounds
    var bounds = map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    // get places within bounds (asynchronously)
    var parameters = {
        ne: ne.lat() + "," + ne.lng(),
        q: $("#q").val(),
        sw: sw.lat() + "," + sw.lng()
    };
    $.getJSON("http://localhost:8081/static/includes/update.php", parameters)
    .done(function(data, textStatus, jqXHR) {

        // remove old markers from map
        removeMarkers();

        // add new markers to map
        for (var i = 0; i < data.length; i++)
        {
            addMarker(data[i]);
        }
     })
     .fail(function(jqXHR, textStatus, errorThrown) {

         // log error to browser console
         console.log(errorThrown.toString());
     });
}