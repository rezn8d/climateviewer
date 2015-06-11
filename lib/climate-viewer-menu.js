"use strict"
// drag & drop KML or KMZ files
viewer.extend(Cesium.viewerDragDropMixin);

// Set web root url
var baseURL = 'http://localhost/climateviewer/';  // dev
//var baseURL = 'http://climateviewer.com/beta3/';  // production
var activeLayers = { };
var enabledLayers = { };
var disabledLayers = { };
var randomNum = Math.floor((Math.random() * 100000000) + 1);


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

function disableLayer(b) {
  var layerId = b.attr('id'),
  icon = b.find('i');
  // Update Globe
  if (b.hasClass("nasa-layer")) {
    removeNasa(layerId);
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
  var layerId = b.attr('id'),
  geoDataSrc = b.attr('href'),
  source = b.attr('data-source'),
  sourceUrl = b.attr('data-source-url'),
  toggle = $('.toggle-menu'),
  loading = '<img src="img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
  done = '<img src="img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
  icon = b.find('i');
  // SHOW LOADING ICON
  toggle.html(loading);
  icon.addClass('fa-spinner fa-pulse');
  // Store layer
  var save = function(src) {
    if (src)          
    viewer.dataSources.add(src);
    activeLayers[geoDataSrc] = src;
  }
  // Show Layer Details
  function success(geoData) {
    b.removeClass('btn-default').addClass('btn-primary');
    icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
    toggle.html(done);
    if (b.hasClass('zoom')) {
      viewer.flyTo(geoData.entities);
    }
    var details = $('<ul class="list-group layer-details '+ layerId +'" />');
    b.after(details);
    $('<li class="list-group-item"><strong>Data Provider:</strong> ' + source + '<br><strong><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a> &bull; <a href="' + baseURL + 'index.html?layersOn=' + layerId + '">Share Layer</a></strong></li>').appendTo(details);
    if (b.hasClass('kml')) {
      $('<li class="list-group-item"><strong>Data Type:</strong> Keyhole Markup Language (KML) <span class="badge"><a class="more-info" href="' + geoDataSrc + '"><i class="fa fa-download"></i> Download</a></span></li>').appendTo(details);
    }
    if (b.hasClass('geojson')) {
      $('<li class="list-group-item"><strong>Data Type:</strong> GeoJSON <span class="badge"><a class="more-info" href="' + geoDataSrc + '"><i class="fa fa-download"></i> Download</a></span></li>').appendTo(details);
    }
  }
  // Show Error Details
  function fail(error) {
    var details = $('<ul class="list-group layer-fail"><li class="list-group-item"><i class="fa fa-ban text-warning"></i></span> ' + error + '</li></ul>');
    b.after(details);
    b.removeClass('btn-default').addClass('btn-warning');
    icon.removeClass('fa-spinner fa-pulse').addClass('fa-exclamation-triangle');
    toggle.html(done);
  }

  // Load layers by Type
  if (b.hasClass("usgs-eq")) {
    new Cesium.GeoJsonDataSource.load(geoDataSrc, {
        markerSymbol: 'danger', // icon names https://www.mapbox.com/maki/
        markerSize: '48',
        markerColor: Cesium.Color.GOLD
    }).then( function(geoData) { save(geoData); success(geoData); }, function (error) { fail(error); } );
  } else if (b.hasClass("nasa-layer")) {
    loadNasa(layerId);
  } else if (b.hasClass('proxy') && b.hasClass('kml')) {
    new Cesium.KmlDataSource.load(geoDataSrc, {
        proxy: new Cesium.DefaultProxy(baseURL + 'kmz.php'),
        sourceUri: geoDataSrc
    }).then( function(geoData) { save(geoData); success(geoData); }, function (error) { fail(error); } );
  } else if (b.hasClass('kml')) {
      new Cesium.KmlDataSource().load(geoDataSrc).then( function(geoData) { save(geoData); success(geoData); }, function (error) { fail(error); } );
  }
}

/* Build Sidebar */
function loadLayers(includeOnly) {
  var lb = $('#accordion .panel');
  var lbc = null;
  var lbd = null;
  var lbe = null;
  for (var i = 0; i < layers.length; i++) {
    var l = layers[i];
    if (typeof l == "string") {
      //add header
      if (!includeOnly) {
        var ranId = Math.floor((Math.random() * 100000000) + 1);
        lb.append('<div class="panel-heading" role="tab" id="heading-' + l + '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#' + l + '" aria-expanded="false" aria-controls="' + l + '">' + l + '</a></h4></div>')
        lbc = $('<div id="' + l + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-' + l + '"></div>').appendTo(lb);
        lbd = $('<div class="panel-body panel-main"></div>').appendTo(lbc);
      }
    } else {
      //add layer into 'lbd'
      if (l.section) {
        if (!includeOnly) {
          lbd.append($('<div title="' + l.section + '" class="section-title"><i class="section-icon ' + l.icon + '"></i> ' + l.section + '</div>'));                                
        }
      } else if (l.id) {
        var present = true;
        if (includeOnly) {
          if (includeOnly.indexOf(l.id)==-1)
            present = false;
        }
        if (present) {
          if (!lbd) {
            lb.append('<div class="panel-heading" role="tab" id="heading' + ranId + '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + ranId + '" aria-expanded="false" aria-controls="collapse' + ranId + '">Shared Layers</a></h4></div>')
            lbc = $('<div id="collapse' + ranId + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + ranId + '"></div>').appendTo(lb);
            lbd = $('<div class="panel-body panel-main"></div>').appendTo(lbc);                      
          }
          lbe = $('<a id="' + l.id + '" class="btn btn-default btn-sm layer-button" href="' + l.geoDataSrc + '" data-source="' + l.source + '" data-source-url="' + l.sourceURL + '"><i class="fa "></i> ' + l.name + '</a>');
          lbe.appendTo(lbd);
          if (l.geojson == 'usgs-eq') { 
            lbe.addClass('geojson usgs-eq');
          }
          if (l.wmts == 'nasa-gibs') { 
            lbe.addClass('nasa-layer');
          }
          if (l.kml == 'neo') { 
            lbe.addClass('neo');
          } 
          if (l.kml) { 
            lbe.addClass('kml');
          }
          if (l.zoom) { 
            lbe.addClass('zoom');
          }
          if (l.proxy) { 
            lbe.addClass('proxy');
          }
          
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
    $('.layer-button').click(function(e) {
      e.preventDefault();
      var b = $(this)
      if (b.hasClass('btn-default')) {
        enableLayer(b);
      } else if (b.hasClass('btn-primary')) {
        disableLayer(b);
      } else return;
    }); 
    $('.layer-button').button(); 
    var b = $('<a class="btn btn-sm btn-primary" href="' + baseURL + '" style="display:block"><i class="fa fa-home"></i> SHOW ALL LAYERS</a>').appendTo('#accordion .panel-main');
  } else { 
    // Load all layers
    loadLayers();
    // Start Layer Panel Collapsed
    $('.panel-collapse').collapse("hide");
    // Create buttons and click handler
    $('.layer-button').click(function(e) {
      e.preventDefault();
      var b = $(this)
      if (b.hasClass('btn-default')) {
        enableLayer(b);
      } else if (b.hasClass('btn-primary')) {
        disableLayer(b);
      } else return;
    }); 

    console.log('all loaded'); 
  }
  setTimeout(function() {
    for (var i = 0; i < disabledLayers.length; i++) 
      $('#' + disabledLayers[i]).click();
  }, 0);

/*  $('.shareLink').click(function() {
    var layers = "";
    var disabledLayers = "";
    var url = baseURL;
    if (allLayers.length > 0) {
      for (var i = 0; i < allLayers.length; i++) {
        var a = allLayers[i];
        if (! ($('#' +a).hasClass('active-layer'))) {
          disabledLayers += a + ',';
        }
        else {
          layers += a + ',';
        }
      }
    }
    else {
      //only enable those that are enabled and ignore the disabled ones
      var ll = $('.layer');
      ll.each(function() {
        var X = $(this);
                if (X.hasClass('user-layer')) { 
                } else
        if (X.hasClass('active-layer')) {
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
        $('#share').html('<h3>Share Active Layers</h3><p>Bookmark or share this URL to save your currently active layers:</p><p><a class="self" href="' + url + '" title="My custom CV3D map">' + url + '</a></p>');


  });
*/

// NASA GIBS Layers
function updateNasa(layerId) {
  var b = $('#' + layerId);
  // Update on timeline slider adjust
  var onClockUpdate = _.throttle(function() {
    var isoDateTime = viewer.clock.currentTime.toString(),
    isoDate = function(isoDateTime) {return isoDateTime.split("T")[0];},  
    time = "TIME=" + isoDate(isoDateTime),
    current = Cesium.JulianDate.toDate(viewer.clock.currentTime);

    if ( time !== previousTime ) {
      previousTime = time;
      if ( activeLayers[layerId] ) {
          removeNasa(layerId);
      }
      loadNasa(layerId);
      // Reset layer adjustment sliders
      $('#' + layerId + '-time').html(current);
      $('#' + layerId + '-opacity').slider('setValue', 0.5);
      $('#' + layerId + '-brightness').slider('setValue', 1);
      $('#' + layerId + '-contrast').slider('setValue', 1);
    }
  }, 1000);
  // Add timeline listener
  viewer.clock.onTick.addEventListener(onClockUpdate);
  onClockUpdate(); 
  // Remove timeline listener
  b.one('click', function() {
        viewer.clock.onTick.removeEventListener(onClockUpdate);
  });
}

function loadNasa(layerId) { 
  var b = $('#' + layerId),
  ld = $('.'+ layerId),
  source = b.attr('data-source'),
  sourceUrl = b.attr('data-source-url'),
  toggle = $('.toggle-menu'),
  loading = '<img src="img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
  done = '<img src="img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
  icon = b.find('i');

  var isoDateTime = viewer.clock.currentTime.toString();
  var isoDate = function(isoDateTime) {return isoDateTime.split("T")[0];};  
  var time = "TIME=" + isoDate(isoDateTime);

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
  src.alpha = 0.5;

  activeLayers[layerId] = src;

  if (!ld.length) {

    b.removeClass('btn-default').addClass('btn-primary');
    icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
    toggle.html(done);
    var details = $('<ul class="list-group layer-details '+ layerId +'" />');
    b.after(details);
    $('<li class="list-group-item"><strong>Data Provider:</strong> ' + source + '<br><strong><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a> &bull; <a href="' + baseURL + 'index.html?layersOn=' + layerId + '">Share Layer</a></strong></li>').appendTo(details);
    var time = Cesium.JulianDate.toDate(viewer.clock.currentTime);
    $('<li class="list-group-item"><strong>Imagery Date:</strong> <span id="' + layerId + '-time">' + time + '</span></li>').appendTo(details);
    $('<li class="list-group-item"><strong>Opacity:</strong> <input id="' + layerId + '-opacity" type="text" value="" data-slider-min="0" data-slider-max="1" data-slider-step=".01" data-slider-value="0.5" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></li>').appendTo(details);
    $('<li class="list-group-item"><strong>Brightness:</strong> <input id="' + layerId + '-brightness" type="text" value="" data-slider-min="0" data-slider-max="2" data-slider-step=".01" data-slider-value="1" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></li>').appendTo(details);
    $('<li class="list-group-item"><strong>Contrast:</strong> <input id="' + layerId + '-contrast" type="text" value="" data-slider-min="0" data-slider-max="2" data-slider-step=".01" data-slider-value="1" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></li>').appendTo(details);
    updateNasa(layerId);
  };

  $('#' + layerId + '-opacity').slider().on('slideStop', function(ev) { var alpha = $(this).val(); src.alpha = alpha; });
  $('#' + layerId + '-brightness').slider().on('slideStop', function(ev) { var brightness = $(this).val(); src.brightness = brightness; });
  $('#' + layerId + '-contrast').slider().on('slideStop', function(ev) { var contrast = $(this).val(); src.contrast = contrast; });
};

function removeNasa(layerId) { 
  var src = activeLayers[layerId];
  delete activeLayers[layerId];
  viewer.imageryLayers.remove(src, false);
}



// TOGGLE SUN
function showSun() { viewer.scene.globe.enableLighting = true; }
function hideSun() { viewer.scene.globe.enableLighting = false; }
$('#sun').toggle(
  function () { showSun(); $(this).addClass('map-feature-on').removeClass('map-feature-off'); },
  function () { hideSun(); $(this).addClass('map-feature-off').removeClass('map-feature-on'); }
);

// TOGGLE TERRAIN
var ellipsoidTerrainProvider = viewer.terrainProvider;
var cesiumTerrainProvider = new Cesium.CesiumTerrainProvider({
    url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
    requestWaterMask : true,
    requestVertexNormals: true
});
function showTerrain() { viewer.terrainProvider = cesiumTerrainProvider; }
function hideTerrain() { viewer.terrainProvider = ellipsoidTerrainProvider; }
$('#terrain').toggle(
  function () { showTerrain(); $(this).addClass('map-feature-on').removeClass('map-feature-off'); },
  function () { hideTerrain(); $(this).addClass('map-feature-off').removeClass('map-feature-on'); }
);
viewer.terrainProvider = ellipsoidTerrainProvider; 

var layers = viewer.imageryLayers;
function showOsm() { layers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
            url : '//a.tile.openstreetmap.org/'
        }))};


function showDefault() { layers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
            url : '//stamen-tiles.a.ssl.fastly.net/toner/',
            credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        }))};
layers.addImageryProvider(new Cesium.OpenStreetMapImageryProvider({
            url : '//stamen-tiles.a.ssl.fastly.net/toner/',
            credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        }));

$('#baselayer-std').toggle(
  function () { showDefault(); $(this).addClass('map-feature-on').removeClass('map-feature-off'); },
  function () { $(this).addClass('map-feature-off').removeClass('map-feature-on'); }
);
$('#baselayer-osm').toggle(
  function () { showOsm(); $(this).addClass('map-feature-on').removeClass('map-feature-off'); },
  function () { showDefault(); $(this).addClass('map-feature-off').removeClass('map-feature-on'); }
);





// TOGGLE SIDEBAR
var cesiumButtons = $('#baseLayerPickerContainer').add($('.cesium-viewer-toolbar'));
$('.toggle-menu').toggle(
  function () { $('.sidebar').show(); cesiumButtons.show(); },
  function () { $('.sidebar').hide(); cesiumButtons.hide(); }
);
$('.toggle-menu').click();
// MAP FEATURES
function clearMap() {
  $('.active-layer').trigger("click");
}

$('div.panel-heading').click(function (event) {
  var $target = $(event.target);
  $target.find('a:first-of-type').click();
});

// CLEAR LAYERS ON HOME BUTTON CLICK
$('.cesium-home-button').click(function (event) {
 $('.btn-primary').trigger('click');
});



