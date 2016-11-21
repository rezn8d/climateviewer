/* jshint multistr: true, browser: true */
/* globals $:false, Cesium:false, nobjectsIn:false, console:false, Self:false, layers:false, _:false */
"use strict";

// Set web root url
var homeURL = window.location.protocol + "//" + window.location.host + "/3D/"; // production
var shareURL = "http://climateviewer.org/3D/"; // production
var proxyURL = 'http://climateviewer.org/3D/proxy.php?'; // production


// Check for mobile devices
function resize() {
    var clientHeight = $(window).height(),
        clientWidth = $(window).width(),
        tiny = 420;
    $('html').height(clientHeight).width(clientWidth);
    $('body').height(clientHeight).width(clientWidth);
    $('#top').slimScroll({
        height: clientHeight - 30
    });
    /*
    if (clientWidth < tiny) { // HIDE SIDEBAR, IF YOU SET SIDEBAR TO SHOW INITIALLY
        $('.control-sidebar').removeClass('control-sidebar-open');
    }
    */
    if (clientWidth < tiny) {
        $('#cesiumContainer, .cesium-viewer, .control-sidebar').height(clientHeight).width(clientWidth);
        $('#options-menu').addClass('show');
    } else {
        $('#cesiumContainer, .cesium-viewer').height(clientHeight).width(clientWidth);
        $('.control-sidebar').height(clientHeight).width(tiny);
        $('#options-menu').removeClass('show');
    }
}

$(window).resize(function () {
    resize();
    //console.log('resized');
});
$(window).on("orientationchange", function () {
    resize();
    //console.log('orientation');
});
$('.panel-toggle').click(function () {
    var id = $(this).attr('id'),
        target = $('.' + id),
        icon = $(this).find('i');
    if (target.is(":visible")) {
        $(this).removeClass('active');
        target.hide();
        icon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
    } else {
        $(this).addClass('active');
        target.show();
        icon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
    }
});

var imageryViewModels = [];
Cesium.BingMapsApi.defaultKey = 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw';

// Base Map Picker, FIRST ENTRY IS LOADED BY DEFAULT
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Dark Matter',
    iconUrl: 'dist/img/dark-matter.jpg',
    tooltip: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'CV Blue',
    iconUrl: 'dist/img/cv-blue.jpg',
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
    name: 'Midnight',
    iconUrl: 'dist/img/midnight-commander.jpg',
    tooltip: 'CartoDB World Midnight Commander. Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
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
/*
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Bing Maps Aerial',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
    tooltip: 'Bing Maps aerial imagery \nhttp://www.bing.com/maps',
    creationFunction: function () {
        return new Cesium.BingMapsImageryProvider({
            url: 'http://dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle: Cesium.BingMapsStyle.AERIAL
        });
    }
}));
*/
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI Aerial',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
    tooltip: 'World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide. www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI Street',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
    tooltip: 'Worldwide street map presents highway-level data for the world. www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'ESRI Ocean',
    iconUrl: 'dist/img/esri-ocean.jpg',
    tooltip: 'Includes bathymetry, marine water body names, undersea feature names, and derived depth values in meters.',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Positron',
    iconUrl: 'dist/img/positron.jpg',
    tooltip: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));
/*
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Toner Lite',
    iconUrl: 'dist/img/stamen-light.png',
    tooltip: 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));
*/
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
    name: 'ESRI NatGeo',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
    tooltip: 'National Geographic World Map service. www.esri.com',
    creationFunction: function () {
        return new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/'
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
/*
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'The Black Marble',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/blackMarble.png'),
    tooltip: 'The lights of cities and villages trace the outlines of civilization in this global view of the \
Earth at night as seen by NASA/NOAA\'s Suomi NPP satellite.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://cesiumjs.org/tilesets/imagery/blackmarble',
            maximumLevel: 8,
            credit: 'Copyright © 2012-2014 Analytical Graphics, Inc. (AGI). All Rights Reserved. Original data courtesy NASA Earth Observatory'
        });
    }
}));
*/
// TERRAIN
var terrainProviders = [];

terrainProviders.push(new Cesium.ProviderViewModel({
    name: 'WGS84 Ellipsoid',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
    tooltip: 'WGS84 standard ellipsoid, also known as EPSG:4326',
    creationFunction: function () {
        return new Cesium.EllipsoidTerrainProvider();
    }
}));
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


var now = Cesium.JulianDate.now();
var clock = new Cesium.Clock({
    currentTime: now
});
var viewer;

// If Mobile start in 2D scene mode for increased performance
viewer = new Cesium.Viewer('cesiumContainer', {
    sceneModePicker: false,
    timeline: true,
    animation: true,
    sceneMode: Cesium.SceneMode.SCENE3D,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    imageryProvider: false,
    baseLayerPicker: false,
    clock: clock,
    terrainProvider: false
    //skyAtmosphere: false,
    //skyBox: false,
    //targetFrameRate: 60
});

// viewer.resolutionScale = 1.0 / devicePixelRatio;  // performance fix for non-retina devices
// viewer.scene.imageryLayers.removeAll();  // clear all layers
// viewer.scene.globe.baseColor = Cesium.Color.BLACK;   // set globe black
// new Cesium.GeographicProjection(ellipsoid)   // set EPSG4236

viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
viewer.extend(Cesium.viewerPerformanceWatchdogMixin, {
    lowFrameRateMessage: 'Your screen is running very slowly. You should try our mobile app: climateviewer.org/mobile/?'
});

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
credit.hide();

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
$('#toggle-timeline').click(function () {
    toggleTimeline();
});

var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8)));
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
var time = Cesium.JulianDate.toDate(yesterday);

var $input = $('#datepicker').pickadate({
    format: 'mmmm d, yyyy',
    formatSubmit: 'yyyy-mm-dd',
    min: [2002, 6, 1],
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
    var isoDateTime = clock.currentTime.toString(),
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
$('#phone-home').on("click", function () {
    window.location = 'http://climateviewer.org/';
});


// GET URL
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
    $('.' + layerId + '-load').removeClass('fa-play').addClass('fa-spinner fa-spin loading active');
}

function loaded(layerId) {
    $('.' + layerId + '-load').removeClass('fa-spinner fa-spin loading').addClass('fa-check');
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

function loadSliders(src, layerId) {
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

/*
var gibs = gibs || {};

gibs.GeographicTilingScheme = function (options) {

    var self = new Cesium.GeographicTilingScheme(options);
    var Math = Cesium.Math;

    var tilePixels = 512;
    var rectangle = Cesium.Rectangle.MAX_VALUE;

    // Resolution: radians per pixel
    var levels = [
        {
            width: 2,
            height: 1,
            resolution: 0.009817477042468103
        },
        {
            width: 3,
            height: 2,
            resolution: 0.004908738521234052
        },
        {
            width: 5,
            height: 3,
            resolution: 0.002454369260617026
        },
        {
            width: 10,
            height: 5,
            resolution: 0.001227184630308513
        },
        {
            width: 20,
            height: 10,
            resolution: 0.0006135923151542565
        },
        {
            width: 40,
            height: 20,
            resolution: 0.00030679615757712823
        },
        {
            width: 80,
            height: 40,
            resolution: 0.00015339807878856412
        },
        {
            width: 160,
            height: 80,
            resolution: 0.00007669903939428206
        },
        {
            width: 320,
            height: 160,
            resolution: 0.00003834951969714103
        }
    ];

    self.getNumberOfXTilesAtLevel = function (level) {
        return levels[level].width;
    };

    self.getNumberOfYTilesAtLevel = function (level) {
        return levels[level].height;
    };

    self.tileXYToRectangle = function (x, y, level, result) {
        var xTiles = levels[level].width;
        var yTiles = levels[level].height;
        var resolution = levels[level].resolution;

        var xTileWidth = resolution * tilePixels;
        var west = x * xTileWidth + rectangle.west;
        var east = (x + 1) * xTileWidth + rectangle.west;

        var yTileHeight = resolution * tilePixels;
        var north = rectangle.north - y * yTileHeight;
        var south = rectangle.north - (y + 1) * yTileHeight;

        if (!result) {
            result = new Cesium.Rectangle(0, 0, 0, 0);
        }
        result.west = west;
        result.south = south;
        result.east = east;
        result.north = north;
        return result;
    };

    self.positionToTileXY = function (position, level, result) {
        if (!Cesium.Rectangle.contains(rectangle, position)) {
            return undefined;
        }

        var xTiles = levels[level].width;
        var yTiles = levels[level].height;
        var resolution = levels[level].resolution;

        var xTileWidth = resolution * tilePixels;
        var yTileHeight = resolution * tilePixels;

        var longitude = position.longitude;
        if (rectangle.east < rectangle.west) {
            longitude += Math.TWO_PI;
        }

        var xTileCoordinate = (longitude - rectangle.west) / xTileWidth | 0;
        if (xTileCoordinate >= xTiles) {
            xTileCoordinate = xTiles - 1;
        }

        var latitude = position.latitude;
        var yTileCoordinate = (rectangle.north - latitude) / yTileHeight | 0;
        if (yTileCoordinate > yTiles) {
            yTileCoordinate = yTiles - 1;
        }

        if (!result) {
            result = new Cesium.Cartesian2(0, 0);
        }
        result.x = xTileCoordinate;
        result.y = yTileCoordinate;
        return result;
    };

    return self;
};
*/

function loadGIBS(layerId, selectedDate, format, zoomLevel) {
    removeImagery(layerId);
    /*
        var tileID;
        if (zoomLevel === "6") {
            tileID = 'EPSG4326_2km';
        } else if (zoomLevel === "7") {
            tileID = 'EPSG4326_1km';
        } else if (zoomLevel === "8") {
            tileID = 'EPSG4326_500m';
        } else {
            zoomLevel = "9";
            tileID = 'EPSG4326_250m';
        }
    */
    //console.log(zoomLevel + ' = ' + tileID);

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        // url: "//map1.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=" + selectedDate,
        url: "http://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi?TIME=" + selectedDate,
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
    loadSliders(src, layerId);
}

function loadWmts(layerId, geoDataSrc, geoLayers) {
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
    loadSliders(src, layerId);
}

function loadWms(layerId, geoDataSrc, geoLayers, noFeatures) {
    var src;
    if (noFeatures) {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
            url: geoDataSrc,
            layers: geoLayers,
            sourceUri: geoDataSrc,
            enablePickFeatures: false,
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            parameters: {
                transparent: true,
                format: 'image/png'
            }
        }));
    } else {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
            url: geoDataSrc,
            layers: geoLayers,
            sourceUri: geoDataSrc,
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            parameters: {
                transparent: true,
                format: 'image/png'
            }
        }));
    }
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
}

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
        var entity = entities[i]; // entity = single point
        console.log(entity);
        // create marker image
        var billboard = new Cesium.BillboardGraphics();

        var image;
        if (markerImg) {
            image = markerImg;
        } else if (entity.billboard.image) {
            image = entity.billboard.image;
        } else {
            image = 'dist/img/icons/cv3d.png';
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
        $('<h5><i class="fa fa-fw fa-map-marker"></i> Map Markers</h5>').appendTo(markerList);
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

function modMRM(geoData) {
    //console.log(noList);
    var entities = geoData.entities.values; // entities = all points
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i],
            billboard = new Cesium.BillboardGraphics(),
            image;
        if (entity.billboard.image) {
            image = entity.billboard.image;
        } else {
            image = 'dist/img/icons/cv3d.png';
        }
        
        billboard.image = image;

        billboard.scale = 4;

        billboard.width = 32;
        billboard.height = 32;
        billboard.alignedAxis = Cesium.Cartesian3.ZERO;
        billboard.scaleByDistance = defaultScaleByDistance;
        entity.billboard = billboard;
    } // end for loop
}

function loadArcGisLayer(layerId, geoDataSrc, geoLayers, noFeatures, format) {
    var src;
    if (noFeatures) {
        //console.log('NO FEATURES FOR YOU!');
        src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
            url: geoDataSrc,
            format: format,
            enablePickFeatures: false,
            layers: geoLayers,
            tilingScheme: new Cesium.WebMercatorTilingScheme()
        }));
    } else {
        src = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
            url: geoDataSrc,
            format: format,
            enablePickFeatures: true,
            layers: geoLayers,
            tilingScheme: new Cesium.WebMercatorTilingScheme()
        }));
    }
    activeLayers[layerId] = src;
    loadSliders(src, layerId);
    loaded(layerId);
}

function loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList) {
    // console.log('load geojson');
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
            proxy: {
                getURL: function (geoDataSrc) {
                    return proxyURL + encodeURIComponent(geoDataSrc);
                }
            },
            sourceUri: geoDataSrc
        }).then(function (geoData) {
            if (markerMod) {
                modMarkers(geoData, markerImg, markerScale, markerLabel);
            }
            if (layerId.indexOf("mrm-") >= 0) {
                modMRM(geoData);
                console.log('My Reading Mapped');
            } else {
                //markerMod = false;
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
        }); // end then
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
        }); // end then
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

    if (layerEnabled[layerId] === undefined) {
        //put it in a temporary state to disallow loading while loading
        layerEnabled[layerId] = false;
        // Load layers by Type
        if (l.T === ("wms")) {
            loadWms(layerId, geoDataSrc, geoLayers, noFeatures);
        } else if (l.T === ("nasa-gibs")) {
            loadGIBS(layerId, selectedDate, format, zoomLevel);
        } else if (l.T === ("wmts")) {
            loadWmts(layerId, geoDataSrc, geoLayers);
        } else if (l.T === ("cartodb-layer")) {
            loadCartoDB(layerId, geoDataSrc);
        } else if (l.T === ("base-layer")) {
            loadOsmLayer(layerId, geoDataSrc);
        } else if (l.T === ("arcgis-layer") || l.T === ("arcgis-base-layer")) {
            loadArcGisLayer(layerId, geoDataSrc, geoLayers, noFeatures, format);
        } else if (l.T === ("geojson")) {
            loadGeoJson(layerId, geoDataSrc, markerLabel, markerScale, markerImg, zoom, noList);
        } else if (l.T === ('kml')) {
            loadKml(layerId, geoDataSrc, proxy, zoom, markerImg, markerScale, markerLabel, markerMod);
        } else if (l.T === ('bing')) {
            loadBingLayer(layerId, geoDataSrc);
        } else {
            console.log(layerId + ' failed to load map type: ' + l.T);
        }
        if (timeline) toggleTimeline(true);
    }
}

function newFolderLabel(l, child, ic) {
    var icon;
    if (ic) {
        icon = '<i class="fa fa-fw ' + ic + '"></i>';
    } else {
        icon = '';
    }
    var menuToggle = $('<h2>').addClass('toggle').html(icon + l.N).click(function () {
        if (child.is(':visible')) {
            child.hide();
            menuToggle.removeClass('active');
        } else {
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
    if (layerType == ('arcgis-layer') || layerType == ('arcgis-base-layer')) {
        $('<div class="header"><i class="fa fa-fw fa-file-o"></i> Data Source</div><span>ArcGIS MapServer<br><a target="_blank" rel="nofollow" href="' + geoDataSrc + '/legend">Map Legend</a> &bull; <a target="_blank" rel="nofollow" href="' + geoDataSrc + '">MapServer Information</a></span>>').appendTo(list);
    }
    $('<div class="header"><i class="fa fa-share-square-o fa-fw"></i> Share This Layer</div><span>Use this url to share this layer: <a href="' + homeURL + 'index.html?layersOn=' + layerId + '" target="_self">Share Link</a></span><div class="header"><i class="fa fa-exclamation-triangle fa-fw"></i> Report Error</div><span>If you are experiencing problems loading this layer, or you would like to suggest corrections, comments, or concerns, please email me using this link: <a href="mailto:jim@climateviewer.com?subject=Climate Viewer broken link - ' + layerId + '&amp;body=Unfortunately this ( ' + geoDataSrc + ' ) URL is not working properly, please look into it. Sent from http://climateviewer.org/3D/" target="_self">Report Error</a></span>').appendTo(list);

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
                    format = h.F,
                    zoomLevel = h.Fz,
                    noList = h.Y,
                    layerButton, details, loadIcon, optIcon, treeIcon, sliderIcon, label;

                if (noList !== true) noList = false;

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
                optIcon = $('<i>').addClass('fa fa-fw fa-folder-o').toggle(
                    function () {
                        if (details.children().length === 0) {
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

                if ((h.T === ('geojson')) && (noList === false)) {
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

                loadIcon = $('<i class="fa fa-fw fa-play ' + layerId + '-load"></i>');
                if (largeLayer) loadIcon.addClass('large-layer');
                if (newLayer) loadIcon.addClass('new-layer');

                loadIcon.toggle(
                    function () {
                        setTimeout(function () {
                            if (loadIcon.hasClass('fa-play')) {
                                if (includeOnly) {
                                    updateLayer(layerId, includeOnly);
                                } else {
                                    updateLayer(layerId);
                                }
                                if (!label.hasClass('active')) label.addClass('active');
                                if (!content.hasClass('active')) content.addClass('active');
                                if (timeline) toggleTimeline(true);
                                if ((h.T === ('geojson')) && (noList === false)) treeIcon.show();
                                if (h.T === ("nasa-gibs") || h.T === ("cartodb-layer") || h.T === ("wmts") || h.T === ("wms") || h.T === ("base-layer") || h.T === ("arcgis-layer") || h.T === ("arcgis-base-layer") || h.T === ("bing")) {
                                    sliderIcon.show();
                                }
                            }
                        });
                    },
                    function () {
                        setTimeout(function () {
                            if (loadIcon.hasClass('fa-check')) {
                                disableLayer(h);
                                loadIcon.removeClass('fa-check active').addClass('fa-play');
                                if (label.hasClass('active')) label.removeClass('active');
                                if (content.hasClass('active')) content.removeClass('active');
                                if (optIcon.hasClass('fa-folder-open-o')) optIcon.trigger('click');
                                if ((h.T === ('geojson')) && (noList === false)) treeIcon.hide();
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

// MAP MODE BUTTONS
/*
$('.mode-3D').click(function () {
    viewer.scene.morphTo3D();
    $('.map-mode div.active').removeClass('active');
    $(this).addClass('active');
});
$('.mode-2D').click(function () {
    viewer.scene.morphTo2D();
    $('.map-mode div.active').removeClass('active');
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
    var modeView = (getURLParameter("mode") || '3D');

    if (dateView !== time) {
        picker.set('select', dateView, {
            format: 'yyyy-mm-dd'
        });
    }
    /*
    if (modeView) {
        //console.log('.mode-' + modeView);
        $('.mode-' + modeView).click();
    }
    */
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
        baseLayer,
        shareLink = shareURL;

    $('.lbw.active').each(function () {
        var L = $(this).attr('id');
        layers += L + ',';
    });

    /*

    $('.geojson.active, .kml.active, .arcgis-layer.active, .wms.active, .wmts.active, .nasa-gibs.active').each(function () {
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
*/    
    
    shareLink += 'index.html?';

    if (layers.length > 0) {
        layers = layers.substring(0, layers.length - 1);
        shareLink += 'layersOn=' + layers;
    }
    
    shareLink += '&baseLayer=' + $('.cesium-baseLayerPicker-selectedItem').prop('id');

/*
    if (baseLayers.length > 0) {
        baseLayers = baseLayers.substring(0, baseLayers.length - 1);
        shareLink += '&baseLayers=' + baseLayers;
    }

    function disableView() {
        $('#includeView').prop('disabled', true).parent().prop('title', 'Not available in 2D or Flat Earth mode yet.');
    }
    /*
    if ($('.mode-2D').hasClass('active')) {
        shareLink += '&mode=2D';
        disableView();
    } else if ($('.mode-flat').hasClass('active')) {
        shareLink += '&mode=flat';
        disableView();
    } else if ($('#includeView').hasClass('active')) {
        $('#includeView').prop('disabled', false).parent().prop('title', '');
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
    }
    */
    

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
    
    var date = picker.get('select', 'yyyy-mm-dd');
    shareLink += '&date=' + date;

    var shareToggle = $('.share-all-layers');
    shareToggle.attr('href', shareLink).html(shareLink);

    
    /* SHORTEN URL 
    var encodeLink = encodeURIComponent(shareLink);
    console.log(shareLink);
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
                $("#result").html('<a href="' + bit_url + '" target="_self">' + bit_url + '</a>');
            }
        });
    }
    bit_url(shareLink);
    */
}

$('#share-active-layers').click(function () {
    shareLink();
});

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

function toggleSidebar() {
    var clientHeight = $(window).height(),
        clientWidth = $(window).width(),
        tiny = 420;
    if (!$('.control-sidebar').hasClass('control-sidebar-open')) {
        $('.control-sidebar, #cesiumContainer').addClass('control-sidebar-open');
        $('#open-menu').addClass('active');
        
        $('.control-sidebar').height(clientHeight);
        if (clientWidth < tiny) {
            $('#cesiumContainer, .cesium-viewer, .control-sidebar').height(clientHeight).width(clientWidth);
            $('#cesiumContainer, .cesium-viewer, .control-sidebar').height(clientHeight).width(clientWidth);
        } else {
            $('#cesiumContainer, .cesium-viewer').height(clientHeight).width(clientWidth - 420);
        }

        /*
        $('#cesiumContainer').one('click', function () {
            $('.control-sidebar').removeClass('control-sidebar-open');
            $('#open-menu').removeClass('active');
        });
        */
    } else {
        $('.control-sidebar, #cesiumContainer').removeClass('control-sidebar-open');
        $('#open-menu').removeClass('active');
        $('#cesiumContainer').height(clientHeight).width(clientWidth);
        $('.cesium-viewer').height(clientHeight).width(clientWidth);
    }
}

// LAYER MENU TOGGLE BUTTON
$('#open-menu').click(function () {
    toggleSidebar();
});

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

// MAP OPTION BUTTONS
$('#clear-layers').click(function () {
    $('i.active').trigger('click');
});

$('#sun-control').toggle(
    function (e) {
        e.preventDefault();
        viewer.scene.globe.enableLighting = true;
        $(this).addClass('active');
    },
    function (e) {
        e.preventDefault();
        viewer.scene.globe.enableLighting = false;
        $(this).removeClass('active');
    }
);



// LAYER MENU OPTIONS (TOP)
$('#close-menu').click(function () {
    toggleSidebar();
});
$('#collapse-menu').click(function () {
    $('.fa-folder-open-o.active').trigger('click');
    $('.folder h2.active').trigger('click');
    $('h2.active').trigger('click');
});
$('#top-layers').click(function () {
    $('.map-layers-window').animate({
        scrollTop: ($('#top').offset().top - 90)
    }, 500);
});

// MOVE DEFAULT CESIUM STUFF TO SIDEBAR DIVS
$('.cesium-baseLayerPicker-dropDown').addClass('cesium-baseLayerPicker-dropDown-visible').detach().appendTo($('#base'));
$('.cesium-viewer-geocoderContainer').detach().prependTo($('.search'));
$('.cesium-geocoder-input').addClass('cesium-geocoder-input-wide');
//$('[data-bind="foreach: imageryProviderViewModels"]').remove();

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
        $(this).html('<i class="fa fa-2x fa-eye-slash"></i> All');
        if (isEmpty($('#active-layers'))) {
            $('#active-layers').html('<div class="cv-learn"><h3><i style="color:#F00" class="fa fa-fw fa-exclamation-triangle"></i> NO ACTIVE LAYERS SELECTED</h3><p style="text-align:left;">Try turning on a map layer by clicking the <i class="fa fa-fw fa-play"></i> icon.</p></div>');
        }
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
        $('#active-layers').html('');
        $(this).html('<i class="fa fa-2x fa-eye"></i> Active');
        $('.active-layers-label').hide();
        $('#active-layers').hide();
        $('.all-layers-label').show();
        $('#map-layers').show();
    }
);


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
        $(".youtube").show();
    }
});

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

        // Replace the YouTube thumbnail with YouTube HTML5 Player
        $(this).hide();
        iframe.insertAfter($(this));
    });
});

$('.logo').appendTo($('#cesiumContainer'));
$('style').remove();
// SHOW HIDDEN CONTAINERS, LOAD SUCCESSFUL
$('#cesiumContainer, #open-menu, .map-options').show();

resize();
    
