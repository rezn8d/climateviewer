"use strict";
zip.workerScriptsPath = '/lib/zip/';
var oneBlob;
var thisKMZ;

function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
var urlRegex = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;

function convertlink(text) {
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + geturl(url) + '</a>';
    })

}

function geturl(url){
    if (url.length > 20){
        return url.substr(0,20) + "...";
    } else {
        return url;
    }
}
$("#featureModal").modal({ duration: 0 });

// Check for mobile devices, set body class accordingly
function resize() {
    var clientWidth = $(window).width(),
        clientHeight = $(window).height(),
        buttonOffset = (clientHeight - 52),
        mobile = 1025;
    if (clientWidth < mobile) {
        // is mobile
        $('body').addClass('mobile');
    } else {
        $('body').addClass('desktop');
    }
    $('#featureModal').height(clientHeight - 100);
    $('.toolbar').height(clientHeight);
    $('.tabmenu-body').height(buttonOffset);

}
resize();

$(window).resize(function () {
    resize();
});

var _xml = {
    _str2xml : function(strXML) {
        if (window.ActiveXObject) {
            var doc=new ActiveXObject('Microsoft.XMLDOM');
            doc.async='false';
            doc.loadXML(strXML);
        } else {  // code for Mozilla, Firefox, Opera, etc.
            var parser=new DOMParser();
            var doc=parser.parseFromString(strXML,'text/xml');
        }// documentElement always represents the root node
        return doc;
    },
    _xml2string : function(xmlDom){
        var strs = null;
        var doc = xmlDom.documentElement;
        if(doc.xml == undefined) {
            strs = (new XMLSerializer()).serializeToString(xmlDom);
        } else strs = doc.xml;
        return strs;
    }
};

// create map
var map = L.map('map', { 
    center: [40, -100],
    zoom: 3,
    minZoom: 3,
    worldCopyJump: true,
    inertia: false
});    
map.options.crs = L.CRS.EPSG3857;     

// L.esri.basemapLayer("ImageryLabels").addTo(map);

// var baseMapUrl = new L.BingLayer('AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw', {type: 'AerialWithLabels'}).addTo(map);

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    zIndex: 1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

/*
var src = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    zIndex : 2,
    attribution: 'Copyright:© 2013 ESRI, i-cubed, GeoEye',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);
*/

// Set web root url
var homeURL = window.location.protocol + "//" + window.location.host + "/mobile/";
var proxyURL = 'http://climateviewer.com/netj1/proxy';  // production

var activeLayers = {};
var layerEnabled = {}; // whether the label is in some way enabled
var me = Self();

nobjectsIn(layers, function (x) {
    //console.log(x);
}, function (s, p, o) {
    me.addEdge(s, p, o);
});


// GET URL
function getURLParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function loading(layerId) {
    $('.' + layerId + '-load').removeClass('play').addClass('spinner loading active');
}
function loaded(layerId) {
    $('.' + layerId + '-load').removeClass('spinner loading').addClass('check');
}
function loadError(layerId, geoDataSrc, error) {
  console.log('loading ' + layerId + ' failed: ' + error);
  var target = $('#' + layerId);
  $('<div class="ui card layer-sliders" style="display:block"><div class="content"><div class="ui divided list"><div class="item"><i class="circular inverted warning icon"></i><div class="content"><div class="header">Load Failed</div>Please use <a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly due to ( ' + error + ' ), please look into it.  Sent from http://climateviewer.com/mobile/">this link</a> to report this error.<br><br><strong>ERROR:</strong> ' + error + '</div></div></div></div>').appendTo(target);
    var icon = $('.' + layerId + '-load');
    var span = $('#' + layerId + ' span');
    icon.removeClass('spinner loading').addClass('close fail');
    span.removeClass('active').addClass('fail');
}

function NSlider(opt) {
    var src = opt.src;
    var mod = opt.mod;
    opt = opt || { };

    if (!opt.element) opt.element = $('<div class="item slider"></div>');
    if (!opt.min) opt.min = 0;
    if (!opt.max) opt.max = 1;
    if (!opt.start) opt.start = 1;
    if (!opt.label) opt.label = '';

    $('<div class="label">' + opt.label + '</div>').appendTo(opt.element);
    var slider = $('<input class="' + opt.label + '" type="range">').appendTo(opt.element);
    var begin = (opt.start/opt.max)*100;
    
    slider.attr('min', 0);
    slider.attr('max', 100);
    slider.attr('step', 1);
    slider.attr('value', begin);

    slider.on("change", function() {
        var newValue = slider.val();
        var percent = (newValue/100).toFixed( 2 );
        var sum = (opt.max * percent);

          if (opt.label == 'opacity') src.setOpacity(sum);
          //if (opt.label == 'contrast') src.contrast = sum;
          //if (opt.label == 'saturation') src.saturation = sum;
          //if (opt.label == 'brightness') src.brightness = sum;
          //if (opt.label == 'gamma') src.gamma = sum;
    });

    return opt.element;
}

function loadSliders(src, layerId, datePicker) {
    var target = $('#' + layerId);
    var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').appendTo(target);
    var sPanel = $('<div class="ui card ' + layerId + '-sliders layer-sliders" />').appendTo(target);
    var content = $('<div class="content" />').appendTo(sPanel);
    var list = $('<div class="ui divided list" />').appendTo(content); 

    NSlider({ 'label': 'opacity', 'src': src }).appendTo(list);
    //NSlider({ 'max': 2, 'label': 'brightness', 'src': src }).appendTo(list);
    //NSlider({ 'max': 2, 'label': 'contrast', 'src': src }).appendTo(list);
    //NSlider({ 'max': 2, 'label': 'saturation', 'src': src }).appendTo(list);
    //NSlider({ 'max': 2, 'label': 'gamma', 'src': src }).appendTo(list);

    //src.alpha = 1;
    //src.brightness = 1;
    //src.contrast = 1;
    //src.saturation = 1;
    //src.gamma = 1;

    var details = $('.' + layerId + '-details');
    if (datePicker) {
      var dpicker = $('.' + layerId + '-picker');
      if (details.is(':visible')) { label.show(); sPanel.show(); dpicker.show(); }
    } else {
      if (details.is(':visible')) { label.show(); sPanel.show(); }
    }
    loaded(layerId);
}

function updateGIBS(layerId, selectedDate, format) {
    var template;
    if (format == 'png') { 
        template = "//map1{s}.vis.earthdata.nasa.gov/wmts-webmerc/" + "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png";
    } else {
        template = "//map1{s}.vis.earthdata.nasa.gov/wmts-webmerc/" + "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";
    }

    if (activeLayers[layerId]) removeImagery(layerId);
    var assetLayerGroup = new L.LayerGroup();

    var src = L.tileLayer(template, {
        layer: layerId,
        tileMatrixSet: "GoogleMapsCompatible_Level9",
        maxZoom: 9,
        time: selectedDate,
        tileSize: 256,
        subdomains: "abc",
        noWrap: true,
        continuousWorld: true,
        // Prevent Leaflet from retrieving non-existent tiles on the
        // borders.
        bounds: [
            [-85.0511287776, -179.999999975],
            [85.0511287776, 179.999999975]
        ],
        attribution:
            "<a href='https://wiki.earthdata.nasa.gov/display/GIBS'>" +
            "NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;" +
            "<a href='https://github.com/nasa-gibs/web-examples/blob/release/examples/leaflet/webmercator-epsg3857.js'>" +
            "View Source" +
            "</a>"
    });

    assetLayerGroup.addLayer(src);
    assetLayerGroup.addTo(map);
    activeLayers[layerId] = assetLayerGroup;
    $('.' + layerId + '-sliders').remove();
    loadSliders(src, layerId);
}

/*
Date.prototype.getJulian = function() {
    return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
}

var today = new Date(); //set any date
console.log(today);
var julian = today.getJulian(); //get Julian counterpart 
console.log(julian);

*/
    var today = new Date();
    var yesterday = today.setDate(today.getDate() - 1);



function loadGIBS(layerId, format) {
    var target = $('#' + layerId);
    $('<div class="ui card ' + layerId + '-picker layer-sliders"><div class="content"><div class="ui divided list"><div class="item '+ layerId + '-info"><i class="circular inverted clock icon"></i><div class="content"><div class="header">Imagery Date</div>Click this button below to change the loaded image:<br><input type="button" value="" class="datepicker ui orange basic button" id="'+ layerId + '-datepicker" name="date"></div></div></div></div>').appendTo(target);


    Date.prototype.getJulian = function() {
        return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
    };

    //var yesterday = Cesium.JulianDate.fromDate(date);
    //var time = Cesium.JulianDate.toDate(yesterday);
    //var time = yesterday.getJulian();

    var $input = $( '#'+ layerId + '-datepicker' ).pickadate({
    formatSubmit: 'yyyy-mm-dd',
    min: [2012, 4, 8],
    max: today.getJulian(),
    container: '#datepicker-container',
    // editable: true,
    closeOnSelect: true,
    closeOnClear: false
    });

    var picker = $input.pickadate('picker');
    picker.set('select', yesterday);
    picker.on({
    set: function() {
      var selectedDate = picker.get('select', 'yyyy-mm-dd');
      updateGIBS(layerId, selectedDate);
    }
    });
    var start = picker.get('select', 'yyyy-mm-dd');
    updateGIBS(layerId, start, format);
}

function loadWmts(layerId, geoDataSrc, geoLayers) {
    var assetLayerGroup = new L.LayerGroup();
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url : geoDataSrc,
        layers : geoLayers,
        style: "",
        format: "image/png",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    }));
    assetLayerGroup.addLayer(src);
    assetLayerGroup.addTo(map);
    activeLayers[layerId] = assetLayerGroup;
    loadSliders(src, layerId);
}


function loadWms(layerId, geoDataSrc, geoLayers) {
    var assetLayerGroup = new L.LayerGroup();
    var src = L.tileLayer.wms(geoDataSrc, {
        layers: geoLayers,
        format: 'image/png',
        transparent: true
        // TODO attribution: "Weather data © 2012 IEM Nexrad"
    }).setZIndex("200");
    assetLayerGroup.addLayer(src);
    assetLayerGroup.addTo(map);
    activeLayers[layerId] = assetLayerGroup;
    loadSliders(src, layerId);
}

function loadOsmLayer(layerId, geoDataSrc) {
    var baseLayerGroup = new L.LayerGroup();
    var src = L.tileLayer(geoDataSrc + '{z}/{x}/{y}.png', {
        zIndex : 2,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    baseLayerGroup.addLayer(src);
    baseLayerGroup.addTo(map);
    activeLayers[layerId] = baseLayerGroup;
    loadSliders(src, layerId);
}
function loadBingLayer(layerId, geoDataSrc) {
    var baseLayerGroup = new L.LayerGroup();
    var src, bingKey = 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw';
    if (geoDataSrc == 'AERIAL') {
        src = new L.BingLayer(bingKey, {type: 'Aerial'});
    } else if (geoDataSrc == 'AERIAL_WITH_LABELS') {
        src = new L.BingLayer(bingKey, {type: 'AerialWithLabels'});
    } else {
        src = new L.BingLayer(bingKey, {type: 'Road'});
    }
    baseLayerGroup.addLayer(src);
    baseLayerGroup.addTo(map);
    activeLayers[layerId] = baseLayerGroup;
    loadSliders(src, layerId);
}



function loadArcGisLayer(layerId, geoDataSrc, geoLayers) {
    var baseLayerGroup = new L.LayerGroup();
    var src = L.esri.dynamicMapLayer({
        url: geoDataSrc,
        layers: [geoLayers],
        //from: new Date(startTimeInput.value),
        //to: new Date(endTimeInput.value)
        opacity: 1,
        useCors: false
      });
    
    // TODO
    // http://esri.github.io/esri-leaflet/examples/customizing-popups.html
    src.bindPopup(function (error, featureCollection) {

            var feature = featureCollection.features[0];
            
            if (feature) console.log(feature.properties);

            var title, content;

            content = $('<p />');
            title = '<h3>Details</h3>';

            if (error || featureCollection.features.length === 0) {

              return false;

            } /* else {
                if (feature.properties.HAZARD_NAME) content.append(feature.properties.HAZARD_NAME + '<br>');
                if (feature.properties.TYPE) content.append('Hazard Type: ' + feature.properties.TYPE + '<br>');
                if (feature.properties['START_DATE']) content.append('Start Date:' + feature.properties["START_DATE"] + '<br>');
                if (feature.properties['END_DATE']) content.append('End Date:' + feature.properties["END_DATE"] + '<br>');

                if (feature.properties.MAGNITUDE) content.append('<h3>USGS Earthquake Alert</h3>Magnitude: ' + feature.properties.MAGNITUDE + '<br>');
                if (feature.properties.DEPTH) content.append('Depth: ' + feature.properties.DEPTH + 'km<br>');
                if (feature.properties.referencedate) content.append('Start Time: ' + feature.properties.referencedate + '<br>');
                if (feature.properties.todate) content.append('End Time: ' + feature.properties.todate + '<br>');
                if (feature.properties.UTC_START) content.append('Issued: ' + feature.properties.UTC_START + '<br>');
                if (feature.properties.UTC_END) content.append('Expires: ' + feature.properties.UTC_END + '<br>');
                if (feature.properties['Smoke mcgm per m3']) content.append('Smoke mcgm per m3: ' + feature.properties['Smoke mcgm per m3'] + '<br>');
                if (feature.properties['EVENT']) content.append(feature.properties["EVENT"] + ' in ' + feature.properties["AREA_DESC"]);
                if (feature.properties.CERTAINTY) content.append('Certainty: ' + feature.properties.CERTAINTY + '<br>');
                if (feature.properties.SEVERITY) content.append('Severity: ' + feature.properties.SEVERITY + '<br>');
                if (feature.properties.INC_DESC) content.append(feature.properties.INC_DESC + '<br>');
                if (feature.properties.INC_LINK) content.append('Link: <a href="' + feature.properties.INC_LINK + '" target="_blank">' + feature.properties.INC_LINK + '</a><br>');
                if (feature.properties.UTC_ISSUE) content.append('Issued: ' + feature.properties.UTC_ISSUE + '<br>');
                if (feature.properties.UTC_EXPIRE) content.append('Expires: ' + feature.properties.UTC_EXPIRE + '<br>');
                if (feature.properties.WFILE) content.append('Link: <a href="' + feature.properties.WFILE + '" target="_blank">' + feature.properties.WFILE + '</a><br>');
                if (feature.properties.prod_type) content.append('Warning: ' + feature.properties.prod_type + '<br>');
                if (feature.properties.starttime) content.append('Start Time: ' + feature.properties.starttime + '<br>');
                if (feature.properties.endtime) content.append('End Time: ' + feature.properties.endtime + '<br>');
                if (feature.properties.UTC_DATETIME) content.append('Time: ' + feature.properties.UTC_DATETIME + '<br>');
                if (feature.properties.HAIL_SIZE) content.append('Hail Size: ' + feature.properties.HAIL_SIZE + ' &rdquo;<br>');
                if (feature.properties.SPEED) content.append('Wind Speed: ' + feature.properties.SPEED + '<br>');
                if (feature.properties["LOCATION"]) content.append('Location: ' + feature.properties["LOCATION"] + ', ');
                if (feature.properties["COUNTY"]) content.append(feature.properties["COUNTY"] + ', ');
                if (feature.properties["STATE"]) content.append(feature.properties["STATE"] + '<br>');
                if (feature.properties['COMMENTS']) content.append('Details: ' + feature.properties['COMMENTS'] + '<br>');
                if (feature.properties["Station Identification"]) content.append('Station ID: ' + feature.properties["Station Identification"] + '<br>');
                if (feature.properties["Station Name"]) content.append(', ' + feature.properties["Station Name"] + '<br>');
                if (feature.properties["Country Name"]) content.append(', ' + feature.properties["Country Name"] + '<br>');
                if (feature.properties["Observation Date/Time"]) content.append('Observation Time: ' + feature.properties["Observation Date/Time"] + '<br>');
                if (feature.properties["Station Elevation (Meters)"]) content.append('Observation Elevation: ' + feature.properties["Station Elevation (Meters)"] + ' meters elevation.<br>');
                if (feature.properties["Wind Speed (km/h)"]) content.append('Wind Speed: ' + feature.properties["Wind Speed (km/h)"] + ' km/h<br>');
                if (feature.properties["Wind Gust (km/h)"]) content.append('Wind Gust: ' + feature.properties["Wind Gust (km/h)"] + ' km/h<br>');
                if (feature.properties["Air Temperature (°F)"]) content.append('Air Temperature: ' + feature.properties["Air Temperature (°F)"] + ' °F<br>');
                if (feature.properties["Dew Point Temperature (°F)"]) content.append('Dew Point Temperature: ' + feature.properties["Dew Point Temperature (°F)"] + ' °F<br>');
                if (feature.properties["Relative Humidity (%)"]) content.append('Relative Humidity: ' + feature.properties["Relative Humidity (%)"] + ' %<br>');
                if (feature.properties["Altimeter Pressure (Millibars)"]) content.append('Altimeter Pressure: ' + feature.properties["Altimeter Pressure (Millibars)"] + ' Millibars<br>');
                if (feature.properties["Horizontal Visibility (Meters)"]) content.append('Horizontal Visibility: ' + feature.properties["Horizontal Visibility (Meters)"] + ' meters.<br>');
                if (feature.properties["Sky Conditions"]) content.append('Sky Conditions: ' + feature.properties["Sky Conditions"] + '<br>');
                if (feature.properties["Remarks"]) content.append('Remarks: ' + feature.properties["Remarks"] + '<br>');
                if (feature.properties["Weather Conditions"]) content.append('Weather Conditions: ' + feature.properties["Weather Conditions"] + '<br>');
                if (feature.properties['Brightness T31']) content.append('Time: ' + feature.properties['Acquisition date'] + '<br>Brightness: ' + feature.properties.Brightness + '<br>Brightness T31: ' + feature.properties['Brightness T31'] + '<br>Confidence: ' + feature.properties.Confidence + '%<br>');
                if (feature.properties.stormtype) { 
                    if (feature.properties.stormtype == 'HU') { 
                        content.append('Type: Hurricane<br>');
                    } else {
                        content.append('Type: ' + feature.properties.stormtype + '<br>');
                    }
                }
                if (feature.properties.STORMTYPE) { 
                    if (feature.properties.STORMTYPE == 'HU') { 
                        content.append('Type: Hurricane<br>');
                    } else {
                        content.append('Type: ' + feature.properties.stormtype + '<br>');
                    }
                }
                if (feature.properties.TCDVLP) content.append(feature.properties.TCDVLP + '<br>');
                if (feature.properties.STORMNAME) content.append(feature.properties.STORMNAME + '<br>');
                if (feature.properties.stormname) content.append(feature.properties.stormname + '<br>');
                if (feature.properties.FLDATELBL) content.append('Time: ' + feature.properties.FLDATELBL + '<br>');
                if (feature.properties.GUST) content.append('Gusts: ' + feature.properties.GUST + ' Kts<br>');
                if (feature.properties.MAXWIND) content.append('Max Wind Speed: ' + feature.properties.MAXWIND + ' Kts<br>');
                if (feature.properties.fldatelbl) content.append('Time: ' + feature.properties.fldatelbl + '<br>');
                if (feature.properties.gust) content.append('Gusts: ' + feature.properties.gust + ' Kts<br>');
                if (feature.properties.maxwind) content.append('Max Wind Speed: ' + feature.properties.maxwind + ' Kts<br>');
                if (feature.properties.url) content.append('Link: <a href="' + feature.properties.url + '" target="_blank">' + feature.properties.url + '</a><br>');
                if (feature.properties.URL) content.append('Link: <a href="' + feature.properties.URL + '" target="_blank">' + feature.properties.URL + '</a><br>');
                if (feature.properties["SNC_URL"]) content.append('Link: <a href="' + feature.properties["SNC_URL"] + '" target="_blank">' + feature.properties["SNC_URL"] + '</a><br>');
            } */
        var fContent;
        fContent = $("#feature-content");

        $("#feature-header").html(title);
        fContent.html(content);

        var table = $('<table class="ui selectable inverted table"></table>').appendTo(fContent);
        $('<thead><tr><th>Key</th><th>Value</th></tr></thead>').appendTo(table);
        var tbody = $('<tbody></tbody>').appendTo(table);

        $.map(feature.properties, function(index, value) {
            $('<tr><td>' + value + '</td><td>' + (isUrlValid(index) ? '<a href="' + index + '" target="_blank">' + index + '</a>' : index) + '</td></tr>').appendTo(tbody);
        });

        $("#featureModal").modal("show").modal({
            onHidden: function() {
              $('.null').remove();
            }
        });

      }); // end bind popup

    baseLayerGroup.addLayer(src);
    baseLayerGroup.addTo(map);
    activeLayers[layerId] = baseLayerGroup;
    loadSliders(src, layerId);
}
function loadArcGisBasemap(layerId, geoDataSrc) {
    var baseLayerGroup = new L.LayerGroup();
    var src = L.tileLayer(geoDataSrc + '/tile/{z}/{y}/{x}', {
        zIndex : 2,
        attribution: 'Copyright:© 2013 ESRI, i-cubed, GeoEye',
        subdomains: 'abcd',
        maxZoom: 19
    });
    baseLayerGroup.addLayer(src);
    baseLayerGroup.addTo(map);
    activeLayers[layerId] = baseLayerGroup;
    loadSliders(src, layerId);
}

function loadKml(layerId, geoDataSrc, proxy, zoom, markerScale, markerLabel, markerColor, markerMod) {
    var assetLayerGroup = new L.LayerGroup();
    var proxyKml = (proxyURL + "?" + geoDataSrc);
    var loadUrl;
    if (proxy) { 
        loadUrl = proxyKml;
        //console.log('loading ' + proxyKml);
    } else {
        loadUrl = geoDataSrc;
        //console.log('loading ' + geoDataSrc);
    }
    var src;
    if (loadUrl.indexOf(".kmz") >= 0 || loadUrl.indexOf("MapServer") >= 0) {
        console.log('kmz');
        src = new L.KMZ(loadUrl, {
            imageOverlayBoundingBoxCreatePopUp: true, 
            imageOverlayBoundingBoxDrawOptions: {   
                stroke: true,
                weight: 2,
                fillOpacity: 0.05,
                clickable: true
            } 
        },'KMZ');
    } else {
        console.log('kml');
        src = new L.KML(loadUrl, {async: true});
    }
    src.on('loaded', function(data) {
        $(data.features).each(function(key, data) {
            //map.removeLayer(src);
            L.KML(data, {
                onEachFeature: function (feature, layer) {
                    if (feature.properties) {

                        var title, details;

                        if (feature.properties.title) {
                            title = '<h3>' + feature.properties.title + '</h3>';
                        } else if (feature.properties.Name) {
                            title = '<h3>' + feature.properties.Name + '</h3>';
                        } else if (feature.properties.name) {
                            title = '<h3>' + feature.properties.name + '</h3>';
                        } else if (feature.properties.LICENSEE) {
                            title = '<h3>' + feature.properties.LICENSEE + '</h3>';
                        } else {
                            title = '';
                        }

                        if (feature.properties.mag) {
                            details = '<div>Place: ' + feature.properties.place + '<br>Magnitude: ' + feature.properties.mag + '<br><a href="' + feature.properties.url + '">Click here for more info.</a></div>';
                        } else if (feature.properties.Description) {
                            details = '<div>' + feature.properties.Description + '</div>';
                        } else if (feature.properties.description) {
                            details = '<div>' + feature.properties.description + '</div>';
                        } else if (feature.properties.desc) {
                            details = '<div>' + feature.properties.desc + '</div>';
                        } else if (feature.properties.FREQUENCY) {
                            details = '<div>FREQUENCY: ' + feature.properties.FREQUENCY + '<br>CALLSIGN: ' + feature.properties.CALLSIGN + '<br>SERVICE: ' + feature.properties.SERVICE + '<br></div>';
                        } else {
                            details = '';
                        }

                        convertlink(details);

                        layer.on({
                            click: function (e) {
                                e.preventDefault;
                                $("#feature-header").html(title);
                                $("#feature-content").html(details);
                                $("#featureModal").modal("show");
                                resize();
                            }
                        });
                    }

                    //console.log(feature.properties)
                }
            });
        });
        assetLayerGroup.addLayer(src);
        assetLayerGroup.addTo(map);
        activeLayers[layerId] = assetLayerGroup;
        loaded(layerId);
        if (zoom) map.fitBounds(src.getBounds());
    });

}

function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, markerColor, zoom, proxy) {
    var assetLayerGroup = new L.LayerGroup();
    var proxyKml = (proxyURL + "?" + geoDataSrc);
    var loadUrl;
    if (proxy) { 
        loadUrl = proxyKml;
        console.log('loading ' + proxyKml);
    } else {
        loadUrl = geoDataSrc;
        console.log('loading ' + geoDataSrc);
    }
    var promise = $.getJSON(loadUrl); 
    // map.removeLayer(layerId);
    promise.then(function(data) {     //do a bunch of stuff here     

    $(data.features).each(function(key, data) {
      //map.removeLayer(src);
      var src = L.geoJson(data, {
            pointToLayer: function(feature, latlng) {
                var mImg = L.icon({
                    iconUrl: markerImg,
                    iconRetinaUrl: markerImg,
                    iconSize: [64,64],
                });
                //return new L.CircleMarker(latlng, {radius: 5, fillOpacity: 0.85});
                return L.marker(latlng, {
                    icon: mImg
                });
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {

                var title, details;

                if (feature.properties.title) {
                    title = '<h3>' + feature.properties.title + '</h3>';
                } else if (feature.properties.Name) {
                    title = '<h3>' + feature.properties.Name + '</h3>';
                } else if (feature.properties.name) {
                    title = '<h3>' + feature.properties.name + '</h3>';
                } else if (feature.properties.LICENSEE) {
                    title = '<h3>' + feature.properties.LICENSEE + '</h3>';
                } else {
                    title = '';
                }

                if (feature.properties.mag) {
                    details = '<div>Place: ' + feature.properties.place + '<br>Magnitude: ' + feature.properties.mag + '<br><a href="' + feature.properties.url + '">Click here for more info.</a></div>';
                } else if (feature.properties.Description) {
                    details = '<div>' + feature.properties.Description + '</div>';
                } else if (feature.properties.description) {
                    details = '<div>' + feature.properties.description + '</div>';
                } else if (feature.properties.desc) {
                    details = '<div>' + feature.properties.desc + '</div>';
                } else if (feature.properties.FREQUENCY) {
                    details = '<div>FREQUENCY: ' + feature.properties.FREQUENCY + '<br>CALLSIGN: ' + feature.properties.CALLSIGN + '<br>SERVICE: ' + feature.properties.SERVICE + '<br></div>';
                } else {
                    details = '';
                }
                  layer.on({
                    click: function (e) {
                        e.preventDefault;
                        $("#feature-header").html(title);
                        $("#feature-content").html(details);
                        $("#featureModal").modal("show");
                        resize();
                    }
                  });
                }

                //console.log(feature.properties)
            }
        });


        assetLayerGroup.addLayer(src);
        assetLayerGroup.addTo(map);
        activeLayers[layerId] = assetLayerGroup;
        loaded(layerId);
        //if (zoom) map.fitBounds(src.getBounds());
    });
  }, function (error) {
        loadError(layerId, geoDataSrc, error);
    });
};

function removeImagery(layerId) {
    var src = activeLayers[layerId];
    map.removeLayer(src);
    delete activeLayers[layerId];
}

// REMOVE LAYERS
function disableLayer(l) {

    var layerId = l.I;
    var mlt = l.T;

    if (layerEnabled[l.I] === undefined) return;

    // Update Globe
    if (mlt === ("nasa-gibs") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer") || mlt === ("arcgis") || mlt === ("arcgis-layer") ) {
        //removeImagery(layerId);
        $('.' + layerId + '-sliders').remove();
        $('.' + layerId + '-picker').remove();
        var src = activeLayers[layerId];
        map.removeLayer(src);
        delete activeLayers[layerId];

    } else {
        var src = activeLayers[layerId];
        map.removeLayer(src);
        delete activeLayers[layerId];
    }

    delete layerEnabled[layerId];
}

// LOAD LAYERS
function updateLayer(layerId) {
    loading(layerId);
    var l = me.node(layerId);
    if (!l) {
        console.error('missing layer', layerId);
        //return false;
    }
    var geoDataSrc = l.G,
    geoLayers = l.L,
    //source = l.S,
    zoom = l.Z,
    format = l.F,
    markerMod = l.M,
    markerImg = l.MI,
    markerScale = l.MS,
    markerLabel = l.ML,
    markerColor = l.MC,
    proxy = l.P;

    if (layerEnabled[layerId] === undefined) {
        //put it in a temporary state to disallow loading while loading
        layerEnabled[layerId] = false;
        // Load layers by Type
        if (l.T === ("wms")) {
            loadWms(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("wtms")) {
            loadGIBS(layerId);
        } else if (l.T === ("nasa-gibs")) {
            loadGIBS(layerId, format);
        } else if (l.T === ("wtms")) {
            loadWmts(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("base-layer")) {
           loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("arcgis")) {
           loadArcGisBasemap(layerId, geoDataSrc);
        } else if (l.T === ("arcgis-layer")) {
           loadArcGisLayer(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, markerColor, zoom);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod);
        } else if (l.T === ('bing')) {
            loadBingLayer(layerId, geoDataSrc, geoLayers);
        } else {
            console.log(layerId + ' failed to load map type: ' + l.T);
        }
        shareLink();
        // if (timeline) toggleTimeline(true);
    }
}

function newFolderLabel(l, child, ic) {
      if (ic) {
          var icon = '<i class="' + ic + ' icon"></i>'
      } else {
          icon = ''
      }
    var menuToggle = $('<h2>').addClass('toggle').html(icon + l.N).click(function () {
        if (child.is(':visible')) {
            child.hide();
            menuToggle.removeClass('active');
        }
        else {
            child.show();
            menuToggle.addClass('active');
        }
    });
    return menuToggle;
}

function initDetails(layerId, layerType, details, source, sourceUrl, geoDataSrc) {
    var contentWrap = $('<div class="content ' + layerId + '-content" />').appendTo(details);
    //$('<div class="header main"><i class="folder open outline info icon"></i>Details</div>').appendTo(content); 
    var list = $('<div class="ui divided very relaxed list ' + layerId + '-list" />').appendTo(contentWrap);
    $('<div class="item"><i class="circular inverted info icon"></i><div class="content"><div class="header">Layer Details</div>' + source + ' &bull; <a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></div></div>').appendTo(list);
    if (layerType == ('kml')) {
      $('<div class="item"><i class="circular inverted download icon"></i><div class="content"><div class="header">Data Source</div>Keyhole Markup Language (KML) &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
    }
    if (layerType == ('geojson')) {
      $('<div class="item"><i class="circular inverted download icon"></i><div class="content"><div class="header">Data Source</div>GeoJSON &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
    }
    if (layerType == ('nasa-gibs')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>Web Map Tile Service (WMTS)</div>').appendTo(list);
    }
    if (layerType == ('wms')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>Web Mapping Service (WMS)<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '?request=GetCapabilities&service=WMS">Get Capabilities</a></div>').appendTo(list);
    }
    if (layerType == ('base-layer')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>OpenStreetMap (OSM) Base Map</div>').appendTo(list);
    }
    if (layerType == ('arcgis') || layerType == ('arcgis-layer')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>ArcGIS MapServer<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '">MapServer Information</a></div>').appendTo(list);
    }
    $('<div class="extra content"><a href="' + homeURL + 'index.html?layersOn=' + layerId + '" class="right floated created" target="_self">Share Link</a><a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly, please look into it. Sent from http://climateviewer.com/mobile/">Report Error</a></div>').appendTo(details);

      //shareLink();
  }

function addTree(parent/* nodes  */, lb /*target */, includeOnly) {
    var layers = me.successors(parent);
    _.each(layers, function (l) {
        var l = me.node(l),
        content,
        layerId = l.I,
        layerType = l.T,
        largeLayer = l.H;
;

        var child = $('<div class="folder" />').html(l);
        if (!layerType & !l.TRD) {
            if (!largeLayer) {
            var ic = l.icon;
            //Folder Label
            content = newFolderLabel(l, child, ic);
            }
        } else { // not a folder
            var present = true;
            if (includeOnly) {
                if (includeOnly.indexOf(l.I) === -1)
                    present = false;
            }

            if (present & !largeLayer & !l.TRD) {
                var geoDataSrc = l.G,
                source = l.S,
                sourceUrl = l.U,
                newLayer = l.NL,
                timeline = l.C,
                layerButton, details, loadIcon, optIcon, label;

                content = $('<div>').data('l', l).attr('id', l.I).addClass('lbw').addClass(l.T); //layer button wrapper
                layerButton = $('<div>').addClass('lb').appendTo(content); // layer button
                        //expand layer options
                optIcon = $('<i>').addClass('folder icon').toggle(
                  function () { 
                        if (details.children().length == 0) {
                            initDetails(layerId, layerType, details, source, sourceUrl, geoDataSrc);
                        }
                        details.show();
                        details.focus();
                        optIcon.addClass('open outline active');
                        $('.' + l.I + '-sliders').show();
                        $('.' + l.I + '-picker').show();
                  },
                  function () { 
                        $('.' + l.I + '-sliders').hide();
                        $('.' + l.I + '-picker').hide();
                        details.hide();
                        optIcon.removeClass('open outline active');
                  }
                ).appendTo(layerButton); 
                loadIcon = $('<i class="play icon ' + layerId + '-load"></i>')
                if (largeLayer) loadIcon.addClass('large-layer');
                if (newLayer) loadIcon.addClass('new-layer');

                loadIcon.toggle(
                  function () {
                      setTimeout(function() {
                        if (loadIcon.hasClass('play')) {
                          updateLayer(layerId);
                          if (details.is(':visible')) $('.' + l.I + '-picker').show();
                          if (!label.hasClass('active')) label.addClass('active');
                          if (!content.hasClass('active')) content.addClass('active');
                          //if (timeline) toggleTimeline(true);
                        }
                      });
                  },
                  function () {
                      setTimeout(function() {
                        if (loadIcon.hasClass('check')) {
                          disableLayer(l);
                          loadIcon.removeClass('check active').addClass('play');
                          $('.' + l.I + '-picker').hide();
                          if (label.hasClass('active')) label.removeClass('active');
                          if (content.hasClass('active')) content.removeClass('active');
                        }
                      });
                  }
                ).appendTo(layerButton);

                label = $('<span>').html(l.N).addClass('label');
                label.toggle(
                  function () { 
                    if (!label.hasClass('fail')) {
                      if (!label.hasClass('active')) 
                        label.addClass('active'); 
                      loadIcon.trigger('click');  
                    }
                  },
                  function () { 
                    if (!label.hasClass('fail')) {
                      if (label.hasClass('active')) 
                        label.removeClass('active'); 
                      loadIcon.trigger('click'); 
                    }
                  }
                ).appendTo(layerButton);

                details = $('<div class="ui card ' + layerId + '-details layer-details" />').appendTo(content);
                details.hide(); //begin hidden
            } // end present
        }

        if (content != null) {
            lb.append(content);

            var ll = addTree(l.I, child, includeOnly);
            if (ll.length) {
                lb.append(child);
            }
        }

    });
    return layers;
}

/* Build Sidebar */
function initLayers(includeOnly) {
    var lb = $('#map-layers');

    lb.addClass('ui');

    _.each(me.sources(), function (s) {
        addTree(s, lb, includeOnly);
    });
}


// CHECK URL

var initialLayers = (getURLParameter("layersOn") || '').split(',');
var disabledLayers = (getURLParameter("layersOff") || '').split(",");
if (initialLayers[0] === '') initialLayers = [];
if (disabledLayers[0] === '') disabledLayers = [];
var allLayers = initialLayers.concat(disabledLayers);
// LOAD LAYERS
if (allLayers.length > 0) {
    // LOAD LAYERS FROM URL
    initLayers();
    var shared = $('<div class="folder" style="display: block;"></div>').prependTo('#map-layers');
    $('<h2 class="toggle active">Shared Layers</h2>').prependTo('#map-layers').show();
    for (var i = 0; i < allLayers.length; i++) {
        $('#' + allLayers[i]).detach().appendTo(shared).show();
    }
    for (var i = 0; i < initialLayers.length; i++) {
        $('.' + initialLayers[i] + '-load').click();
    }
    $('div.folder:empty').prev().remove();
    $('div.folder:empty').remove();
} else {
    initLayers();
}

function shareLink() {
    var layers = "";
    var url = homeURL;
    var ll = $('.lbw');

    ll.each(function() {
        var X = $(this);
        if (X.hasClass('active')) {
            var L = X.attr('id');
            layers += L + ',';
        }
    });

    url += 'index.html?';

    if (layers.length > 0)
        layers = layers.substring(0, layers.length-1);

    url += 'layersOn=' + layers;

    var shareToggle = $('.share-all-layers');
    shareToggle.attr('href', url).html(url);
}

// Init tabs
$('.tab .menu .item').tab({
    context: $('.tab')
  });

// SOCIAL PANEL
$('.share-tab').one('click', function () {
    // load comments
    $('#comments').html("<div id='disqus_thread'></div><script type='text/javascript'> var disqus_shortname = 'climateviewer3d';var disqus_url = 'http://climateviewer.com/mobile/'; (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();</script>").addClass('panel-comments');
    // load shareThis
    $('#share').addClass('panel-share');
    $('head').append('<script type="text/javascript">var switchTo5x=true;</script><script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script><script type="text/javascript">stLight.options({publisher: "919e0e68-8cf4-433f-b1ac-049584a0a9f5", doNotHash: true, doNotCopy: true, hashAddressBar: false});</script>');
});
$('.chat-title').one("click", function () {
    $('#chat').html('<iframe src="http://tlk.io/cvnews" class="container-fluid chat-iframe" style="height:600px"></iframe>');
    $('.chat-title').html('<i class="comments outline icon"></i>Happy Chatting');
});

$('.report-tab').click(function () {
    var clientWidth = $(window).width(),
        clientHeight = $(window).height();
    if (clientWidth < 1024) {
        window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + clientHeight + ',width=' + clientWidth + '');return false;
    } else {
        window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');return false;
    }
});


// LAYER FOOTER BUTTONS
$('.clear-layers').click(function (e) {
    e.preventDefault();
 $('i.active').trigger('click');
});

$('.collapse').click(function () {
 $('.folder h2.active').trigger('click');
 $('h2.active').trigger('click');
});

$('.share-active-layers').click( function(){
  shareLink();
  $('#shareModal').modal('show');
});

$('.top-layers').click(function () {
  $('.tabmenu-body').animate({
      scrollTop: ($('#top').offset().top - 90)
  }, 500);
});

// SIDEBAR CONTROL & MAIN SCREEN BUTTONS
$('.reset-view').click(function () {
 map.setView([40, -100], 3);            

});

var rightSidebar = $('.toolbar');
var controls = $('.cv-toolbar');

$('.show-menu').click(function () {
 rightSidebar.show();
 controls.hide();
 $('#map').one('click', function () {
   rightSidebar.hide();
   controls.show();
  });
});

$('.close-menu').click(function () {
 rightSidebar.hide();
 controls.show();
});

// Clear welcome modal content box (for video embeds)
function baleeted() { 
  $('#Greetz').remove();
}

$('.do-video').one("click", function() {
	$('.do-video-div').append('<div class="videoWrapper"><iframe width="420" height="236" src="https://www.youtube-nocookie.com/embed/Gxqqsy4Gvqs" frameborder="0" allowfullscreen></iframe></div>');
});

function welcome() {
  $('#Greetz').modal('show').modal( { 
    onHidden: function() { 
      setTimeout(baleeted, 1000) 
    },
    onShow: function() { 
      resize(); 
    }  
  });
  $('.cv-controlbar').show();
}

// Modal FAQ
$('.ui.accordion').accordion({duration: 0, animateChildren: false});
// Modal Share (left button)
$('.share-modal').on('click', function () {
  $('#Greetz').modal('hide');
  $('.show-menu').trigger('click');
  $('.share-tab').trigger('click');
});
$('.menu-modal').on('click', function () {
  $('#Greetz').modal('hide');
  $('.show-menu').trigger('click');
});
// Modal Close (right button)
$('.close-greetz').click(function () {
  $('#Greetz').modal('hide');
});


setTimeout(welcome, 500);
