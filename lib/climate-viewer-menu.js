"use strict"
// drag & drop KML or KMZ files
viewer.extend(Cesium.viewerDragDropMixin);

// Set web root url
// var baseURL = 'http://localhost/climateviewer/';  // dev
var baseURL = 'http://climateviewer.net/';  // production
var activeLayers = { };
var enabledLayers = { };
var disabledLayers = { };

var randomNum = Math.ceil(Math.random() * 2); /* Pick random number between 1 and 2 */
var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
var yesterday = (day - 1);

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
  var icon = b.find('i'),
  src = activeLayers[b.prop('href')];
  
  if (!src) return;
  // Remove Layer
  delete activeLayers[b.prop('href')];
  viewer.dataSources.remove(src);
  // Update button
  b.removeClass('btn-primary').addClass('btn-default');
  icon.removeClass('fa-check').addClass('fa-map-marker');
}


function enableLayer(b, force) {
  var layerId = b.attr('id'),
  kmlUrl = b.attr('href'),
  source = b.attr('data-source'),
  sourceUrl = b.attr('data-source-url'),
  avatar = $('.avatar'),
  loading = '<img src="img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
  done = '<img src="img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
  icon = b.find('i');


  // SHOW LOADING ICON
  avatar.html(loading);
  icon.removeClass('fa-map-marker').addClass('fa-spinner fa-pulse');

  var save = function(src) {
    if (src)          
    viewer.dataSources.add(src); 
    activeLayers[kmlUrl] = src;
  }
  function success(kmlData) {
    save(kmlData);
    if (b.hasClass('zoom')) {
      viewer.flyTo(kmlData.entities);
    }
    b.removeClass('btn-default').addClass('btn-primary');
    icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
    avatar.html(done);
    var details = $('<ul class="list-group layer-details" />');
    b.after(details);
    $('<li class="list-group-item">' + source + ' <a href="' + sourceUrl + '" target="_blank" rel="nofollow"><strong>[More Info]</strong></a></li>').appendTo(details);
    if (b.hasClass('kml')) {
      $('<li class="list-group-item">Google Earth KML <span class="badge"><a class="more-info" href="' + kmlUrl + '">Download</a></span></li>').appendTo(details);
      $('<li class="list-group-item">Share this layer <span class="badge"><a class="more-info" href="' + baseURL + 'index.html?layersOn=' + layerId + '">Share</a></span></li>').appendTo(details);
    }
  }
  function fail(error) {
    b.removeClass('btn-default').addClass('btn-warning');
    icon.removeClass('fa-spinner fa-pulse').addClass('fa-exclamation-triangle');
    avatar.html(done);
    var details = $('<ul class="list-group layer-details"><li class="list-group-item">ERROR: ' + error + '</li></ul>');
    b.after(details);
  }


  if (b.hasClass('proxy')) {
    new Cesium.KmlDataSource.load(kmlUrl, {
        proxy: new Cesium.DefaultProxy(baseURL + 'proxy.php'),
        sourceUri: kmlUrl
    }).then( function(kmlData) { success(kmlData); }, function (error) { fail(error); } );
  } else {
      new Cesium.KmlDataSource().load(kmlUrl).then( function(kmlData) { success(kmlData); }, function (error) { fail(error); } );
  }

}

//    var src = new Cesium.KmlDataSource();
//    src.load(data.url);
//    viewer.dataSources.add(src);
//    activeLayers[data.url] = src;

/*
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
*/

/* BUILD SIDEBAR */
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
        lb.append('<div class="panel-heading" role="tab" id="heading' + ranId + '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + ranId + '" aria-expanded="false" aria-controls="collapse' + ranId + '">' + l + '</a></h4></div>')
        lbc = $('<div id="collapse' + ranId + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + ranId + '"></div>').appendTo(lb);
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
            var ranId = Math.floor((Math.random() * 100000000) + 1);
            lb.append('<div class="panel-heading" role="tab" id="heading' + ranId + '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + ranId + '" aria-expanded="false" aria-controls="collapse' + ranId + '">Shared Layers</a></h4></div>')
            lbc = $('<div id="collapse' + ranId + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + ranId + '"></div>').appendTo(lb);
            lbd = $('<div class="panel-body panel-main"></div>').appendTo(lbc);                      
          }
/*          var kmlURL = l.kml;
          if (kmlURL == 'nasa') {
            //overrides based on l.id
            lbd.append($('<input class="layer proxy" type="checkbox"/>').attr('id', l.id).attr('value', 'http://map1.vis.earthdata.nasa.gov/twms-geo/kmlgen.cgi?layers=' + l.id + '&time=R' + day + '/2014-01-01/P1D').attr('title', l.source).attr('data-src', l.sourceURL ));
            lbd.append($('<label/>').attr('for', l.id).html(l.name).addClass('layer-button'));
          } else if (kmlURL == 'neo') {
            lbd.append($('<input class="layer proxy" type="checkbox"/>').attr('id', l.id).attr('value', 'http://neo.sci.gsfc.nasa.gov/servlet/RenderData?si=' + l.id + '&cs=rgb&format=KMZ&width=3600&height=1800').attr('title', l.source).attr('data-src', l.sourceURL ));
            lbd.append($('<label/>').attr('for', l.id).html(l.name).addClass('layer-button'));
          } else { */
          lbe = $('<a id="' + l.id + '" class="btn btn-default btn-sm layer-button" href="' + l.kml + '" data-source="' + l.source + '" data-source-url="' + l.sourceURL + '"><i class="fa fa-map-marker"></i> ' + l.name + '</a>');
          lbe.appendTo(lbd);
          if (l.zoom) { 
            lbe.addClass('zoom');
          }
          if (l.proxy) { 
            lbe.addClass('proxy');
          }
          if (l.wms) { 
            lbe.addClass('wms');
          }
          if (l.kml) { 
            $('#' + l.id).addClass('kml');
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
    var b = $('<a class="btn btn-sm btn-primary" href="' + baseURL + '"><i class="fa fa-home"></i> SHOW ALL LAYERS</a>').appendTo('#accordion .panel-main');
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


  });*/

// MAP FEATURES
function clearMap() {
  $('.active-layer').trigger("click");
}

// TOGGLE TERRAIN
var ellipsoidTerrainProvider = viewer.terrainProvider;
var cesiumTerrainProvider = new Cesium.CesiumTerrainProvider({
    url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
    requestWaterMask : true,
    requestVertexNormals: true
});

var nasaLayer = new Cesium.ProviderViewModel({ // start push
  name: 'Terra CR (True Color)',
  iconUrl: 'img/terra-true-color.png',
  tooltip: 'MODIS Terra Corrected Reflectance True Color\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
}); 


function showTerrain() {
  viewer.terrainProvider = cesiumTerrainProvider;
}

function hideTerrain() {
    viewer.terrainProvider = ellipsoidTerrainProvider;
}

// TOGGLE SUN

function showSun() {
    viewer.scene.globe.enableLighting = true;
}

function hideSun() {
    viewer.scene.globe.enableLighting = false;
}

$('#sun').toggle(
  function () { showSun(); $(this).addClass('map-feature-on').removeClass('map-feature-off'); },
  function () { hideSun(); $(this).addClass('map-feature-off').removeClass('map-feature-on'); }
);
$('#terrain').toggle(
  function () { showTerrain(); $(this).addClass('map-feature-on').removeClass('map-feature-off'); },
  function () { hideTerrain(); $(this).addClass('map-feature-off').removeClass('map-feature-on'); }
);


$('.avatar').click(function () {
    $('#picker').slideToggle();
});
$('div.panel-heading').click(function (event) {
  var $target = $(event.target);
  $target.find('a:first-of-type').click();
});


//$('.cesium-infoBox-iframe').click(function () {



