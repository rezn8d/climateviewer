// Check for mobile devices, set body class accordingly
function resize() {
    var clientWidth = $(window).width(),
        clientHeight = $(window).height(),
        mobile = 480;
    if (clientHeight < mobile || clientWidth < mobile) {
        // is mobile
        $('body').addClass('mobile');
    } else {
        $('body').addClass('desktop');
    }
}
resize();

$( window ).resize(function() {
    resize();
});

var imageryViewModels = [];
Cesium.BingMapsApi.defaultKey = 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw';

// Base Map Picker
imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Dark Matter',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    tooltip : 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction : function() {
        return new Cesium.UrlTemplateImageryProvider({
            url : 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            credit : 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Positron',
    iconUrl : '/img/stamen-light.png',
    tooltip : 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    creationFunction : function() {
        return new Cesium.UrlTemplateImageryProvider({
            url : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            credit : 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Toner',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    tooltip : 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction : function() {
        return new Cesium.OpenStreetMapImageryProvider({
            url : '//stamen-tiles.a.ssl.fastly.net/toner/',
            credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));
imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Toner Lite',
    iconUrl : '/img/stamen-light.png',
    tooltip : 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction : function() {
        return new Cesium.OpenStreetMapImageryProvider({
            url : '//stamen-tiles.a.ssl.fastly.net/toner-lite/',
            credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'ESRI World Imagery',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
    tooltip : '\
World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution \
satellite imagery worldwide.  The map includes NASA Blue Marble: Next Generation 500m resolution imagery at small scales \
(above 1:1,000,000), i-cubed 15m eSAT imagery at medium-to-large scales (down to 1:70,000) for the world, and USGS 15m Landsat \
imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in \
parts of Western Europe from DigitalGlobe. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, \
i-cubed Nationwide Prime, Getmapping, AeroGRID, IGN Spain, and IGP Portugal.  Additionally, imagery at different resolutions has been \
contributed by the GIS User Community.\nhttp://www.esri.com',
    creationFunction : function() {
        return new Cesium.ArcGisMapServerImageryProvider({
            url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'ESRI World Street Map',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
    tooltip : '\
This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of \
Canada; Japan; most countries in Europe; Australia and New Zealand; India; parts of South America including Argentina, Brazil, \
Chile, Colombia, and Venezuela; Ghana; and parts of southern Africa including Botswana, Lesotho, Namibia, South Africa, and Swaziland.\n\
http://www.esri.com',
    creationFunction : function() {
        return new Cesium.ArcGisMapServerImageryProvider({
            url : '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'ESRI National Geographic',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
    tooltip : '\
This web map contains the National Geographic World Map service. This map service is designed to be used as a general reference map \
for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web \
mapping applications.\nhttp://www.esri.com',
    creationFunction : function() {
        return new Cesium.ArcGisMapServerImageryProvider({
            url : '//services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Open\u00adStreet\u00adMap',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
    tooltip : 'OpenStreetMap (OSM) is a collaborative project to create a free editable map \
of the world.\nhttp://www.openstreetmap.org',
    creationFunction : function() {
        return new Cesium.OpenStreetMapImageryProvider({
            url : '//a.tile.openstreetmap.org/'
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Stamen Watercolor',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenWatercolor.png'),
    tooltip : 'Reminiscent of hand drawn maps, Stamen watercolor maps apply raster effect \
area washes and organic edges over a paper texture to add warm pop to any map.\nhttp://maps.stamen.com',
    creationFunction : function() {
        return new Cesium.OpenStreetMapImageryProvider({
            url : '//stamen-tiles.a.ssl.fastly.net/watercolor/',
            credit : 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'MapQuest Open\u00adStreet\u00adMap',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapQuestOpenStreetMap.png'),
    tooltip : 'OpenStreetMap (OSM) is a collaborative project to create a free editable \
map of the world.\nhttp://www.openstreetmap.org',
    creationFunction : function() {
        return new Cesium.OpenStreetMapImageryProvider({
            url : '//otile1-s.mqcdn.com/tiles/1.0.0/osm/'
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Bing Maps Aerial',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
    tooltip : 'Bing Maps aerial imagery \nhttp://www.bing.com/maps',
    creationFunction : function() {
        return new Cesium.BingMapsImageryProvider({
            url : '//dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle : Cesium.BingMapsStyle.AERIAL
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Bing Maps Aerial with Labels',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
    tooltip : 'Bing Maps aerial imagery with label overlays \nhttp://www.bing.com/maps',
    creationFunction : function() {
        return new Cesium.BingMapsImageryProvider({
            url : '//dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle : Cesium.BingMapsStyle.AERIAL_WITH_LABELS
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Bing Maps Roads',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingRoads.png'),
    tooltip : 'Bing Maps standard road maps\nhttp://www.bing.com/maps',
    creationFunction : function() {
        return new Cesium.BingMapsImageryProvider({
            url : '//dev.virtualearth.net',
            key: 'AiQDjsWpddVOFEnVY6j4Jb0S0Hoy9QMa30rvbZT1A8qd0it10NkYAgvb5sa3OeLw',
            mapStyle : Cesium.BingMapsStyle.ROAD
        });
    }
}));


imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Natural Earth II',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
    creationFunction : function() {
        return new Cesium.UrlTemplateImageryProvider({
            url : '//cesiumjs.org/tilesets/imagery/naturalearthii/{z}/{x}/{reverseY}.jpg',
            credit : '© Analytical Graphics, Inc.',
            tilingScheme : new Cesium.GeographicTilingScheme(),
            maximumLevel : 5
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'The Black Marble',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/blackMarble.png'),
    tooltip : 'The lights of cities and villages trace the outlines of civilization in this global view of the \
Earth at night as seen by NASA/NOAA\'s Suomi NPP satellite.',
    creationFunction : function() {
        return new Cesium.TileMapServiceImageryProvider({
            url : '//cesiumjs.org/blackmarble',
            maximumLevel : 8,
            credit : 'Black Marble imagery courtesy NASA Earth Observatory'
        });
    }
}));

// TERRAIN
var terrainProviders = [];

terrainProviders.push(new Cesium.ProviderViewModel({
    name : 'STK World Terrain meshes',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/STK.png'),
    tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
    creationFunction : function() {
        return new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world',
            requestWaterMask : true,
            requestVertexNormals : true
        });
    }
}));

terrainProviders.push(new Cesium.ProviderViewModel({
    name : 'WGS84 Ellipsoid',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
    tooltip : 'WGS84 standard ellipsoid, also known as EPSG:4326',
    creationFunction : function() {
        return new Cesium.EllipsoidTerrainProvider();
    }
}));
/*
    Set clock to default to NASA GIBS available imagery date range, and set current
    day to yesterday to avoid loading blank imagery (from today)
*/
var date = new Date();
date.setDate(date.getDate() - 1);

var yesterday = Cesium.JulianDate.fromDate(date);
var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8)));
var now = Cesium.JulianDate.now();

var clock = new Cesium.Clock({
  currentTime: now
});

// If Mobile start in 2D scene mode for increased performance
if ($('body').hasClass('mobile')) {
    // is mobile
    var viewer = new Cesium.Viewer('cesiumContainer',{timeline: true, sceneMode: Cesium.SceneMode.SCENE2D, navigationHelpButton : false, navigationInstructionsInitiallyVisible : false, imageryProvider: false, baseLayerPicker: false, clock: clock, terrainProvider: false  });
} else {
    // is desktop
    var viewer = new Cesium.Viewer('cesiumContainer',{timeline: true, sceneMode: Cesium.SceneMode.SCENE3D, navigationHelpButton : false, navigationInstructionsInitiallyVisible : false, imageryProvider: false, baseLayerPicker: false, clock: clock, terrainProvider: false  });
}


// Set current timeline position

// add baseLayerPicker
var baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {globe: viewer.scene, imageryProviderViewModels: imageryViewModels, terrainProviderViewModels : terrainProviders  });

$('.cv-toolbar').show();

//var timeline = $('.cesium-viewer-timelineContainer').add($('.cesium-viewer-animationContainer'));
//timeline.hide();

$('.time-control-button').toggle(
    function () { timeline.show(); viewer.timeline.zoomTo(startTime, now); $(this).addClass('active');},
    function () { timeline.hide(); $(this).removeClass('active'); }
);


$('.go-flying').click(function () {
    var scene = viewer.scene;
    var canvas = viewer.canvas;
    canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
    canvas.onclick = function() {
        canvas.focus();
    };
    var ellipsoid = viewer.scene.globe.ellipsoid;

    // disable the default event handlers
    scene.screenSpaceCameraController.enableRotate = false;
    scene.screenSpaceCameraController.enableTranslate = false;
    scene.screenSpaceCameraController.enableZoom = false;
    scene.screenSpaceCameraController.enableTilt = false;
    scene.screenSpaceCameraController.enableLook = false;

    var startMousePosition;
    var mousePosition;
    var flags = {
        looking : false,
        moveForward : false,
        moveBackward : false,
        moveUp : false,
        moveDown : false,
        moveLeft : false,
        moveRight : false
    };

    var handler = new Cesium.ScreenSpaceEventHandler(canvas);

    handler.setInputAction(function(movement) {
        flags.looking = true;
        mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    handler.setInputAction(function(movement) {
        mousePosition = movement.endPosition;
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(function(position) {
        flags.looking = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    function getFlagForKeyCode(keyCode) {
        switch (keyCode) {
        case 'W'.charCodeAt(0):
            return 'moveForward';
        case 'S'.charCodeAt(0):
            return 'moveBackward';
        case 'Q'.charCodeAt(0):
            return 'moveUp';
        case 'E'.charCodeAt(0):
            return 'moveDown';
        case 'D'.charCodeAt(0):
            return 'moveRight';
        case 'A'.charCodeAt(0):
            return 'moveLeft';
        default:
            return undefined;
        }
    }

    var keydown = document.addEventListener('keydown', function(e) {
        var flagName = getFlagForKeyCode(e.keyCode);
        if (typeof flagName !== 'undefined') {
            flags[flagName] = true;
        }
    }, false);

    var keyup = document.addEventListener('keyup', function(e) {
        var flagName = getFlagForKeyCode(e.keyCode);
        if (typeof flagName !== 'undefined') {
            flags[flagName] = false;
        }
    }, false);

    viewer.clock.onTick.addEventListener(function(clock) {
        var camera = viewer.camera;

        if (flags.looking) {
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;

            // Coordinate (0.0, 0.0) will be where the mouse was clicked.
            var x = (mousePosition.x - startMousePosition.x) / width;
            var y = -(mousePosition.y - startMousePosition.y) / height;

            var lookFactor = 0.05;
            camera.lookRight(x * lookFactor);
            camera.lookUp(y * lookFactor);
        }

        // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
        var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / 100.0;

        if (flags.moveForward) {
            camera.moveForward(moveRate);
        }
        if (flags.moveBackward) {
            camera.moveBackward(moveRate);
        }
        if (flags.moveUp) {
            camera.moveUp(moveRate);
        }
        if (flags.moveDown) {
            camera.moveDown(moveRate);
        }
        if (flags.moveLeft) {
            camera.moveLeft(moveRate);
        }
        if (flags.moveRight) {
            camera.moveRight(moveRate);
        }
    });
    $('.cv-toolbar').append('<p class="instruct footer">Press <strong>W A S D</strong> on on your keyboard and Aim with your mouse (hold left mouse button).  Reload page to end flight. Flight is still experimental.</p>');
    $(this).remove();
});
