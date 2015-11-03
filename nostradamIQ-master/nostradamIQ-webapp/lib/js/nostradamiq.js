"use strict";

var WATCHDOG = false;

// Check for mobile devices, set body class accordingly
function resize() {
    var clientWidth = $(window).width(),
        clientHeight = $(window).height(),
        buttonOffset = (clientHeight - 42),
        mobile = 1025;
    if (clientWidth < mobile) {
        // is mobile
        $('body').addClass('mobile');
    } else {
        $('body').addClass('desktop');
    }
    $('.toolbar').height(clientHeight);
    $('.tabmenu-body').height(buttonOffset);

}
resize();

$(window).resize(function () {
    resize();
});

var imageryViewModels = [];
Cesium.BingMapsApi.defaultKey = 'AqGfr3XLXVjUJS_WCcBcrBxuK9kbmM5lc0I91ohget68f4DmjOtyrfXB7lAmReYE'; 
var map_box_appendix = '?access_token=pk.eyJ1Ijoibm9zdHJhZGFtaXEiLCJhIjoiNWUyMTMzYTg1ZDAwNDJmODE0MTM4ODFjZWExZTg3YWMifQ.QTe-xdwV2fhdCrcrfbc4JA';


// Base Map Picker
imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Natural Earth II',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/natural_earth.jpg'),
    tooltip: 'Natural Earth Model by the Cesium Community\nhttps://cesiumjs.org/data-and-assets/imagery/natural-earth-ii.html',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//cesiumjs.org/tilesets/imagery/naturalearthii/{z}/{x}/{reverseY}.jpg',
            credit: '© Analytical Graphics, Inc.',
            tilingScheme: new Cesium.GeographicTilingScheme(),
            maximumLevel: 5
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Dark Matter',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/dark_matter.jpg'),
    tooltip: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox-Satellite (HD & 256Colors)',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_satellite.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png256' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox-Emerald (256Colors)',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_emerald.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png256' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox-Satellite Streets (256Colors)',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_satellite_streets.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png256' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox-Comic Map',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_comic.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox-Pirates Map',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_pirate.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox-Pencil Map',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_pencil.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.pencil/{z}/{x}/{y}.png' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox-Outdoors Map (256Colors)',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_outdoor.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png256' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox High-Contrast Map',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_high_contrast.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.high-contrast/{z}/{x}/{y}.png' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Mapbox Run-Bike-Hike Map',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapbox_run_bike_hike.jpg'),
    tooltip: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction: function () {
        return new Cesium.UrlTemplateImageryProvider({
            url: '//api.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png' + map_box_appendix,
            credit: 'Map tiles by Mapbox, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Positron',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/positron.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/toner.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/toner_light.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/world_imagery.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/world_street_map.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/world_geographic.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/open_street_map.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamen_watercolor.jpg'),
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
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapquest_open_street_map.jpg'),
    tooltip: 'OpenStreetMap (OSM) is a collaborative project to create a free editable \
map of the world.\nhttp://www.openstreetmap.org',
    creationFunction: function () {
        return new Cesium.OpenStreetMapImageryProvider({
            url: '//otile1-s.mqcdn.com/tiles/1.0.0/osm/'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Bing Maps Aerial',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bing_map_aerial.jpg'),
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
    name: 'Bing Maps Aerial with Labels',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bing_map_with_layers.jpg'),
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
    name: 'Bing Maps Roads',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bing_map_roads.jpg'),
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
    name: 'The Black Marble',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/black_marble.jpg'),
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
var clock = new Cesium.Clock({currentTime: now});
var viewer;
var scene;

// If Mobile start in 2D scene mode for increased performance
$('#cesiumContainer').hide();
if ($('body').hasClass('mobile')) {
    // is mobile
    viewer = new Cesium.Viewer('cesiumContainer', {
        sceneModePicker: false,
        timeline: true,
        animation: true,
        sceneMode: Cesium.SceneMode.SCENE2D,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        imageryProvider: false,
        baseLayerPicker: false,
        clock: clock,
        terrainProvider: false,
        skyAtmosphere: false,
        skyBox: false,
        moon: false,
        targetFrameRate: 15
    });
    var currentViewModel = '2D';
} else {
    // is desktop
    viewer = new Cesium.Viewer('cesiumContainer', {
        sceneModePicker: false,
        timeline: true,
        animation: true,
        sceneMode: Cesium.SceneMode.SCENE3D,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        imageryProvider: false,
        baseLayerPicker: false,
        moon: true,
        clock: clock,
        terrainProvider: false,
        targetFrameRate: 20
    });
    var currentViewModel = '3D';
    // better Moon Picture: 
    viewer.scene.moon = new Cesium.Moon({ 
        textureUrl: '/webapp/lib/cesium/Cesium/Assets/Textures/moonSmall.jpg', 
        onlySunLightning: false 
    });
}

$('.cesium-viewer-animationContainer').hide();
$('.cesium-viewer-timelineContainer').hide();
$('.cesium-viewer-bottom').hide();

// WatchDog for lowFPS:
if (WATCHDOG) {
    viewer.extend(Cesium.viewerPerformanceWatchdogMixin, {
        lowFrameRateMessage : 'nostradamIQ appears <em>slow</em>?<p onclick="$(".mode-2d").trigger("click");">Try a light-weight 2D-Version!</p>'
    });
}

// add baseLayerPicker
var baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
    globe: viewer.scene,
    imageryProviderViewModels: imageryViewModels,
    terrainProviderViewModels: terrainProviders
});

// Geolocate User and zoom to position: TODO With button and show where you are!
function fly(position) {
            viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 100000.0),
                orientation : {
                    heading : Cesium.Math.toRadians(20.0),
                    pitch : Cesium.Math.toRadians(-35.0),
                    roll : 0.0
                }
            });
}
function showAndFlyPosition(position) {
    fly(position);
    //$('#geolocation-window').innerHTML = "<i><b>Your Position:</b><br>Latitude: "+Number((position.coords.latitude).toFixed(3))+"<br>Longitude: "+Number((position.coords.longitude).toFixed(3)+"</i><br><button onclick='fly()'>FLY ME THERE!</button>");
}
function showError(error) {
    $('#geolocation-window').hide();
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("You denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Geolocation information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("Your request for Geolocation timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred in Geolocation.");
            break;
    }
}
function getLocation() {
    if (navigator.geolocation) {
        console.log("Geolocation started...");
        navigator.geolocation.getCurrentPosition(showAndFlyPosition, showError);
        //navigator.geolocation.watchPosition(showAndFlyPosition, showError);
    } else {
        console.log("Geolocation failed! Your System does not support this Service!");
    }
}
