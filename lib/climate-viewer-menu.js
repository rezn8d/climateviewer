// drag & drop KML or KMZ files
viewer.extend(Cesium.viewerDragDropMixin);

// Set web root url
var baseURL = 'http://localhost/climateviewer/';
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
  var file = b.prop('id'),
  src = activeLayers[b.prop('value')],
  sourceLabel = $("label[for='" + file + "']");

	delete activeLayers[b.prop('value')];
	viewer.dataSources.remove(src);
  sourceLabel.removeClass('ui-state-active');
	b.button({ icons: { secondary: "" } });
	b.removeClass('active-layer');
	b.addClass('disabled-layer');
}

function enableLayer(b, force) {
  var file = b.prop('id'),
  kmlUrl = b.prop('value'),
  sourceLabel = $("label[for='" + file + "']");
  if (b.hasClass('wms')) {


    src.load(baseURL + 'proxy/index.php?url=' + kmlUrl).then(
      function (kmlData) { //success
        if (b.hasClass('zoom')) {
          viewer.flyTo(kmlData.entities);
        }
      },
      function (error) { //failure
        errorMsg.innerHTML = error + ': Bad or null KML.';
      }
    );
  } else {
    var src = new Cesium.KmlDataSource();
    src.load(baseURL + 'proxy.php?url=' + kmlUrl).then(
        function (kmlData) { //success
          if (b.hasClass('zoom')) {
            viewer.flyTo(kmlData.entities);
          }
        },
        function (error) { //failure
          errorMsg.innerHTML = error + ': Bad or null KML.';
        }
    );
  }
	viewer.dataSources.add(src);
	activeLayers[b.prop('value')] = src;

  sourceLabel.addClass('ui-state-active');
	b.removeClass('disabled-layer');
	b.addClass('active-layer');
	b.button({ icons: { secondary: "ui-icon-check" } });
}

//    var src = new Cesium.KmlDataSource();
//    src.load(data.url);
//    viewer.dataSources.add(src);
//    activeLayers[data.url] = src;


/* BUILD SIDEBAR */
function loadLayers(includeOnly) {
	var lb = $('#accordion');
	var lbd = null;
	lb.empty();	//this is temporary until the HTML is actually removed from index.html
	for (var i = 0; i < layers.length; i++) {
		var l = layers[i];
		if (typeof l == "string") {
			//add header
			if (!includeOnly) {
				lb.append('<h3>' + l + '</h3>');
				lbd = $('<div/>').appendTo(lb);
			}
		}
		else {
			//add layer into 'lbd'
			if (l.section) {
				if (!includeOnly) {
					lbd.append($('<div>').addClass("section ui-helper-clearfix ui-widget-content").append('<div class="section-icon ' + l.icon + '" title="' + l.section + '" />').append('<div class="section-title">' + l.section + '</div>'));				
				}
			}
			else if ((l.layer) && (!l.only2d)) {
				var present = true;
				if (includeOnly) {
					if (includeOnly.indexOf(l.layer)==-1)
						present = false;
				}
				if (present) {
					if (!lbd) {
						lbd = $('<div/>').appendTo('#accordion');			
					}
					var kmlURL = l.kml;
          if (kmlURL == 'nasa') {
  						//overrides based on l.layer
  					lbd.append($('<input class="layer cache disabled-layer" type="checkbox"/>').attr('id', l.layer).attr('value', 'http://map1.vis.earthdata.nasa.gov/twms-geo/kmlgen.cgi?layers=' + l.layer + '&time=R' + day + '/2014-01-01/P1D').attr('title', l.source).attr('data-src', l.sourceURL ));
  				  lbd.append($('<label/>').attr('for', l.layer).html(l.name));
         } else if (kmlURL == 'neo') {
            lbd.append($('<input class="layer cache disabled-layer" type="checkbox"/>').attr('id', l.layer).attr('value', 'http://neo.sci.gsfc.nasa.gov/servlet/RenderData?si=' + l.layer + '&cs=rgb&format=KMZ&width=3600&height=1800').attr('title', l.source).attr('data-src', l.sourceURL ));
            lbd.append($('<label/>').attr('for', l.layer).html(l.name));
  			 } else {
            lbd.append($('<input class="layer disabled-layer" type="checkbox"/>').attr('id', l.layer).attr('value', l.kml).attr('title', l.source).attr('data-src', l.sourceURL));
            if (l.zoom === true) { 
              $('#' + l.layer).addClass('zoom');
            }
            lbd.append(
              $('<label/>').attr('for', l.layer).html(l.name).addClass('layer-button')
                  //.attr('title', l.altName)
            );
          }
        }
			}
		}
	}
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
    $('.layer').toggle(
      function () { disableLayer($(this));  },
      function () { enableLayer($(this), this.checked); }
    );
    $('.layer').button({ icons: { secondary: "" } }); 
    var b = $('<button id="show-all" class="ui-button ui-widget ui-state-default ui-button-text-icon-secondary layer-button" role="button" aria-disabled="false" aria-pressed="true" style="width:100%"><span class="ui-button-text">SHOW ALL LAYERS</span><span class="ui-button-icon-secondary ui-icon ui-icon-home"></span></label>').appendTo('#accordion');
    b.click(function () {
      window.location = baseURL;
    });
  } else { //LOAD ALL LAYERS
    loadLayers();
    $("#accordion").accordion({ heightStyle: "content", collapsible: true, active: false, activate: function (event, ui) { $('.tab-content').animate({ scrollTop: 0 }, 0); } });
    $('.layer').toggle(
      function () { enableLayer($(this), this.checked); },
      function () { disableLayer($(this)); }
    );
    $('.layer').button({ icons: { secondary: "" } }).removeClass('ui-state-active'); 
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
