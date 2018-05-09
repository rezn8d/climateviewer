/*
    CLIMATEVIEWER 3D
    http://climateviewer.org/3D/
    https://github.com/rezn8d/climateviewer
*/

/* jshint multistr: true, browser: true */
/* globals $:false, Cesium:false, nobjectsIn:false, console:false, Self:false, layers:false, _:false */

"use strict";

// Set web root url
//var shareURL = window.location.protocol + "//" + window.location.host + "/"; // DEV
var shareURL = "http://climateviewer.org/"; // production
// var proxyURL = 'http://climateviewer.org/proxy.php?'; // production
var proxyURL = '/proxy.php?'; // dev

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}




// Check for mobile devices
function resize() {
    var clientHeight = $(window).height(),
        clientWidth = $(window).width();

    $('html, body').height(clientHeight).width(clientWidth);
    $('#cesiumContainer, .cesium-viewer, .control-sidebar').height(clientHeight);
    $('.map-layers-window').height(clientHeight - 30);

    // Check sidebar visibility
    if ($('#cesiumContainer').hasClass('control-sidebar-open')) {
        $('#cesiumContainer, .cesium-viewer').width(clientWidth - 420);;
    } else {
        $('#cesiumContainer, .cesium-viewer').width(clientWidth);
    }

}

$(window).resize(function () {
    resize();
    //console.log('resized');
}).on('resize orientationchange', function(e) {
    resize();
    //console.log('orientation');
}).trigger('resize');


function toggleSidebar() {

    if (!$('.control-sidebar').hasClass('control-sidebar-open')) {
        $('#add').addClass('active');
        $('.control-sidebar, #cesiumContainer').addClass('control-sidebar-open');

        /* $('#cesiumContainer').one('click', function () {
            $('.control-sidebar').removeClass('control-sidebar-open');
            $('#open-menu').removeClass('active');
        }); */

    } else {
        $('#add').removeClass('active');
        $('.control-sidebar, #cesiumContainer').removeClass('control-sidebar-open');
    }
    resize();
}

$('#add').on('click', function () {
    toggleSidebar();
});

// START SIDEBAR OPEN

function startupSidebar() {
    var clientWidth = $(window).width(),
        mobile = 769;

    if (clientWidth < mobile) {
        $('#add').addClass('flashit').one('click', function() {
            $(this).removeClass('flashit');
        });
    } else {
        toggleSidebar();
    }

}

startupSidebar();

$('.panel-toggle').on('click',function () {
    var id = $(this).attr('id'),
        target = $('.' + id),
        icon = $(this).find('i');

    $.featherlight(target);

    $('.panel-toggle').removeClass('active');
        $(this).addClass('active');
});

var imageryViewModels = [];
Cesium.BingMapsApi.defaultKey = 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw';


// Base Map Picker, FIRST ENTRY IS LOADED BY DEFAULT
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Dark Matter',
    iconUrl: '/dist/img/dark-matter.jpg',
    tooltip: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI Aerial',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
    tooltip: 'World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
            enablePickFeatures: false
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI NatGeo',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
    tooltip: 'National Geographic World Map service. www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/',
            enablePickFeatures: false
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Bing Aerial',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
    tooltip: 'Bing Maps aerial imagery with label overlays \nhttp://www.bing.com/maps',
    creationFunction: function () {
        return new Cesium.BingMapsImageryProvider({
            url: 'http://dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'CV Blue',
    iconUrl: '/dist/img/cv-blue.jpg',
    tooltip: 'CartoDB World Flat Blue. Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-flatblue/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Watercolor',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenWatercolor.png'),
    tooltip: 'Reminiscent of hand drawn maps maps.stamen.com',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Bing Roads',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingRoads.png'),
    tooltip: 'Bing Maps standard road maps\nhttp://www.bing.com/maps',
    creationFunction: function () {
        return new Cesium.BingMapsImageryProvider({
            url: 'http://dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle: Cesium.BingMapsStyle.ROAD
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI Street',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
    tooltip: 'Worldwide street map presents highway-level data for the world. www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
            enablePickFeatures: false
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'DeLorme',
    iconUrl: '/dist/img/esri-ocean.jpg',
    tooltip: 'Includes bathymetry, marine water body names, undersea feature names, and derived depth values in meters.',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer',
            enablePickFeatures: false
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Positron',
    iconUrl: '/dist/img/positron.jpg',
    tooltip: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Toner Lite',
    iconUrl: '/dist/img/toner-lite.jpg',
    tooltip: 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Toner',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    tooltip: 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://tile.stamen.com/toner/{z}/{x}/{y}.png',
            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Midnight',
    iconUrl: '/dist/img/midnight-commander.jpg',
    tooltip: 'CartoDB World Midnight Commander. Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Black Marble',
    iconUrl: Cesium.buildModuleUrl('/dist/img/blackMarble.png'),
    tooltip: 'The lights of cities and villages trace the outlines of civilization in this global view of the \
Earth at night as seen by NASA/NOAA\'s Suomi NPP satellite.',
    creationFunction: function () {
        return new Cesium.createTileMapServiceImageryProvider({
            url : 'https://cesiumjs.org/blackmarble',
            credit : 'Black Marble imagery courtesy NASA Earth Observatory',
            flipXY : true // Only old gdal2tile.py generated tilesets need this flag.
        });
    }
}));

// TERRAIN
var terrainProviders = [];
terrainProviders.push(new Cesium.ProviderViewModel({
    name: 'Flat Terrain',
    iconUrl: '/dist/img/flat-terrain.png',
    tooltip: 'WGS84 standard ellipsoid, also known as EPSG:4326',
    creationFunction: function () {
        return new Cesium.EllipsoidTerrainProvider();
    }
}));
terrainProviders.push(new Cesium.ProviderViewModel({
    name: '3D Terrain',
    iconUrl: '/dist/img/3d-terrain.png',
    tooltip: 'Cesium World Terrain.\nhttps://cesium.com/blog/2018/03/01/introducing-cesium-world-terrain/',
    creationFunction: function () {
        return new Cesium.createWorldTerrain();
    }
}));



var now = Cesium.JulianDate.now();
var clock = new Cesium.Clock({
    currentTime: now
});
var viewer = new Cesium.Viewer('cesiumContainer', {
    sceneModePicker: true,
    timeline: true,
    animation: true,
    sceneMode: Cesium.SceneMode.SCENE3D,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    imageryProvider: false,
    baseLayerPicker: false,
    clock: clock,
    terrainProvider: false
});

viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
/*
var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
if (agentID) {
    viewer.resolutionScale = 1.0 / devicePixelRatio;  // performance fix for non-retina devices
    viewer.scene.fxaa = false;
}
*/
// viewer.scene.imageryLayers.removeAll();  // clear all layers
// viewer.scene.globe.baseColor = Cesium.Color.BLACK;   // set globe black
// new Cesium.GeographicProjection(ellipsoid)   // set EPSG4236
// viewer.extend(Cesium.viewerPerformanceWatchdogMixin, {
//    lowFrameRateMessage: 'Your screen is running very slowly. You should try our mobile app: climateviewer.org/mobile/?'
// });

// add baseLayerPicker

var baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
    globe: viewer.scene,
    imageryProviderViewModels: imageryViewModels,
    terrainProviderViewModels: terrainProviders
});

var animationContainer = $('.cesium-viewer-animationContainer');
var timelineContainer = $('.cesium-viewer-timelineContainer');
var credit = $('.cesium-viewer-bottom');

animationContainer.hide();
timelineContainer.hide();
//credit.hide();

function toggleTimeline(show) {
    if (show) {
        animationContainer.show();
        timelineContainer.addClass('show');
        $('#toggle-timeline').addClass('active');
    } else if (timelineContainer.is(":visible")) {
        animationContainer.hide();
        timelineContainer.removeClass('show');
        $('#toggle-timeline').removeClass('active');
    } else {
        animationContainer.show();
        timelineContainer.addClass('show');
        var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8))),
            endTime = Cesium.JulianDate.now();
        viewer.timeline.zoomTo(startTime, endTime);
        $('#toggle-timeline').addClass('active');
    }
}
$('#timeline').toggle(function () {
        toggleTimeline();
        $(this).addClass('active');
    },
    function () {
        toggleTimeline();
        $(this).removeClass('active');
    }
);

$('#sunlight').toggle(
    function () {
        viewer.scene.globe.enableLighting = true;
        $(this).addClass('active');
    },
    function () {
        viewer.scene.globe.enableLighting = false;
        $(this).removeClass('active');
    }
);

var homeView = new Cesium.Rectangle.fromDegrees(-128, 19.64, -61, 50.54);
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = homeView;
viewer.camera.setView({
    destination: homeView
});

var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2000, 1, 1)));
var endTime = Cesium.JulianDate.now();
viewer.timeline.zoomTo(startTime, endTime);

var activeLayers = {};
var infoBox = $('.cesium-infoBox');
var layerEnabled = {}; // whether the label is in some way enabled
var me = new Self();

nobjectsIn(layers, function (x) {
    //console.log(x);
}, function (s, p, o) {
    me.addEdge(s, p, o);
});

// DATE PICKER

var date = new Date();
date.setDate(date.getDate() - 1);
var yesterday = Cesium.JulianDate.fromDate(date);
var startdate = Cesium.JulianDate.toDate(yesterday);

var $input = $('#datepicker').pickadate({
    format: 'mmmm d, yyyy',
    formatSubmit: 'yyyy-mm-dd',
    min: [2000, 1, 1],
    max: Cesium.JulianDate.now(),
    container: '#datepicker-container',
    // editable: true,
    closeOnSelect: true,
    closeOnClear: false,
    selectYears: true,
    selectMonths: true
});

var picker = $input.pickadate('picker');
picker.set('select', startdate);
picker.on({
    set: function () {
        var selectedDate = picker.get('select', 'yyyy-mm-dd');
        //console.log(selectedDate);
        $('.nasa-gibs.active').each(function () {
            loadGIBS($(this).attr('id'), selectedDate, $(this).attr('data-format'), $(this).attr('data-zoom'));
        });
    }
});
var start = picker.get('select', 'yyyy-mm-dd');

// SET PICKER DATE WHEN YOU SLIDE TIMELINE
var previousTime = null;
var isoDate = function (isoDateTime) {
    return isoDateTime.split("T")[0];
};
var isoDateTime = clock.currentTime.toString();
var time = "TIME=" + isoDate(isoDateTime);
var onClockUpdate = _.throttle(function () {
    isoDateTime = clock.currentTime.toString();
    time = isoDate(isoDateTime);
    if (time !== previousTime) {
        previousTime = time;
        picker.set('select', time, {
            format: 'yyyy-mm-dd'
        });
    }
}, 250, {
    leading: true,
    trailing: true
});

viewer.clock.onTick.addEventListener(onClockUpdate);
onClockUpdate();
/*
function openPicker() {
    $('#datepicker').pickadate('picker').open();
}
*/
$('#distanceLegendDiv').before('<div class="legend-cap" title="Distance Legend"></div>').attr('title', 'Distance Legend');
$('.distance-legend').addClass('noselect');

$('#cv').on("click", function () {
    $('#about').toggle();
});

// GET SHARE URL

function getURLParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function loading(layerId) {
    $('.' + layerId + '-load').removeClass('fa-eye-slash').addClass('fa-spinner fa-spin loading active');
}
function loaded(layerId, timeline, rectangle) {
    $('.' + layerId + '-load').removeClass('fa-spinner fa-spin loading').addClass('fa-eye');
    $('.' + layerId + '-tree').trigger('click');
    if (rectangle) {
        //console.log(rectangle);
        if (rectangle === "home") {
            viewer.camera.flyTo({
                destination: homeView
            });
        } else {
            var west = rectangle[0];
            var south = rectangle[1];
            var east = rectangle[2];
            var north = rectangle[3];
            var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
            viewer.camera.flyTo({
                destination: rectangle
            });
        }
    }/* else {
        viewer.camera.flyHome();
    }*/
    if (timeline) toggleTimeline(true);
    console.log(layerId + ' loaded successfully');
}
function loadError(layerId, geoDataSrc, error) {
    // console.log('loading ' + layerId + ' failed: ' + error);
    var target = $('#' + layerId);
    $('<div class="details"><div class="header"><i class="fa fa-fw fa-exclamation-circle"></i> Load Failed</div>Please use <a href="mailto:jim@climateviewer.com?subject=Climate Viewer 3D broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly, please look into it.  Sent from http://climateviewer.org/3D/" target="_self">this link</a> to report this error.<br><div class="darkwell"><strong>ERROR:</strong> ' + error + '</div></div>').appendTo(target);
    var icon = $('.' + layerId + '-load');
    var span = $('#' + layerId + ' span');
    icon.removeClass('fa-spinner fa-spin active loading').addClass('fa-exclamation-triangle fail');
    span.removeClass('active').addClass('fail');
}

// LAYER SLIDERS

function NSlider(opt) {
    var src = opt.src;
    var mod = opt.mod;
    opt = opt || {};

    if (!opt.element) opt.element = $('<div class="item slider"></div>');
    if (!opt.min) opt.min = 0;
    if (!opt.max) opt.max = 1;
    if (!opt.start) opt.start = 1;
    if (!opt.label) opt.label = '';

    $('<div class="label">' + opt.label + '</div>').appendTo(opt.element);
    var slider = $('<input class="' + opt.label + '" type="range">').appendTo(opt.element);
    var begin = (opt.start / opt.max) * 100;

    slider.attr('min', 0);
    slider.attr('max', 100);
    slider.attr('step', 1);
    slider.attr('value', begin);

    slider.on("change", function () {
        var newValue = slider.val();
        var percent = (newValue / 100).toFixed(2);
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

function loadSliders(src, layerId, timeline, rectangle) {
    var target = $('#' + layerId + ' .lb');
    //var label = $('<div class="slider-group-label ' + layerId + '-sliders"><i class="options icon"></i> Layer Controls</div>').insertAfter(target);
    var sPanel = $('<div class="details ' + layerId + '-sliders layer-sliders" />').insertAfter(target);
    var content = $('<div class="slider-content" />').appendTo(sPanel);
    var list = $('<div class="ui divided list" />').appendTo(content);

    NSlider({
        'label': 'opacity',
        'src': src
    }).appendTo(list);
    NSlider({
        'max': 2,
        'label': 'brightness',
        'src': src
    }).appendTo(list);
    NSlider({
        'max': 2,
        'label': 'contrast',
        'src': src
    }).appendTo(list);
    NSlider({
        'max': 2,
        'label': 'saturation',
        'src': src
    }).appendTo(list);
    //NSlider({ 'max': 2, 'label': 'gamma', 'src': src }).appendTo(list);

    src.alpha = 1;
    src.brightness = 1;
    src.contrast = 1;
    src.saturation = 1;
    //src.gamma = 1;

    loaded(layerId, timeline, rectangle);
}


// LOAD BASE LAYERS

function loadOsmLayer(layerId, geoDataSrc) {
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.createOpenStreetMapImageryProvider({
        url: geoDataSrc
            //credit : source
    }));
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

function loadCartoDB(layerId, geoDataSrc) {
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: geoDataSrc
    }));
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

function loadBingLayer(layerId, geoDataSrc) {
    var src, bingUrl = '//dev.virtualearth.net',
        bingKey = 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw';
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

// MODIFY MARKERS

var defaultKMLEyeOffset = new Cesium.Cartesian3(0.0, 5000.0, 0.0);
var defaultScaleByDistance = new Cesium.NearFarScalar(1, 0.5, 1, 0.3);
var defaultTranslucency = new Cesium.NearFarScalar(1.5e2, 1, 3.0e6, 0);

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
    var items, markerList;
    if (noList === false) {
        var layerTarget = $('.' + layerId + '-details');
        markerList = $('<div class="details ' + layerId + '-list marker-list" />').insertAfter(layerTarget);
        items = [];
    }

    var entities = geoData.entities.values; // entities = all points
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i],
            billboard = entity.billboard,
            image = '/dist/img/icons/cv3d.png';

        if (typeof entity.name != 'undefined') {
            name = entity.name;
        } else {
            name = 'unnamed location';
        }

        if (markerImg) {
            image = markerImg;
        } else if (typeof entity.billboard !== 'undefined' && typeof entity.billboard.image !== 'undefined') {
            image = entity.billboard.image;
        }
        billboard.image = image;

        var size;
        if (markerLabel == 'none') {
            size = 0;
        } else if (markerLabel == 'usgs-eq') {
            size = entity.properties.mag;
        } else if (markerScale) {
            size = markerScale;
        } else {
            size = 3;
        }
        billboard.scale = size;

        var title = '';
        if (entity.properties.title) {
            title = '<h3>' + entity.properties.title + '</h3>';
        } else if (entity.properties.Name) {
            title = '<h3>' + entity.properties.Name + '</h3>';
        } else if (entity.properties.name) {
            title = '<h3>' + entity.properties.name + '</h3>';
        } else if (entity.properties.LICENSEE) {
            title = '<h3>' + entity.properties.LICENSEE + '</h3>';
        }
        entity.title = title;

        var details = '';
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
        }
        entity.description = details;

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
            items.push('<li data-lon="' + lon + '"  data-lat="' + lat + '"><canvas width="20" height="20" class="marker-icon" data-src="' + image + '"></canvas> &nbsp;' + name + '</li>');
        }

        // marker label
        //if (markerLabel) {
        //    entity.label = newMarkerLabel(entity, markerLabel);
        //}
    } // end for loop
    if (noList === false) {
        $('<h5><i class="fa fa-fw fa-map-marker"></i> Map Markers <span>Click to fly to location</span></h5>').appendTo(markerList);
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

        $('.' + layerId + '-list li canvas.marker-icon').each(function () {
            var icUrl = $(this).attr('data-src');

            var tintCanvas = document.createElement('canvas');
            tintCanvas.width = 20;
            tintCanvas.height = 20;
            var tintCtx = tintCanvas.getContext('2d');

            var ctx = $(this)[0].getContext('2d');
            var x = 0;
            var y = 0;

            var pic = new Image();
            pic.width = 20;
            pic.height = 20;

            pic.onload = function () {
                ctx.drawImage(pic, x, y, pic.width = 20, pic.height = 20);
                ctx.globalAlpha = 1;
                ctx.drawImage(tintCanvas, x, y);
            }
            pic.src = icUrl;

        });

    }
}

function modKML(layerId, geoData, markerLabel, markerScale, noList, proxy) {
    //console.log(noList);
    var entities = geoData.entities.values,
        items, markerList;
        console.log('nolist - ' + noList);
    if (noList === false) {
        var layerTarget = $('.' + layerId + '-details');
        markerList = $('<div class="details ' + layerId + '-list marker-list" />').insertAfter(layerTarget);
        items = [];
    }
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
            //console.log(entity);
        if (typeof entity.billboard !== 'undefined' && typeof entity.billboard.image !== 'undefined') {
            if (typeof entity.name != 'undefined') {
                name = entity.name;
            } else {
                name = 'unnamed location';
            }

            if (markerLabel == 'none') {
                var label = new Cesium.LabelGraphics();
                label.text = "";
                entity.label = label;
                console.log('removed kml label');
            }

            if (markerScale) {
                entity.billboard.scale = markerScale;
            }

            entity.billboard.width = 32;
            entity.billboard.height = 32;
            //entity.label.text = '';
            entity.billboard.alignedAxis = Cesium.Cartesian3.ZERO;
            entity.billboard.scaleByDistance = defaultScaleByDistance;

            if (noList === false) {
                var v = entity.position.getValue();
                var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(v);
                var lon = Cesium.Math.toDegrees(carto.longitude);
                var lat = Cesium.Math.toDegrees(carto.latitude);
                //console.log(lon, lat);

                var name,
                    bcolor,
                    rgba,
                    hex;

                if (typeof entity.billboard.color != 'undefined') {
                    console.log('marker has color');
                    var t = entity.billboard.color.getValue();
                    var blkstr = [];
                    $.each(t, function(idx2,val2) {
                        if (idx2 === 'red' || idx2 === 'green' || idx2 === 'blue') {
                          //var str = idx2 + ":" + val2;
                          blkstr.push(val2 * 255);
                        }
                    });
                    rgba = blkstr.join(", ");
                    hex = rgb2hex('rgba(' + rgba + ',1)');
                } else {
                    hex = 'none';
                }

                //console.log(hex);
                //hex = 'none';

                var icu = entity.billboard.image.getValue()._url;

                //console.log(icu);

                items.push('<li data-lon="' + lon + '"  data-lat="' + lat + '"><canvas width="20" height="20" class="marker-icon" data-src="' + icu + '" data-tint="' + hex + '"></canvas> &nbsp;' + name + '</li>');
            }

        }
    } // end for loop

    //console.log('loop kml complete');
    if (noList === false) {

        $('<h5><i class="fa fa-fw fa-map-marker"></i> Map Markers <span>Click to fly to location</span></h5>').appendTo(markerList);
        $('<ol/>', {
            'class': 'markers',
            html: items.join('')
        }).appendTo(markerList);

        $('.' + layerId + '-list li').click(function () {
            var lon = $(this).attr('data-lon');
            var lat = $(this).attr('data-lat');
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(lon, lat, 1500.0)
            });
        });

        $('.' + layerId + '-list li canvas.marker-icon').each(function () {
            var hexColor = $(this).attr('data-tint');
            var icUrl = $(this).attr('data-src');

            var tintCanvas = document.createElement('canvas');
            tintCanvas.width = 20;
            tintCanvas.height = 20;
            var tintCtx = tintCanvas.getContext('2d');

            var ctx = $(this)[0].getContext('2d');
            var x = 0;
            var y = 0;

            var pic = new Image();

            if (hexColor !== 'none') {
                pic.onload = function () {
                    tintCtx.fillStyle = hexColor;
                    tintCtx.fillRect(x,y,20,20);
                    tintCtx.globalCompositeOperation = "destination-atop";
                    tintCtx.drawImage(pic, x, y);

                    ctx.drawImage(pic, x, y, pic.width = 20, pic.height = 20);
                    ctx.globalAlpha = 0.9;
                    ctx.drawImage(tintCanvas, x, y);
                }
            } else {
                pic.onload = function () {
                    ctx.drawImage(pic, x, y, pic.width = 20, pic.height = 20);
                    ctx.globalAlpha = 1;
                    ctx.drawImage(tintCanvas, x, y);
                }
            }
            pic.src = icUrl;
        });
    }
}

// LOAD MAP LAYERS

function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList, timeline, rectangle, noClamp) {
    // console.log('load geojson');
    new Cesium.GeoJsonDataSource.load(geoDataSrc, { clampToGround: noClamp }).then(function (geoData) {
        modMarkers(layerId, geoData, markerImg, markerScale, markerLabel, noList);
        viewer.dataSources.add(geoData);
        activeLayers[layerId] = geoData;
        loaded(layerId, timeline, rectangle);
        if (zoom === true) {
            viewer.flyTo(geoData);
        }
    }, function (error) {
        loadError(layerId, geoDataSrc, error);
    });
}

function loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod, noList, timeline, rectangle, noClamp) {
    if (proxy) {
        var resource = new Cesium.Resource({
            url: geoDataSrc,
            proxy: {
                getURL: function (geoDataSrc) {
                    return proxyURL + encodeURIComponent(geoDataSrc);
                }
            }
        });
        new Cesium.KmlDataSource.load(resource, {
            //sourceUri: geoDataSrc,
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
            clampToGround: noClamp
        }).then(function (geoData) {
            console.log('loaded proxied kml');
            if (markerMod) {
                modKML(layerId, geoData, markerLabel, markerScale, noList, proxy);
                console.log('modified proxied kml');
            }
            //console.log(geoData.entities);
            viewer.dataSources.add(geoData); // add to map
            activeLayers[layerId] = geoData; // store for removal
            if (zoom === true) {
                viewer.flyTo(geoData);
            }
            loaded(layerId, timeline, rectangle);
        }, function (error) {
            loadError(layerId, geoDataSrc, error);
        }); // end then
    } else {
        new Cesium.KmlDataSource.load(geoDataSrc, {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
            clampToGround: noClamp
        }).then(function (geoData) {
            console.log('loaded kml');
            if (markerMod) {
                modKML(layerId, geoData, markerLabel, markerScale, noList);
                console.log('modified kml, no proxy');
            } // end markerMod
            viewer.dataSources.add(geoData);
            activeLayers[layerId] = geoData;
            if (zoom === true) {
                viewer.flyTo(geoData);
            }
            loaded(layerId, timeline, rectangle);
        }, function (error) {
            loadError(layerId, geoDataSrc, error);
        }); // end then
    } // end proxy
}

function loadArcGisLayer(layerId, geoDataSrc, geoLayers, noFeatures, format, timeline, rectangle) {
    var src, link, options;
    if (noFeatures) {
        //console.log('NO FEATURES FOR YOU!');
        options = {
            url: geoDataSrc,
            format: format,
            enablePickFeatures: false,
            layers: geoLayers,
            tilingScheme: new Cesium.WebMercatorTilingScheme()
        }
    } else {
        options = {
            url: geoDataSrc,
            format: format,
            enablePickFeatures: true,
            layers: geoLayers,
            tilingScheme: new Cesium.WebMercatorTilingScheme()
        }
    }
    src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider(options));
    activeLayers[layerId] = src;
    loadSliders(src, layerId, timeline, rectangle);
}


function loadGIBS(layerId, selectedDate, format, zoomLevel, timeline, rectangle) {
    removeImagery(layerId);

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        // url: "//map1.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=" + selectedDate,
        url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi?TIME=" + selectedDate,
        layer: layerId,
        style: "",
        format: format,
        tileMatrixSetID: 'GoogleMapsCompatible_Level' + zoomLevel,
        minimumLevel: 0,
        maximumLevel: zoomLevel,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    }));

    activeLayers[layerId] = src;
    $('.' + layerId + '-sliders').remove();
    loadSliders(src, layerId, timeline, rectangle);
}

function loadWmts(layerId, geoDataSrc, geoLayers, timeline, rectangle) {
    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: geoDataSrc,
        layers: geoLayers,
        style: "",
        format: "image/png",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    }));

    activeLayers[layerId] = src;
    loadSliders(src, layerId, timeline, rectangle);
}

function loadWms(layerId, geoDataSrc, geoLayers, noFeatures, timeline, rectangle) {
    var src;
    var resource = new Cesium.Resource({
        url: geoDataSrc,
        proxy: {
            getURL: function (geoDataSrc) {
                return proxyURL + encodeURIComponent(geoDataSrc);
            }
        }
    });

    if (noFeatures) {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
            url: resource,
            layers: geoLayers,
            //sourceUri: geoDataSrc,
            enablePickFeatures: false,
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            parameters: {
                transparent: true,
                format: 'image/png'
            }
        }));
    } else {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
            url: resource,
            layers: geoLayers,
            //sourceUri: geoDataSrc,
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            parameters: {
                transparent: true,
                format: 'image/png'
            }
        }));
    }
    activeLayers[layerId] = src;
    loadSliders(src, layerId, timeline, rectangle);
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
    if (mlt === ("nasa-gibs") || mlt === ("cartodb-layer") || mlt === ("wmts") || mlt === ("wms") || mlt === ("base-layer") || mlt === ("arcgis-layer") || mlt === ("arcgis-base-layer") || mlt === ("bing")) {
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
        //height = l.HT,
        //width = l.W,
        markerMod = l.M,
        markerImg = l.MI,
        markerScale = l.MS,
        markerLabel = l.ML,
        timeline = l.C,
        noList = l.Y,
        format = l.F,
        zoomLevel = l.Fz,
        proxy = l.P,
        noFeatures = l.X,
        timeline = l.C,
        rectangle = l.R,
        noClamp = l.NC,
        zoom;

    var selectedDate = picker.get('select', 'yyyy-mm-dd');

    if (!includeOnly) zoom = l.Z;

    if (geoLayers) {
        geoLayers = geoLayers;
    } else {
        geoLayers = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,";
    }

    if (zoomLevel) {
        zoomLevel = zoomLevel;
    } else {
        zoomLevel = "9";
    }

    if (format === "jpg") {
        format = "image/jpeg";
    } else {
        format = "image/png";
    }

    if (noList) {
        noList = true;
    } else {
        noList = false;
    }

    if (noClamp) {
        noClamp = false;
    } else {
        noClamp = true;
    }

    if (layerEnabled[layerId] === undefined) {
        //put it in a temporary state to disallow loading while loading
        layerEnabled[layerId] = false;
        // Load layers by Type
        if (l.T === ("wms")) {
            loadWms(layerId, geoDataSrc, geoLayers, noFeatures, timeline, rectangle);
        } else if (l.T === ("nasa-gibs")) {
            loadGIBS(layerId, selectedDate, format, zoomLevel, timeline, rectangle);
        } else if (l.T === ("wmts")) {
            loadWmts(layerId, geoDataSrc, geoLayers, timeline, rectangle);
        } else if (l.T === ("cartodb-layer")) {
            loadCartoDB(layerId, geoDataSrc);
        } else if (l.T === ("base-layer")) {
            loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("arcgis-layer") || l.T === ("arcgis-base-layer")) {
            loadArcGisLayer(layerId, geoDataSrc, geoLayers, noFeatures, format, timeline, rectangle);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList, timeline, rectangle, noClamp);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod, noList, timeline, rectangle, noClamp);
        } else if (l.T === ('bing')) {
            loadBingLayer(layerId, geoDataSrc);
        } else {
            console.log(layerId + ' failed to load map type: ' + l.T);
        }
    }
}

function newFolderLabel(l, child, ic, id, d) {
    var icon;
    if (ic) {
        icon = '<i class="fa fa-fw ' + ic + '"></i>';
    } else {
        icon = '';
    }
    var menuToggle = $('<h2>').addClass('toggle').html(icon + '<span>' + l.N + '</span>').click(function () {
        if (child.is(':visible')) {
            child.hide();
            if (d) {
                child.find($('.folder-description')).remove();
            }
            menuToggle.removeClass('active');
        } else {
            child.show();
            if (d) {
                //console.log('has desc');
                $('<div class="folder-description"></div>').html(d).prependTo(child);
            }
            menuToggle.addClass('active');
        }
    });
    if (id) {
        menuToggle.prop('id', id);
        child.addClass(id + "-child");
    }
    return menuToggle;

}

function initDetails(layerId, layerType, details, source, sourceUrl, geoDataSrc) {
    var list = $('<div class="details ' + layerId + '-content" />').appendTo(details);
    $('<div class="header"><i class="fa fa-fw fa-info-circle"></i> Layer Details</div><div>' + source + '</div><div class="header"><i class="fa fa-fw fa-link"></i> More Info</div><div><strong><a href="' + sourceUrl + '" target="_blank" rel="noopener nofollow">' + sourceUrl + '</a></strong></div>').appendTo(list);
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
    if (layerType == ('arcgis-layer') || layerType == ('arcgis-base-layer')) {
        $('<div class="header"><i class="fa fa-fw fa-file-o"></i> Data Source</div><span>ArcGIS MapServer<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '/legend">Map Legend</a> &bull; <a target="_blank" rel="nofollow" href="' + geoDataSrc + '">MapServer Information</a></span>>').appendTo(list);
    }
    $('<div class="header"><i class="fa fa-share-square-o fa-fw"></i> Share This Layer</div><span>Use this url to share this layer: <a href="/index.html?layersOn=' + layerId + '" target="_self">Share Link</a></span><div class="header"><i class="fa fa-exclamation-triangle fa-fw"></i> Report Error</div><span>If you are experiencing problems loading this layer, or you would like to suggest corrections, comments, or concerns, please email me using this link: <a href="mailto:jim@climateviewer.com?subject=ClimateViewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + layerId + ' ) map is not working properly, please look into it. Sent from http://climateviewer.org/" target="_self">Report Error</a></span>').appendTo(list);

}

function addTree(parent /* nodes  */ , lb /*target */ , includeOnly) {
    var layers = me.successors(parent);
    _.each(layers, function (l) {
        var h = me.node(l),
            content,
            layerId = h.I,
            layerType = h.T;

        var child = $('<div class="folder" />').html(h);
        if (!h.T) {
            var ic = h.icon, id = h.id, d = h.description;
            //Folder Label
            content = newFolderLabel(h, child, ic, id, d);
        } else { // not a folder
            var present = true;
            if (present) {
                var geoDataSrc = h.G,
                    source = h.S,
                    sourceUrl = h.U,
                    largeLayer = h.H,
                    newLayer = h.NL,
                    markerMod = h.M,
                    timeline = h.C,
                    format = h.F,
                    zoomLevel = h.Fz,
                    noList = h.Y,
                    layerButton, details, loadIcon, optIcon, treeIcon, sliderIcon, label;

                if (noList !== true) noList = false;

                if (markerMod) {
                    markerMod = true;
                } else {
                    markerMod = false;
                }

                if (zoomLevel) {
                    zoomLevel = zoomLevel;
                } else {
                    zoomLevel = "9";
                }

                if (format === "jpg") {
                    format = "image/jpeg";
                } else {
                    format = "image/png";
                }

                //console.log(noList);
                if (format) {
                    content = $('<div>').data('l', h).attr({
                        'id': h.I,
                        'data-format': format,
                        'data-zoom': zoomLevel
                    }).addClass('lbw ' + h.T); //layer button wrapper
                } else {
                    content = $('<div>').data('l', h).attr('id', h.I).addClass('lbw ' + h.T); //layer button wrapper
                }
                layerButton = $('<div>').addClass('lb').appendTo(content); // layer button
                //expand layer options
                optIcon = $('<i>').addClass('fa fa-fw fa-info-circle').toggle(
                    function () {
                        if (details.children().length === 0) {
                            initDetails(layerId, layerType, details, source, sourceUrl, geoDataSrc);
                        }
                        details.show();
                        details.focus();
                        optIcon.addClass('active');
                    },
                    function () {
                        details.hide();
                        optIcon.removeClass('active');
                    }
                ).appendTo(layerButton);

                if ((h.T === 'geojson') && (noList === false) || (h.T === 'kml') && (markerMod === true) && (noList === false)) {
                    treeIcon = $('<i title="Expand Marker Tree" class="fa fa-fw fa-sitemap toggle-list ' + layerId + '-tree"></i>');
                    treeIcon.click(function () {
                        setTimeout(function () {
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

                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis-layer") || h.T === ("arcgis-base-layer") || h.T === ("bing")) {
                    sliderIcon = $('<i title="Expand Marker Tree" class="fa fa-fw fa-sliders toggle-list ' + layerId + '-tree"></i>');
                    sliderIcon.click(function () {
                        setTimeout(function () {
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

                loadIcon = $('<i class="fa fa-fw fa-eye-slash ' + layerId + '-load"></i>');
                if (largeLayer) loadIcon.addClass('large-layer');
                if (newLayer) loadIcon.addClass('new-layer');

                loadIcon.toggle(
                    function () {
                        setTimeout(function () {
                            if (loadIcon.hasClass('fa-eye-slash')) {
                                if (includeOnly) {
                                    updateLayer(layerId, includeOnly);
                                } else {
                                    updateLayer(layerId);
                                }
                                if (!label.hasClass('active')) label.addClass('active');
                                if (!content.hasClass('active')) content.addClass('active');
                                if (timeline) toggleTimeline(true);
                                if ((h.T === 'geojson') && (noList === false) || (h.T === 'kml') && (markerMod === true) && (noList === false)) treeIcon.show();
                                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis-layer") || h.T === ("arcgis-base-layer") || h.T === ("bing")) {
                                    sliderIcon.show();
                                }
                            }
                        });
                    },
                    function () {
                        setTimeout(function () {
                            if (loadIcon.hasClass('fa-eye')) {
                                disableLayer(h);
                                loadIcon.removeClass('fa-eye active').addClass('fa-eye-slash');
                                if (label.hasClass('active')) label.removeClass('active');
                                if (content.hasClass('active')) content.removeClass('active');
                                if (optIcon.hasClass('fa-folder-open-o')) optIcon.trigger('click');
                                if ((h.T === 'geojson') && (noList === false) || (h.T === 'kml') && (markerMod === true)) treeIcon.hide();
                                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis-layer") || h.T === ("arcgis-base-layer") || h.T === ("bing")) {
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

                details = $('<div class="' + layerId + '-details layer-details" />').appendTo(content);
                details.hide(); //begin hidden
            } // end present
        }

        if (content !== null) {
            lb.append(content);

            var ll = addTree(h.I, child, includeOnly);
            if (ll.length) {
                lb.append(child);
            }
        }

    });
    return layers;
}

function countLayers() {
    var lc = $('#map-layers div.lbw').length;
    var activeLayers = $('#active-layers div.lbw').length;
    //console.log(activeLayers);
    if ($('#active-layers').is(':visible')) {
        if (activeLayers == '0') {
            $('#layer-count').html('No Active Maps');
        } else if (activeLayers == '1') {
            $('#layer-count').html(activeLayers + ' Map');
        } else {
            $('#layer-count').html(activeLayers + ' Maps');
        }
    } else {
        $('#layer-count').html(lc + ' Maps');
    }

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
    countLayers();
}

// MAP MODE BUTTONS
/*
$('#mode-3D').click(function () {
    viewer.scene.morphTo3D();
    $('#mode-2D.active').removeClass('active');
    $(this).addClass('active');
});
$('#mode-2D').click(function () {
    viewer.scene.morphTo2D();
    $('#mode-3D.active').removeClass('active');
    $(this).addClass('active');
});
$('.mode-flat').click(function () {
    viewer.scene.morphToColumbusView();
    $('.map-mode div.active').removeClass('active');
    $(this).addClass('active');
});
*/


$('.cesium-baseLayerPicker-item').each(function () {
    var label = $(this).find($('.cesium-baseLayerPicker-itemLabel'));
    var baseLayerId = encodeURIComponent(label.html());
    $(this).prop('id', baseLayerId);
});


// CHECK URL
var initialLayers = (getURLParameter("layersOn") || '').split(',');
var disabledLayers = (getURLParameter("layersOff") || '').split(",");
if (initialLayers[0] === '') initialLayers = [];
if (disabledLayers[0] === '') disabledLayers = [];
var allLayers = initialLayers.concat(disabledLayers);
var baseLayer = (getURLParameter("baseLayer") || '');
if (baseLayer.length > 0) {
    console.log('yes + ' + baseLayer);
    var baseLayerId = encodeURIComponent(baseLayer);
    console.log(baseLayerId);
    $("div[id='" + baseLayerId + "']").trigger('click');
}


if (allLayers.length > 0) {
    // LOAD LAYERS FROM URL
    var latView = (getURLParameter("lat") || '-78.176832746519');
    var lonView = (getURLParameter("lon") || '31.300283760032368');
    var zoomView = (getURLParameter("zoom") || '26596280.257583864');
    var dateView = (getURLParameter("date") || time);

    if (dateView !== time) {
        picker.set('select', dateView, {
            format: 'yyyy-mm-dd'
        });
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

    var modeView = (getURLParameter("mode") || '3D');
    if (modeView !== '3D') {
        if (modeView === '2D') {
            viewer.scene.morphTo2D();
        } else if (modeView === 'flat') {
            viewer.scene.morphToColumbusView();
        }
    }

    var shared = $('<div class="folder" style="display: block;"></div>').prependTo('#map-layers');
    $('<h2 class="toggle active">Shared Layers</h2>').prependTo('#map-layers').show();

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

function bit_url(shareLink) {
    var url = shareLink;
    //console.log(url);
    var username = "r3zn8d"; // bit.ly username
    var key = "b5c2d6d1704074b0741a7449a98e3fcef2790699";
    $.ajax({
        url: "https://api-ssl.bitly.com/v3/shorten",
        data: {
            longUrl: url,
            access_token: key,
            login: username
        },
        dataType: "jsonp",
        success: function (v) {
            var bit_url = v.data.url;
            $("#share-short").val(bit_url);
        }
    });
}

bit_url('http://climateviewer.org/')

function shareLink() {
    var layers = "",
        baseLayer,
        shareLink = shareURL;

    $('.lbw.active').each(function () {
        var L = $(this).attr('id');
        layers += L + ',';
    });

    shareLink += 'index.html?';

    // GET ACTIVE LAYERS
    if (layers.length > 0) {
        layers = layers.substring(0, layers.length - 1);
        shareLink += 'layersOn=' + layers;
    }

    // GET BASE LAYERS
    shareLink += '&baseLayer=' + $('.cesium-baseLayerPicker-selectedItem').prop('id');

    // GET SCENE MODE
    if ($('.cesium-sceneModePicker-wrapper button:first-of-type').hasClass('cesium-sceneModePicker-button3D')) {
        var scene = viewer.scene;
        var camera = scene.camera;
        var windowPosition = new Cesium.Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
        var pickRay = viewer.scene.camera.getPickRay(windowPosition);
        var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
        var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
        var height = camera.positionCartographic.height;
        var lat = pickPositionCartographic.longitude * (180 / Math.PI);
        var lon = pickPositionCartographic.latitude * (180 / Math.PI);
        var ll = lat.toFixed(5);
        var ln = lon.toFixed(5);
        var zoom = height.toFixed(2);

        shareLink += '&lat=' + ll;
        shareLink += '&lon=' + ln;
        shareLink += '&zoom=' + zoom;
        shareLink += '&mode=3D';
        console.log('3D');
    } else if ($('.cesium-sceneModePicker-wrapper button:first-of-type').hasClass('cesium-sceneModePicker-button2D')) {
        shareLink += '&mode=2D';
        console.log('2D');
    } else if ($('.cesium-sceneModePicker-wrapper button:first-of-type').hasClass('cesium-sceneModePicker-buttonColumbusView')) {
        shareLink += '&mode=flat';
        console.log('Columbus View');
    }

    // GET DATE
    var date = picker.get('select', 'yyyy-mm-dd');
    shareLink += '&date=' + date;

    // SET SHARE MODAL LINK
    $('#share-link').val(shareLink);

    // SET SHARE MODAL EMBED
    $('#share-embed').val('<iframe src="' + shareLink + '" title="ClimateViewer 3D embedded map via ClimateViewer.org" style="width:100%;min-height:300px;display:block;position:relative;"></iframe>');

    // SHORTEN URL
    var encodeLink = encodeURIComponent(shareLink);

    bit_url(shareLink);
}

$('#share').on('click', function () {
    shareLink();
});
$('#add').one('click', function () {
    $(this).removeClass('pulse');
});

$('#share-modal input').on('click', function () {
    $(this).select();
});

/*
https://github.com/marcuswestin/store.js/
https://stackoverflow.com/questions/22268182/cesium-js-save-camera-position

var store = require('store');

function storeCam() {
    var cam = viewer.scene.camera;
    store.set('camPosition', {
      position: cam.position.clone(),
      direction: cam.direction.clone(),
      up: cam.up.clone(),
      right: cam.right.clone(),
      transform: cam.transform.clone(),
      frustum: cam.frustum.clone()
    });
    //console.log(store);
}
function setCam() {
    var cam = viewer.scene.camera;
    store.get('camPosition', {
      position: cam.position.clone(),
      direction: cam.direction.clone(),
      up: cam.up.clone(),
      right: cam.right.clone(),
      transform: cam.transform.clone(),
      frustum: cam.frustum.clone()
    });
    //console.log(store);
}
*/



/*
$('#options-menu').click(function () {
    var target = $("div.map-options");
    if (!target.is(":visible")) {
        console.log('show it');
        target.addClass('show');
        $(this).addClass('active');
    } else {
        console.log('hide it');
        target.removeClass('show');
        $(this).removeClass('active');
    }
});
*/

$('.map-options .menu-item').hover(
  function() {
    var id = $(this).attr('id');
    $('div.menu-hover span.menu-label').hide();
    $('div.menu-hover span.menu-label.' + id).show();
  }, function() {
    $('div.menu-hover span.menu-label').hide();
    $('div.menu-hover span.menu-label.layers').show();
  }
);
/*
$('.report-tab').click(function (e) {
    e.preventDefault();
    var clientWidth = $(window).width(),
        clientHeight = $(window).height();
    if (clientWidth < 1024) {
        window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + clientHeight + ',width=' + clientWidth + '');
        return false;
    } else {
        window.open('https://climateviewer.crowdmap.com/', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');
        return false;
    }
});
*/
$('#about-toggle').click(function (e) {
    e.preventDefault();
    if ($('#about').is(':visible')) {
        $('#about').hide();
        $(this).removeClass('active');
    } else {
        $('#about').show();
        $(this).addClass('active');
    }
});
$('#chat-window').click(function (e) {
    e.preventDefault();
    window.open('https://discord.gg/SnCG4Wm');
    return false;
});

$('#clear').on('click', function () {
    $('#map-layers i.active').trigger('click');
});

$('.cesium-viewer-fullscreenContainer').click(function() {
    resize();
})


// LAYER MENU OPTIONS (TOP)
$('#close-menu').on('click', function () {
    toggleSidebar();
});
$('#collapse-menu').on('click', function () {
    $('i.fa-sitemap.active').trigger('click');
    $('.fa-folder-open-o.active').trigger('click');
    //$('.folder h2.active').trigger('click');
    $('h2.active').trigger('click');
});
$('#top-layers').on('click', function () {
    $('.map-layers-window').animate({
        scrollTop: ($('#top').offset().top - 90)
    }, 500);
});

// MOVE DEFAULT CESIUM STUFF TO SIDEBAR DIVS
$('.cesium-baseLayerPicker-dropDown').addClass('cesium-baseLayerPicker-dropDown-visible').detach().prependTo($('.basemaps-child'));
$('.cesium-widget-credits').detach().appendTo($('.cv-footer'));
$('.cesium-baseLayerPicker-dropDown').children('.cesium-baseLayerPicker-sectionTitle').eq(0).html('Globe Base Imagery');
$('.cesium-baseLayerPicker-dropDown').children('.cesium-baseLayerPicker-sectionTitle').eq(1).html('Globe Terrain');
$('.cesium-viewer-toolbar').detach().appendTo($('.navigation-controls'));
$('.cesium-viewer-geocoderContainer').detach().prependTo($('.search'));
$('.cesium-geocoder-input').addClass('cesium-geocoder-input-wide');
//$('[data-bind="foreach: imageryProviderViewModels"]').remove();

$('.map-options').detach().appendTo($('#cesiumContainer'));


function isEmpty( el ){
  return !$.trim(el.html());
}
// TOGGLE DISPLAY OF ALL/ACTIVE (DISPLAYED ON GLOBE) MAP LAYERS
$('#active-layers-toggle').toggle(
    function () {
        $('.lbw.active').each(function () {
            var layerId = $(this).prop('id');
            $('<span id="' + layerId + '-holder" style="display: none;" />').insertAfter($(this));
            $(this).detach().appendTo('#active-layers');
        });
        $(this).html('<i class="fa fa-2x fa-map-marker"></i> <span>Showing Active</span>');
        if (isEmpty($('#active-layers'))) {
            $('#active-layers').html('<div class="about text-center"><h3><i style="color:#F00" class="fa fa-fw fa-exclamation-triangle"></i> NO ACTIVE LAYERS SELECTED</h3><p>Try turning on a map layer by clicking the <i class="fa fa-fw fa-eye-slash"></i> icon.</p></div>');
        }
        $('#active-layers').show();
        $('#map-layers').hide();
        countLayers();
    },
    function () {
        $('#active-layers .lbw.active').each(function () {
            var layerId = $(this).prop('id');
            $(this).detach().insertBefore($('#' + layerId + '-holder'));
            $('#' + layerId + '-holder').remove();
        });
        $('#active-layers').html('');
        $(this).html('<i class="fa fa-2x fa-map-marker"></i> <span>Showing All</span>');
        $('#active-layers').hide();
        $('#map-layers').show();
        countLayers();
    }
);
/*

// BIND WELCOME MODAL BUTTON (TO RE-OPEN LATER)
$('#about').featherlight($('#about-modal'), {
    afterOpen: function() {
        if (!$(".featherlight .panel-content.instructions").is(":visible")) $(".featherlight #instructions").trigger('click');
    },
    afterClose: function() {
        $('#about-modal iframe').remove();
        $(".youtube").show();
    }
});

// OPEN WELCOME MODAL
$.featherlight($('#about-modal'), {
    afterClose: function() {
        $('#about-modal iframe').remove();
        $('#about-modal p.intro').remove();
    }
});


*/

$('.logo').appendTo($('#cesiumContainer'));
$('style').remove();


// SHOW HIDDEN CONTAINERS, LOAD SUCCESSFUL
$('#cesiumContainer, div.map-options, span.menu-label.layers').show();

$("#instructions").on('click', function() {
    $(".youtube").each(function () {
        var target = $(this).data("id");
        // Find the thumbnail image Based on the YouTube ID
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + target + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        $(this).append($('<div/>', {
            'class': 'play'
        }));

        $(this).click(function () {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + target + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url
            });
            iframe.attr('allowFullScreen', '');
            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).hide();
            iframe.insertAfter($(this));
        });
    }).show();
});


resize();

// NO WAITING FOR GOOGLE FONTS mIn
$('<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700">').appendTo($('head'));
$('body').addClass('gfont');

// DEFAULT LABEL LAYER
//$('.bl-dark-matter-ol-load').trigger('click');
