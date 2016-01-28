"use strict";

// Set web root url
var homeURL = window.location.protocol + "//" + window.location.host + "/3D/";  // production
var shareURL = "http://climateviewer.org/3D/";  // production
var proxyURL = 'http://climateviewer.org/proxy/proxy';  // production

var activeLayers = {};
var infoBox = $('.cesium-infoBox');
var layerEnabled = {}; // whether the label is in some way enabled
var me = Self();

nobjectsIn(layers, function (x) {
    //console.log(x);
}, function (s, p, o) {
    me.addEdge(s, p, o);
});

var date = new Date();
date.setDate(date.getDate() - 1);
var yesterday = Cesium.JulianDate.fromDate(date);
var time = Cesium.JulianDate.toDate(yesterday);

var $input = $( '#datepicker' ).pickadate({
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
        console.log(selectedDate);
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
              // console.log('markermod alpha ' + sum);
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
    var target = $('#' + layerId + ' .lb');
    //var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').insertAfter(target);
    var sPanel = $('<div class="details ' + layerId + '-sliders layer-sliders" />').insertAfter(target);
    var content = $('<div class="slider-content" />').appendTo(sPanel);
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

function loadGIBS(layerId, selectedDate) {
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

function loadWms(layerId, geoDataSrc, geoLayers, noFeatures) {
    var src;
    if (noFeatures) {
      src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
          url : geoDataSrc,
          layers : geoLayers,
          proxy: new Cesium.DefaultProxy(proxyURL),
          sourceUri: geoDataSrc,
          enablePickFeatures: false,
          parameters : {
              transparent : true,
              format : 'image/png'
          }
      }));
    } else {
      src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
          url : geoDataSrc,
          layers : geoLayers,
          proxy: new Cesium.DefaultProxy(proxyURL),
          sourceUri: geoDataSrc,
          parameters : {
              transparent : true,
              format : 'image/png'
          }
      }));
    }
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
function loadBingLayer(layerId, geoDataSrc) {
    var src, bingUrl = '//dev.virtualearth.net', bingKey = 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw';
    if (geoDataSrc == 'AERIAL') {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
            url: bingUrl,
            key: bingKey,
            mapStyle: Cesium.BingMapsStyle.AERIAL
        }));
    } else if (geoDataSrc == 'AERIAL_WITH_LABELS') {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
            url: bingUrl,
            key: bingKey,
            mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
        }));
    } else {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
            url: bingUrl,
            key: bingKey,
            mapStyle: Cesium.BingMapsStyle.ROADS
        }));
    }
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

var defaultKMLEyeOffset = new Cesium.Cartesian3(0.0, 5000.0, 0.0);
var defaultScaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
var defaultTranslucency = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);

function loadError(layerId, geoDataSrc, error) {
  // console.log('loading ' + layerId + ' failed: ' + error);
  var target = $('#' + layerId);
  $('<div class="ui card layer-sliders" style="display:block"><div class="content"><div class="ui divided list"><div class="item"><i class="circular inverted warning icon"></i><div class="content"><div class="header">Load Failed</div>Please use <a href="mailto:jim@climateviewer.com?subject=Climate Viewer 3D broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly due to ( ' + error + ' ), please look into it.  Sent from http://climateviewer.com/3D/" target="_self">this link</a> to report this error.<br><br><strong>ERROR:</strong> ' + error + '</div></div></div></div>').appendTo(target);
    var icon = $('.' + layerId + '-load');
    var span = $('#' + layerId + ' span');
    icon.removeClass('spinner loading').addClass('close fail');
    span.removeClass('active').addClass('fail');
}

function newMarkerLabel(entity, markerLabel) {
    var label = new Cesium.LabelGraphics();
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

function modMarkers(layerId, geoData, markerImg, markerScale, markerLabel) {
    var layerTarget = $('.' + layerId + '-details');
    var markerList = $('<div class="details ' + layerId + '-list marker-list" />').insertAfter(layerTarget);
    var items = [];

    var entities = geoData.entities.values; // entities = all points
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i]; // entity = single point
      // console.log(entity);
      // create marker image
      var billboard = new Cesium.BillboardGraphics();

      var image;
      if (markerImg) {
          image = markerImg;
      } else if (entity.billboard.image) {
          image = entity.billboard.image;
      } else {
          image = '/img/icons/cv3d.png';
      }
      billboard.image = image;

      var size;
      if (markerLabel == 'usgs-eq') {
          size = entity.properties.mag;
      } else if (markerScale) {
          size = markerScale;
      } else {
          size = 3;
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
          details = '<div>Place: ' + entity.properties.place + '<br>Magnitude: ' + entity.properties.mag + '<br><a href="' + entity.properties.url + '" target="_blank">Click here for more info.</a></div>';
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
      billboard.alignedAxis = Cesium.Cartesian3.ZERO;
      billboard.scaleByDistance = defaultScaleByDistance;
      entity.billboard = billboard;
        //var position = entity.position;
        //var x = position.getValue().x;

        console.log(entity.position);
        var v = entity.position.getValue();
        //var xyz = [v.x, v.y, v.z];
        var xy = [v.x, v.y];

        console.log(xy);

        items.push('<li id="' + entity.id + '">' + entity.title + '</li>');

        /*
         var cartographic = Cesium.Cartographic.fromCartesian(entity.position, Ellipsoid.WGS84);
         var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
         var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

        .click(function () {
         viewer.camera.flyTo({
         destination: Cesium.Cartesian3.fromDegrees(entity.position)
         });
         }) */
      // marker label
      if (markerLabel) {
          entity.label = newMarkerLabel(entity, markerLabel);
      }
    } // end for loop
    $('<ol/>', {
        'class':'msrkers',
        html:items.join('')
    }).appendTo(markerList);

}

function loadArcGisLayer(layerId, geoDataSrc, geoLayers, noFeatures, width, height) {
    var src;
    if (noFeatures) {
        //console.log('NO FEATURES FOR YOU!');
        if (width) {
            src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                url: geoDataSrc,
                enablePickFeatures: false,
                tileWidth: width,
                tileHeight: height,
                layers: geoLayers
            }));
        } else {
            src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                url: geoDataSrc,
                enablePickFeatures: false,
                layers: geoLayers
            }));
        }
    } else {
        //console.log('FEATURES ON');
        if (width) {
            src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                url: geoDataSrc,
                enablePickFeatures: true,
                tileWidth: width,
                tileHeight: height,
                layers: geoLayers
            }));
        } else {
            src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                url: geoDataSrc,
                enablePickFeatures: true,
                layers: geoLayers
            }));
        }
    }
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
    loaded(layerId);
}


function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom) {
     console.log('load geojson');
    new Cesium.GeoJsonDataSource.load(geoDataSrc).then(function (geoData) {
        modMarkers(layerId, geoData, markerImg, markerScale, markerLabel);
        viewer.dataSources.add(geoData);
        activeLayers[layerId] = geoData;
        // TODO loadMarkerSliders(geoData, layerId);
        if (zoom) {
            if (zoom === true) {
                viewer.flyTo(geoData);
            } else {
                $('.cesium-home-button').trigger('click');
            }
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
                    if (zoom === true) {
                        viewer.flyTo(geoData);
                    } else {
                        $('.cesium-home-button').trigger('click');
                    }
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
                if (zoom === true) {
                    viewer.flyTo(geoData);
                } else {
                    $('.cesium-home-button').trigger('click');
                }
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
    if (mlt === ("nasa-gibs") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer") || mlt === ("arcgis") || mlt === ("arcgis-layer") || mlt === ("bing")) {
        removeImagery(layerId);
        $('.' + layerId + '-sliders').remove();
        $('.' + layerId + '-picker').remove();
    } else {
        var src = activeLayers[layerId];
        delete activeLayers[layerId];
        viewer.dataSources.remove(src);
    }
    if (mlt === ("geojson")) {
        $('.' + layerId + '-list').remove();
    }
    delete layerEnabled[layerId];
}

// LOAD LAYERS
function updateLayer(layerId, includeOnly) {
    loading(layerId);
    var l = me.node(layerId);
    if (!l) {
        console.error('missing layer', layerId);
        //return false;
    }
    var geoDataSrc = l.G,
    geoLayers = l.L,
    //source = l.S,
    height = l.HT,
    width = l.W,
    markerMod = l.M,
    markerImg = l.MI,
    markerScale = l.MS,
    markerLabel = l.ML,
    timeline = l.C,
    proxy = l.P,
    noFeatures = l.X;
    var selectedDate = picker.get('select', 'yyyy-mm-dd');
    if (!includeOnly) var zoom = l.Z;


    if (layerEnabled[layerId] === undefined) {
        //put it in a temporary state to disallow loading while loading
        layerEnabled[layerId] = false;
        // Load layers by Type
        if (l.T === ("wms")) {
            loadWms(layerId, geoDataSrc, geoLayers, noFeatures);
        } else if (l.T === ("wtms")) {
            loadGIBS(layerId);
        } else if (l.T === ("nasa-gibs")) {
            loadGIBS(layerId, selectedDate);
        } else if (l.T === ("wtms")) {
            loadWmts(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("base-layer")) {
           loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("arcgis") || l.T === ("arcgis-layer")) {
           loadArcGisLayer(layerId, geoDataSrc, geoLayers, noFeatures, width, height);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod);
        } else if (l.T === ('bing')) {
            loadBingLayer(layerId, geoDataSrc);
        } else {
            console.log(layerId + ' failed to load map type: ' + l.T);
        }
        //shareLink();
        if (timeline) toggleTimeline(true);
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
        }
        else {
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
    $('<div class="details-bottom-content"><a href="' + homeURL + 'index.html?layersOn=' + layerId + '" class="pull-right" target="_self">Share Link</a><a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly, please look into it. Sent from http://climateviewer.com/3D/" target="_self">Report Error</a></div>').appendTo(details);

      //shareLink();
  }

function addTree(parent/* nodes  */, lb /*target */, includeOnly) {
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
                layerButton, details, loadIcon, optIcon, label;

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

                loadIcon.toggle(
                  function () {
                      setTimeout(function() {
                        if (loadIcon.hasClass('fa-play')) {
                            if (includeOnly) {
                                updateLayer(layerId, includeOnly);
                            } else {
                                updateLayer(layerId);
                            }
                          if (details.is(':visible')) $('.' + h.I + '-picker').show();
                          if (!label.hasClass('active')) label.addClass('active');
                          if (!content.hasClass('active')) content.addClass('active');
                          if (timeline) toggleTimeline(true);
                        }
                      });
                  },
                  function () {
                      setTimeout(function() {
                        if (loadIcon.hasClass('check')) {
                          disableLayer(h);
                          loadIcon.removeClass('check active').addClass('play');
                          $('.' + h.I + '-picker').hide();
                          if (label.hasClass('active')) label.removeClass('active');
                          if (content.hasClass('active')) content.removeClass('active');
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
    lb.addClass('ui');
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


$('#CV-about').one("click", function() {
    $('.do-video-div').append('<div class="videoWrapper"><iframe width="420" height="236" src="https://www.youtube-nocookie.com/embed/ZwFmez0ef6A" frameborder="0" allowfullscreen></iframe></div>');
});


// CHECK URL
var initialLayers = (getURLParameter("layersOn") || '').split(',');
var disabledLayers = (getURLParameter("layersOff") || '').split(",");
if (initialLayers[0] === '') initialLayers = [];
if (disabledLayers[0] === '') disabledLayers = [];
var allLayers = initialLayers.concat(disabledLayers);

if (allLayers.length > 0) {
    // LOAD LAYERS FROM URL
    var latView = (getURLParameter("lat") || '-78.176832746519');
    var lonView = (getURLParameter("lon") || '31.300283760032368');
    var zoomView = (getURLParameter("zoom") || '26596280.257583864');
    var dateView = (getURLParameter("date") || time);

    if (dateView !== time) {
        picker.set('select', dateView, { format: 'yyyy-mm-dd' })
    }


    if (latView !== '-78.176832746519') {
        var includeOnly = true;
        initLayers(includeOnly);
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(latView, lonView, zoomView)
        });
    } else {
        initLayers();
    }

    var shared = $('<div class="folder" style="display: block;"></div>').prependTo('#map-layers');
    $('<h2 class="toggle active">Shared Layers</h2>').prependTo('#map-layers').show();
    for (var i = 0; i < allLayers.length; i++) {
        $('#' + allLayers[i]).detach().appendTo(shared).show();
    }
    for (var g = 0; g < initialLayers.length; g++) {
        $('.' + initialLayers[g] + '-load').click();
        $('#' + allLayers[i]).addClass('active');
    }
    var killMe = $('div.folder:empty');
    killMe.prev().remove();
    killMe.remove();
} else {
    initLayers();
}




$('.report-tab').click(function (e) {
    e.preventDefault();
    var clientWidth = $(window).width(),
        clientHeight = $(window).height();
    if (clientWidth < 1024) {
        window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + clientHeight + ',width=' + clientWidth + '');return false;
    } else {
        window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');return false;
    }
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
$('.clear-layers').click(function (e) {
    e.preventDefault();
    $('i.active').trigger('click');
});
$('.collapse-menu').click(function (e) {
    e.preventDefault();
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

// TOGGLE SUN
function showSun() { viewer.scene.globe.enableLighting = true; }
function hideSun() { viewer.scene.globe.enableLighting = false; }

$('.sun-control').toggle(
  function (e) { e.preventDefault(); showSun(); $(this).addClass('active'); },
  function (e) { e.preventDefault(); hideSun(); $(this).removeClass('active'); }
);

$('.about-jim').click(function () {
    window.location = 'http://climateviewer.com/rezn8d/';
});

// SIDEBAR CONTROL & MAIN SCREEN BUTTONS
$('.reset-view').click(function (e) {
    e.preventDefault();
 $('.cesium-home-button').trigger('click');
});
/*
 var animationContainer = $('.cesium-viewer-animationContainer');
 var timelineContainer = $('.cesium-viewer-timelineContainer');
 var credit = $('.cesium-viewer-bottom');

 animationContainer.hide();
 timelineContainer.hide();
 credit.hide();

function toggleTimeline(show) {
  if (show) {
    animationContainer.show();
    timelineContainer.show();
    $('.toggle-timeline').addClass('active');
  } else if (animationContainer.is(":visible")) {
    //animationContainer.hide();
   // timelineContainer.hide();
    $('.toggle-timeline').removeClass('active');
  } else {
    animationContainer.show();
    timelineContainer.show();
    var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8)));
    var endTime = Cesium.JulianDate.now();
    viewer.timeline.zoomTo(startTime, endTime);
    $('.toggle-timeline').addClass('active');
  }
}
$('.toggle-timeline').click(function (e) {
    e.preventDefault();
    toggleTimeline();
}); */

var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8)));
var endTime = Cesium.JulianDate.now();
viewer.timeline.zoomTo(startTime, endTime);

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

$('.cesium-baseLayerPicker-dropDown').addClass('cesium-baseLayerPicker-dropDown-visible').detach().appendTo($('#base'));
$('.cesium-viewer-geocoderContainer').detach().prependTo($('.search'));
$('.cesium-geocoder-input').addClass('cesium-geocoder-input-wide');




$(document).ready(function () {
    $('#CV-TV').one('click', function () {
        $('#load-youtube').html('<div class="videoWrapper"><iframe width="560" height="315" src="http://www.youtube.com/embed/videoseries?list=UUxi8wqtADZckzLvWqkW5Kvg" frameborder="0" allowfullscreen=""></iframe></div>');
        $('#load-twitter').html('<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/rezn8d" data-widget-id="426353335990353920">Tweets by @rezn8d</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');
    });


    if ($(".resources-intro")) {
        var clientHeight = $(window).height();
        $('.resources-intro').height(clientHeight);
    }

    var config = {
        siteURL		: 'climateviewer.com',	// Change this to your site
        blogURL		: 'climateviewer.org',	// Change this to your site
        searchSite	: true,
        type		: 'web',
        append		: false,
        perPage		: 8,			// A maximum of 8 is allowed by Google
        page		: 0				// The start page
    }

    // The small arrow that marks the active search icon:

    // Adding the site domain as a label for the first radio button:
    $('#siteNameLabel').append(' '+config.siteURL);

    $('#search').click(function() {
        $('#searchInContainer').slideDown( "slow");
    })

    $('#searchForm').submit(function(){
        googleSearch();
        return false;
    });

    $('#searchSite,#searchWeb').change(function(){
        // Listening for a click on one of the radio buttons.
        // config.searchSite is either true or false.

        config.searchSite = this.id == 'searchSite';
    });


    function googleSearch(settings){

        // If no parameters are supplied to the function,
        // it takes its defaults from the config object above:

        settings = $.extend({},config,settings);
        settings.term = settings.term || $('#search').val();

        if(settings.searchSite){
            // Using the Google site:example.com to limit the search to a
            // specific domain:
            settings.term = 'site:'+settings.siteURL+' '+settings.term;
        } else {
            settings.term = 'site:'+settings.blogURL+' '+settings.term;

        }

        // URL of Google's AJAX search API
        var apiURL = 'http://ajax.googleapis.com/ajax/services/search/'+settings.type+'?v=1.0&callback=?';
        var resultsDiv = $('#resultsDiv');

        $.getJSON(apiURL,{q:settings.term,rsz:settings.perPage,start:settings.page*settings.perPage},function(r){

            var results = r.responseData.results;
            $('#more').remove();

            if(results.length){

                // If results were returned, add them to a pageContainer div,
                // after which append them to the #resultsDiv:

                var pageContainer = $('<div>',{className:'pageContainer'});

                for(var i=0;i<results.length;i++){
                    // Creating a new result object and firing its toString method:
                    pageContainer.append(new result(results[i]) + '');
                }

                if(!settings.append){
                    // This is executed when running a new search,
                    // instead of clicking on the More button:
                    resultsDiv.empty();
                }

                pageContainer.append('<div class="clear"></div>')
                    .hide().appendTo(resultsDiv)
                    .fadeIn('slow');

                var cursor = r.responseData.cursor;

                // Checking if there are more pages with results,
                // and deciding whether to show the More button:

                if( +cursor.estimatedResultCount > (settings.page+1)*settings.perPage){
                    $('<div>',{id:'more'}).html('<div class="btn btn-default">More</div>').appendTo(resultsDiv).click(function(){
                        googleSearch({append:true,page:settings.page+1});
                        $(this).fadeOut();
                    });
                }
                $('#searchModal').modal();

            }
            else {

                // No results were found for this search.

                resultsDiv.empty();
                $('<p>',{className:'notFound',html:'No Results Were Found!'}).hide().appendTo(resultsDiv).fadeIn();
                $('#searchModal').modal();
            }
        });
    }

    function result(r){

        // This is class definition. Object of this class are created for
        // each result. The markup is generated by the .toString() method.

        var arr = [];

        // GsearchResultClass is passed by the google API
        switch(r.GsearchResultClass){

            case 'GwebSearch':
                arr = [
                    '<div class="webResult">',
                    '<h2><a href="',r.unescapedUrl,'" target="_blank">',r.title,'</a></h2>',
                    '<p>',r.content,'<br><a href="',r.unescapedUrl,'" target="_blank">',r.visibleUrl,'</a></p>',
                    '</div>'
                ];
                break;
        }

        // The toString method.
        this.toString = function(){
            return arr.join('');
        }
    }
    $('#cesiumContainer').click(function() {
        if ($('.control-sidebar').hasClass('control-sidebar-open')) {
            $('#siderbar-toggle').click();
        }
    });
    $('#welcomeModal').modal();
    if ($('.control-sidebar').hasClass('control-sidebar-open')) {
        $('#siderbar-toggle').addClass('active');
    }

    function shareLink() {
        var layers = "";
        var shareLink = shareURL;
        var ll = $('.lbw');

        ll.each(function() {
            var X = $(this);
            if (X.hasClass('active')) {
                var L = X.attr('id');
                layers += L + ',';
            }
        });

        var scene = viewer.scene;
        var camera = scene.camera;
        var windowPosition = new Cesium.Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
        var pickRay = viewer.scene.camera.getPickRay(windowPosition);
        var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
        var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
        var height = camera.positionCartographic.height;
        var lat = pickPositionCartographic.longitude * (180/Math.PI);
        var lon = pickPositionCartographic.latitude * (180/Math.PI);
        var zoom = height;
        var date = picker.get('select', 'yyyy-mm-dd');

        shareLink += 'index.html?';

        if (layers.length > 0)
            layers = layers.substring(0, layers.length-1);


        shareLink += 'layersOn=' + layers;
        shareLink += '&lat=' + lat;
        shareLink += '&lon=' + lon;
        shareLink += '&zoom=' + zoom;
        shareLink += '&date=' + date;


        var shareToggle = $('.share-all-layers');
        shareToggle.attr('href', shareLink).html(shareLink);

        var encodeLink = encodeURIComponent(shareLink);
        console.log(encodeLink);

        function bit_url(shareLink)
        {
            var url=shareLink;
            console.log(url);
            var username="r3zn8d"; // bit.ly username
            var key="b5c2d6d1704074b0741a7449a98e3fcef2790699";
            $.ajax({
                url:"https://api-ssl.bitly.com/v3/shorten",
                data:{longUrl:url,access_token:key,login:username},
                dataType:"jsonp",
                success:function(v)
                {
                    var bit_url=v.data.url;
                    $("#result").html('<a href="'+bit_url+'" target="_self">'+bit_url+'</a>');
                }
            });
        }
        bit_url(shareLink);
    }
    $('.share-active-layers').click( function(e){
        e.preventDefault();
        shareLink();
        $('#shareModal').modal();
    });
    var previousTime = null;
    var isoDate = function(isoDateTime) {
        return isoDateTime.split("T")[0];
    };
    var isoDateTime = clock.currentTime.toString();
        var time = "TIME=" + isoDate(isoDateTime);
    var onClockUpdate = _.throttle(function() {
        var isoDateTime = clock.currentTime.toString();
        var time = isoDate(isoDateTime);
        if ( time !== previousTime ) {
            previousTime = time;
            picker.set('select', time, { format: 'yyyy-mm-dd' })
        }
    }, 250, {leading: true, trailing: true});

    viewer.clock.onTick.addEventListener(onClockUpdate);
    onClockUpdate();
});