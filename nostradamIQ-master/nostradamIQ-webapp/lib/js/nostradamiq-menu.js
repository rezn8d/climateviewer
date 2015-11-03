"use strict";

// Set web root url
var baseURL = window.location.protocol + "//" + window.location.host + "/webapp/";  // production
var proxyURL = 'http://climateviewer.net/netj1/proxy';  // production
//var proxyURL = 'https://nostradamiq.org/webapp/proxy/traytention/proxy';  
//var proxyURL = 'http://nostradamiq.org:8080/proxy';  // dev
//var proxyURL = 'http://localhost:8080/proxy'

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


/* ----------------------------- SHARING ----------------------------- */

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

/* ----------------------------- LOADING SIGN ----------------------------- */

function loading(layerId) {
    $('.' + layerId + '-load').removeClass('play').addClass('spinner loading active');
}
function loaded(layerId) {
    $('.' + layerId + '-load').removeClass('spinner loading').addClass('check');
}

function loadError(layerId, geoDataSrc, error) {
  console.log('loading ' + layerId + ' failed: ' + error);
  var target = $('#' + layerId);
  $('<div class="ui card layer-sliders" style="display:block"><div class="content"><div class="ui divided list"><div class="item"><i class="circular inverted warning icon"></i><div class="content"><div class="header">Load Failed</div>Please use <a href="mailto:info@nostradamiq.org?subject=nostradamIQ broken link in Webapp - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly due to ( ' + error + ' ), please look into it.">this link</a> to report this error. Please include your Browser and OS-Version:<br><br><strong>ERROR:</strong> ' + error + '</div></div></div></div>').appendTo(target);
    var icon = $('.' + layerId + '-load');
    var span = $('#' + layerId + ' span');
    icon.removeClass('spinner loading').addClass('close fail');
    span.removeClass('active').addClass('fail');
}

/* ----------------------------- SLIDERS ----------------------------- */

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

// TODO: FIX Review! There but do not work
function loadSliders(src, layerId) {
    var target = $('#' + layerId);
    var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').appendTo(target);
    var sPanel = $('<div class="ui card ' + layerId + '-sliders layer-sliders" />').appendTo(target);
    var content = $('<div class="content" />').appendTo(sPanel);
    var list = $('<div class="ui divided list" />').appendTo(content); 

    NSlider({ 'label': 'opacity', 'src': src }).appendTo(list);
    NSlider({ 'max': 2, 'label': 'brightness', 'src': src }).appendTo(list);
    NSlider({ 'max': 2, 'label': 'contrast', 'src': src }).appendTo(list);
    NSlider({ 'max': 2, 'label': 'saturation', 'src': src }).appendTo(list);
    NSlider({ 'max': 2, 'label': 'gamma', 'src': src }).appendTo(list);

    src.alpha = 1;
    src.brightness = 1;
    src.contrast = 1;
    src.saturation = 1;
    src.gamma = 1;

    var details = $('.' + layerId + '-details');
    if (details.is(':visible')) { sPanel.show(); label.show(); }
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


var defaultEyeOffset = new Cesium.Cartesian3(0.0, 50.0, 50.0);
var defaultKMLEyeOffset = new Cesium.Cartesian3(0.0, 5000.0, 0.0);
var defaultScaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
var defaultTranslucency = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);



/* ----------------------------- MARKER HANDELERS ----------------------------- */

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

function modMarkers(geoData, markerImg, markerScale, markerColor, markerLabel) {
  var entities = geoData.entities.values; // entities = all points
  for (var i = 0; i < entities.length; i++) {
      var entity = entities[i]; // entities = single point

      // create marker image
      var billboard = new Cesium.BillboardGraphics();

      var image;
      if (markerImg) {
          image = markerImg;
      } else if (entity.billboard.image) {
          image = entity.billboard.image;
      } else {
          image = '//nostradamiq.org/webapp/img/cv3D-red.png';
      }
      billboard.image = image;

      var size;
      if (markerLabel == 'usgs-eq') {
          size = entity.properties.mag;
      } else if (markerLabel == 'twitter') {
          size = Math.log(entity.properties.followers_count);
      } else if (markerScale) {
          size = markerScale;
      } else {
          size = 2;
      }
      billboard.scale = size;

      if (markerColor) {
        billboard.color = markerColor;
      } else if (entity.billboard.color) {
        billboard.color = entity.billboard.color;
      } 

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

/* ----------------------------- LAYER HANDELERS ----------------------------- */

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
  $('<div class="ui card ' + layerId + '-picker layer-sliders"><div class="content"><div class="ui divided list"><div class="item '+ layerId + '-info"><i class="circular inverted clock icon"></i><div class="content"><div class="header">Imagery Date</div>Click this button below to change the loaded image:<br><input type="button" value="" class="datepicker ui blue basic button" id="'+ layerId + '-datepicker" name="date"></div></div></div></div>').appendTo(target);

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

function loadEUMET(layerId, geoDataSrc, geoLayers) {
    //var proxySrc = (layerId + '/');
    // TODO: DatePicker from loadGIBS
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

/* TODO
    // Init the datepicker:
    var target = $('#' + layerId);
    $('<div class="ui card ' + layerId + '-picker layer-sliders"><div class="content"><div class="ui divided list"><div class="item '+ layerId + '-info"><i class="circular inverted clock icon"></i><div class="content"><div class="header">Imagery Date</div>Click this button below to change the loaded image:<br><input type="button" value="" class="datepicker ui blue basic button" id="'+ layerId + '-datepicker" name="date"></div></div></div></div>').appendTo(target);
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var yesterday = Cesium.JulianDate.fromDate(date);
    var time = Cesium.JulianDate.toDate(yesterday);

    var $input = $( '#'+ layerId + '-datepicker' ).pickadate({
      formatSubmit: 'yyyy-mm-dd',
      min: [2012, 4, 8],
      max: Cesium.JulianDate.now(),
      container: '#datepicker-container',
      closeOnSelect: true,
      closeOnClear: false
    });

    var picker = $input.pickadate('picker');
    picker.set('select', time);
    picker.on({
      set: function() {
        var selectedDate = picker.get('select', 'yyyy-mm-dd');
        geoDataSrc = geoDataSrc + "?TIME=" + selectedDate;
        loadEUMET(layerId, geoDataSrc, geoLayers);
      }
    });
    var start = picker.get('select', 'yyyy-mm-dd');
    // loadEUMET(layerId, geoDataSrc, geoLayers);
*/
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

function loadGeoJson2(layerId, geoDataSrc, proxy, markerScale, markerImg, markerColor, zoom) {
    console.log('load geojson');
    if (proxy) {
        new Cesium.GeoJsonDataSource.load(proxyURL + '?' + geoDataSrc).then(function (geoData) {
          modMarkers(geoData, markerImg, markerScale, markerColor, markerLabel);
          viewer.dataSources.add(geoData);
          activeLayers[layerId] = geoData;
          loadSliders(geoData, layerId);
          if (zoom) {
              viewer.flyTo(geoData);
          }
      }, function (error) {
          loadError(layerId, geoDataSrc, error);
      });
    } else {
        new Cesium.GeoJsonDataSource.load(geoDataSrc).then(function (geoData) {
          modMarkers(geoData, markerImg, markerScale, markerColor, markerLabel);
          viewer.dataSources.add(geoData);
          activeLayers[layerId] = geoData;
          loadSliders(geoData, layerId);
          if (zoom) {
              viewer.flyTo(geoData);
          }
      }, function (error) {
          loadError(layerId, geoDataSrc, error);
      });
    }
}

function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, markerColor, zoom) {
    console.log('load geojson');
    new Cesium.GeoJsonDataSource.load(geoDataSrc).then(function (geoData) {
        modMarkers(geoData, markerImg, markerScale, markerColor, markerLabel);
        viewer.dataSources.add(geoData);
        activeLayers[layerId] = geoData;
        loadSliders(geoData, layerId);
        if (zoom) {
            viewer.flyTo(geoData);
        }
    }, function (error) {
        loadError(layerId, geoDataSrc, error);
    });
}

function loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod) {
    if (proxy) {
        new Cesium.KmlDataSource.load(geoDataSrc, {
            proxy: new Cesium.DefaultProxy(proxyURL),
            sourceUri: geoDataSrc
          }).then(function (geoData) {
              if (markerMod) {
                  modMarkers(geoData, markerImg, markerScale, markerLabel);
              }
              viewer.dataSources.add(geoData);
              activeLayers[layerId] = geoData; 
              loadSliders(geoData, layerId);
              if (zoom) {
                  viewer.flyTo(geoData.entities);
              }
          }, function (error) {
              loadError(layerId, geoDataSrc, error);
          }
        );
    } else {
        new Cesium.KmlDataSource.load(geoDataSrc).then(function (geoData) {
            if (markerMod) {
                  modMarkers(geoData, markerImg, markerScale, markerLabel);
            }
            viewer.dataSources.add(geoData);
            activeLayers[layerId] = geoData;
            loadSliders(geoData, layerId);
            if (zoom) {
                viewer.flyTo(geoData.entities);
            }
          }, function (error) {
              loadError(layerId, geoDataSrc, error);
          }
        );
    } 
}

// TODO
// primarily for PDC's weired XML format:
function loadPDC_XML(layerId, geoDataSrc, proxy, markerLabel, markerScale, markerImg, markerColor, zoom) {
    console.log('load PDC-XML');
    if (proxy) {
      new Cesium.loadXML(proxyURL + '/?' + geoDataSrc).then(function(xmlData) {
          console.log(xmlData);
          var geoData = xml2geojson(xmlData);
          modMarkers(geoData, markerImg, markerScale, markerColor, markerLabel);
          viewer.dataSources.add(geoData);
          activeLayers[layerId] = geoData;
          loadSliders(geoData, layerId);
          if (zoom) {
              viewer.flyTo(geoData);
          }
      }).otherwise(function(error) {
          loadError(layerId, geoDataSrc, error);
      });
    } else {
      new Cesium.loadXML(geoDataSrc).then(function(xmlData) {
          console.log(xmlData);
          var geoData = xml2geojson(xmlData);
          modMarkers(geoData, markerImg, markerScale, markerColor, markerLabel);
          viewer.dataSources.add(geoData);
          activeLayers[layerId] = geoData;
          loadSliders(geoData, layerId);
          if (zoom) {
              viewer.flyTo(geoData);
          }
      }).otherwise(function(error) {
          loadError(layerId, geoDataSrc, error);
        });
  }
}

// TODO
// load twitter data according to picked date - build URL accordingly: 
// Format:
// HOUR = HH (str)
// DATE = DD-MM-YYYY (str)
// ARRAY = key for keywords Dict that contains filterwords for twitter stream object (str)
// tweets_ARRAY_HOUR_DATE.geojson -> geoJSON object to be read by Cesium
// stats_ARRAY_HOUR_DATE -> ((ALL, WITH_GEO), (ALL_INTV, WITH_GEO_INTV))
function loadTwitter(layerId, geoDataSrc, proxy, markerScale, markerImg, markerColor, zoom) {
  console.log('load twitter data');
  var target = $('#' + layerId);
  $('<div class="ui card ' + layerId + '-picker layer-sliders"><div class="content"><div class="ui divided list"><div class="item '+ layerId + '-info"><i class="circular inverted clock icon"></i><div class="content"><div class="header">Date</div>Click this button below to change the loaded Twitter data:<br><input type="button" value="" class="datepicker ui blue basic button" id="'+ layerId + '-datepicker" name="date"></div></div></div></div>').appendTo(target);
  var date = new Date();
  date.setDate(date.getDate());
  var today = date.getDay() + '-' + date.getMonth() + '-' + date.getYear();
  var now_time = date.getHours();
  var date_selected = false;

  var $input_date = $( '#'+ layerId + '-datepicker' ).pickadate({
    formatSubmit: 'dd-mm-yyyy',
    min: -7, // [08, 14, 2015],
    max: true,
    container: '#datepicker-container', //'#'+ layerId + '-datepicker',
    //editable: true, //
    closeOnSelect: true,
    closeOnClear: false,
    onSet: function() {
      date_selected = true;
    } 
  });
  if (date_selected) {
    var $input_time = $( '#'+ layerId + '-timepicker' ).pickadate({
      formatSubmit: 'hh',
      max: true,
      interval: 60,
      container: '#timepicker-container', //'#'+ layerId + '-timepicker',
      //editable: true, //
      closeOnSelect: true,
      closeOnClear: false,
      onSet: function(selectedHour) {
        var selectedDate = $input_date.pickadate('select', 'dd-mm-yyyy');
        var get_data_select = geoDataSrc + '_' + selectedHour + '_' + selectedDate + '.geojson';
        loadGeoJson(layerId, get_data_select, markerScale, markerImg, markerColor, zoom);
        //loadGeoJson2(layerId, get_data_start, proxy, markerScale, markerImg, markerColor, zoom);
        // TODO Have a info-window with twitter stats!
      } 
    });
  }

  $input_date.pickadate('select', today);
  $input_time.pickadate('select', now_time);
  var get_data_start = geoDataSrc + '_' + now_time + '_' + today + '.geojson';
  loadGeoJson(layerId, get_data_select, markerScale, markerImg, markerColor, zoom);
  //loadGeoJson2(layerId, get_data_start, proxy, markerScale, markerImg, markerColor, zoom);
}

function loadCZML(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod) {
    console.log('load CZML');
    if (proxy) {
        new Cesium.CzmlDataSource.load(geoDataSrc, {
            proxy: new Cesium.DefaultProxy(proxyURL),
            sourceUri: geoDataSrc
          }).then(function (geoData) {
              if (markerMod) {
                  modMarkers(geoData, markerImg, markerScale, markerLabel);
              }
              viewer.dataSources.add(geoData);
              activeLayers[layerId] = geoData; 
              loadSliders(geoData, layerId);
              if (zoom) {
                  viewer.flyTo(geoData.entities);
              }
          }, function (error) {
              loadError(layerId, geoDataSrc, error);
          }
        );
    } else {
        new Cesium.CzmlDataSource.load(geoDataSrc).then(function (geoData) {
            if (markerMod) {
                  modMarkers(geoData, markerImg, markerScale, markerLabel);
            } 
            viewer.dataSources.add(geoData);
            activeLayers[layerId] = geoData;
            loadSliders(geoData, layerId);
            if (zoom) {
                viewer.flyTo(geoData.entities);
            }
          }, function (error) {
              loadError(layerId, geoDataSrc, error);
          }
        ); 
    } 
}

// TODO Display external links in an iframe
function loadLink(layerId, geoDataSrc, proxy, zoom) {
  console.log('load external Link');

}

function loadSingleTileImigary(layerId, geoDataSrc, proxy) {
    console.log('load Single Tile Imagery');
    /*
    if (proxy) {
        var src = viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            proxy: new Cesium.DefaultProxy(proxyURL),
            url : geoDataSrc,
            //credit : source,
            hasAlphaChannel : true,
            //alpha : 0.7,
            //brightness : 2
        }));
        activeLayers[layerId] = src;
        loadSliders(src, layerId);
    } else {
        var src = viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url : geoDataSrc
            //credit : source,
            //hasAlphaChannel : true,
            //alpha : 0.7,
            //brightness : 2
        }));
        activeLayers[layerId] = src;
        loadSliders(src, layerId);
    }
    */
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url : geoDataSrc
            //credit : source,
            //hasAlphaChannel : true,
            //alpha : 0.7,
            //brightness : 2
        }));
        activeLayers[layerId] = src;
        loadSliders(src, layerId);
}

/* ----------------------------- END LAYER HANDELERS ----------------------------- */

/* ----------------------------- REMOVAL ----------------------------- */

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
    if (mlt === ("nasa-gibs") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer")) {
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

/* ----------------------------- LAYER LOADER ----------------------------- */

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
    markerColor = l.MC,
    timeline = l.C,
    proxy = l.P;

    if (layerEnabled[layerId] === undefined) {
        //put it in a temporary state to disallow loading while loading
        layerEnabled[layerId] = false;
        // Load layers by Type
        if (l.T === ("wms")) {
            loadWms(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("eumet-wms")) {
            loadEUMET(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("nasa-gibs")) {
            loadGIBS(layerId);
        } else if (l.T === ("wtms")) {
            loadWmts(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("base-layer")) {
           loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("geojson") && layerId.substring(0, 10) === "twitter-api") { // load twitter data extra
            loadTwitter(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, markerColor, zoom); //loadGeoJson2(layerId, geoDataSrc, proxy, markerLabel, markerScale, markerImg, markerColor, zoom);
        } else if (l.T === ("json")) { // PDC
            loadGeoJson(layerId, geoDataSrc, proxy, markerLabel, markerScale, markerImg, markerColor, zoom);
        } else if (l.T === ("kml")) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod);
        } else if (l.T === ("arcgis")) {
            loadArcGisLayer(layerId, geoDataSrc);
        } else if (l.T === ("czml")) {
            loadCzml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerColor, markerMod);
        } else if (l.T === ("link")) {
            loadLink(layerId, geoDataSrc, proxy, zoom);
        } else if (l.T ===("pdc-xml")) {
            loadPDC_XML(layerId, geoDataSrc, proxy, markerLabel, markerScale, markerImg, markerColor, zoom);
        } else if (l.T ===("STI")) {
            loadSingleTileImigary(layerId, geoDataSrc, proxy);
        } else {
            console.log(layerId + " failed to load map type: " + l.T);
        }
        shareLink();
        if (timeline) toggleTimeline(true);
    }
}

/* ----------------------------- FOLDER & DEATILS ----------------------------- */

// TODO get more icons !
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
    if (layerType == ('czml')) {
      $('<div class="item"><i class="circular inverted download icon"></i><div class="content"><div class="header">Data Source</div>Cesium\'s Keyhole Markup Language (CZML) &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
    }
    if (layerType == ('geojson')) {
      $('<div class="item"><i class="circular inverted download icon"></i><div class="content"><div class="header">Data Source</div>GeoJSON &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
    }
    if (layerType == ('nasa-gibs')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>Web Map Tile Service (WMTS)</div>').appendTo(list);
    }
    if (layerType == ('STI')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>Single Tile Imagery &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
    }
    if (layerType == ('wms')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>Web Mapping Service (WMS)<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '?request=GetCapabilities&service=WMS">Get Capabilities</a></div>').appendTo(list);
    }
    if (layerType == ('pdc-xml')) {
      $('<div class="item"><i class="circular inverted download icon"></i><div class="content"><div class="header">Data Source</div>PDC\'s XML (XML) &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
    }
    if (layerType == ('base-layer')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>OpenStreetMap (OSM) Base Map</div>').appendTo(list);
    }
    if (layerType == ('link')) {
      $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>External Resource &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
    }
    $('<div class="extra content"><a href="' + baseURL + 'index.html?layersOn=' + layerId + '" class="right floated created">Share Layer</a><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></div>').appendTo(details);
}

function addTree(parent/* nodes  */, lb /*target */, includeOnly) {
    var layers = me.successors(parent);
    _.each(layers, function (l) {
        var l = me.node(l),
            content,
            layerId = l.I,
            layerType = l.T,
            child = $('<div class="folder" />').html(l);

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
                layerButton, details, loadIcon, optIcon, label; // Zoom etc.? TODO

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

                loadIcon = $('<i class="play icon ' + layerId + '-load"></i>').toggle(
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
                if (largeLayer) label.addClass('large-layer');
                if (newLayer) label.addClass('new-layer');
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

/* ----------------------------- SIDEBAR BUILDER ----------------------------- */

function initLayers(includeOnly) {
    var lb = $('#map-layers');

    lb.addClass('ui');

    _.each(me.sources(), function (s) {
        addTree(s, lb, includeOnly);
    });
}

/* ----------------------------- DL3 DEMO----------------------------- */

$('.dl3-demo-toggle').click(function () {
  $('#dl3-chart').modal('hide');
});

/* ----------------------------- MAP MODES ----------------------------- */

// MAP MODE BUTTONS
$('.mode-3d').click(function () {
  currentViewModel = '3D';
  viewer.scene.morphTo3D();
  //$('.cesium-home-button').trigger('click');
  //setTimeout(viewer.scene.morphTo3D(5), 1000);
});
$('.mode-2d').click(function () {
  currentViewModel = '2D';
  //$('.cesium-home-button').trigger('click');
  viewer.scene.morphTo2D();
  //setTimeout(viewer.scene.morphTo2D(), 100);
});
$('.mode-flat-earth').click(function () {
  currentViewModel = 'FlatEarth';
  viewer.scene.morphToColumbusView(7);
  //$('.cesium-home-button').trigger('click');
  //setTimeout(viewer.scene.morphToColumbusView(7), 1000);
});
$('.cesium-baseLayerPicker-sectionTitle').prepend('<i class="globe icon" style="margin-right:7px"></i>');


/* ----------------------------- SHARE - CHECK URL ----------------------------- */

var initialLayers = (getURLParameter("layersOn") || '').split(',');
if (initialLayers[0] === '') initialLayers = [];

var disabledLayers = (getURLParameter("layersOff") || '').split(",");
if (disabledLayers[0] === '') disabledLayers = [];

var baseLayer = parseInt(getURLParameter("baseLayer"));
if (baseLayer) {
    var shared = true;
    baseLayerPicker.viewModel.selectedItem = imageryViewModels[baseLayer]; 
    baseLayerPicker.selectedImageryProviderViewModel = imageryViewModels[baseLayer];
}

var viewerMode = getURLParameter("viewerMode");
if (viewerMode) {
    var shared = true;
    if (viewerMode === '2D') {
        $('.mode-2d').trigger('click');
    }
    if (viewerMode === '3D') {
        $('.mode-3d').trigger('click');
    }
    if (viewerMode === 'FlatEarth') {
        $('.mode-flat-earth').trigger('click');
    }
}

// get all the shared Layers
var allLayers = initialLayers.concat(disabledLayers);
// LOAD LAYERS
if (allLayers.length > 0) {
    // LOAD LAYERS FROM URL 
    // Show only the shared ones - Makes it easier to show sth. specific
    var shared = true;
    initLayers();
    //initLayers(allLayers);
    for (var i = 0; i < initialLayers.length; i++) {
      $('.' + initialLayers[i] + '-load').click(); 
      //console.log(initialLayers[i]);
      //$('#' + initialLayers[i]).trigger('click'); // If you want to show the Details section when URL shared
    }
    //$('div.folder:empty').remove();
    //$('div.folder').show();
    //$('h2.toggle').hide();
    //$('<a class="button" href="' + baseURL + '" style="display:block;text-align:center;padding:20px 0;"><i class="home icon"></i> SHOW ALL LAYERS - OPEN NORMAL APP</a>').prependTo('#layers');
} else { // not via shared link
    var shared = false;
    initLayers();
}

/* ----------------------------- SHARING ----------------------------- */

// Subscribe to baseLayer:
var currentBaseLayer = 0;
Cesium.knockout.getObservable(baseLayerPicker.viewModel, 'selectedImagery').subscribe(function(baseLayer) {
    currentBaseLayer = _.findIndex(imageryViewModels, baseLayer);
});


function shareLink() {
    var layers = "";
    var disabledLayers = "";
    var url = baseURL;
    if (allLayers.length > 0) {
        for (var i = 0; i < allLayers.length; i++) {
            var a = allLayers[i];
            if (!($('#' + a).hasClass('active'))) {
                disabledLayers += a + ',';
            } else {
                layers += a + ',';
            }
        }
    } else {
        // only enable those that are enabled and ignore the disabled ones
        var ll = $('.lbw');
        ll.each(function () {
            if ($(this).hasClass('active')) {
                var L = $(this).attr('id');
                layers += L + ',';
            }
        });
    }
    url += 'index.html?';
    if (layers.length > 0) layers = layers.substring(0, layers.length - 1);
    url += 'layersOn=' + layers;

    if (disabledLayers.length > 0) {
        disabledLayers = disabledLayers.substring(0, disabledLayers.length - 1);
        url += '&layersOff=' + disabledLayers;
    }
    // Baselayer & View:
    url += '&baseLayer=' + currentBaseLayer;
    url += '&viewerMode=' + currentViewModel;
    // Show the URL
    var shareToggle = $('.share-all-layers');
    shareToggle.attr('href', url).html(url);
}

/* ----------------------------- LEGEND ----------------------------- */

var legendOn = false;
function toggleLegend() {
  if (legendOn) { // Hide info
    $('#legend-content').html('');
    $('.legend-title').html('<i class="fa fa-arrow-circle-down"></i>  SHOW LEGEND');
    legendOn = false;
  } else { // Show info
    $('#legend-content').html('<i class="play icon"></i> =&nbsp;&nbsp;&nbsp;Load Layer<br><i class="folder icon"></i> =&nbsp;&nbsp;&nbsp;Toggle Layer Details<br><i class="play icon new-layer"></i> =&nbsp;&nbsp;&nbsp;New Layer!<br><i class="play icon large-layer"></i> =&nbsp;&nbsp;&nbsp;Warning, Large Layer - High-performance processor required, may crash weaker systems<br><p class="instruct">Bottom Menu</p><i class="close icon"></i> =&nbsp;&nbsp;&nbsp;Close this menu<br><i class="trash icon"></i> =&nbsp;&nbsp;&nbsp;Clear Globe. Remove all layers<br><i class="fa fa-search-minus fa-fw"></i> =&nbsp;&nbsp;&nbsp;Zoom back out<br><i class="clock icon"></i> =&nbsp;&nbsp;&nbsp;Toggle Timeline<br><i class="star icon"></i> =&nbsp;&nbsp;&nbsp;Toggle Stars - WARNING: Takes a lot of work!<br><i class="sun icon"></i> =&nbsp;&nbsp;&nbsp;Toggle Sun<br><i class="share alternate icon"></i> =&nbsp;&nbsp;&nbsp;Generate URL to share all currently active layers<br><i class="compress icon"></i> =&nbsp;&nbsp;&nbsp;Collapse layer category list<br><i class="chevron up icon"></i> =&nbsp;&nbsp;&nbsp;Scroll to menu top<br>');
    $('.legend-title').html('<i class="fa fa-arrow-circle-up"></i>  HIDE LEGEND');
    legendOn = true;
  }
}
$('.legend-title').click(toggleLegend);


/* ----------------------------- SHOWCASE ----------------------------- */

var showcaseInfoOn = false;
function toggleShowcaseInfo() {
  if (showcaseInfoOn) { // Hide info
    $('#showcase-maps-info').html('');
    $('.showcase-title').html('<i class="fa fa-question"></i>  What is this?');
    showcaseInfoOn = false;
  } else { // Show info
    $('#showcase-maps-info').html('<p>Here we gathered some interesting Maps as a starting Point for different Questions for You!</p><p>Pick one you are interested in and see what other Layers you can add to refine Your Analysis.</p><p>If you have build a cool and insightful Map, please <a href="mailto:info@nostradamiq.org?subject=Add my Analysis to the Showcase!">let us know</a> and we may add it here for others to use!</p><p><b><i>ENJOY!<br></i></b></p>');
    $('.showcase-title').html('<i class="fa fa-exclamation"></i>  Make your own below!');
    showcaseInfoOn = true;
  }
}
$('.showcase-title').click(toggleShowcaseInfo);

$('.earthquake-showcase').click(function () {
  $('.usgs-all-7day-load').trigger('click');
  $('.tectonic-plates-load').trigger('click');
  $('.seismic_stations-load').trigger('click');
});

$('.internet-showcase').click(function () {
  $('.inet_all_official-load').trigger('click');
  $('.inet_landp_official-load').trigger('click');
  $('.internet_users-load').trigger('click');
});
/* TODO: Add more */

/* ----------------------------- TAB MENU ----------------------------- */

$('.tab .menu .item').tab({
    context: $('.tab')
  });

/* ----------------------------- SOCIAL ----------------------------- */


$('.share-tab').one('click', function () {
    $('#share').addClass('panel-share');
    $('head').append('<script type="text/javascript">var switchTo5x=true;</script><script type="text/javascript" src="https://ws.sharethis.com/button/buttons.js"></script><script type="text/javascript">stLight.options({publisher: "709fb5b5-5b4a-4b63-b4b4-0a88e5bbed79", doNotHash: true, doNotCopy: true, hashAddressBar: false});</script>');
});


var chatOn = false;
function toggleChat() {
  if (chatOn) { // Hide Chat
    $('#chat').html('');
    $('.chat-title').html('<i class="comments outline icon"></i> LOAD CHAT');
    chat0n = false;
  } else { // Show chat
    $('#chat').html('<iframe src="//tlk.io/nostradamiq" class="container-fluid chat-iframe" style="height:600px"></iframe>');
    $('.chat-title').html('<i class="comments outline icon"></i> BE NICE! :)');
    chatOn = true;
  }
}
$('.chat-title').click(toggleChat);

var commentOn = false;
function toggleComments() {
  if (commentOn) { // Hide Comments
    $('#comments').html('');
    $('.comments-title').html('<i class="comments outline icon"></i> LOAD COMMENTS');
    comment0n = false;
  } else { // Show Comments
    $('#comments').html("<div id='disqus_thread'></div><script type='text/javascript'>var disqus_shortname = 'nostradamiq'; (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();</script>").addClass('panel-comments');
    //$('#comments').html("<div id='disqus_thread'></div><script type='text/javascript'> var disqus_shortname = 'nostradamiq';var disqus_url = 'https://nostradamiq.org/webapp/'; (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();</script>").addClass('panel-comments');
    $('.chat-title').html('<i class="comments icon"></i> WHAT DO YOU THINK?');
    commentOn = true;
  }
}
$('.chat-title').click(toggleComments);

// TODO NOT WORKING!
var giveDataOn = false;
function toggleGiveData() {
  if (giveDataOn) { // Hide give-data
    $('#give-data').html('');
    $('.give-data-title').html('<i class="database icon"></i> I HAVE DATA!');
    giveDataOn = false;
  } else { // Show give-data
    $('#give-data').html("<p><b><i>DO YOU KNOW OF HAVE SOME INTERESTING DATA?</i></b><br><br><br>We are happy to visualize Your, or any other Data for anybody, or privately!<br><br>We build nostradamIQ so that it is incredibally easy to add more data sources - We support various data formats and are happy to help you convert your non-geo dataformat like csv, exel, txt and so on... Open or Your Online Data-Sources are also welcome!<br><br><a href='mailto:info@nostradamiq.org?subject=nostradamIQ%20Data%20Suggestion&amp;body=I%20have%20some%20cool%20Data%20for%20you%20to%20include%20in%20nostradamIQ!%0D%0A%0D%0AFormat:%20%0D%0A%0D%0ASource:%20%0D%0A(If%20not%20an%20online%20source,%20please%20attach%20the%20data!)%0D%0A%0D%0AWhy%20is%20this%20interesting?%20%0D%0A%0D%0ASuggested%20Name:%20%0D%0A%0D%0AOrigin%20to%20be%20credited:%20%0D%0A%0D%0A' target='_top'>Please contact us!</a><br><br>If you feel like coding yourself, see <a href='https://github.com/nupic-community/nostradamIQ/tree/master/nostradamIQ-webapp' target='_blank'>our source-code</a> and <a href='https://github.com/nupic-community/nostradamIQ/pulls' target='_blank'>make a PR!</a></p>");
    $('.give-data-title').html('<i class="database icon"></i> CONTRIBUTE IT!');
    giveDataOn = true;
  }
}
$('.give-data-title').click(toggleGiveData);

/* ----------------------------- FOOTER MENU ----------------------------- */

// LAYER FOOTER BUTTONS
$('.clear-layers').click(function () {
 $('i.active').trigger('click');
});

$('.zoom_out').click(function () {
 $('.cesium-home-button').trigger('click');
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

function showSun() { viewer.scene.globe.enableLighting = true; }
function hideSun() { viewer.scene.globe.enableLighting = false; }
$('.sun-control').toggle(
  function () { showSun(); $(this).addClass('active'); },
  function () { hideSun(); $(this).removeClass('active'); }
);


/* ----------------------------- TIMEZONES ----------------------------- */
/* TODO: Show timezones like Sunlight
// http://openlayers.org/en/v3.5.0/examples/kml-timezones.html
// Timezones: TODO
function showTimezones() {
  var styleFunction = function(feature, resolution) {
    var offset = 0;
    var name = feature.get('name'); // e.g. GMT -08:30
    var match = name.match(/([\-+]\d{2}):(\d{2})$/);
    if (match) {
      var hours = parseInt(match[1], 10);
      var minutes = parseInt(match[2], 10);
      offset = 60 * hours + minutes;
    }
    var date = new Date();
    var local = new Date(date.getTime() +
        (date.getTimezoneOffset() + offset) * 60000);
    // offset from local noon (in hours)
    var delta = Math.abs(12 - local.getHours() + (local.getMinutes() / 60));
    if (delta > 12) {
      delta = 24 - delta;
    }
    var opacity = 0.75 * (1 - delta / 12);
    return [new ol.style.Style({
      fill: new ol.style.Fill({
        color: [0xff, 0xff, 0x33, opacity]
      }),
      stroke: new ol.style.Stroke({
        color: '#ffffff'
      })
    })];
  };

  var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/kml/timezones.kml',
      format: new ol.format.KML({
        extractStyles: false
      })
    }),
    style: styleFunction
  });

  var raster = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: 'toner'
    })
  });

  var map = new ol.Map({
    layers: [raster, vector],
    target: 'map',
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  });

  var info = $('#info');
  info.tooltip({
    animation: false,
    trigger: 'manual'
  });

  var displayFeatureInfo = function(pixel) {
    info.css({
      left: pixel[0] + 'px',
      top: (pixel[1] - 15) + 'px'
    });
    var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      return feature;
    });
    if (feature) {
      info.tooltip('hide')
          .attr('data-original-title', feature.get('name'))
          .tooltip('fixTitle')
          .tooltip('show');
    } else {
      info.tooltip('hide');
    }
  };

  map.on('pointermove', function(evt) {
    if (evt.dragging) {
      info.tooltip('hide');
      return;
    }
    displayFeatureInfo(map.getEventPixel(evt.originalEvent));
  });

  map.on('click', function(evt) {
    displayFeatureInfo(evt.pixel);
  });
}
$('.timezone-control').toggle(
  function () { showTimezones(); $(this).addClass('active'); },
  function () { hideTimezones(); $(this).removeClass('active'); }
);
// END TIMEZONES
*/


/* ----------------------------- SIDEBAR CONTROL & MAIN SCREEN BUTTONS ----------------------------- */

$('.reset-view').click(function () {
 $('.cesium-home-button').trigger('click');
});

function showStars(show) {
    if (show) {
      viewer.scene.skyBox = new Cesium.SkyBox({
        sources : {
          positiveX : '/webapp/lib/cesium/cesium-assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
          negativeX : '/webapp/lib/cesium/cesium-assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
          positiveY : '/webapp/lib/cesium/cesium-assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
          negativeY : '/webapp/lib/cesium/cesium-assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
          positiveZ : '/webapp/lib/cesium/cesium-assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
          negativeZ : '/webapp/lib/cesium/cesium-assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg'
        },
        show: true
      });
      if (!viewer.scene.moon) {
        viewer.scene.moon = new Cesium.Moon({ 
          textureUrl: '/webapp/lib/cesium/Cesium/Assets/Textures/moonSmall.jpg', 
          onlySunLightning: false 
        });
      }
    } else {
      viewer.scene.skyBox.show = false;
      if (viewer.scene.moon) {
        viewer.scene.moon = null;
      }
    }
}
var showSkyBox = true;
$('.show-stars').click(function () {
    showStars(showSkyBox);
    showSkyBox = !showSkyBox;
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

//var searchBar = $('.cesium-viewer-geocoderContainer').detach();
$('.cesium-viewer-geocoderContainer').detach().appendTo($('#map-layers'));
//searchBar.clone().appendTo($('#searchbar2'));
$('.cesium-geocoder-input').addClass('cesium-geocoder-input-wide');


/* ----------------------------- WELCOME ----------------------------- */

function baleeted() { 
  $('#Greeting').remove();
  $('.cesium-viewer-bottom').css('left', '0');
  $('.cesium-viewer-bottom').show();
}
function welcome() {
  $('#Greeting').modal('show').modal( { 
    onHidden: function() { 
      setTimeout(baleeted, 1000) 
    } 
  });
  $('.cv-controlbar').show();
  $('.cesium-viewer-bottom').css('left', '0');
  $('.cesium-viewer-bottom').show();
}
// Modal FAQ
$('.ui.accordion').accordion({duration: 0, animateChildren: true});
// Modal Share: SHOW MENU
$('.share-modal').on('click', function () {
  $('#Greeting').modal('hide');
  $('.show-menu').trigger('click');
});
// Modal Close (right button)
$('.close-Greeting').click(function () {
  $('#Greeting').modal('hide');
  $('.show-menu').trigger('click');
  $('.share-tab').trigger('click');
  getLocation();
});

if (!shared) setTimeout(welcome, 500);
