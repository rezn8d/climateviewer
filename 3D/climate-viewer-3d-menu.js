"use strict";

// Set web root url
var homeURL = window.location.protocol + "//" + window.location.host + "/";  // production
var baseURL = window.location.protocol + "//" + window.location.host + "/3D/";  // production
var proxyURL = 'http://climateviewer.net/netj1/proxy';  // production
//var proxyURL = 'http://localhost:8080/proxy';  // local
//var proxyURL = 'kmz.php';  // dev

var activeLayers = {};
var infoBox = $('.cesium-infoBox');
var layerEnabled = {}; // whether the label is in some way enabled
var me = Self();

var animationContainer = $('.cesium-viewer-animationContainer');
var timelineContainer = $('.cesium-viewer-timelineContainer');
var credit = $('.cesium-viewer-bottom');


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
        if (mod) {
          var entities = src.entities.values;
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var color = entity.billboard.color;
            if (mod == 'alpha') {
              entity.billboard.color = new Cesium.Color.fromAlpha(color, sum);
              console.log('markermod alpha ' + sum);
            }
          }
        } else {
          if (opt.label == 'opacity') src.alpha = sum;
          if (opt.label == 'contrast') src.contrast = sum;
          if (opt.label == 'saturation') src.saturation = sum;
          if (opt.label == 'brightness') src.brightness = sum;
          if (opt.label == 'gamma') src.gamma = sum;
        }
    });

    return opt.element;
}

function loadSliders(src, layerId) {
    var target = $('#' + layerId);
    //var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').appendTo(target);
    var sPanel = $('<div class="ui card ' + layerId + '-sliders layer-sliders" />').appendTo(target);
    var content = $('<div class="content" />').appendTo(sPanel);
    var list = $('<div class="ui divided list" />').appendTo(content); 

    NSlider({ 'label': 'opacity', 'src': src }).appendTo(list);
    NSlider({ 'max': 2, 'label': 'brightness', 'src': src }).appendTo(list);
    NSlider({ 'max': 2, 'label': 'contrast', 'src': src }).appendTo(list);
    NSlider({ 'max': 2, 'label': 'saturation', 'src': src }).appendTo(list);
    //NSlider({ 'max': 2, 'label': 'gamma', 'src': src }).appendTo(list);

    src.alpha = 1;
    src.brightness = 1;
    src.contrast = 1;
    src.saturation = 1;
    //src.gamma = 1;

    var details = $('.' + layerId + '-details');
    var dpicker = $('.' + layerId + '-picker');
    if (details.is(':visible')) { sPanel.show(); dpicker.show(); }
    loaded(layerId);
}

/*
function loadMarkerSliders(src, layerId) {
    var target = $('#' + layerId);
    var details = $('.' + layerId + '-details');
    var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').appendTo(target);
    var sPanel = $('<div class="ui card ' + layerId + '-sliders layer-sliders" />').appendTo(target);
    var content = $('<div class="content" />').appendTo(sPanel);
    var list = $('<div class="ui divided list" />').appendTo(content); 

    NSlider({ 'label': 'opacity', 'mod': 'alpha', 'src': src }).appendTo(list);

    //src.gamma = 1;
    if (details.is(':visible')) sPanel.show();
}
*/

function updateGIBS(layerId, selectedDate) {
    removeImagery(layerId);
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?TIME=" + selectedDate,
        layer: layerId,
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    }));

    activeLayers[layerId] = src;
    $('.' + layerId + '-sliders').remove();
    loadSliders(src, layerId);
}


function loadGIBS(layerId) {

  var target = $('#' + layerId);
  $('<div class="ui card ' + layerId + '-picker layer-sliders"><div class="content"><div class="ui divided list"><div class="item '+ layerId + '-info"><i class="circular inverted clock icon"></i><div class="content"><div class="header">Imagery Date</div>Click this button below to change the loaded image:<br><input type="button" value="" class="datepicker ui orange basic button" id="'+ layerId + '-datepicker" name="date"></div></div></div></div>').appendTo(target);

  var date = new Date();
  date.setDate(date.getDate() - 1);
  var yesterday = Cesium.JulianDate.fromDate(date);
  var time = Cesium.JulianDate.toDate(yesterday);

  var $input = $( '#'+ layerId + '-datepicker' ).pickadate({
    formatSubmit: 'yyyy-mm-dd',
    min: [2012, 4, 8],
    max: Cesium.JulianDate.now(),
    container: '#datepicker-container',
    // editable: true,
    closeOnSelect: true,
    closeOnClear: false
  });

  var picker = $input.pickadate('picker');
  picker.set('select', time);
  picker.on({
    set: function() {
      var selectedDate = picker.get('select', 'yyyy-mm-dd');
      updateGIBS(layerId, selectedDate);
    }
  });
  var start = picker.get('select', 'yyyy-mm-dd');
  updateGIBS(layerId, start);
}

function loadWmts(layerId, geoDataSrc, geoLayers) {
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

    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

function loadWms(layerId, geoDataSrc, geoLayers) {
    //var proxySrc = (layerId + '/');
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
        url : geoDataSrc,
        layers : geoLayers,
        proxy: new Cesium.DefaultProxy(proxyURL),
        sourceUri: geoDataSrc,
        parameters : {
            transparent : true,
            format : 'image/png'
        }
    }));

    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

function loadOsmLayer(layerId, geoDataSrc) {
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : geoDataSrc
        //credit : source
    }));
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

function loadArcGisLayer(layerId, geoDataSrc) {
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
            url: '//services.arcgisonline.com/ArcGIS/rest/services/' + geoDataSrc + '/MapServer'
        }));
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

var defaultEyeOffset = new Cesium.Cartesian3(0.0, 50.0, 50.0);
var defaultKMLEyeOffset = new Cesium.Cartesian3(0.0, 5000.0, 0.0);
var defaultScaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
var defaultTranslucency = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);

function loadError(layerId, geoDataSrc, error) {
  console.log('loading ' + layerId + ' failed: ' + error);
  var target = $('#' + layerId);
  $('<div class="ui card layer-sliders" style="display:block"><div class="content"><div class="ui divided list"><div class="item"><i class="circular inverted warning icon"></i><div class="content"><div class="header">Load Failed</div>Please use <a href="mailto:jim@climateviewer.com?subject=Climate Viewer 3D broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly due to ( ' + error + ' ), please look into it.  Sent from http://climateviewer.net/3D/">this link</a> to report this error.<br><br><strong>ERROR:</strong> ' + error + '</div></div></div></div>').appendTo(target);
    var icon = $('.' + layerId + '-load');
    var span = $('#' + layerId + ' span');
    icon.removeClass('spinner loading').addClass('close fail');
    span.removeClass('active').addClass('fail');
}

function newMarkerLabel(entity, markerLabel) {
    var label = new Cesium.LabelGraphics();
    var text;
    if (markerLabel == 'usgs-eq') {
        label.text = 'M' + entity.properties.mag;
    } else if (entity.label.text) {
        label.text = entity.label.text;
    } else {
        label.text = '';
    }
    label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
    label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
    label.outlineWidth = 5;
    label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
    label.translucencyByDistance = defaultTranslucency;
    label.eyeOffset = defaultKMLEyeOffset;
    return label;
}

function modMarkers(geoData, markerImg, markerScale, markerLabel) {
  var entities = geoData.entities.values; // entities = all points
  for (var i = 0; i < entities.length; i++) {
      var entity = entities[i]; // entities = single point
      console.log('mod geojson');
      // create marker image
      var billboard = new Cesium.BillboardGraphics();

      var image;
      if (markerImg) {
          image = markerImg;
      } else if (entity.billboard.image) {
          image = entity.billboard.image;
      } else {
          image = 'http://climateviewer.com/gallery/cv3d.png';
      }
      billboard.image = image;

      var size;
      if (markerLabel == 'usgs-eq') {
          size = entity.properties.mag;
      } else if (markerScale) {
          size = markerScale;
      } else {
          size = 2;
      }

      var title, details;

      if (entity.properties.title) {
          title = '<h3>' + entity.properties.title + '</h3>';
      } else if (entity.properties.Name) {
          title = '<h3>' + entity.properties.Name + '</h3>';
      } else if (entity.properties.name) {
          title = '<h3>' + entity.properties.name + '</h3>';
      } else if (entity.properties.LICENSEE) {
          title = '<h3>' + entity.properties.LICENSEE + '</h3>';
      } else {
          title = '';
      }

      if (entity.properties.mag) {
          details = '<div>Place: ' + entity.properties.place + '<br>Magnitude: ' + entity.properties.mag + '<br><a href="' + entity.properties.url + '">Click here for more info.</a></div>';
      } else if (entity.properties.Description) {
          details = '<div>' + entity.properties.Description + '</div>';
      } else if (entity.properties.description) {
          details = '<div>' + entity.properties.description + '</div>';
      } else if (entity.properties.desc) {
          details = '<div>' + entity.properties.desc + '</div>';
      } else if (entity.properties.FREQUENCY) {
          details = '<div>FREQUENCY: ' + entity.properties.FREQUENCY + '<br>CALLSIGN: ' + entity.properties.CALLSIGN + '<br>SERVICE: ' + entity.properties.SERVICE + '<br></div>';
      } else {
          details = '';
      }

      entity.title = title;
      entity.description = details;


      billboard.scale = size;

      billboard.width = 32;
      billboard.height = 32;
      billboard.scaleByDistance = defaultScaleByDistance;
      entity.billboard = billboard;


      // marker label
      if (markerLabel) {
          entity.label = newMarkerLabel(entity, markerLabel);
      }
  } // end for loop
}
function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom) {
    console.log('load geojson');
    new Cesium.GeoJsonDataSource.load(geoDataSrc).then(function (geoData) {
        modMarkers(geoData, markerImg, markerScale, markerLabel);
        viewer.dataSources.add(geoData);
        activeLayers[layerId] = geoData;
        // TODO loadMarkerSliders(geoData, layerId);
        if (zoom) {
            viewer.flyTo(geoData);
        }
        loaded(layerId);
    }, function (error) {
        loadError(layerId, geoDataSrc, error);
    });
}

function loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod) {
    if (proxy) {
        new Cesium.KmlDataSource.load(geoDataSrc, {
            proxy: new Cesium.DefaultProxy(proxyURL),
            sourceUri: geoDataSrc
          }).then(function (geoData) {
              if (markerMod) {
                  modMarkers(geoData, markerImg, markerScale, markerLabel);
              }
              viewer.dataSources.add(geoData); // add to map
              activeLayers[layerId] = geoData; // store for removal
              if (zoom) {
                  viewer.flyTo(geoData.entities);
              }
              loaded(layerId);
          }, function (error) {
              loadError(layerId, geoDataSrc, error);
          }
        ); // end then
    } else {
        new Cesium.KmlDataSource.load(geoDataSrc).then(function (geoData) {
            if (markerMod) {
                  modMarkers(geoData, markerImg, markerScale, markerLabel);
            } // end markerMod
            viewer.dataSources.add(geoData);
            activeLayers[layerId] = geoData;
            if (zoom) {
                viewer.flyTo(geoData.entities);
            }
              loaded(layerId);
          }, function (error) {
              loadError(layerId, geoDataSrc, error);
          }
        ); // end then
    } // end proxy
}

// REMOVE IMAGERY LAYERS (WMS, WMTS)
function removeImagery(layerId) {
    var src = activeLayers[layerId];
    delete activeLayers[layerId];
    viewer.imageryLayers.remove(src, false);
}

// REMOVE LAYERS
function disableLayer(l) {

    var layerId = l.I;
    var mlt = l.T;

    if (layerEnabled[l.I] === undefined) return;

    // Update Globe
    if (mlt === ("nasa-gibs") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer") || mlt === ("arcgis")) {
        removeImagery(layerId);
        $('.' + layerId + '-sliders').remove();
        $('.' + layerId + '-picker').remove();
    } else {
        var src = activeLayers[layerId];
        delete activeLayers[layerId];
        viewer.dataSources.remove(src);
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
    markerMod = l.M,
    markerImg = l.MI,
    markerScale = l.MS,
    markerLabel = l.ML,
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
            loadGIBS(layerId);
        } else if (l.T === ("wtms")) {
            loadWmts(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("base-layer")) {
           loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("arcgis")) {
           loadArcGisLayer(layerId, geoDataSrc);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod);
        } else {
            console.log(layerId + ' failed to load map type: ' + l.T);
        }
        shareLink();
        if (timeline) toggleTimeline(true);
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
    $('<div class="extra content"><a href="' + baseURL + 'index.html?layersOn=' + layerId + '" class="right floated created" target="_self">Share Layer</a><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></div>').appendTo(details);

      //shareLink();
  }

function addTree(parent/* nodes  */, lb /*target */, includeOnly) {
    var layers = me.successors(parent);
    _.each(layers, function (l) {
        var l = me.node(l),
        content,
        layerId = l.I,
        layerType = l.T;

        var child = $('<div class="folder" />').html(l);
        if (!l.T) {
            var ic = l.icon;
            //Folder Label
            content = newFolderLabel(l, child, ic);
        } else { // not a folder
            var present = true;
            if (includeOnly) {
                if (includeOnly.indexOf(l.I) === -1)
                    present = false;
            }
            if (present) {
                var geoDataSrc = l.G,
                source = l.S,
                sourceUrl = l.U,
                largeLayer = l.H,
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

    $('<a class="button" href="' + baseURL + '" style="display:block;text-align:center;padding:20px 0;" target="_self"><i class="home icon"></i> SHOW ALL LAYERS</a>').appendTo('#layers');
} else {
    initLayers();
}

function shareLink() {
    var layers = "";
    var disabledLayers = "";
    var url = baseURL;
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

$('.2d-tab').one('click', function () {
    window.location = homeURL;
});

// MAP MODE BUTTONS
$('.mode-3d').click(function () {
 viewer.scene.morphTo3D();
});
$('.mode-2d').click(function () {
 viewer.scene.morphTo2D();
});
$('.mode-flat-earth').click(function () {
 viewer.scene.morphToColumbusView();
});


// LAYER FOOTER BUTTONS
$('.clear-layers').click(function () {
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

// TOGGLE SUN
function showSun() { viewer.scene.globe.enableLighting = true; }
function hideSun() { viewer.scene.globe.enableLighting = false; }
$('.sun-control').toggle(
  function () { showSun(); $(this).addClass('active'); },
  function () { hideSun(); $(this).removeClass('active'); }
);

// SIDEBAR CONTROL & MAIN SCREEN BUTTONS
$('.reset-view').click(function () {
 $('.cesium-home-button').trigger('click');
});

function toggleTimeline(show) {
  if (show) {
    animationContainer.show();
    timelineContainer.show();
  } else if (animationContainer.is(":visible")) {
    animationContainer.hide();
    timelineContainer.hide();
  } else {
    animationContainer.show();
    timelineContainer.show();
    var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8)));
    var endTime = Cesium.JulianDate.now(); 
    viewer.timeline.zoomTo(startTime, endTime);  
  }
}
$('.toggle-timeline').click(function () {
  toggleTimeline();
});


var rightSidebar = $('.toolbar');
var controls = $('.cv-toolbar');
$('.show-menu').click(function () {
 rightSidebar.show();
 controls.hide();
 $('#cesiumContainer').one('click', function () {
   rightSidebar.hide();
   controls.show();
  });
});
$('.close-menu').click(function () {
 rightSidebar.hide();
 controls.show();
});



$('.cesium-baseLayerPicker-dropDown').addClass('cesium-baseLayerPicker-dropDown-visible').detach().appendTo($('#base'));
$('.cesium-viewer-geocoderContainer').detach().appendTo($('.search'));
$('.cesium-geocoder-input').addClass('cesium-geocoder-input-wide');

// Clear welcome modal content box (for video embeds)
function baleeted() { 
  $('#Greetz').remove();
  $('.cesium-viewer-bottom').css('left', '0');
  $('.cesium-viewer-bottom').show();
}
  $('.do-legend').one("click", function() {
    $('.do-legend span').remove();
    $('.legend').show();
  });
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
  $('.cesium-viewer-bottom').css('left', '0');
  $('.cesium-viewer-bottom').show();
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
