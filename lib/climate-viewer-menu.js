"use strict";

// Set web root url
var baseURL = window.location.protocol + "//" + window.location.host + "/";  // production
var proxyURL = 'http://climateviewer.net/netj1/proxy';  // production
//var proxyURL = 'kmz.php';  // dev
var activeLayers = {};
var infoBox = $('.cesium-infoBox');
var layerEnabled = {}; //whether the label is in some way enabled
var self = Self();


nobjectsIn(layers, function (x) {
    //console.log(x);
}, function (s, p, o) {
    self.addEdge(s, p, o);
});


// GET URL
function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
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

function loadSliders(src, layerId, gibs) {
    var target = $('#' + layerId);

    if (gibs) {  
    console.log('bigs');                  
      var picker = $('<div class="ui card ' + layerId + '-picker layer-sliders"><div class="content"><div class="ui divided list"><div class="item '+ layerId + '-info"><i class="circular inverted clock icon"></i><div class="content"><div class="header">Imagery Date</div>Click this button below to change the loaded image:<br><input type="button" value="" class="datepicker ui blue basic button" id="'+ layerId + '-datepicker" name="date"></div></div></div></div>').appendTo(target);
        createPicker(layerId);
    }

    var details = $('.' + layerId + '-details');
    var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').appendTo(target);
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
    if (details.is(':visible')) { sPanel.show(); label.show(); }
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


function createPicker(layerId) {
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
}


function loadGIBS(layerId) {
    //createPicker(layerId);

    //var picker = $( '#'+ layerId + '-datepicker' ).pickadate('picker');
    //var getThisTime = "TIME=" + picker.get('select', 'yyyy-mm-dd');
  var date = new Date();
  date.setDate(date.getDate() - 1);
  var yesterday = Cesium.JulianDate.fromDate(date);
  var time = Cesium.JulianDate.toDate(yesterday);
  var gibs = true;
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
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
    loadSliders(src, layerId, gibs);
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
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
        url : geoDataSrc,
        layers : geoLayers,
        proxy: new Cesium.DefaultProxy(proxyURL),
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



function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg) {
    console.log('load geojson');
    new Cesium.GeoJsonDataSource.load(geoDataSrc).then(function (geoData) {
        // entities = all points
        var entities = geoData.entities.values;
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            // quake magnitude
            var size = null;
            if (markerLabel == 'usgs-eq') {
                size = entity.properties.mag;
            } else if (markerScale) {
                size = markerScale;
            } else {
                size = 2;
            }
            // marker image
            var billboard = new Cesium.BillboardGraphics();
            billboard.image = markerImg;
            billboard.width = '32';
            billboard.height = '32';
            billboard.scale = size;
            //billboard.color = Cesium.Color.fromBytes(255,255,255,opacity);
            billboard.scaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
            entity.billboard = billboard;
            // marker label
            var label = new Cesium.LabelGraphics();
            if (markerLabel == 'usgs-eq') {
                label.text = 'M' + size;
            } else {
                label.text = '';
            }
            label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
            label.verticalOrigin = Cesium.VerticalOrigin.CENTER;
            label.outlineWidth = 5;
            label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
            label.eyeOffset = new Cesium.Cartesian3(0.0, 50.0, 50.0);
            label.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);
            entity.label = label;
        } // end loop
        viewer.dataSources.add(geoData);
        activeLayers[layerId] = geoData;
        // TODO loadMarkerSliders(geoData, layerId);
    }, function (error) {
        //loading(layerId, true, error);
        console.log('load geojson ' + layerId + ' failed: ' + error);
    });
  //src.alpha = opacity;
}

function loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod) {
    if (proxy) {
        new Cesium.KmlDataSource.load(geoDataSrc, {
            proxy: new Cesium.DefaultProxy(proxyURL),
            sourceUri: geoDataSrc
        }).then(function (geoData) {
          //loading(layerId, true);
          if (markerMod) {
            var entities = geoData.entities.values;
            for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
              // marker image
              var billboard = new Cesium.BillboardGraphics();

              if (markerImg) {
                  billboard.image = markerImg;
              } else if (entity.billboard.image) {
                  billboard.image = entity.billboard.image;
              } else {
                  billboard.image = 'http://climateviewer.com/gallery/cv3d.png';
              }

              billboard.width = '32';
              billboard.height = '32';
              billboard.scale = markerScale;


              billboard.scaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
              entity.billboard = billboard;
              // marker label
              if (markerLabel) {
                var label = new Cesium.LabelGraphics();
                if (entity.label.text) {
                    label.text = entity.label.text;
                } else {
                    label.text = '';
                }
                label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
                label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                label.outlineWidth = 5;
                label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
                label.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);
                label.eyeOffset = new Cesium.Cartesian3(0.0, 5000.0, 0.0);
                entity.label = label;
              }
            } // end for loop
          } // end markerMod
          viewer.dataSources.add(geoData);
          activeLayers[layerId] = geoData;
          //if (markerMod) loadMarkerSliders(geoData, layerId);

          console.log(layerId + ' loaded');
          //shareLink();
          if (zoom) {
              viewer.flyTo(geoData.entities);
          }
        }, function (error) {
            //loading(layerId, true, error);
                console.log('load kml proxy ' + layerId + ' failed: ' + error);
              var icon = $('#' + layerId + ' i');
              var span = $('#' + layerId + ' span');
              icon.removeClass('check active').addClass('close fail');
              span.removeClass('active').addClass('fail');
              console.log(layerId + ' failed to load');
          }
      ); // end then
    } else {
        new Cesium.KmlDataSource.load(geoDataSrc).then(function (geoData) {
            //loading(layerId, true);
            if (markerMod) {
              var entities = geoData.entities.values;
              for (var i = 0; i < entities.length; i++) {
                  var entity = entities[i];
                  // marker image
                  var billboard = new Cesium.BillboardGraphics();

                  if (markerImg) {
                      billboard.image = markerImg;
                  } else if (entity.billboard.image) {
                      billboard.image = entity.billboard.image;
                  } else {
                      billboard.image = 'http://climateviewer.com/gallery/cv3d.png';
                  }

                  billboard.width = '32';
                  billboard.height = '32';
                  billboard.scale = markerScale;
                  if (entity.billboard.color) billboard.color = entity.billboard.color;

                  billboard.scaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
                  entity.billboard = billboard;
                  // marker label
                  if (markerLabel) {
                      var label = new Cesium.LabelGraphics();
                      if (entity.label.text) {
                          label.text = entity.label.text;
                      } else {
                          label.text = '';
                      }
                      label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
                      label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                      label.outlineWidth = 5;
                      label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
                      label.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);
                      label.eyeOffset = new Cesium.Cartesian3(0.0, 5000.0, 0.0);
                      entity.label = label;
                  }
              } // end for loop
            } // end markerMod
            viewer.dataSources.add(geoData);
            activeLayers[layerId] = geoData;
            //shareLink();
            //if (markerMod) loadMarkerSliders(geoData, layerId);
            if (zoom) {
                viewer.flyTo(geoData.entities);
            }
          }, function (error) {
                console.log('load kml local ' + layerId + ' failed: ' + error);
              var icon = $('#' + layerId + ' i');
              var span = $('#' + layerId + ' span');
              icon.add(span).removeClass('active').addClass('fail');
              console.log(layerId + ' failed to load');
          }
        ); // end then
    } // end proxy
}

function removeImagery(layerId) {
    var src = activeLayers[layerId];
    delete activeLayers[layerId];
    viewer.imageryLayers.remove(src, false);
    //$( '#'+ layerId + '-datepicker' ).remove();
}

function disableLayer(l) {

    var layerId = l.I;

    var mlt = l.T;

    if (layerEnabled[l.I] === undefined) return;


    // Update Globe
    if (mlt === ("nasa-gibs") || mlt === ("wms") || mlt === ("base-layer")) {
        removeImagery(layerId);
        $('.' + layerId + '-sliders').remove();
        $('.' + layerId + '-picker').remove();
    } else {
        var src = activeLayers[layerId];
        delete activeLayers[layerId];
        viewer.dataSources.remove(src);
    }
    //$('.' + layerId).remove();
    // Update button
    //l.removeClass('btn-primary').addClass('btn-default');
    //icon.removeClass('fa-check');

    delete layerEnabled[layerId];
}

function updateLayer(layerId) {

    var l = self.node(layerId);
    if (!l) {
        console.error('missing layer', layerId);
        return false;
    }
    var geoDataSrc = l.G,
    geoLayers = l.L,
    //source = l.S,
    zoom = l.Z,
    markerMod = l.M,
    markerImg = l.MI,
    markerScale = l.MS,
    markerLabel = l.ML,
    //markerColor = l.MC,
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
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod);
        } else {
            console.log(layerId + ' failed to load map type: ' + l.T);
        }
        shareLink();
    }
}

function newFolderLabel(l, child, ic) {
      if (ic) {
          var icon = '<i class="' + ic + ' icon"></i>'
      } else {
          icon = ''
      }
    var menuToggle = $('<h2 class="toggle">' + icon + l.N + '</h2>').click(function () {
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


function addTree(parent/* nodes  */, lb /*target */, includeOnly) {
    var layers = self.successors(parent);
    _.each(layers, function (l) {
        var l = self.node(l),
        layerId = l.I,
        geoDataSrc = l.G,
        source = l.S,
        sourceUrl = l.U;
                        var details = null, content = null;

        var child = $('<div class="folder" />').html(l);
        if (!l.T) {
            var ic = l.icon;
            //Folder Label
            content = newFolderLabel(l, child, ic);
        } else {


            var present = true;
            if (includeOnly) {
                if (includeOnly.indexOf(l.I) === -1)
                    present = false;
            }
            if (present) {
      console.log(layerId);
                //geoLayers = l.L,
                //zoom = l.Z,
                //markerImg = l.MI,
                //markerLabel = l.ML,
                //markerColor = l.MC,
                //markerScale = l.MS,
                //markerMod = l.M,
                //largeLayer = l.H,
                //timeline = l.C,
                //proxy = l.P;

                details = $('<div class="ui card ' + layerId + '-details layer-details" />');
                details.hide(); //begin hidden
                var initDetails = function () {
                  var contentWrap = $('<div class="content ' + layerId + '-content" />').appendTo(details);
                  //$('<div class="header main"><i class="folder open outline info icon"></i>Details</div>').appendTo(content); 
                  var list = $('<div class="ui divided very relaxed list ' + layerId + '-list" />').appendTo(contentWrap); 
                  $('<div class="item"><i class="circular inverted info icon"></i><div class="content"><div class="header">Data Provider</div>' + source + '</div></div>').appendTo(list); 
                  if (l.T == ('kml')) {
                    $('<div class="item"><i class="circular inverted download icon"></i><div class="content"><div class="header">Data Source</div>Keyhole Markup Language (KML) &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
                  }
                  if (l.T == ('geojson')) {
                    $('<div class="item"><i class="circular inverted download icon"></i><div class="content"><div class="header">Data Source</div>GeoJSON &bull; <a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
                  }
                  if (l.T == ('nasa-gibs')) {
                    $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>Web Map Tile Service (WMTS)</div>').prependTo(list);
                  }
                  if (l.T == ('wms')) {
                    $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>Web Mapping Service (WMS)<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '?request=GetCapabilities&service=WMS">Get Capabilities</a></div>').appendTo(list);
                  }
                  if (l.T == ('base-layer')) {
                    $('<div class="item '+ layerId + '-info"><i class="circular inverted file icon"></i><div class="content"><div class="header">Data Type</div>OpenStreetMap (OSM) Base Map</div>').appendTo(list);
                  }
                  $('<div class="extra content"><a href="' + baseURL + 'index.html?layersOn=' + layerId + '" class="right floated created">Share Layer</a><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></div>').appendTo(details);

                    //shareLink();
                };
                var loadIcon;
                var optIcon;
                var label;
                content = $('<div>').data('l', l).attr('id', l.I).addClass('lbw').append(
                    $('<div class="lb">').append( // layer button
                        //expand layer options
                        optIcon = $('<i class="folder icon"></i>').toggle(
                          function () { 
                                if (details.children().length == 0) {
                                    initDetails();
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
                        ), 
/*
                        .click(function () {
                            if (details.is(':hidden')) {
                                if (details.children().length == 0) {
                                    initDetails();
                                }
                                details.show();
                                details.focus();
                                optIcon.addClass('open outline active');
                                $('.' + l.I + '-sliders').show();
                                $('.' + l.I + '-picker').show();
                            } else {
                                $('.' + l.I + '-sliders').hide();
                                $('.' + l.I + '-picker').hide();
                                details.hide();
                                optIcon.removeClass('open outline active');
                            }
                        }), */
                        loadIcon = $('<i class="play icon"></i>').toggle(
                          function () { 
                            updateLayer(layerId); 
                            loadIcon.removeClass('play').addClass('check active'); 
                            if (details.is(':visible')) $('.' + l.I + '-picker').show(); 
                            if (!label.hasClass('active')) label.addClass('active'); 
                            if (!content.hasClass('active')) content.addClass('active'); 
                          },
                          function () { 
                            disableLayer(l); 
                            loadIcon.removeClass('check active').addClass('play'); 
                            $('.' + l.I + '-picker').hide(); 
                            if (label.hasClass('active')) label.removeClass('active');
                            if (content.hasClass('active')) content.removeClass('active');
                          }
                        ), 

                        label = $('<span class="label"></span>').html(l.N).toggle(
                          function () { if (!label.hasClass('active')) { label.addClass('active'); loadIcon.trigger('click'); } },
                          function () { if (label.hasClass('active')) { label.removeClass('active'); loadIcon.trigger('click'); } }
                        )

                    ), //end layer button
                    //details panel, starts hidden:
                    details
                ); // end content
                content.addClass(l.T);
            }
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

    _.each(self.sources(), function (s) {
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
      updateLayer($('#' + initialLayers[i])); 
      console.log(initialLayers[i]);
      //$('#' + initialLayers[i]).trigger('click');
    }
    $('.folder:empty').remove();
    $('.folder').show();
    $('h2.toggle').hide();

    $('<a class="button" href="' + baseURL + '" style="display:block;text-align:center;padding:20px 0;"><i class="home icon"></i> SHOW ALL LAYERS</a>').appendTo('#layers');
} else {
    initLayers();
}
setTimeout(function () {
    for (var i = 0; i < disabledLayers.length; i++)
        $('#' + disabledLayers[i]).click();
}, 0);

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
    $('#comments').html("<h3><i class='comments icon'></i> Comment</h3><div id='disqus_thread'></div><script type='text/javascript'> var disqus_shortname = 'climateviewer3d';var disqus_url = 'http://climateviewer.net/'; (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();</script>").addClass('panel-comments');
    // load shareThis
    $('#share').html("<h3 style='margin-top:0'><i class='heart icon'></i>Sharing is Caring</h3><span class='st_facebook_vcount' ></span><span class='st_twitter_vcount'></span><span class='st_sharethis_vcount'></span><span class='st_email_vcount'></span>").addClass('panel-share');
    $('head').append('<script type="text/javascript">var switchTo5x=true;</script><script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script><script type="text/javascript">stLight.options({publisher: "919e0e68-8cf4-433f-b1ac-049584a0a9f5", doNotHash: true, doNotCopy: true, hashAddressBar: false});</script>');
});
$('#chat').click(function () {
    $('#chat').prepend('<iframe src="http://tlk.io/cvnews" class="container-fluid chat-iframe" style="height:600px"></iframe>');
    $('.chat-title').html('<i class="comments outline icon"></i>BE NICE');
});

// MAP MODE BUTTONS
$('.mode-3d').click(function () {
 viewer.scene.morphTo3D()
});
$('.mode-2d').click(function () {
 viewer.scene.morphTo2D()
});
$('.mode-flat-earth').click(function () {
 viewer.scene.morphToColumbusView()
});
$('.cesium-baseLayerPicker-sectionTitle').prepend('<i class="globe icon" style="margin-right:7px"></i>');


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

var animationContainer = $('.cesium-viewer-animationContainer');
var timelineContainer = $('.cesium-viewer-timelineContainer');
var credit = $('.cesium-viewer-bottom');

function toggleTimeline() {
  if (animationContainer.is(":visible")) {
    animationContainer.hide();
    timelineContainer.hide();
  } else {
    animationContainer.show();
    timelineContainer.show();
    var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8)));
    var endTime = Cesium.JulianDate.now(); 
    viewer.timeline.zoomTo(startTime, endTime);  }
}
$('.toggle-timeline').click(function () {
  toggleTimeline()
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
$('.cesium-viewer-geocoderContainer').detach().appendTo($('#layers'));
$('.cesium-geocoder-input').addClass('cesium-geocoder-input-wide');

// Clear welcome modal content box (for video embeds)
function baleeted() { $('#Greetz').remove(); }

// Modal FAQ
$('.ui.accordion').accordion({duration: 0, animateChildren: false});
function welcome() {
  $('#Greetz').modal('show').modal( { onHidden: function() { setTimeout(baleeted, 1000) } });
  $('.cv-controlbar').show();
    $('.cesium-viewer-bottom').css('left', '0');
  $('.cesium-viewer-bottom').show();
}

$('.close-greetz').click(function () {
  $('#Greetz').modal('hide');
});


$('.share-modal').on('click', function () {
  $('#Greetz').modal('hide');
  $('.show-menu').trigger('click');
});

setTimeout(welcome, 500);
