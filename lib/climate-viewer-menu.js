"use strict";

// drag & drop KML or KMZ files
viewer.extend(Cesium.viewerDragDropMixin);

// Set web root url
//var baseURL = 'http://localhost/';  // dev
//var proxyURL = 'kmz.php';  // dev
var baseURL = window.location.protocol + "//" + window.location.host + "/";  // production
var proxyURL = 'http://climateviewer.net/netj1/proxy';  // production
var activeLayers = { };
var infoBox = $('.cesium-infoBox');


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

function loading(layerId, done, error) {
    var b = $('#' + layerId),
    toggle = $('.toggle-menu'),
    loading = '<img src="/img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
    finished = '<img src="/img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
    icon = $('#' + layerId + '-icon');
    if (done) {
        if (error) {
            toggle.html(finished);
            b.removeClass('primary').addClass('error');
            icon.removeClass('spinner loading').addClass('warning sign');
            b.after($('<ul class="list-group layer-fail ' + layerId + '"><li class="list-group-item"><i class="fa fa-ban text-warning"></i></span> ' + error + '  The layer ID is: ' + layerId + '</li></ul>'));
        } else {
            toggle.html(finished);
            icon.removeClass('spinner loading').addClass('check');
            b.removeClass('primary').addClass('positive');
        };
    } else {
        toggle.html(loading);
        icon.removeClass('marker').addClass('spinner loading');
    }
}

function loadDetails(layerId, geoDataSrc, source, sourceUrl) {
  var b = $('#' + layerId),
  layerDetails = $('.'+ layerId),
  icon = $('#' + layerId + '-icon');

  if (icon.hasClass('spinner')) {
    if (!layerDetails.length) {
      var details = $('<div class="ui card ' + layerId + ' layer-details" />');
      b.after(details);
      var content = $('<div class="content ' + layerId + '-content" />').appendTo(details);
      $('<div class="header main"><i class="folder open outline info icon"></i>Details</div>').appendTo(content); 
      var list = $('<div class="ui divided very relaxed list ' + layerId + '-list" />').appendTo(content); 
      $('<div class="item"><i class="info icon"></i><div class="content"><div class="header">Data Provider</div>' + source + '</div></div>').appendTo(list); 
      if (b.hasClass('kml')) {
          $('<div class="item"><i class="download icon"></i><div class="content"><div class="header">Data Type</div>Keyhole Markup Language (KML)<br><a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
      }
      if (b.hasClass('geojson')) {
          $('<div class="item"><i class="download icon"></i><div class="content"><div class="header">Data Type</div>GeoJSON<br><a href="' + geoDataSrc + '">Download</a></div>').appendTo(list);
      }
      if (b.hasClass('nasa-gibs')) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        var yesterday = Cesium.JulianDate.fromDate(date);
        var time = Cesium.JulianDate.toDate(yesterday);
          $('<div class="item '+ layerId + '-info"><i class="file icon"></i><div class="content"><div class="header">Data Type</div>Web Tile Mapping Service (WTMS)</div>').appendTo(list);
          $('<div class="item '+ layerId + '-info"><i class="clock icon"></i><div class="content"><div class="header">Imagery Date</div>Click this button to change image loaded on the globe.<br><input type="button" value="" class="datepicker ui blue basic button" id="'+ layerId + '-datepicker" name="date"></div>').appendTo(list);
      }
      if (b.hasClass('wms')) {
          $('<div class="item '+ layerId + '-info"><i class="file icon"></i><div class="content"><div class="header">Data Type</div>Web Mapping Service (WMS)<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '?request=GetCapabilities&service=WMS">Get Capabilities</a></div>').appendTo(list);
      }
      if (b.hasClass('base-layer')) {
          $('<div class="item '+ layerId + '-info"><i class="file icon"></i><div class="content"><div class="header">Data Type</div>OpenStreetMap (OSM) Base Map</div>').appendTo(list);
      }
      $('<div class="extra content"><a href="' + baseURL + 'index.html?layersOn=' + layerId + '" class="right floated created">Share Layer</a><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></div>').appendTo(details);
    }
  }
}

function loadSliders(src, layerId, details) {
    $('<div class="header main imagery-controls '+ layerId + '-slider"><i class="file image outline info icon"></i>Imagery Controls</div>').appendTo(details); 
    var list = $('<div class="ui divided very relaxed list ' + layerId + '-slider" />').appendTo(details); 
    
    var opacity = NSlider({ onChange: function(newValue) { src.alpha = newValue; } });
    $('<div class="item slider '+ layerId + '-slider"><div class="content"><div class="meta"><i class="globe icon"></i> Opacity</div></div>').append(opacity).appendTo(list);
    var brightness = NSlider({ onChange: function(newValue) { src.brightness = newValue; } });
    $('<div class="item slider '+ layerId + '-slider"><div class="content"><div class="meta"><i class="globe icon"></i> Brightness</div></div>').append(brightness).appendTo(list);
    var contrast = NSlider({ onChange: function(newValue) { src.contrast = newValue; } });
    $('<div class="item slider '+ layerId + '-slider"><div class="content"><div class="meta"><i class="globe icon"></i> Contrast</div></div>').append(contrast).appendTo(list);
    var saturation = NSlider({ onChange: function(newValue) { src.saturation = newValue; } });
    $('<div class="item slider '+ layerId + '-slider"><div class="content"><div class="meta"><i class="globe icon"></i> Saturation</div></div>').append(saturation).appendTo(list);
    var gamma = NSlider({ onChange: function(newValue) { src.gamma = newValue; } });
    $('<div class="item slider '+ layerId + '-slider"><div class="content"><div class="meta"><i class="globe icon"></i> Gamma</div></div>').append(gamma).appendTo(list);
    src.alpha = 1;
    src.brightness = 1;
    src.contrast = 1;
    src.saturation = 1;
    src.gamma = 1;
}

function updateGIBS(layerId, selectedDate) {
    var b = $('#' + layerId),
    details = $('.' + layerId + '-content'),
    info = $('.' + layerId + '-info');

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

    $('.' + layerId + '-slider').remove();

    loadSliders(src, layerId, details);

    shareLink();
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
    closeOnClear: false,
  })

  var picker = $input.pickadate('picker');
  picker.set('select', time);
  picker.on({
    set: function(thingSet) {
      var selectedDate = picker.get('select', 'yyyy-mm-dd');
      updateGIBS(layerId, selectedDate);
    }
  });
}


function loadGIBS(layerId) {
    var b = $('#' + layerId),
    details = $('.' + layerId + '-content');

    createPicker(layerId);

    var picker = $( '#'+ layerId + '-datepicker' ).pickadate('picker');
    var getThisTime = "TIME=" + picker.get('select', 'yyyy-mm-dd');

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + getThisTime,
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

    $('.' + layerId + '-slider').remove();

    loadSliders(src, layerId, details);

    shareLink();
    loading(layerId, true);
}

function loadWmts(layerId, geoDataSrc, geoLayers) {
    var b = $('#' + layerId),
    details = $('.' + layerId + '-content');

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

    loadSliders(src, layerId, details);
    shareLink();
    loading(layerId, true);
}

function loadWms(layerId, geoDataSrc, geoLayers) {
    var b = $('#' + layerId),
    details = $('.' + layerId + '-content');

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
        url : geoDataSrc,
        layers : geoLayers,
        proxy: new Cesium.DefaultProxy(proxyURL),
        //  sourceUri: 'http://gis.fema.gov/SOAP//FEMA/DECs/MapServer/WMSServer',
        parameters : {
            transparent : true,
            format : 'image/png'
        }
    }));

    activeLayers[layerId] = src;

    loadSliders(src, layerId, details);
    shareLink();
    loading(layerId, true);
}


function loadOsmLayer(layerId, geoDataSrc, source) {
    var b = $('#' + layerId),
    details = $('.' + layerId + '-content');

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : geoDataSrc,
        credit : source
    }));

    activeLayers[layerId] = src;

    loadSliders(src, layerId, details);
    shareLink();
    loading(layerId, true);
}


function removeImagery(layerId) {
    var src = activeLayers[layerId];
    delete activeLayers[layerId];
    viewer.imageryLayers.remove(src, false);
}


function disableLayer(b) {
  var layerId = b.attr('id'),
  icon = $('#' + layerId + '-icon');

  if (b.hasClass('positive')) {
      // Update Globe
      if (b.hasClass("wtms") || b.hasClass("wms") || b.hasClass("base-layer")) {
        removeImagery(layerId);
      } else {
        var src = activeLayers[layerId];
        delete activeLayers[layerId];
        viewer.dataSources.remove(src);
      }
      $('.' + layerId).remove();
      // Update button
      b.removeClass('positive');
      icon.removeClass('check').addClass('marker');
      //disabledLayers[layerId];
      shareLink();

  }
}



function enableLayer(b, force) {
  if (force && (!b.hasClass('primary') || !b.hasClass('error'))) {
    // flag button as loading
   b.addClass('primary');
   for (var i = 0; i < layers.length; i++) {
    var l = layers[i];
    var layerId = b.attr('id');
        if (l.id == layerId) {
            var geoDataSrc = l.geoDataSrc,
            geoLayers = l.geoLayers,
            source = l.source,
            sourceUrl = l.sourceUrl,
            mod = l.mod,
            zoom = l.zoom,
            markerImg = l.markerImg,
            markerLabel = l.markerLabel,
            markerColor = l.markerColor,
            markerScale = l.markerScale,
            noProxy = l.noProxy,
            R = l.r, G = l.g, B = l.b, A = l.a;
            //  if (l.timeline) {
            //    timeline.show(); viewer.timeline.zoomTo(startTime, now);
            //  }

            // SHOW LOADING ICON
            loading(layerId);

            var modMarkers = function modMarkers(geoData, markerImg, markerScale, markerLabel) {
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

                if (markerColor) {
                  if (typeof markerColor == "string") {
                    billboard.color = new Cesium.Color.fromCssColorString(markerColor);
                    } else {
                    billboard.color = new Cesium.Color(R, G, B, A);
                  }
                  console.log(billboard.color);
                } else if (entity.billboard.color) {
                  billboard.color = entity.billboard.color;
                  console.log(billboard.color);
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
            }


            var success = function success(geoData, layerId, source, sourceUrl) {
              viewer.dataSources.add(geoData);
              activeLayers[layerId] = geoData;
              if (zoom) {
                viewer.flyTo(geoData.entities);
              }
            // Show Layer Details
              loadDetails(layerId, geoDataSrc, source, sourceUrl);
            // Loading Complete
              loading(layerId, true);
            };



            // Load layers by Type
            if (b.hasClass("wms")) {
              loadDetails(layerId, geoDataSrc, source, sourceUrl);
              loadWms(layerId, geoDataSrc, geoLayers);
            } else if (b.hasClass("nasa-gibs")) {
              console.log('load gibs');

              loadDetails(layerId, geoDataSrc, source, sourceUrl);
              console.log('load gibs details');
              loadGIBS(layerId);
            } else if (b.hasClass("wmts")) {
              loadDetails(layerId, geoDataSrc, source, sourceUrl);
              loadWmts(layerId, geoDataSrc, geoLayers);
            } else if (b.hasClass("base-layer")) {
              loadDetails(layerId, geoDataSrc, source, sourceUrl);
              loadOsmLayer(layerId, geoDataSrc, source);
            } else if (b.hasClass("geojson")) {
                new Cesium.GeoJsonDataSource.load(geoDataSrc).then(function (geoData) {
                  // entities = all points
                  var entities = geoData.entities.values;
                  for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    // quake magnitude
                    if (markerLabel == 'usgs-eq') {
                        var size = entity.properties.mag;
                    } else if (markerScale) {
                        var size = markerScale;
                    } else {
                      var size = 2;
                    }
                    // marker image
                    var billboard = new Cesium.BillboardGraphics();
                    billboard.image = markerImg;
                    billboard.width = '32';
                    billboard.height = '32';
                    billboard.scale = size;
                    billboard.scaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
                    entity.billboard = billboard;
                    // marker label
                    var label = new Cesium.LabelGraphics();
                    if (l.markerLabel == 'usgs-eq') {
                      label.text = 'M' + size;
                    } else {
                      label.text = '';
                    }

                    label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
                    label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                    label.outlineWidth = 5;
                    label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
                    label.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);
                    label.eyeOffset = new Cesium.Cartesian3(0.0, 50.0, 0.0);
                    entity.label = label;
                  } // end loop
                  success(geoData, layerId, source, sourceUrl);
                }, function (error) {
                  loading(layerId, true, error);
                }
              ); // end then
            } else if (b.hasClass('kml')) {
              if (l.noProxy) {
                console.log('load local');
                new Cesium.KmlDataSource.load(geoDataSrc).then(function (geoData) {
                  if (l.mod) {
                    modMarkers(geoData, markerImg, markerScale, markerLabel, R, G, B, A);
                  } // end if l.mod
                  success(geoData, layerId, source, sourceUrl);
                }, function (error) {
                    loading(layerId, true, error);
                }
              ); // end then
            } else {
                console.log('load proxy');
                new Cesium.KmlDataSource.load(geoDataSrc, {
                  proxy: new Cesium.DefaultProxy(proxyURL),
                  sourceUri: geoDataSrc
                }).then(function (geoData) {
                  if (l.mod) {
                    modMarkers(geoData, markerImg, markerScale, markerLabel);
                  } // end if l.mod
                  success(geoData, layerId, source, sourceUrl);
                }, function (error) {
                    loading(layerId, true, error);
                }
              ); // end then
            } // end proxy
          } // end KML
        } // if layer
      } // end loop
    } // if force
  } // enable layer

/* Build Sidebar */
function createMenu(includeOnly) {
  var layerAccordion = $('#map-layers');
  for (var i = 0; i < layers.length; i++) {
    var l = layers[i];
    if (typeof l == "string") {
      //add header
      if (!includeOnly) {
          var item = $('<div class="item layer-wrap"></div>').appendTo(layerAccordion);
          $('<a class="title"><i class="dropdown icon"></i>' + l + '</a>').appendTo(item);
          var layerBtnGrp = $('<div class="content"></div>').appendTo(item);
      }
    } else {
      //add layer into 'lbd'
      if (l.section) {
        if (!includeOnly) {
            layerBtnGrp.append($('<div title="' + l.section + '" class="section-title"><i class="section-icon ' + l.icon + '"></i> ' + l.section + '</div>'));
        }
      } else if (l.id) {
        var present = true;
        if (includeOnly) {
          if (includeOnly.indexOf(l.id)==-1)
            present = false;
        }
        if (present) {
          if (!layerBtnGrp) {
              var item = $('<div class="item layer-wrap"></div>').appendTo(layerAccordion);
              $('<a class="title active"><i class="dropdown icon"></i>Shared Layers</a>').appendTo(item);
              var layerBtnGrp = $('<div class="content active ui divided very relaxed list"></div>').appendTo(item);
          }
          var layerButton = $('<div id="' + l.id + '" class="item layer-button"><i id="' + l.id + '-icon" class="icon marker"></i><div class="content">' + l.name + '</div>');

          if (l.baseLayer) layerButton.addClass('base-layer');
          if (l.geojson) layerButton.addClass('geojson');
          if (l.wms) layerButton.addClass('wms');
          if (l.wmts == 'nasa-gibs') layerButton.addClass('nasa-gibs');
          if (l.wmts) layerButton.addClass('wmts');
          if (l.kml) layerButton.addClass('kml');
          if (l.zoom) layerButton.addClass('zoom');

          layerButton.appendTo(layerBtnGrp);
        }
      }
    } 
  } // end for loop
}


// CHECK URL
var disabledLayers = "";
var initialLayers = (getURLParameter("layersOn") || '').split(',');
var disabledLayers = (getURLParameter("layersOff") || '').split(",");
if (initialLayers[0] === '') initialLayers = [];
if (disabledLayers[0] === '') disabledLayers = [];
var allLayers = initialLayers.concat(disabledLayers);
// LOAD LAYERS
if (allLayers.length > 0) {
  // LOAD LAYERS FROM URL
  createMenu(allLayers);
  for (var i = 0; i < initialLayers.length; i++)
    enableLayer($('#' + initialLayers[i]), true);

  $('.layer-button').toggle(
      function () { disableLayer($(this));  },
      function () { enableLayer($(this), true); }
  );
  var list = $('.relaxed.list:last-of-type');
  $('<a class="item ui button" href="' + baseURL + '" style="display:block"><i class="fa fa-home"></i> SHOW ALL LAYERS</a>').appendTo(list);
} else {
    // Load all layers
    createMenu();
    // Hide unsupported layers
    $(".layer-wrap:contains('Unsupported')").hide();

    // Start Layer Panel Collapsed
    //$('.panel-collapse').collapse("hide");
    // Create buttons and click handler
    $('.layer-button').toggle(
      function () { enableLayer($(this), true); },
      function () { disableLayer($(this));  }
    );
  }
  setTimeout(function() {
    for (var i = 0; i < disabledLayers.length; i++) 
      $('#' + disabledLayers[i]).click();
  }, 0);

function shareLink() {
    var layers = "";
    var url = baseURL;
    if (allLayers.length > 0) {
      for (var i = 0; i < allLayers.length; i++) {
        var a = allLayers[i];
        if (! ($('#' +a).hasClass('positive'))) {
          disabledLayers += a + ',';
        }
        else {
          layers += a + ',';
        }
      }
    }
    else {
      //only enable those that are enabled and ignore the disabled ones
      var ll = $('.layer-button');
      ll.each(function() {
        var X = $(this);
        if (X.hasClass('positive')) {
          var L = X.attr('id');
          layers += L + ',';
        }       
      });
    }

    url += 'index.html?';

    if (layers.length > 0)
      layers = layers.substring(0, layers.length-1);
    url += 'layersOn=' + layers;

    if (disabledLayers.length > 0) {
      disabledLayers = disabledLayers.substring(0, disabledLayers.length-1);
      url += '&layersOff=' + disabledLayers;
    }
    $('.share-all-layers').attr('href', url).html(url);
  }


$('.share-active-layers').click( function(){
  shareLink();
  $('#shareModal').modal('show');

});


$('.tab .menu .item').tab({
    context: $('.tab')
  });

$('.ui.accordion').accordion({duration: 0, animateChildren: false});

// TOGGLE SUN
function showSun() { viewer.scene.globe.enableLighting = true; }
function hideSun() { viewer.scene.globe.enableLighting = false; }
$('.sun-control').toggle(
  function () { showSun(); $(this).addClass('active'); },
  function () { hideSun(); $(this).removeClass('active'); }
);



// SOCIAL PANEL
$('.share-tab').click(function () {
    // load comments
    $('#comments').html("<div id='disqus_thread'></div><script type='text/javascript'> var disqus_shortname = 'climateviewer3d';var disqus_url = 'http://climateviewer.net/'; (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();</script>").addClass('panel-chat');
    // load chat
    $('#chat').html('<iframe src="http://tlk.io/cvnews" class="container-fluid chat-iframe" style="height:600px"></iframe>').addClass('panel-chat');

    // load shareThis
    $('#share').html("<h3 style='margin-top:0'>Sharing is Caring</h3><span class='st_facebook_vcount' ></span><span class='st_twitter_vcount'></span><span class='st_sharethis_vcount'></span><span class='st_email_vcount'></span>").addClass('panel-share');
    $('head').append('<script type="text/javascript">var switchTo5x=true;</script><script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script><script type="text/javascript">stLight.options({publisher: "919e0e68-8cf4-433f-b1ac-049584a0a9f5", doNotHash: true, doNotCopy: true, hashAddressBar: false});</script>');
});

// TOGGLE SIDEBAR
$('#baseLayerPickerContainer').detach().prependTo($('.cesium-viewer-toolbar'));


// CLEAR LAYERS BUTTON
$('.layer-control-button').click(function () {
 $('.layer-button.positive').trigger('click');
});


var titleSpan = $(this).find($('.cesium-button-title'));
$('.cesium-button').on( 'mouseover', function () {
  $(this).find($('.cesium-button-title')).show();
}).on( 'mouseout', function () {
  $(this).find($('.cesium-button-title')).hide();
});


var menuToggle = $('.toggle-menu');
var sidebar = $('.sidebar');
menuToggle.toggle(
    function () { sidebar.show(); },
    function () { sidebar.hide(); }
);
menuToggle.click();

function toggleMenuTooltip() {
    menuToggle.tooltip('toggle');
}

function welcome() {
  $('#Greetz').modal('show').modal( { onHidden: function() { $('#Greetz').remove(); } });
}
$('.share-modal').on('click', function () {
  $('#Greetz').modal('hide');
  $('.share-tab').trigger('click');
});


setTimeout(welcome, 500);

