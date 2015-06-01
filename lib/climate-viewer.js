var initialTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2014, 5, 15)));
var startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2012, 4, 8)));
var endTime = Cesium.JulianDate.now();
var clock = new Cesium.Clock({
  currentTime: endTime,
//  multiplier: 0   // Don't start animation by default
});
var imageryLayers = null;
var previousTime = null;
var dailyProvider = null;
var isoDate = function(isoDateTime) {return isoDateTime.split("T")[0];};  

var imageryViewModels = [];
var terrainViewModels = [];


/*
var root = this;
var Cesium = root.Cesium;
if (!Cesium) {
    console.error("Cesium is not loaded.")
}

// New imagery provider with support for CartoDB's XYZ URLs
Cesium.CartoDBImageryProvider = Cesium.OpenStreetMapImageryProvider;
Cesium.CartoDBImageryProvider.prototype.getCDNSubdomain = function (x, y) {  // Multi-WMS server selection
    var subdomains = ['a', 'b', 'c', 'd'];
    return subdomains[(x + y) % subdomains.length];
};
Cesium.CartoDBImageryProvider.prototype.requestImage = function (x, y, level) {
    var url = this._url.replace('{s}', this.getCDNSubdomain(x, y)).replace('{z}', level).replace('{x}', x).replace('{y}', y);
    return Cesium.ImageryProvider.loadImage(this, url);
};


imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Dark Matter',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    tooltip : 'A high contrast black and white map.\nhttp://maps.stamen.com',
    creationFunction : function() {
        return new Cesium.CartoDBImageryProvider({
            url : 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            credit : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        });
    }
}));

*/

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Stamen Toner',
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
            mapStyle : Cesium.BingMapsStyle.ROAD
        });
    }
}));

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Natural Earth\u00a0II',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
    tooltip : 'Natural Earth II, darkened for contrast.\nhttp://www.naturalearthdata.com/',
    creationFunction : function() {
        return new Cesium.TileMapServiceImageryProvider({
            url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
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

// NASA SECTION 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
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
})); 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
  name: 'Terra CR (Bands 721)',
  iconUrl: 'img/terra-721.png',
  tooltip: 'MODIS Terra Corrected Reflectance Bands 7-2-1\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Terra_CorrectedReflectance_Bands721",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
})); 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
  name: 'Terra CR (Bands 367)',
  iconUrl: 'img/terra-367.png',
  tooltip: 'MODIS Terra Corrected Reflectance Bands 3-6-7\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Terra_CorrectedReflectance_Bands367",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
})); 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
  name: 'Terra SR (Bands 121)',
  iconUrl: 'img/terra-121.png',
  tooltip: 'MODIS Terra Land Surface Reflectance Bands 1-2-1\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Terra_SurfaceReflectance_Bands121",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
})); 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
  name: 'Aqua CR (True Color)',
  iconUrl: 'img/terra-true-color.png',
  tooltip: 'MODIS Aqua Corrected Reflectance True Color\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Aqua_CorrectedReflectance_TrueColor",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
})); 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
  name: 'Aqua CR (Bands 721)',
  iconUrl: 'img/terra-721.png',
  tooltip: 'MODIS Aqua Corrected Reflectance Bands 7-2-1\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Aqua_CorrectedReflectance_Bands721",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
})); 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
  name: 'Aqua SR (Bands 721)',
  iconUrl: 'img/terra-721.png',
  tooltip: 'MODIS Aqua Land Surface Reflectance Bands 7-2-1\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Aqua_SurfaceReflectance_Bands721",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
})); 

imageryViewModels.push (new Cesium.ProviderViewModel({ // start push
  name: 'Aqua SR (Bands 121)',
  iconUrl: 'img/terra-121.png',
  tooltip: 'MODIS Aqua Land Surface Reflectance Bands 1-2-1\n Adjust time slider to desired date before selecting this layer to view satellite data on that date. \n credit: NASA Earth Observing System Data and Information System (EOSDIS) Global Imagery Browse Services (GIBS)',
  creationFunction: function () { 
    var isoDateTime = clock.currentTime.toString();
    var time = "TIME=" + isoDate(isoDateTime);
    return new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
        layer: "MODIS_Terra_SurfaceReflectance_Bands121",
        style: "",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level9",
        maximumLevel: 9,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    });
  } 
})); 



var terrainProviders = [];
terrainProviders.push(new Cesium.ProviderViewModel({
    name : 'WGS84 Ellipsoid',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
    tooltip : 'WGS84 standard ellipsoid, also known as EPSG:4326',
    creationFunction : function() {
        return new Cesium.EllipsoidTerrainProvider();
    }
}));
terrainProviders.push(new Cesium.ProviderViewModel({
    name : 'STK World Terrain meshes',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/STK.png'),
    tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
    creationFunction : function() {
        return new Cesium.CesiumTerrainProvider({
            url : '//cesiumjs.org/stk-terrain/world',
            requestWaterMask : true,
            requestVertexNormals : true
        });
    }
}));




/*
    var onClockUpdate = _.throttle(function() {
        var isoDateTime = clock.currentTime.toString();
        var time = isoDate(isoDateTime);
        if ( time !== previousTime ) {
            previousTime = time;
            if ( dailyProvider ) {
                viewer.scene.imageryLayers.remove(dailyLayer);
                console.log('removed');
            }
            dailyLayer = viewer.scene.imageryLayers.addImageryProvider(
                provider());
                console.log('updated');
        }
    }, 1000);
    viewer.clock.onTick.addEventListener(onClockUpdate);
    onClockUpdate(); 

 });
*/  


var viewer = new Cesium.Viewer('cesiumContainer',{timeline: true, imageryProvider: false, baseLayerPicker: false, clock:clock, terrainProvider: false  });
viewer.timeline.zoomTo(startTime, endTime);

// add baseLayerPicker
var baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {globe: viewer.scene, imageryProviderViewModels: imageryViewModels, terrainProviderViewModels : terrainProviders  });

$('div.cesium-baseLayerPicker-itemLabel:contains("Terra CR (True Color)")').parent().before('<div class="cesium-baseLayerPicker-sectionTitle" data-bind="visible: terrainProviderViewModels.length > 0">NASA Satellites</div>'); 

$('.avatar').click(function () {
    $('#picker').slideToggle();
});

