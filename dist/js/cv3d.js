"use strict";

// Check for mobile devices, set body class accordingly
function resize() {
    var clientHeight = $(window).height(), clientWidth = $(window).width(), mobile = 767, tiny = 481;
    $('.control-sidebar').height(clientHeight - 50);
    $('.main-sidebar').height(clientHeight - 100);
    $('.tab-content').height(clientHeight - 100);
    $('html').height(clientHeight);
    $('body').height(clientHeight);
    $('.content-wrapper').height(clientHeight - 50);
    $('#cesiumContainer').height(clientHeight - 50).width(clientWidth);
    $('.cesium-viewer').height(clientHeight - 50).width(clientWidth);

    if (clientWidth < mobile) {
        $('#siderbar-toggle i').removeClass('fa-chevron-left').addClass('fa-chevron-right');
        $('.control-sidebar').removeClass('control-sidebar-open');
    }
}

$(window).resize(function () {
    resize();
});

var imageryViewModels = [];
Cesium.BingMapsApi.defaultKey = 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw';

// Base Map Picker
/*

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Bing Maps Aerial with Labels',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
    tooltip: 'Bing Maps aerial imagery with label overlays \nhttp://www.bing.com/maps',
    creationFunction: function () {
        return new Cesium.BingMapsImageryProvider({
            url: '//dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Bing Maps Aerial',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
    tooltip: 'Bing Maps aerial imagery \nhttp://www.bing.com/maps',
    creationFunction: function () {
        return new Cesium.BingMapsImageryProvider({
            url: '//dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle: Cesium.BingMapsStyle.AERIAL
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Bing Maps Roads',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingRoads.png'),
    tooltip: 'Bing Maps standard road maps\nhttp://www.bing.com/maps',
    creationFunction: function () {
        return new Cesium.BingMapsImageryProvider({
            url: '//dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle: Cesium.BingMapsStyle.ROAD
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Dark Matter',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    tooltip: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Positron',
    iconUrl: '/img/stamen-light.png',
    tooltip: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Toner',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    tooltip: 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction: function () {
        return new Cesium.OpenStreetMapImageryProvider({
            url: '//stamen-tiles.a.ssl.fastly.net/toner/',
            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Toner Lite',
    iconUrl: '/img/stamen-light.png',
    tooltip: 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction: function () {
        return new Cesium.OpenStreetMapImageryProvider({
            url: '//stamen-tiles.a.ssl.fastly.net/toner-lite/',
            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI World Imagery',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
    tooltip: '\
World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution \
satellite imagery worldwide.  The map includes NASA Blue Marble: Next Generation 500m resolution imagery at small scales \
(above 1:1,000,000), i-cubed 15m eSAT imagery at medium-to-large scales (down to 1:70,000) for the world, and USGS 15m Landsat \
imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in \
parts of Western Europe from DigitalGlobe. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, \
i-cubed Nationwide Prime, Getmapping, AeroGRID, IGN Spain, and IGP Portugal.  Additionally, imagery at different resolutions has been \
contributed by the GIS User Community.\nhttp://www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI World Street Map',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
    tooltip: '\
This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of \
Canada; Japan; most countries in Europe; Australia and New Zealand; India; parts of South America including Argentina, Brazil, \
Chile, Colombia, and Venezuela; Ghana; and parts of southern Africa including Botswana, Lesotho, Namibia, South Africa, and Swaziland.\n\
http://www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI National Geographic',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
    tooltip: '\
This web map contains the National Geographic World Map service. This map service is designed to be used as a general reference map \
for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web \
mapping applications.\nhttp://www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: '//services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Open\u00adStreet\u00adMap',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
    tooltip: 'OpenStreetMap (OSM) is a collaborative project to create a free editable map \
of the world.\nhttp://www.openstreetmap.org',
    creationFunction: function () {
        return new Cesium.OpenStreetMapImageryProvider({
            url: '//a.tile.openstreetmap.org/'
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Stamen Watercolor',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenWatercolor.png'),
    tooltip: 'Reminiscent of hand drawn maps, Stamen watercolor maps apply raster effect \
area washes and organic edges over a paper texture to add warm pop to any map.\nhttp://maps.stamen.com',
    creationFunction: function () {
        return new Cesium.OpenStreetMapImageryProvider({
            url: '//stamen-tiles.a.ssl.fastly.net/watercolor/',
            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'MapQuest Open\u00adStreet\u00adMap',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapQuestOpenStreetMap.png'),
    tooltip: 'OpenStreetMap (OSM) is a collaborative project to create a free editable \
map of the world.\nhttp://www.openstreetmap.org',
    creationFunction: function () {
        return new Cesium.OpenStreetMapImageryProvider({
            url: '//otile1-s.mqcdn.com/tiles/1.0.0/osm/'
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'The Black Marble',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/blackMarble.png'),
    tooltip: 'The lights of cities and villages trace the outlines of civilization in this global view of the \
Earth at night as seen by NASA/NOAA\'s Suomi NPP satellite.',
    creationFunction: function () {
        return new Cesium.TileMapServiceImageryProvider({
            url: '//cesiumjs.org/blackmarble',
            maximumLevel: 8,
            credit: 'Black Marble imagery courtesy NASA Earth Observatory'
        });
    }
}));
*/
// TERRAIN
var terrainProviders = [];
terrainProviders.push(new Cesium.ProviderViewModel({
    name: 'STK World Terrain meshes',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/STK.png'),
    tooltip: 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
    creationFunction: function () {
        return new Cesium.CesiumTerrainProvider({
            url: '//assets.agi.com/stk-terrain/world',
            requestWaterMask: true,
            requestVertexNormals: true
        });
    }
}));

terrainProviders.push(new Cesium.ProviderViewModel({
    name: 'WGS84 Ellipsoid',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
    tooltip: 'WGS84 standard ellipsoid, also known as EPSG:4326',
    creationFunction: function () {
        return new Cesium.EllipsoidTerrainProvider();
    }
}));

var now = Cesium.JulianDate.now();
var clock = new Cesium.Clock({currentTime: now});
var viewer;

// If Mobile start in 2D scene mode for increased performance
if ($('body').hasClass('mobile')) {
    // is mobile
    viewer = new Cesium.Viewer('cesiumContainer', {
        sceneModePicker: false,
        timeline: true,
        animation: true,
        sceneMode: Cesium.SceneMode.SCENE3D,
        navigationHelpButton: true,
        navigationInstructionsInitiallyVisible: false,
        imageryProvider: false,
        baseLayerPicker: false,
        clock: clock,
        terrainProvider: false,
        skyAtmosphere: false,
        skyBox: false,
        targetFrameRate: 15
    });
} else {
    // is desktop
    viewer = new Cesium.Viewer('cesiumContainer', {
        sceneModePicker: false,
        timeline: true,
        animation: true,
        sceneMode: Cesium.SceneMode.SCENE3D,
        navigationHelpButton: true,
        navigationInstructionsInitiallyVisible: true,
        imageryProvider: false,
        baseLayerPicker: false,
       // skyAtmosphere: false,
        clock: clock,
        terrainProvider: false,
        targetFrameRate: 60
    });
}
viewer.resolutionScale = 1.0 / devicePixelRatio;
viewer.scene.imageryLayers.removeAll();
viewer.scene.globe.baseColor = Cesium.Color.BLACK;

/*
viewer.extend(Cesium.viewerPerformanceWatchdogMixin, {
    lowFrameRateMessage : 'Why is this going so <em>slowly</em>?'
});
*/

// add baseLayerPicker 

var baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
    globe: viewer.scene,
    imageryProviderViewModels: imageryViewModels,
    terrainProviderViewModels: terrainProviders
});

// Set web root url
var homeURL = window.location.protocol + "//" + window.location.host + "/3D/";  // production
var shareURL = "http://climateviewer.org/3D/";  // production
var proxyURL = '/proxy.php';  // production

var activeLayers = {};
var infoBox = $('.cesium-infoBox');
var layerEnabled = {}; // whether the label is in some way enabled
var me = Self();

nobjectsIn(layers, function (x) {
    //console.log(x);
}, function (s, p, o) {
    me.addEdge(s, p, o);
});

// DATE PICKER
var date = new Date();
date.setDate(date.getDate() - 1);
var yesterday = Cesium.JulianDate.fromDate(date);
var time = Cesium.JulianDate.toDate(yesterday);

var $input = $( '#datepicker' ).pickadate({
    format: 'mmmm d, yyyy',
    formatSubmit: 'yyyy-mm-dd',
    min: [2012, 4, 8],
    max: Cesium.JulianDate.now(),
    container: '#datepicker-container',
    // editable: true,
    closeOnSelect: true,
    closeOnClear: false,
    selectYears: true,
    selectMonths: true
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
    $('.' + layerId + '-load').removeClass('fa-play').addClass('fa-spinner fa-spin loading active');
}
function loaded(layerId) {
    $('.' + layerId + '-load').removeClass('fa-spinner fa-spin loading').addClass('fa-check');
}
function loadError(layerId, geoDataSrc, error) {
  // console.log('loading ' + layerId + ' failed: ' + error);
  var target = $('#' + layerId);
  $('<div class="details"><div class="header"><i class="fa fa-fw fa-exclamation-circle"></i> Load Failed</div>Please use <a href="mailto:jim@climateviewer.com?subject=Climate Viewer 3D broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly due to ( ' + error + ' ), please look into it.  Sent from http://climateviewer.com/3D/" target="_self">this link</a> to report this error.<br><div class="darkwell"><strong>ERROR:</strong> ' + error + '</div></div>').appendTo(target);
    var icon = $('.' + layerId + '-load');
    var span = $('#' + layerId + ' span');
    icon.removeClass('fa-spinner fa-spin active loading').addClass('fa-exclamation-triangle fail');
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
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.createOpenStreetMapImageryProvider({
        url : geoDataSrc
        //credit : source
    }));
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}
function loadCartoDB(layerId, geoDataSrc) {
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url : geoDataSrc
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

function modMarkers(layerId, geoData, markerImg, markerScale, markerLabel, noList) {
    //console.log(noList);
    if (noList === false) {
        var layerTarget = $('.' + layerId + '-details');
        var markerList = $('<div class="details ' + layerId + '-list marker-list" />').insertAfter(layerTarget);
        var items = [];
    }

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

       //console.log(entity);
        if (noList === false) {
            var v = entity.position.getValue();
            var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(v);
            var lon = Cesium.Math.toDegrees(carto.longitude);
            var lat = Cesium.Math.toDegrees(carto.latitude);
            //console.log(lon, lat);
            items.push('<li data-lon="' + lon + '"  data-lat="' + lat + '">' + entity.title + '</li>');
        }


      // marker label
      if (markerLabel) {
          entity.label = newMarkerLabel(entity, markerLabel);
      }
    } // end for loop
    if (noList === false) {
        $('<ol/>', {
            'class': 'markers',
            html: items.join('')
        }).appendTo(markerList);
        $('.markers li').click(function () {
            var lon = $(this).attr('data-lon');
            var lat = $(this).attr('data-lat');
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(lon, lat, 3000.0)
            });
        });
    }

}

/*
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

function modMarkers(layerId, geoData, markerImg, markerScale, markerLabel, noList) {
    //console.log(noList);
    if (noList === false) {
        var layerTarget = $('#' + layerId + ' div.lb');
        var markerList = $('<div class="details ' + layerId + '-list marker-list" />').appendTo(layerTarget);
        var items = [];
    }

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

       //console.log(entity);
        if (noList === false) {
            var v = entity.position.getValue();
            var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(v);
            var lon = Cesium.Math.toDegrees(carto.longitude);
            var lat = Cesium.Math.toDegrees(carto.latitude);
            //console.log(lon, lat);
            items.push('<li data-lon="' + lon + '"  data-lat="' + lat + '">' + entity.title + '</li>');
        }


      // marker label
      if (markerLabel) {
          entity.label = newMarkerLabel(entity, markerLabel);
      }
    } // end for loop
    $('<div class="header"><i class="fa fa-fw fa-map-marker"></i> Map Markers</div>').appendTo(markerList);
    if (noList === false) {
        $('<ol/>', {
            'class': 'markers',
            html: items.join('')
        }).appendTo(markerList);
        $('.markers li').click(function () {
            var lon = $(this).attr('data-lon');
            var lat = $(this).attr('data-lat');
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(lon, lat, 3000.0)
            });
        });
    }

}
*/
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

function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList) {
     console.log('load geojson');
    new Cesium.GeoJsonDataSource.load(geoDataSrc).then(function (geoData) {
        modMarkers(layerId, geoData, markerImg, markerScale, markerLabel, noList);
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
            proxy : {
                getURL : function(geoDataSrc) {
                    return '/proxy.php/' + geoDataSrc;
                }
            },
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
    if (mlt === ("nasa-gibs") || mlt === ("cartodb-layer") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer") || mlt === ("arcgis") || mlt === ("arcgis-base-layer") || mlt === ("arcgis-layer") || mlt === ("bing")) {
        removeImagery(layerId);
        $('.' + layerId + '-sliders').remove();
    } else {
        var src = activeLayers[layerId];
        delete activeLayers[layerId];
        viewer.dataSources.remove(src);
    }
    if (mlt === ("geojson") || mlt === ("kml")) {
        $('.' + layerId + '-tree').removeClass('active');
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
    noList = l.Y,
    proxy = l.P,
    noFeatures = l.X;
    var selectedDate = picker.get('select', 'yyyy-mm-dd');
    if (!includeOnly) var zoom = l.Z;

    if (noList) {
        noList = true;
    } else {
        noList = false;
    }

    if (layerEnabled[layerId] === undefined) {
        //put it in a temporary state to disallow loading while loading
        layerEnabled[layerId] = false;
        // Load layers by Type
        if (l.T === ("wms")) {
            loadWms(layerId, geoDataSrc, geoLayers, noFeatures);
        } else if (l.T === ("nasa-gibs")) {
            loadGIBS(layerId, selectedDate);
        } else if (l.T === ("wtms")) {
            loadWmts(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("cartodb-layer")) {
            loadCartoDB(layerId, geoDataSrc);
        } else if (l.T === ("base-layer")) {
            loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("arcgis") || l.T === ("arcgis-layer") || l.T === ("arcgis-base-layer")) {
           loadArcGisLayer(layerId, geoDataSrc, geoLayers, noFeatures, width, height);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList);
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
    $('<div class="header"><i class="fa fa-share-square-o fa-fw"></i> Share This Layer</div><span>Use this url to share this layer: <a href="' + homeURL + 'index.html?layersOn=' + layerId + '" target="_self">Share Link</a><span><div class="header"><i class="fa fa-exclamation-triangle fa-fw"></i> Report Error</div><span>If you are experiencing problems loading this layer, or you would like to suggest corrections, comments, or concerns, please email me using this link: <a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly, please look into it. Sent from http://climateviewer.com/3D/" target="_self">Report Error</a></span>').appendTo(list);

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
                layerButton, details, loadIcon, optIcon, treeIcon, sliderIcon, label;

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
                  },
                  function () { 
                        details.hide();
                        optIcon.removeClass('fa-folder-open-o active').addClass('fa-folder-o');
                  }
                ).appendTo(layerButton); 
                
                if (h.T === ('geojson')) {
                    treeIcon = $('<i title="Expand Marker Tree" class="fa fa-fw fa-sitemap toggle-list ' + layerId + '-tree"></i>');
                    treeIcon.click(function () {
                          setTimeout(function() {
                            if ($('.' + layerId + '-list').is(":visible")) {
                                $('.' + layerId + '-list').hide();
                                treeIcon.removeClass('active');
                            } else {
                                $('.' + layerId + '-list').show();
                                treeIcon.addClass('active');
                            }
                          });
                    }).appendTo(layerButton);
                }
                
                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis") || h.T === ("arcgis-layer") || h.T === ("bing")) {
                    sliderIcon = $('<i title="Expand Marker Tree" class="fa fa-fw fa-sliders toggle-list ' + layerId + '-tree"></i>');
                    sliderIcon.click(function () {
                          setTimeout(function() {
                            if ($('.' + layerId + '-sliders').is(":visible")) {
                                $('.' + layerId + '-sliders').hide();
                                sliderIcon.removeClass('show-sliders');
                            } else {
                                $('.' + layerId + '-sliders').show();
                                sliderIcon.addClass('show-sliders');
                            }
                          });
                    }).appendTo(layerButton);
                }
                
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
                          if (h.T === ('geojson')) treeIcon.show();
                          if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis") || h.T === ("arcgis-layer") || h.T === ("bing")) { 
                              sliderIcon.show(); 
                          }
                        }
                      });
                  },
                  function () {
                      setTimeout(function() {
                        if (loadIcon.hasClass('fa-check')) {
                          disableLayer(h);
                          loadIcon.removeClass('fa-check active').addClass('fa-play');
                          if (label.hasClass('active')) label.removeClass('active');
                          if (content.hasClass('active')) content.removeClass('active');
                          if (optIcon.hasClass('fa-folder-open-o')) optIcon.trigger('click');
                          if (h.T === ('geojson')) treeIcon.hide();
                          if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis") || h.T === ("arcgis-layer") || h.T === ("bing")) {
                              sliderIcon.hide();
                              sliderIcon.removeClass('show-sliders');
                          }
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
    $('.do-video-div').append('<div class="videoWrapper"><div class="youtube" id="ZwFmez0ef6A" data-params="modestbranding=1&showinfo=0&controls=0&vq=hd720"></div></div>');
    $(".youtube").each(function() {
        // Based on the YouTube ID, we can easily find the thumbnail image
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).replaceWith(iframe);
        });
    });
});


// CHECK URL
var initialLayers = (getURLParameter("layersOn") || '').split(',');
var initialBaseLayers = (getURLParameter("baseLayers") || '').split(',');
var disabledLayers = (getURLParameter("layersOff") || '').split(",");
if (initialLayers[0] === '') initialLayers = [];
if (disabledLayers[0] === '') disabledLayers = [];
var allLayers = initialLayers.concat(disabledLayers);
var baseLayers = initialBaseLayers.concat();

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

    // Base Layer
    if (baseLayers.length > 0) {
        for (var i = 0; i < baseLayers.length; i++) {
            //$('#' + baseLayers[i]).detach().appendTo(shared);
            $('.' + initialBaseLayers[i] + '-load').click();
        }
    }
    
    // Load Layers
    for (var i = 0; i < allLayers.length; i++) {
        $('#' + allLayers[i]).detach().appendTo(shared).show();
    }
    for (var i = 0; i < initialLayers.length; i++) {
        $('.' + initialLayers[i] + '-load').click();
    }
    
} else {
    initLayers();
}

function shareLink() {
    var layers = "",
        baseLayers = "",
        shareLink = shareURL;

    $('.geojson.active, .kml.active, .arcgis.active, .wms.active, .wtms.active, .nasa-gibs.active').each(function () {
        var X = $(this);
        if (X.hasClass('active')) {
            var L = X.attr('id');
            layers += L + ',';
        }
    });

    $('.cartodb-layer.active, .bing.active, .arcgis-base-layer.active, .base-layer.active').each(function () {
        var X = $(this);
        if (X.hasClass('active')) {
            var L = X.attr('id');
            baseLayers += L + ',';
        }
    });
    shareLink += 'index.html?';

    if (layers.length > 0) {
        layers = layers.substring(0, layers.length-1);
        shareLink += 'layersOn=' + layers;
    }
    
    if (baseLayers.length > 0) {
        baseLayers = baseLayers.substring(0, baseLayers.length - 1);
        shareLink += '&baseLayers=' + baseLayers;
    }

    
    if ($('.mode-2d').hasClass('active')) {
        var camPos = viewer.camera.positionCartographic; 
        var lat = camPos.longitude * (180/Math.PI); 
        var lon = camPos.latitude * (180/Math.PI);
        var zoom = viewer.camera.getMagnitude();
        shareLink += '&lat=' + lat;
        shareLink += '&lon=' + lon;
        shareLink += '&zoom=' + zoom;
        shareLink += '&mode=2D';

    } else if ($('.mode-flat-earth').hasClass('active')) {
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

        shareLink += '&lat=' + lat;
        shareLink += '&lon=' + lon;
        shareLink += '&zoom=' + zoom;
        shareLink += '&mode=flat';
    } else {
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

        shareLink += '&lat=' + lat;
        shareLink += '&lon=' + lon;
        shareLink += '&zoom=' + zoom;
        shareLink += '&mode=3D';
    }
    
    var date = picker.get('select', 'yyyy-mm-dd');
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
    $('.map-mode div.active').removeClass('active');
    $(this).addClass('active');
});
$('.mode-2d').click(function () {
    viewer.scene.morphTo2D();
    $('.map-mode div.active').removeClass('active');
    $(this).addClass('active');
});
$('.mode-flat-earth').click(function () {
    viewer.scene.morphToColumbusView();
    $('.map-mode div.active').removeClass('active');
    $(this).addClass('active');
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
$('.sun-control').toggle(
  function (e) { e.preventDefault(); viewer.scene.globe.enableLighting = true; $(this).addClass('active'); },
  function (e) { e.preventDefault(); viewer.scene.globe.enableLighting = false; $(this).removeClass('active'); }
);

$('.about-jim').click(function () {
    window.location = 'http://climateviewer.com/rezn8d/';
});

// SIDEBAR CONTROL & MAIN SCREEN BUTTONS
$('.reset-view').click(function (e) {
    e.preventDefault();
 $('.cesium-home-button').trigger('click');
});
function openPicker() {
    $('#datepicker').pickadate('picker').open();
    console.log('clicked');
}
$('.date-icon').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    openPicker();
});


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
    animationContainer.hide();
    timelineContainer.hide();
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
});

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
    
    $(".youtube").each(function() {
        // Based on the YouTube ID, we can easily find the thumbnail image
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).replaceWith(iframe);
        });
    });

    if ($(".resources-intro")) {
        var clientHeight = $(window).height();
        $('.resources-intro').height(clientHeight);
    }
    
    $('#active-layers-toggle').toggle(
          function () { 
              $('.lbw.active').each(function () {
                  var layerId = $(this).prop('id');
                  $('<span id="' + layerId + '-holder" style="display: none;" />').insertAfter($(this));
                  $(this).detach().appendTo('#active-layers');
              });
              $(this).html('Show All Layers');
              $('.active-layers-label').show();
              $('#active-layers').show();
              $('.all-layers-label').hide();
              $('#map-layers').hide();
          },
          function () { 
              $('#active-layers .lbw.active').each(function () {
                   var layerId = $(this).prop('id');
                   $(this).detach().insertBefore($('#' + layerId + '-holder'));
                   $('#' + layerId + '-holder').remove();
              });
              $(this).html('Show Active Layers');
              $('.active-layers-label').hide();
              $('#active-layers').hide();
              $('.all-layers-label').show();
              $('#map-layers').show();

          }
    ); 

    $('#base-layers-toggle').toggle(
          function () { 
              $('#base').show();
              $(this).html('Hide Terrain');
         },
          function () { 
              $('#base').hide();
              $(this).html('Show Terrain');
          }
    ); 
    
    $('#cesiumContainer').click(function() {
        if ($('.control-sidebar').hasClass('control-sidebar-open')) {
            $('#siderbar-toggle').click();
        }
    });
    
    $('#welcomeModal').modal().on('hidden.bs.modal', function () {
        $('#welcomeModal').remove();
    });
    
    if ($('.control-sidebar').hasClass('control-sidebar-open')) {
        $('#siderbar-toggle').addClass('active');
    }

    // SET PICKER DATE WHEN YOU SLIDE TIMELINE
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
    
    // LOAD DEFAULT BASE LAYER IF NO SHARED BASE LAYER
    if(!$('.cartodb-layer.active, .bing.active, .arcgis-base-layer.active, .base-layer.active').length > 0) {
          $('.Bing_AERIAL_WITH_LABELS-load').click();
    }
    $('[data-bind="foreach: imageryProviderViewModels"]').remove();
    
    $('.content-wrapper').show();
    
    resize();
});