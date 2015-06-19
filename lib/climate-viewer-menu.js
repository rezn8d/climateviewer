"use strict";

// drag & drop KML or KMZ files
viewer.extend(Cesium.viewerDragDropMixin);

// Set web root url
//var baseURL = 'http://localhost/';  // dev
var baseURL = 'http://climateviewer.net/';  // production
var proxyURL = 'http://climateviewer.net/netj1/proxy';  // production
//var proxyURL = 'kmz.php';  // dev
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

// NASA GIBS Layers
function updateNasa(layerId) {
    var b = $('#' + layerId);
    var d = $('.' + layerId);
    // Update on timeline slider adjust
    var onClockUpdate = _.throttle(function() {
        var isoDateTime = viewer.clock.currentTime.toString(),
            isoDate = function(isoDateTime) {return isoDateTime.split("T")[0];},
            time = "TIME=" + isoDate(isoDateTime),
            current = Cesium.JulianDate.toDate(viewer.clock.currentTime);

        if ( time !== previousTime ) {
            previousTime = time;
            if ( activeLayers[layerId] ) {
                $('.' + layerId).remove();
                removeImagery(layerId);
            }
            b.addClass('nasa-update');
            loadWtms(layerId);
            // Reset layer adjustment sliders
            $('.nasa-time').html(current);
        }
    }, 500);
    // Add timeline listener
    viewer.clock.onTick.addEventListener(onClockUpdate);
    onClockUpdate();
    // Remove timeline listener
    b.one('click', function() {
        viewer.clock.onTick.removeEventListener(onClockUpdate);
    });
}

function loadWtms(layerId) {
    var b = $('#' + layerId),
        ld = $('.'+ layerId),
        source = b.attr('data-source'),
        sourceUrl = b.attr('data-source-url'),
        toggle = $('.toggle-menu'),
        loading = '<img src="/img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        done = '<img src="/img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        icon = b.find('i');
    toggle.html(loading);
    icon.addClass('fa-spinner fa-pulse');

    var isoDateTime = viewer.clock.currentTime.toString();
    var isoDate = function(isoDateTime) {return isoDateTime.split("T")[0];};
    var getThisTime = "TIME=" + isoDate(isoDateTime);

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

    if (!ld.length) {
        b.removeClass('btn-default').addClass('btn-primary');
        icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
        var details = $('<ul class="list-group layer-details '+ layerId +'" />');
        b.after(details);
        $('<li class="list-group-item"><strong>SLIDE TIMELINE TO LOAD IMAGES</strong></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Data Provider:</strong> ' + source + ' &bull; <a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></li>').appendTo(details);
        var time = Cesium.JulianDate.toDate(viewer.clock.currentTime);
        $('<li class="list-group-item"><strong>Imagery Date:</strong> <span id="' + layerId + '-time" class="nasa-time">' + time + '</span></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Share:</strong> <a class="btn btn-xs btn-info" href="' + baseURL + 'index.html?layersOn=' + layerId + '">This Layer</a> <a class="btn btn-xs btn-info" data-toggle="modal" data-target="#shareModal" href="' + baseURL + '" >Active Layers</a></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Data Type:</strong> Web Tile Mapping Service (WTMS)</li>').appendTo(details);
    var opacity = NSlider({ onChange: function(newValue) { src.alpha = newValue; } }).css({ borderLeftWidth: '100px' });
    $('<li class="list-group-item nasa-slider"><strong>Opacity:</strong> </li>').append(opacity).appendTo(details);
    var brightness = NSlider({ onChange: function(newValue) { src.brightness = newValue; } });
    $('<li class="list-group-item nasa-slider"><strong>Brightness:</strong> </li>').append(brightness).appendTo(details);
    var contrast = NSlider({ onChange: function(newValue) { src.contrast = newValue; } });
    $('<li class="list-group-item nasa-slider"><strong>Contrast:</strong> </li>').append(contrast).appendTo(details);
    src.alpha = 0.5;
    src.brightness = 1;
    src.contrast = 1;
    }

    shareLink();
    if (b.hasClass('nasa-update')) { } else {
        updateNasa(layerId);
    }
    toggle.html(done);
    icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
}

function loadWms(layerId) {
    var b = $('#' + layerId),
        ld = $('.'+ layerId),
        geoDataSrc = b.attr('href'),
        wmsLayers = b.attr('data-layers'),
        source = b.attr('data-source'),
        sourceUrl = b.attr('data-source-url'),
        toggle = $('.toggle-menu'),
        loading = '<img src="/img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        done = '<img src="/img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        icon = b.find('i');

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
        url : geoDataSrc,
        layers : wmsLayers,
        proxy: new Cesium.DefaultProxy(proxyURL),
        //  sourceUri: 'http://gis.fema.gov/SOAP//FEMA/DECs/MapServer/WMSServer',
        parameters : {
            transparent : true,
            format : 'image/png'
        }
    }));

    activeLayers[layerId] = src;

    if (!ld.length) {

        b.removeClass('btn-default').addClass('btn-primary');
        icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
        toggle.html(done);
        var details = $('<ul class="list-group layer-details '+ layerId +'" />');
        b.after(details);
        $('<li class="list-group-item"><strong>Data Provider:</strong> ' + source + ' &bull; <a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Data Type:</strong> Web Mapping Service (WMS) <a  class="btn btn-xs btn-info" target="_blank" rel="nofollow" href="' + geoDataSrc + '?request=GetCapabilities&service=WMS"><i class="fa fa-download"></i> Capabilities</a></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Share:</strong> <a class="btn btn-xs btn-info" href="' + baseURL + 'index.html?layersOn=' + layerId + '">This Layer</a> <a class="btn btn-xs btn-info" data-toggle="modal" data-target="#shareModal" href="#shareModal">Active Layers</a></li>').appendTo(details);
        shareLink();
        var opacity = NSlider({ onChange: function(newValue) { src.alpha = newValue; } }).css({ borderLeftWidth: '100px' });
        $('<li class="list-group-item"><strong>Opacity:</strong> </li>').append(opacity).appendTo(details);
        var brightness = NSlider({ onChange: function(newValue) { src.brightness = newValue; } }).css({ borderLeftWidth: '200px' });
        $('<li class="list-group-item"><strong>Brightness:</strong> </li>').append(brightness).appendTo(details);
        var contrast = NSlider({ onChange: function(newValue) { src.contrast = newValue; } }).css({ borderLeftWidth: '200px' });
        $('<li class="list-group-item"><strong>Contrast:</strong> </li>').append(contrast).appendTo(details);
        src.alpha = 0.5;
        src.brightness = 1;
        src.contrast = 2;
    }
}

function removeImagery(layerId) {
    var src = activeLayers[layerId];
    delete activeLayers[layerId];
    viewer.imageryLayers.remove(src, false);
}


function loadBaseLayer(layerId) {
    var b = $('#' + layerId),
        ld = $('.'+ layerId),
        geoDataSrc = b.attr('href'),
        source = b.attr('data-source'),
        sourceUrl = b.attr('data-source-url'),
        toggle = $('.toggle-menu'),
        loading = '<img src="/img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        done = '<img src="/img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        icon = b.find('i');

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
        url : geoDataSrc,
        credit : source
    }));
    activeLayers[layerId] = src;

    if (!ld.length) {

        b.removeClass('btn-default').addClass('btn-primary');
        icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
        toggle.html(done);
        var details = $('<ul class="list-group layer-details '+ layerId +'" />');
        b.after(details);
        $('<li class="list-group-item"><strong>Data Provider:</strong> ' + source + ' &bull; <a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Share:</strong> <a class="btn btn-xs btn-info" data-toggle="modal" data-target="#shareModal" href="#shareModal">Active Layers</a> <a class="btn btn-xs btn-info" href="' + baseURL + 'index.html?layersOn=' + layerId + '">This Layer</a></li>').appendTo(details);
        shareLink();
        var opacity = NSlider({ onChange: function(newValue) { src.alpha = newValue; } }).css({ borderLeftWidth: '100px' });
        $('<li class="list-group-item"><strong>Opacity:</strong> </li>').append(opacity).appendTo(details);
        var brightness = NSlider({ onChange: function(newValue) { src.brightness = newValue; } });
        $('<li class="list-group-item"><strong>Brightness:</strong> </li>').append(brightness).appendTo(details);
        var contrast = NSlider({ onChange: function(newValue) { src.contrast = newValue; } });
        $('<li class="list-group-item"><strong>Contrast:</strong> </li>').append(contrast).appendTo(details);
        src.alpha = 0.5;
        src.brightness = 1;
        src.contrast = 1;
    }
}

function removeBaseLayer(layerId) {
    var src = activeLayers[layerId];
    delete activeLayers[layerId];
    viewer.imageryLayers.remove(src, false);
}


function disableLayer(b) {
  var layerId = b.attr('id'),
  icon = b.find('i');
  // Update Globe
  if (b.hasClass("nasa-gibs") || b.hasClass("wms")) {
    removeImagery(layerId);
  } else if (b.hasClass("base-layer")) {
    removeBaseLayer(layerId);
  } else {
    var src = activeLayers[b.attr('href')];
    delete activeLayers[b.attr('href')];
    viewer.dataSources.remove(src);
  }
  $('.' + layerId).remove();
  // Update button
  b.removeClass('btn-primary').addClass('btn-default');
  icon.removeClass('fa-check');
}


function enableLayer(b, force) {
  if (force && b.hasClass('btn-default')) {
    b.removeClass('btn-default').addClass('btn-info');
    var layerId = b.attr('id'),
        ld = $('.'+ layerId),
        geoDataSrc = b.attr('href'),
        source = b.attr('data-source'),
        sourceUrl = b.attr('data-source-url'),
        markerImg = b.attr('data-marker-image'),
        toggle = $('.toggle-menu'),
        loading = '<img src="/img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        done = '<img src="/img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        icon = b.find('i');
    // SHOW LOADING ICON
    toggle.html(loading);
    icon.addClass('fa-spinner fa-pulse');
    // Store layer
    var save = function (src) {
      if (src)
        viewer.dataSources.add(src);
      activeLayers[geoDataSrc] = src;
    };
    // Show Layer Details
    var success = function success(geoData) {
      icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
      toggle.html(done);
      if (b.hasClass('zoom')) {
        viewer.flyTo(geoData.entities);
      }
        if (!ld.length) {
            var details = $('<ul class="list-group layer-details ' + layerId + '" />');
            b.after(details);
            $('<li class="list-group-item"><strong>Data Provider:</strong> ' + source + ' &bull; <a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a></li>').appendTo(details);
            if (b.hasClass('kml')) {
                $('<li class="list-group-item"><strong>Data Type:</strong> Keyhole Markup Language (KML) <a class="btn btn-xs btn-info" href="' + geoDataSrc + '"><i class="fa fa-download"></i> Download</a></li>').appendTo(details);
            }
            if (b.hasClass('geojson')) {
                $('<li class="list-group-item"><strong>Data Type:</strong> GeoJSON <a class="btn btn-xs btn-info" target="_blank" rel="nofollow" href="' + geoDataSrc + '"><i class="fa fa-download"></i> Download</a></li>').appendTo(details);
            }
            $('<li class="list-group-item"><strong>Share:</strong> <a class="btn btn-xs btn-info" href="' + baseURL + 'index.html?layersOn=' + layerId + '">This Layer</a> <a href="#shareModal" class="btn btn-xs btn-info" data-toggle="modal" data-target="#shareModal">Active Layers</a></li>').appendTo(details);
        }
      b.removeClass('btn-info').addClass('btn-primary');
      shareLink();
    };

    // Show Error Details
    var fail = function fail(error) {
      var details = $('<ul class="list-group layer-fail"><li class="list-group-item"><i class="fa fa-ban text-warning"></i></span> ' + error + '</li></ul>');
      b.after(details);
      b.removeClass('btn-default').addClass('btn-warning');
      icon.removeClass('fa-spinner fa-pulse').addClass('fa-exclamation-triangle');
      toggle.html(done);
    };

    // Load layers by Type
    if (b.hasClass("wms")) {
      loadWms(layerId);
      shareLink();
    } else if (b.hasClass("wtms")) {
      loadWtms(layerId);
      shareLink();
    } else if (b.hasClass("base-layer")) {
      loadBaseLayer(layerId);
      shareLink();
    } else if (b.hasClass("geojson")) {
        new Cesium.GeoJsonDataSource.load(geoDataSrc, {
         //   markerSymbol: 'cross', // https://www.mapbox.com/maki/
         //   markerSize: '48',
         //   markerColor: Cesium.Color.CORNFLOWERBLUE
        }).then(function (geoData) {
                // save(geoData);
                viewer.dataSources.add(geoData);
                activeLayers[geoDataSrc] = geoData;
                // entities = all points
                var entities = geoData.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    // quake magnitude
                    var mag = entity.properties.mag;
                    // marker image
                    var billboard = new Cesium.BillboardGraphics();
                    billboard.image = 'http://climateviewer.com/gallery/earthquakes.png';
                    billboard.width = '32';
                    billboard.height = '32';
                    billboard.scale = mag;
                    billboard.scaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
                    entity.billboard = billboard;
                    // marker label
                    var label = new Cesium.LabelGraphics();
                    label.text = 'M' + mag;
                    label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
                    label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                    label.outlineWidth = 5;
                    label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
                    label.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);
                    label.eyeOffset = new Cesium.Cartesian3(0.0, 50.0, 0.0);
                    entity.label = label;
                }
                success(geoData);
            }, function (error) {
                fail(error);
            });
    } else if (b.hasClass('kml')) {
      new Cesium.KmlDataSource.load(geoDataSrc, {
        proxy: new Cesium.DefaultProxy(proxyURL),
        sourceUri: geoDataSrc
      }).then(function (geoData) {
            save(geoData);
            success(geoData);
          }, function (error) {
            fail(error);
          });
    }
  }}

/* Build Sidebar */
function loadLayers(includeOnly) {
  var panelContainer = $('#map-layers');
  for (var i = 0; i < layers.length; i++) {
    var l = layers[i];
    if (typeof l == "string") {
      //add header
      if (!includeOnly) {
          panelContainer.append('<div class="panel-heading" role="tab" id="heading-' + l + '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#' + l + '" aria-expanded="false" aria-controls="' + l + '">' + l + '</a></h4></div>');
          var layerBtnGrpWrap = $('<div id="' + l + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-' + l + '"></div>').appendTo(panelContainer);
          var layerBtnGrp = $('<div class="panel-body panel-main"></div>').appendTo(layerBtnGrpWrap);
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
              panelContainer.append('<div class="panel-heading" role="tab" id="headingShared"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseShared" aria-expanded="false" aria-controls="collapseShared">Shared Layers</a></h4></div>');
              var layerBtnGrpWrap = $('<div id="collapseShared" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingShared"></div>').appendTo(panelContainer);
              var layerBtnGrp = $('<div class="panel-body panel-main"></div>').appendTo(layerBtnGrpWrap);
          }
          var layerButton = $('<a id="' + l.id + '" class="btn btn-default btn-sm layer-button" href="' + l.geoDataSrc + '" data-layers="' + l.wmsLayers + '" data-source="' + l.source + '" data-source-url="' + l.sourceURL + '" data-marker-image="' + l.markerImg + '"><i class="fa "></i> ' + l.name + '</a>');
          if (l.baseLayer) layerButton.addClass('base-layer');
          if (l.geojson == 'usgs-eq') layerButton.addClass('geojson usgs-eq');
          if (l.wms) layerButton.addClass('wms');
          if (l.wmts) layerButton.addClass('wtms');
          if (l.wmts == 'nasa-gibs') layerButton.addClass('nasa-gibs');
          if (l.kml == 'neo') layerButton.addClass('neo');
          if (l.kml) layerButton.addClass('kml');
          if (l.zoom) layerButton.addClass('zoom');
            layerButton.appendTo(layerBtnGrp);
        }
      }
    } 
  } // end for loop
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
  loadLayers(allLayers);
  for (var i = 0; i < initialLayers.length; i++)
    enableLayer($('#' + initialLayers[i]), true);

  $('.layer-button').toggle(
      function (e) { e.preventDefault(); disableLayer($(this));  },
      function (e) { e.preventDefault(); enableLayer($(this), true); }
  );
  $('.layer-button i').addClass('fa-map-marker');
  $('<a class="btn btn-sm btn-primary" href="' + baseURL + '" style="display:block"><i class="fa fa-home"></i> SHOW ALL LAYERS</a>').appendTo('#accordion .panel-main');
} else {
    // Load all layers
    loadLayers();
    // Hide unsupported layers
    $('#heading-Unsupported').hide();

    // Start Layer Panel Collapsed
    $('.panel-collapse').collapse("hide");
    // Create buttons and click handler
    $('.layer-button').toggle(
      function (e) { e.preventDefault(); enableLayer($(this), true); },
      function (e) { e.preventDefault(); disableLayer($(this));  }
    );
  }
  setTimeout(function() {
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
        if (! ($('#' +a).hasClass('btn-primary'))) {
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
        if (X.hasClass('btn-primary')) {
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
  var shareToggle = $('.share-all-layers');
    shareToggle.attr('href', url).html(url);
  }



// TOGGLE SUN
function showSun() { viewer.scene.globe.enableLighting = true; }
function hideSun() { viewer.scene.globe.enableLighting = false; }
$('.sun-control').toggle(
  function () { showSun(); $(this).addClass('sun-on').removeClass('sun-off'); },
  function () { hideSun(); $(this).addClass('sun-off').removeClass('sun-on'); }
);

$('div.panel-heading').click(function (event) {
  var $target = $(event.target);
  $target.find('a:first-of-type').click();
});

// CLEAR LAYERS ON HOME BUTTON CLICK
$('.cesium-home-button').click(function () {
 $('.btn-primary').trigger('click');
});

// SOCIAL PANEL
$('.share-panel').click(function () {
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

var menuToggle = $('.toggle-menu');
menuToggle.toggle(
    function () { $('.sidebar').show(); },
    function () { $('.sidebar').hide(); }
);
menuToggle.click();

function toggleMenuTooltip() {
    menuToggle.tooltip('toggle');
}

function welcome() {
  $('#Greetz').modal('show').on('hidden.bs.modal', function (e) {
      if ($('body').hasClass('mobile')) {
          // is mobile
          menuToggle.tooltip({
              placement: 'left',
              title: 'Click here to show/hide the layer menu'
          });
          setTimeout(toggleMenuTooltip, 500);
          setTimeout(toggleMenuTooltip, 7000);
      } else {
          menuToggle.tooltip({
              placement: 'right',
              title: 'Click here to show/hide the layer menu'
          });
          setTimeout(toggleMenuTooltip, 500);
          setTimeout(toggleMenuTooltip, 7000);
      }
  });
}

setTimeout(welcome, 500);

