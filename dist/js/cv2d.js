"use strict";
zip.workerScriptsPath = '/lib/zip/';
var oneBlob;
var thisKMZ;

function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
var urlRegex = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;

function geturl(url) {
    if (url.length > 20) {
        return url.substr(0, 20) + "...";
    } else {
        return url;
    }
}

function convertlink(text) {
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + geturl(url) + '</a>';
    });
}

$.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);

  if (this.length) {
    callback.call(this, args);
  }
  return this;
};


// Check for mobile devices, set body class accordingly
function resize() {
    var clientHeight = $(window).height(),
        clientWidth = $(window).width(),
        mobile = 767,
        tiny = 481;
    $('.control-sidebar').height(clientHeight - 50);
    $('.main-sidebar').height(clientHeight - 100);
    $('.tab-content').height(clientHeight - 100);
    $('html').height(clientHeight);
    $('body').height(clientHeight);
    $('.content-wrapper').height(clientHeight - 50);
    $('#map').height(clientHeight - 50).width(clientWidth);

    if (clientWidth < mobile) {
        $('#siderbar-toggle i').removeClass('fa-chevron-left').addClass('fa-chevron-right');
        $('.control-sidebar').removeClass('control-sidebar-open');
    }
}

$(window).resize(function () {
    resize();
});


var _xml = {
    _str2xml: function (strXML) {
        if (window.ActiveXObject) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(strXML);
        } else { // code for Mozilla, Firefox, Opera, etc.
            var parser = new DOMParser();
            var doc = parser.parseFromString(strXML, 'text/xml');
        } // documentElement always represents the root node
        return doc;
    },
    _xml2string: function (xmlDom) {
        var strs = null;
        var doc = xmlDom.documentElement;
        if (doc.xml == undefined) {
            strs = (new XMLSerializer()).serializeToString(xmlDom);
        } else strs = doc.xml;
        return strs;
    }
};

var map = L.map('map', {
    center: [30, 0],
    zoom: 3,
    minZoom: 2,
    worldCopyJump: true,
    inertia: false,
});
map.options.crs = L.CRS.EPSG3857;

new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.OpenStreetMap()
}).addTo(map);

// Set web root url
var homeURL = window.location.protocol + "//" + window.location.host + "/mobile/";
var shareURL = "http://climateviewer.org/mobile/"; // production
var proxyURL = '/proxy.php';  // production

var activeLayers = {};
var layerEnabled = {}; // whether the label is in some way enabled
var me = Self();

nobjectsIn(layers, function (x) {
    //console.log(x);
}, function (s, p, o) {
    me.addEdge(s, p, o);
});

var today = new Date();
var yesterday = today.setDate(today.getDate() - 1);

Date.prototype.getJulian = function () {
    return Math.floor((this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5);
};

var date = new Date();
date.setDate(date.getDate() - 1);

var $input = $('#datepicker').pickadate({
    format: 'mmmm d, yyyy',
    formatSubmit: 'yyyy-mm-dd',
    min: [2012, 4, 8],
    max: today,
    container: '#datepicker-container',
    // editable: true,
    closeOnSelect: true,
    closeOnClear: false,
    selectYears: true,
    selectMonths: true
});

var picker = $input.pickadate('picker');
picker.set('select', yesterday);
picker.on({
    set: function () {
        var selectedDate = picker.get('select', 'yyyy-mm-dd');
        $('.nasa-gibs.active').each(function () {
            loadGIBS($(this).attr('id'), selectedDate);
        });
    }
});
var start = picker.get('select', 'yyyy-mm-dd');

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
    var target = $('#' + layerId);
    $('<div class="ui card layer-sliders" style="display:block"><div class="content"><div class="ui divided list"><div class="item"><i class="circular inverted warning icon"></i><div class="content"><div class="header">Load Failed</div>Please use <a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly due to ( ' + error + ' ), please look into it.  Sent from http://climateviewer.com/mobile/" target="_blank">this link</a> to report this error.<br><br><strong>ERROR:</strong> ' + error + '</div></div></div></div>').appendTo(target);
    var icon = $('.' + layerId + '-load');
    var span = $('#' + layerId + ' span');
    icon.removeClass('spinner loading').addClass('close fail');
    span.removeClass('active').addClass('fail');
}

function NSlider(opt) {
    var src = opt.src;
    var mod = opt.mod;
    opt = opt || {};

    if (!opt.element) opt.element = $('<div class="item slider"></div>');
    if (!opt.min) opt.min = 0;
    if (!opt.max) opt.max = 1;
    if (!opt.start) opt.start = 1;
    if (!opt.label) opt.label = '';

    $('<div class="label">' + opt.label + '</div>').appendTo(opt.element);
    var slider = $('<input class="' + opt.label + '" type="range">').appendTo(opt.element);
    var begin = (opt.start / opt.max) * 100;

    slider.attr('min', 0);
    slider.attr('max', 100);
    slider.attr('step', 1);
    slider.attr('value', begin);

    slider.on("change", function () {
        var newValue = slider.val();
        var percent = (newValue / 100).toFixed(2);
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
    var target = $('#' + layerId + ' .lb');
    var sPanel = $('<div class="details ' + layerId + '-sliders layer-sliders" />').insertAfter(target);
    var content = $('<div class="slider-content" />').appendTo(sPanel);
    var list = $('<div class="ui divided list" />').appendTo(content);

    NSlider({
        'label': 'opacity',
        'src': src
    }).appendTo(list);
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
        if (details.is(':visible')) {
            sPanel.show();
            dpicker.show();
        }
    } else {
        if (details.is(':visible')) {
            sPanel.show();
        }
    }
    loaded(layerId);
}

function loadGIBS(layerId, selectedDate) {
    var template = "//map1{s}.vis.earthdata.nasa.gov/wmts-webmerc/" + "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";

    if (activeLayers[layerId]) removeImagery(layerId);
    var assetLayerGroup = new L.LayerGroup();

    var src = L.tileLayer(template, {
        layer: layerId,
        tileMatrixSet: "GoogleMapsCompatible_Level9",
        maxZoom: 9,
        time: selectedDate,
        //tileSize: 256,
        //subdomains: "abc",
        //noWrap: true,
        //continuousWorld: true,
        // Prevent Leaflet from retrieving non-existent tiles on the
        // borders.
        bounds: [
            [-85.0511287776, -179.999999975],
            [85.0511287776, 179.999999975]
        ],
        attribution: "<a href='https://wiki.earthdata.nasa.gov/display/GIBS' target='_blank'>" +
            "NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;" +
            "<a href='https://github.com/nasa-gibs/web-examples/blob/release/examples/leaflet/webmercator-epsg3857.js' target='_blank'>" +
            "View Source" +
            "</a>"
    });

    assetLayerGroup.addLayer(src);
    assetLayerGroup.addTo(map);
    activeLayers[layerId] = assetLayerGroup;
    $('.' + layerId + '-sliders').remove();
    loadSliders(src, layerId);
}

function loadWmts(layerId, geoDataSrc, geoLayers) {
    var assetLayerGroup = new L.LayerGroup();
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: geoDataSrc,
        layers: geoLayers,
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
        zIndex: 2,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions" target="_blank">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    baseLayerGroup.addLayer(src);
    baseLayerGroup.addTo(map);
    activeLayers[layerId] = baseLayerGroup;
    loadSliders(src, layerId);
}

function loadCartoDB(layerId, geoDataSrc) {
    var baseLayerGroup = new L.LayerGroup();
    var src = L.tileLayer(geoDataSrc, {
        zIndex: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
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
        src = new L.BingLayer(bingKey, {
            type: 'Aerial'
        });
    } else if (geoDataSrc == 'AERIAL_WITH_LABELS') {
        src = new L.BingLayer(bingKey, {
            type: 'AerialWithLabels'
        });
    } else {
        src = new L.BingLayer(bingKey, {
            type: 'Road'
        });
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

        //if (feature) console.log(feature.properties);

        var title, content;

        content = $('<p />');
        title = '<h3>Details</h3>';

        if (error || featureCollection.features.length === 0) {

            return false;

        }
        /* else {
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
        var fContent = $("#feature-content");
        var featureDetails = $('<p/>').appendTo(fContent);

        $.map(feature.properties, function (index, value) {
            $('<strong>' + value + '</strong>&nbsp;&bull;&nbsp;<span>' + (isUrlValid(index) ? '<a href="' + index + '" target="_blank">' + index + '</a>' : index) + '</span><br>').appendTo(featureDetails);
        });

        $("#featureModal").modal("show").modal({
            onHidden: function () {
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
        zIndex: 2,
        attribution: 'Copyright:© 2013 ESRI, i-cubed, GeoEye',
        subdomains: 'abcd',
        maxZoom: 19
    });
    baseLayerGroup.addLayer(src);
    baseLayerGroup.addTo(map);
    activeLayers[layerId] = baseLayerGroup;
    loadSliders(src, layerId);
}

function loadKml(layerId, geoDataSrc, proxy, zoom) {
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
        //console.log('kmz');
        src = new L.KMZ(loadUrl, {
            imageOverlayBoundingBoxCreatePopUp: true,
            imageOverlayBoundingBoxDrawOptions: {
                stroke: true,
                weight: 2,
                fillOpacity: 0.05,
                clickable: true
            }
        }, 'KMZ');
    } else {
        //console.log('kml');
        src = new L.KML(loadUrl, {
            async: true
        });
    }
    src.on('loaded', function (data) {
        $(data.features).each(function (key, data) {
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
                            details = '<div>Place: ' + feature.properties.place + '<br>Magnitude: ' + feature.properties.mag + '<br><a href="' + feature.properties.url + '" target="_blank">Click here for more info.</a></div>';
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
                                var fContent = $("#feature-content");
                                fContent.html('<h3>' + title + '</h3>');
                                fContent.append(details);

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
        if (zoom) {
            if (zoom === true) {
                map.fitBounds(src.getBounds());
            } else {
                map.setView(new L.LatLng(40, -100), 3);
            }
        }
    });

}

function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList) {
    var assetLayerGroup = new L.LayerGroup();
    var loadUrl = geoDataSrc;
    if (noList === false) {
        var layerTarget = $('.' + layerId + '-details');
        var markerList = $('<div class="details ' + layerId + '-list marker-list" />').insertAfter(layerTarget);
        var items = [];
    }

    var promise = $.getJSON(loadUrl);
    // map.removeLayer(layerId);
    promise.then(function (data) { //do a bunch of stuff here

        $(data.features).each(function (key, data) {
            //map.removeLayer(src);


            var src = L.geoJson(data, {
                pointToLayer: function (feature, latlng) {
                    var mImg = L.icon({
                        iconUrl: markerImg,
                        iconRetinaUrl: markerImg,
                        iconSize: [32, 32],
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
                            details = '<div>Place: ' + feature.properties.place + '<br>Magnitude: ' + feature.properties.mag + '<br><a href="' + feature.properties.url + '" target="_blank">Click here for more info.</a></div>';
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
                        if (noList === false) {
                            var latlon = data.geometry.coordinates;
                            // console.log(latlon);
                            var lon = latlon[0];
                            var lat = latlon[1];
                            //var lon = _.initial(latlon);
                            //var lat = _.last(latlon);
                            //console.log(lon + " - " + lat);
                            items.push('<li data-lon="' + lon + '"  data-lat="' + lat + '">' + title + '</li>');
                        }

                        layer.on({
                            click: function (e) {
                                e.preventDefault;
                                var fContent = $("#feature-content");
                                fContent.html('<h3>' + title + '</h3>');
                                fContent.append(details);

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
        });

        if (noList === false) {
            $('<ol/>', {
                'class': 'markers',
                html: items.join('')
            }).appendTo(markerList);
            $('.markers li').click(function () {
                var lon = $(this).attr('data-lon');
                var lat = $(this).attr('data-lat');
                map.setView(new L.LatLng(lat, lon), 15);
            });
        }

        /* if (zoom) {
         if (zoom === true) {
         map.fitBounds(src.getBounds());
         } else {
         map.setView([40, -100], 3);
         }
         } */
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
    if (mlt === ("nasa-gibs") || mlt === ("cartodb-layer") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer") || mlt === ("arcgis") || mlt === ("arcgis-layer") || mlt === ("arcgis-base-layer")) {
        //removeImagery(layerId);
        $('.' + layerId + '-sliders').remove();
        var src = activeLayers[layerId];
        map.removeLayer(src);
        delete activeLayers[layerId];
    } else {
        var src = activeLayers[layerId];
        map.removeLayer(src);
        delete activeLayers[layerId];
    }
    if (mlt === ("geojson") || mlt === ("kml")) {
        $('.' + layerId + '-tree').removeClass('active');
        $('.' + layerId + '-list').remove();
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
        markerMod = l.M,
        markerImg = l.MI,
        markerScale = l.MS,
        markerLabel = l.ML,
        noList = l.Y,
        proxy = l.P;
    var selectedDate = picker.get('select', 'yyyy-mm-dd');
    if (!includeOnly) var zoom = l.Z;

    if (noList) {
        noList = true;
    } else {
        noList = false;
    }

    if (layerEnabled[layerId] === undefined) {
        //put it in a temporary state to disallow loading while loading
        layerEnabled[layerId] = false;
        // Load layers by Type
        if (l.T === ("wms")) {
            loadWms(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("wtms")) {
            loadGIBS(layerId);
        } else if (l.T === ("nasa-gibs")) {
            loadGIBS(layerId, selectedDate);
        } else if (l.T === ("wtms")) {
            loadWmts(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("cartodb-layer")) {
            loadCartoDB(layerId, geoDataSrc);
        } else if (l.T === ("base-layer")) {
            loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("arcgis") || l.T === ("arcgis-base-layer")) {
            loadArcGisBasemap(layerId, geoDataSrc);
        } else if (l.T === ("arcgis-layer")) {
            loadArcGisLayer(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod);
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
        var icon = '<i class="fa fa-fw ' + ic + '"></i>'
    } else {
        icon = ''
    }
    var menuToggle = $('<h2>').addClass('toggle').html(icon + l.N).click(function () {
        if (child.is(':visible')) {
            child.hide();
            menuToggle.removeClass('active');
        } else {
            child.show();
            menuToggle.addClass('active');
        }
    });
    return menuToggle;
}


function initDetails(layerId, layerType, details, source, sourceUrl, geoDataSrc) {
    var list = $('<div class="details ' + layerId + '-content" />').appendTo(details);
    $('<div class="header"><i class="fa fa-fw fa-info-circle"></i> Layer Details</div><span>' + source + ' &bull; <a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></span>').appendTo(list);
    if (layerType == ('kml')) {
        $('<div class="header"><i class="fa fa-fw fa-download"></i> Data Source</div><span>Keyhole Markup Language (KML) &bull; <a href="' + geoDataSrc + '">Download</a></span>').appendTo(list);
    }
    if (layerType == ('geojson')) {
        $('<div class="header"><i class="fa fa-fw fa-download"></i> Data Source</div><span>GeoJSON &bull; <a href="' + geoDataSrc + '">Download</a></span>').appendTo(list);
    }
    if (layerType == ('nasa-gibs')) {
        $('<div class="header"><i class="fa fa-fw fa-file-o"></i> Data Source</div><span>Web Map Tile Service (WMTS)</span>').appendTo(list);
    }
    if (layerType == ('wms')) {
        $('<div class="header"><i class="fa fa-fw fa-file-o"></i> Data Source</div><span>Web Mapping Service (WMS)<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '?request=GetCapabilities&service=WMS">Get Capabilities</a></span>').appendTo(list);
    }
    if (layerType == ('base-layer')) {
        $('<div class="header"><i class="fa fa-fw fa-file-o"></i> Data Source</div><span>OpenStreetMap (OSM) Base Map</span>').appendTo(list);
    }
    if (layerType == ('arcgis') || layerType == ('arcgis-layer')) {
        $('<div class="header"><i class="fa fa-fw fa-file-o"></i> Data Source</div><span>ArcGIS MapServer<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '/legend">Map Legend</a> &bull; <a target="_blank" rel="nofollow" href="' + geoDataSrc + '">MapServer Information</a></span>>').appendTo(list);
    }
    $('<div class="header"><i class="fa fa-share-square-o fa-fw"></i> Share This Layer</div><span>Use this url to share this layer: <a href="' + homeURL + 'index.html?layersOn=' + layerId + '" target="_self">Share Link</a><span><div class="header"><i class="fa fa-exclamation-triangle fa-fw"></i> Report Error</div><span>If you are experiencing problems loading this layer, or you would like to suggest corrections, comments, or concerns, please email me using this link: <a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly, please look into it. Sent from http://climateviewer.com/3D/" target="_self">Report Error</a></span>').appendTo(list);

}

function addTree(parent /* nodes  */ , lb /*target */ , includeOnly) {
    var layers = me.successors(parent);
    _.each(layers, function (l) {
        var h = me.node(l),
            content,
            layerId = h.I,
            layerType = h.T;

        var child = $('<div class="folder" />').html(h);
        if (!h.T) {
            var ic = h.icon;
            //Folder Label
            content = newFolderLabel(h, child, ic);
        } else { // not a folder
            var present = true;
            if (present) {
                var geoDataSrc = h.G,
                    source = h.S,
                    sourceUrl = h.U,
                    largeLayer = h.H,
                    newLayer = h.NL,
                    timeline = h.C,
                    layerButton, details, loadIcon, optIcon, treeIcon, sliderIcon, label;

                content = $('<div>').data('l', h).attr('id', h.I).addClass('lbw').addClass(h.T); //layer button wrapper
                layerButton = $('<div>').addClass('lb').appendTo(content); // layer button
                //expand layer options
                optIcon = $('<i>').addClass('fa fa-fw fa-folder-o').toggle(
                    function () {
                        if (details.children().length == 0) {
                            initDetails(layerId, layerType, details, source, sourceUrl, geoDataSrc);
                        }
                        details.show();
                        details.focus();
                        optIcon.removeClass('fa-folder-o').addClass('fa-folder-open-o active');
                        $('.' + h.I + '-sliders').show();
                        $('.' + h.I + '-picker').show();
                    },
                    function () {
                        $('.' + h.I + '-sliders').hide();
                        $('.' + h.I + '-picker').hide();
                        details.hide();
                        optIcon.removeClass('fa-folder-open-o active').addClass('fa-folder-o');
                    }
                ).appendTo(layerButton);
                loadIcon = $('<i class="fa fa-fw fa-play ' + layerId + '-load"></i>');
                if (largeLayer) loadIcon.addClass('large-layer');
                if (newLayer) loadIcon.addClass('new-layer');


                if (h.T === ('geojson')) {
                    treeIcon = $('<i title="Expand Marker Tree" class="fa fa-fw fa-sitemap toggle-list ' + layerId + '-tree"></i>');
                    treeIcon.click(function () {
                        setTimeout(function () {
                            if ($('.' + layerId + '-list').is(":visible")) {
                                $('.' + layerId + '-list').hide();
                                treeIcon.removeClass('active');
                            } else {
                                $('.' + layerId + '-list').show();
                                treeIcon.addClass('active');
                            }
                        });
                    }).appendTo(layerButton);
                }

                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis") || h.T === ("arcgis-layer") || h.T === ("bing")) {
                    sliderIcon = $('<i title="Expand Marker Tree" class="fa fa-fw fa-sliders toggle-list ' + layerId + '-tree"></i>');
                    sliderIcon.click(function () {
                        setTimeout(function () {
                            if ($('.' + layerId + '-sliders').is(":visible")) {
                                $('.' + layerId + '-sliders').hide();
                                sliderIcon.removeClass('show-sliders');
                            } else {
                                $('.' + layerId + '-sliders').show();
                                sliderIcon.addClass('show-sliders');
                            }
                        });
                    }).appendTo(layerButton);
                }

                loadIcon.toggle(
                    function () {
                        setTimeout(function () {
                            if (loadIcon.hasClass('fa-play')) {
                                if (includeOnly) {
                                    updateLayer(layerId, includeOnly);
                                } else {
                                    updateLayer(layerId);
                                }
                                if (!label.hasClass('active')) label.addClass('active');
                                content.addClass('active');
                                if (timeline) toggleTimeline(true);
                                if (h.T === ('geojson')) treeIcon.show();
                                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis") || h.T === ("arcgis-layer") || h.T === ("bing")) {
                                    sliderIcon.show();
                                }
                            }
                        });
                    },
                    function () {
                        setTimeout(function () {
                            if (loadIcon.hasClass('check')) {
                                disableLayer(h);
                                loadIcon.removeClass('check active').addClass('play');
                                if (label.hasClass('active')) label.removeClass('active');
                                content.removeClass('active');
                                if (h.T === ('geojson')) treeIcon.hide();
                                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis") || h.T === ("arcgis-layer") || h.T === ("bing")) {
                                    sliderIcon.hide();
                                    sliderIcon.removeClass('show-sliders');
                                }
                            }
                        });
                    }
                ).appendTo(layerButton);

                label = $('<span>').html(h.N).addClass('label');
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

            var ll = addTree(h.I, child, includeOnly);
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

    if (includeOnly) {
        _.each(me.sources(), function (s) {
            addTree(s, lb, includeOnly);
        });
    } else {
        _.each(me.sources(), function (s) {
            addTree(s, lb);
        });
    }
}

$('.do-video').one("click", function () {
    $('.do-video-div').append('<div class="videoWrapper"><iframe width="420" height="236" src="https://www.youtube-nocookie.com/embed/ZwFmez0ef6A" frameborder="0" allowfullscreen></iframe></div>');
});




// CHECK URL

var initialLayers = (getURLParameter("layersOn") || '').split(',');
var initialBaseLayers = (getURLParameter("baseLayers") || '').split(',');
var disabledLayers = (getURLParameter("layersOff") || '').split(",");
if (initialLayers[0] === '') initialLayers = [];
if (disabledLayers[0] === '') disabledLayers = [];
var allLayers = initialLayers.concat(disabledLayers);
var baseLayers = initialBaseLayers.concat();

// LOAD LAYERS
if (allLayers.length > 0) {
    var latView = (getURLParameter("lat") || '40');
    var lonView = (getURLParameter("lon") || '-100');
    var zoomView = (getURLParameter("zoom") || '5');
    var dateView = (getURLParameter("date") || start);

    if (dateView !== start) {
        picker.set('select', dateView, {
            format: 'yyyy-mm-dd'
        })
    }
    if (latView !== '40') {
        var includeOnly = true;
        initLayers(includeOnly);
        map.setView(new L.LatLng(latView, lonView), zoomView);
    } else {
        initLayers();
    }

    var shared = $('<div class="folder" style="display: block;"></div>').prependTo('#map-layers');
    $('<h2 class="toggle active">Shared Layers</h2>').prependTo('#map-layers').show();

    // Base Layer
    if (baseLayers.length > 0) {
        for (var i = 0; i < baseLayers.length; i++) {
            //$('#' + baseLayers[i]).detach().appendTo(shared);
            $('.' + initialBaseLayers[i] + '-load').click();
        }
    }
    
    // Load Layers
    for (var i = 0; i < allLayers.length; i++) {
        $('#' + allLayers[i]).detach().appendTo(shared).show();
    }
    for (var i = 0; i < initialLayers.length; i++) {
        $('.' + initialLayers[i] + '-load').click();
    }

} else {
    initLayers();
}

function shareLink() {
    var layers = "",
        baseLayers = "",
        shareLink = shareURL;

    $('.geojson.active, .kml.active, .arcgis.active, .wms.active, .wtms.active, .nasa-gibs.active').each(function () {
        var X = $(this);
        if (X.hasClass('active')) {
            var L = X.attr('id');
            layers += L + ',';
        }
    });

    $('.cartodb-layer.active, .bing.active, .arcgis-base-layer.active, .base-layer.active').each(function () {
        var X = $(this);
        if (X.hasClass('active')) {
            var L = X.attr('id');
            baseLayers += L + ',';
        }
    });


    var lat = map.getCenter().lat;
    var lon = map.getCenter().lng;
    var zoom = map.getZoom();
    var date = picker.get('select', 'yyyy-mm-dd');

    shareLink += 'index.html?';

    if (layers.length > 0)
        layers = layers.substring(0, layers.length - 1);

    if (baseLayers.length > 0)
        baseLayers = baseLayers.substring(0, baseLayers.length - 1);

    shareLink += 'layersOn=' + layers;
    shareLink += '&baseLayers=' + baseLayers;
    shareLink += '&lat=' + lat;
    shareLink += '&lon=' + lon;
    shareLink += '&zoom=' + zoom;
    shareLink += '&date=' + date;


    var shareToggle = $('.share-all-layers');
    shareToggle.attr('href', shareLink).html(shareLink);

    var encodeLink = encodeURIComponent(shareLink);

    function bit_url(shareLink) {
        var url = shareLink;
        var username = "r3zn8d"; // bit.ly username
        var key = "b5c2d6d1704074b0741a7449a98e3fcef2790699";
        $.ajax({
            url: "https://api-ssl.bitly.com/v3/shorten",
            data: {
                longUrl: url,
                access_token: key,
                login: username
            },
            dataType: "jsonp",
            success: function (v) {
                var bit_url = v.data.url;
                $("#result").html('<a href="' + bit_url + '" target="_self">' + bit_url + '</a>');
            }
        });
    }
    bit_url(shareLink);
}



$(document).ready(function () {
    $('#CV-TV').one('click', function () {
        $('#load-youtube').html('<div class="videoWrapper"><iframe width="560" height="315" src="http://www.youtube.com/embed/videoseries?list=UUxi8wqtADZckzLvWqkW5Kvg" frameborder="0" allowfullscreen=""></iframe></div>');
        $('#load-twitter').html('<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/rezn8d" data-widget-id="426353335990353920">Tweets by @rezn8d</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');
    });

    $('.clear-layers').click(function (e) {
        e.preventDefault();
        $('i.active').trigger('click');
        $('.Bing_AERIAL_WITH_LABELS-load').click();
    });
    
    $('.share-active-layers').click(function (e) {
        e.preventDefault();
        shareLink();
        $('#shareModal').modal();
    });

    $('.about-jim').click(function () {
        window.location = 'http://climateviewer.com/rezn8d/';
    });

    $('.reset-view').click(function (e) {
        e.preventDefault();
        map.setView([40, -100], 3);
    });

    $('.sharing-tab').click(function () {
        $('#welcomeModal').modal('hide').on('hidden.bs.modal', function () {
            $('a[href="#control-sidebar-share-tab"]').tab('show');
            $('#sharing-tab').click();
        });
    });
    $('.instructions').click(function () {
        $('#welcomeModal').modal('hide').on('hidden.bs.modal', function () {
            $('a[href="#control-sidebar-about-tab"]').tab('show');
            $('#CV-about').click();
        });
    });

    $('.report-tab').click(function (e) {
        e.preventDefault();
        var clientWidth = $(window).width(),
            clientHeight = $(window).height();
        if (clientWidth < 1024) {
            window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + clientHeight + ',width=' + clientWidth + '');
            return false;
        } else {
            window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');
            return false;
        }
    });
    
    $('.collapse-menu').on('click', function (e) {
        e.preventDefault();
        $('.fa-sitemap.active').trigger('click');
        $('.fa-folder-open-o.active').trigger('click');
        $('.folder h2.active').trigger('click');
        $('h2.active').trigger('click');
    });

    $('.top-layers').click(function (e) {
        e.preventDefault();
        $('.tab-content').animate({
            scrollTop: ($('#top').offset().top - 90)
        }, 500);
    });

    if ($(".resources-intro")) {
        var clientHeight = $(window).height();
        $('.resources-intro').height(clientHeight);
    }

    $('#map').click(function () {
        if ($('.control-sidebar').hasClass('control-sidebar-open')) {
            $('#siderbar-toggle').click();
        }
    });
    
    $('#welcomeModal').modal();
    
    $('#active-layers-toggle').toggle(
        function () {
            $('.lbw.active').each(function () {
              var layerId = $(this).prop('id');
              $('<span id="' + layerId + '-holder" style="display: none;" />').insertAfter($(this));
              $(this).detach().appendTo('#active-layers');
            });
            $(this).html('Show All Layers');
            $('.active-layers-label').show();
            $('#active-layers').show();
            $('.all-layers-label').hide();
            $('#map-layers').hide();
        },
        function () { 
            $('#active-layers .lbw.active').each(function () {
               var layerId = $(this).prop('id');
               $(this).detach().insertBefore($('#' + layerId + '-holder'));
               $('#' + layerId + '-holder').remove();
            });
            $(this).html('Show Active Layers');
            $('.active-layers-label').hide();
            $('#active-layers').hide();
            $('.all-layers-label').show();
            $('#map-layers').show();
        }
    );
    
    if ($('.control-sidebar').hasClass('control-sidebar-open')) {
        $('#siderbar-toggle').addClass('active');
    }
    
    $('.leaflet-control-geosearch input').detach().addClass('form-control').attr({
        "aria-describedby": "search",
        "id": "search-input"
    }).prependTo($('.search form'));
    
    // LOAD DEFAULT BASE LAYER IF NO SHARED BASE LAYER
    if(!$('.cartodb-layer.active, .bing.active, .arcgis-base-layer.active, .base-layer.active').length > 0) {
          $('.Bing_AERIAL_WITH_LABELS-load').click();
    }

    $('.content-wrapper').show();
    
    resize();

});