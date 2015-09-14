"use strict";

// Set web root url
var homeURL = window.location.protocol + "//" + window.location.host + "/";  // production
var proxyURL = 'http://climateviewer.net/netj1/proxy';  // production
//var proxyURL = 'http://localhost:8080/proxy';  // local
//var proxyURL = 'kmz.php';  // dev

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
  $('<div class="ui card layer-sliders" style="display:block"><div class="content"><div class="ui divided list"><div class="item"><i class="circular inverted warning icon"></i><div class="content"><div class="header">Load Failed</div>Please use <a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly due to ( ' + error + ' ), please look into it.  Sent from http://climateviewer.net/">this link</a> to report this error.<br><br><strong>ERROR:</strong> ' + error + '</div></div></div></div>').appendTo(target);
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
    //var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').appendTo(target);
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
      if (details.is(':visible')) { sPanel.show(); dpicker.show(); }
    } else {
      if (details.is(':visible')) { sPanel.show(); }
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

function loadGIBS(layerId, format) {
    var target = $('#' + layerId);
    $('<div class="ui card ' + layerId + '-picker layer-sliders"><div class="content"><div class="ui divided list"><div class="item '+ layerId + '-info"><i class="circular inverted clock icon"></i><div class="content"><div class="header">Imagery Date</div>Click this button below to change the loaded image:<br><input type="button" value="" class="datepicker ui orange basic button" id="'+ layerId + '-datepicker" name="date"></div></div></div></div>').appendTo(target);

    var date = new Date();
    var yesterday = date.setDate(date.getDate() - 1);

    Date.prototype.getJulian = function() {
        return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
    }

    //var yesterday = Cesium.JulianDate.fromDate(date);
    //var time = Cesium.JulianDate.toDate(yesterday);
    //var time = yesterday.getJulian();

    var $input = $( '#'+ layerId + '-datepicker' ).pickadate({
    formatSubmit: 'yyyy-mm-dd',
    min: [2012, 4, 8],
    max: date.getJulian(),
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
        transparent: true,
        //attribution: "Weather data © 2012 IEM Nexrad"
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
function loadArcGisLayer(layerId, geoDataSrc) {
    var baseLayerGroup = new L.LayerGroup();
    var src = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/' + geoDataSrc + '/MapServer/tile/{z}/{y}/{x}', {
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

function loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod) {
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
    /*
    var src = omnivore.kml(loadUrl)
    .on('ready', function() {
        //console.log('KML loaded!');
        assetLayerGroup.addLayer(src);
        assetLayerGroup.addTo(map);
        activeLayers[layerId] = assetLayerGroup;
        loaded(layerId);
        //if (zoom) map.fitBounds(assetLayerGroup.getBounds());
        src.eachLayer(function(layer) {
            // See the `.bindPopup` documentation for full details. This
            // dataset has a property called `name`: your dataset might not,
            // so inspect it and customize to taste.
            layer.bindPopup('<h3>' + layer.feature.properties.name + '</h3><br><div class="popup-content">' + layer.feature.properties.description + '</div>');
        });
    })
    .on('error', function(error) {
        loadError(layerId, geoDataSrc, error);
    });
    */

    var src = new L.KMZ(loadUrl, {   
        imageOverlayBoundingBoxCreatePopUp: true, 
        imageOverlayBoundingBoxDrawOptions: {   
            stroke: true,
            weight: 2,
            fillOpacity: 0.05,
            clickable: true
        } 
    },'KMZ');
    
    src.on('loaded', function(e) { 
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

                layer.bindPopup(title + '<br>' + details);
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
    if (mlt === ("nasa-gibs") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer")) {
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
    timeline = l.C,
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
           loadArcGisLayer(layerId, geoDataSrc);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, markerColor, zoom);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod);
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
    $('<div class="item"><i class="circular inverted info icon"></i><div class="content"><div class="header">Data Provider</div>' + source + '</div></div>').appendTo(list); 
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
    $('<div class="extra content"><a href="' + homeURL + 'index.html?layersOn=' + layerId + '" class="right floated created" target="_self">Share Layer</a><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></div>').appendTo(details);

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
        if (!layerType) {
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

            if (present & !largeLayer) {
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
                          if (timeline) toggleTimeline(true);
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
    initLayers(allLayers);
    for (var i = 0; i < initialLayers.length; i++) {
      $('.' + initialLayers[i] + '-load').click(); 
      console.log(initialLayers[i]);
      //$('#' + initialLayers[i]).trigger('click');
    }
    $('div.folder:empty').remove();
    $('div.folder').show();
    $('h2.toggle').hide();

    $('<a class="button" href="' + homeURL + '" style="display:block;text-align:center;padding:20px 0;" target="_self"><i class="home icon"></i> SHOW ALL LAYERS</a>').appendTo('#layers');
} else {
    initLayers();
}

function shareLink() {
    var layers = "";
    var disabledLayers = "";
    var url = homeURL;
    if (allLayers.length > 0) {
        for (var i = 0; i < allLayers.length; i++) {
            var a = allLayers[i];
            if (!($('#' + a).hasClass('active'))) {
                disabledLayers += a + ',';
            }
            else {
                layers += a + ',';
            }
        }
    }
    else {
        //only enable those that are enabled and ignore the disabled ones
        var ll = $('.lbw');
        ll.each(function () {
            if ($(this).hasClass('active')) {
                var L = $(this).attr('id');
                layers += L + ',';
            }
        });
    }

    url += 'index.html?';

    if (layers.length > 0)
        layers = layers.substring(0, layers.length - 1);
    url += 'layersOn=' + layers;

    if (disabledLayers.length > 0) {
        disabledLayers = disabledLayers.substring(0, disabledLayers.length - 1);
        url += '&layersOff=' + disabledLayers;
    }
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
    $('#comments').html("<div id='disqus_thread'></div><script type='text/javascript'> var disqus_shortname = 'climateviewer3d';var disqus_url = 'http://climateviewer.net/'; (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();</script>").addClass('panel-comments');
    // load shareThis
    $('#share').addClass('panel-share');
    $('head').append('<script type="text/javascript">var switchTo5x=true;</script><script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script><script type="text/javascript">stLight.options({publisher: "919e0e68-8cf4-433f-b1ac-049584a0a9f5", doNotHash: true, doNotCopy: true, hashAddressBar: false});</script>');
});
$('.chat-title').one("click", function () {
    $('#chat').html('<iframe src="http://tlk.io/cvnews" class="container-fluid chat-iframe" style="height:600px"></iframe>');
    $('.chat-title').html('<i class="comments outline icon"></i>Happy Chatting');
});

$('.3d-tab').one('click', function () {
    window.location = homeURL + 'globe/';
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
