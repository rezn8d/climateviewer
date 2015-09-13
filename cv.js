"use strict";
zip.workerScriptsPath = '../lib/zip/';
var oneBlob;
var thisKMZ;


// Check for mobile devices, set body class accordingly
function resize() {
    var clientWidth = $(window).width(),
        clientHeight = $(window).height(),
        buttonOffset = (clientHeight - 52),
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

var _xml = {
    _str2xml : function(strXML) {
        if (window.ActiveXObject) {
            var doc=new ActiveXObject('Microsoft.XMLDOM');
            doc.async='false';
            doc.loadXML(strXML);
        } else {  // code for Mozilla, Firefox, Opera, etc.
            var parser=new DOMParser();
            var doc=parser.parseFromString(strXML,'text/xml');
        }// documentElement always represents the root node
        return doc;
    },
    _xml2string : function(xmlDom){
        var strs = null;
        var doc = xmlDom.documentElement;
        if(doc.xml == undefined) {
            strs = (new XMLSerializer()).serializeToString(xmlDom);
        } else strs = doc.xml;
        return strs;
    }
};



L.Control.FullScreen = L.Control.extend({
    options: {
        content: '<i class="maximize icon"></i>',
        position: 'topleft',
        title: 'Full Screen',
        titleCancel: 'Exit Full Screen',
        forceSeparateButton: false,
        forcePseudoFullscreen: false
    },
    
    onAdd: function (map) {
        var className = 'leaflet-control-zoom-fullscreen', container, content = '';
        
        if (map.zoomControl && !this.options.forceSeparateButton) {
            container = map.zoomControl._container;
        } else {
            container = L.DomUtil.create('div', 'leaflet-bar');
        }
        
        if (this.options.content) {
            content = this.options.content;
        } else {
            className += ' fullscreen-icon';
        }

        this._createButton(this.options.title, className, content, container, this.toggleFullScreen, this);

        this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this);

        return container;
    },
    
    _createButton: function (title, className, content, container, fn, context) {
        this.link = L.DomUtil.create('a', className, container);
        this.link.href = '#';
        this.link.title = title;
        this.link.innerHTML = content;

        L.DomEvent
            .addListener(this.link, 'click', L.DomEvent.stopPropagation)
            .addListener(this.link, 'click', L.DomEvent.preventDefault)
            .addListener(this.link, 'click', fn, context);
        
        L.DomEvent
            .addListener(container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
            .addListener(container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
            .addListener(container, fullScreenApi.fullScreenEventName, this._handleEscKey, context);
        
        L.DomEvent
            .addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
            .addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
            .addListener(document, fullScreenApi.fullScreenEventName, this._handleEscKey, context);

        return this.link;
    },
    
    toggleFullScreen: function () {
        var map = this._map;
        map._exitFired = false;
        if (map._isFullscreen) {
            if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
                fullScreenApi.cancelFullScreen(map._container);
            } else {
                L.DomUtil.removeClass(map._container, 'leaflet-pseudo-fullscreen');
            }
            map.invalidateSize();
            map.fire('exitFullscreen');
            map._exitFired = true;
            map._isFullscreen = false;
        }
        else {
            if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
                fullScreenApi.requestFullScreen(map._container);
            } else {
                L.DomUtil.addClass(map._container, 'leaflet-pseudo-fullscreen');
            }
            map.invalidateSize();
            map.fire('enterFullscreen');
            map._isFullscreen = true;
        }
    },
    
    _toggleTitle: function() {
        this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel;
    },
    
    _handleEscKey: function () {
        var map = this._map;
        if (!fullScreenApi.isFullScreen(map) && !map._exitFired) {
            map.fire('exitFullscreen');
            map._exitFired = true;
            map._isFullscreen = false;
        }
    }
});

L.Map.addInitHook(function () {
    if (this.options.fullscreenControl) {
        this.fullscreenControl = L.control.fullscreen(this.options.fullscreenControlOptions);
        this.addControl(this.fullscreenControl);
    }
});

L.control.fullscreen = function (options) {
    return new L.Control.FullScreen(options);
};

/* 
Native FullScreen JavaScript API
-------------
Assumes Mozilla naming conventions instead of W3C for now

source : http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/

*/

var 
    fullScreenApi = { 
        supportsFullScreen: false,
        isFullScreen: function() { return false; }, 
        requestFullScreen: function() {}, 
        cancelFullScreen: function() {},
        fullScreenEventName: '',
        prefix: ''
    },
    browserPrefixes = 'webkit moz o ms khtml'.split(' ');

// check for native support
if (typeof document.exitFullscreen !== 'undefined') {
    fullScreenApi.supportsFullScreen = true;
} else {
    // check for fullscreen support by vendor prefix
    for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
        fullScreenApi.prefix = browserPrefixes[i];
        if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] !== 'undefined' ) {
            fullScreenApi.supportsFullScreen = true;
            break;
        }
    }
}

// update methods to do something useful
if (fullScreenApi.supportsFullScreen) {
    fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
    fullScreenApi.isFullScreen = function() {
        switch (this.prefix) {  
            case '':
                return document.fullScreen;
            case 'webkit':
                return document.webkitIsFullScreen;
            default:
                return document[this.prefix + 'FullScreen'];
        }
    };
    fullScreenApi.requestFullScreen = function(el) {
        return (this.prefix === '') ? el.requestFullscreen() : el[this.prefix + 'RequestFullScreen']();
    };
    fullScreenApi.cancelFullScreen = function(el) {
        return (this.prefix === '') ? document.exitFullscreen() : document[this.prefix + 'CancelFullScreen']();
    };
}

// jQuery plugin
if (typeof jQuery !== 'undefined') {
    jQuery.fn.requestFullScreen = function() {
        return this.each(function() {
            var el = jQuery(this);
            if (fullScreenApi.supportsFullScreen) {
                fullScreenApi.requestFullScreen(el);
            }
        });
    };
}

// export api
window.fullScreenApi = fullScreenApi;


// create map
var map = L.map('map', { 
    center: [40, -100],
        zoom: 3,
        // Values are x and y here instead of lat and long elsewhere.
        //maxBounds: [
        //    [-120, -220],
        //    [120, 220]
        //],
    worldCopyJump: true,
    inertia: true,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});    
map.options.crs = L.CRS.EPSG3857;     

layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    zIndex: 1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

/*
var providers = {};

providers['CartoDB_DarkMatter'] = {
    title: 'darkmatter',
    icon: '../img/stamen_toner.png',
    layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        zIndex: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    })
};
providers['CartoDB_Positron'] = {
    title: 'positron',
    icon: '../img/cartodb_positron.png',
    layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        zIndex: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    })
};

providers['OpenStreetMap_Mapnik'] = {
    title: 'osm',
    icon: '../img/openstreetmap_mapnik.png',
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        zIndex: 1,
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
};

providers['OpenStreetMap_BlackAndWhite'] = {
    title: 'osm bw',
    icon: '../img/openstreetmap_blackandwhite.png',
    layer: L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        zIndex: 1,
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
};

providers['OpenStreetMap_DE'] = {
    title: 'osm de',
    icon: '../img/openstreetmap_de.png',
    layer: L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        zIndex: 1,
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
}


providers['Esri_WorldTerrain'] = {
    title: 'esri terrain',
    icon: '../img/esri_worldterrain.png',
    layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
        zIndex: 1,
        attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
        maxZoom: 13
    })
};

providers['Esri_OceanBasemap'] = {
    title: 'esri ocean',
    icon: '../img/esri_oceanbasemap.png',
    layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        zIndex: 1,
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13
    })
};

providers['HERE_normalDay'] = {
    title: 'normalday',
    icon: '../img/here_normalday.png',
    layer: L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        zIndex: 1,
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: 'Y8m9dK2brESDPGJPdrvs',
        app_code: 'dq2MYIvjAotR8tHvY8Q_Dg',
        base: 'base',
        maxZoom: 20
    })
};

providers['HERE_normalDayGrey'] = {
    title: 'normalday grey',
    icon: '../img/here_normaldaygrey.png',
    layer: L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day.grey/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        zIndex: 1,
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: 'Y8m9dK2brESDPGJPdrvs',
        app_code: 'dq2MYIvjAotR8tHvY8Q_Dg',
        base: 'base',
        maxZoom: 20
    })
};

providers['HERE_satelliteDay'] = {
    title: 'satellite',
    icon: '../img/here_satelliteday.png',
    layer: L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        zIndex: 1,
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: 'Y8m9dK2brESDPGJPdrvs',
        app_code: 'dq2MYIvjAotR8tHvY8Q_Dg',
        base: 'aerial',
        maxZoom: 20
    })
};


var layers = [];
for (var providerId in providers) {
    layers.push(providers[providerId]);
}

var ctrl = L.control.iconLayers(layers).addTo(map); 

*/

/*
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt

  http://leafletjs.com
  https://github.com/lvoogdt
*//*global L*/

//!function(o,e){"use strict";L.AwesomeMarkers={},L.AwesomeMarkers.version="2.0.1",L.AwesomeMarkers.Icon=L.Icon.extend({options:{iconSize:[35,45],iconAnchor:[17,42],popupAnchor:[1,-32],shadowAnchor:[10,12],shadowSize:[36,16],className:"awesome-marker",prefix:"glyphicon",spinClass:"fa-spin",extraClasses:"",icon:"home",markerColor:"blue",iconColor:"white"},initialize:function(o){o=L.Util.setOptions(this,o)},createIcon:function(){var o=e.createElement("div"),n=this.options;return n.icon&&(o.innerHTML=this._createInner()),n.bgPos&&(o.style.backgroundPosition=-n.bgPos.x+"px "+-n.bgPos.y+"px"),this._setIconStyles(o,"icon-"+n.markerColor),o},_createInner:function(){var o,e="",n="",i="",s=this.options;return o=s.icon.slice(0,s.prefix.length+1)===s.prefix+"-"?s.icon:s.prefix+" "+s.icon,s.spin&&"string"==typeof s.spinClass&&(e=s.spinClass),s.iconColor&&("white"===s.iconColor||"black"===s.iconColor?n="icon-"+s.iconColor:i="style='color: "+s.iconColor+"' "),"<i "+i+"class='"+s.extraClasses+" "+s.prefix+" "+o+" "+e+" "+n+"'></i>"},_setIconStyles:function(o,e){var n,i=this.options,s=L.point(i["shadow"===e?"shadowSize":"iconSize"]);n=L.point("shadow"===e?i.shadowAnchor||i.iconAnchor:i.iconAnchor),!n&&s&&(n=s.divideBy(2,!0)),o.className="awesome-marker-"+e+" "+i.className,n&&(o.style.marginLeft=-n.x+"px",o.style.marginTop=-n.y+"px"),s&&(o.style.width=s.x+"px",o.style.height=s.y+"px")},createShadow:function(){var o=e.createElement("div");return this._setIconStyles(o,"shadow"),o}}),L.AwesomeMarkers.icon=function(o){return new L.AwesomeMarkers.Icon(o)}}(this,document);

//L.AwesomeMarkers.Icon.prototype.options.prefix = 'icon';

/* 
    Leaflet.TileLayer.WMTS 
    https://github.com/mylen/leaflet.TileLayer.WMTS 
*/

//L.TileLayer.WMTS=L.TileLayer.extend({defaultWmtsParams:{service:"WMTS",request:"GetTile",version:"1.0.0",layer:"",style:"",tilematrixSet:"",format:"image/jpeg"},initialize:function(e,t){this._url=e;var n=L.extend({},this.defaultWmtsParams),r=t.tileSize||this.options.tileSize;if(t.detectRetina&&L.Browser.retina){n.width=n.height=r*2}else{n.width=n.height=r}for(var i in t){if(!this.options.hasOwnProperty(i)&&i!="matrixIds"){n[i]=t[i]}}this.wmtsParams=n;this.matrixIds=t.matrixIds||this.getDefaultMatrix();L.setOptions(this,t)},onAdd:function(e){L.TileLayer.prototype.onAdd.call(this,e)},getTileUrl:function(e,t){var n=this._map;crs=n.options.crs;tileSize=this.options.tileSize;nwPoint=e.multiplyBy(tileSize);nwPoint.x+=1;nwPoint.y-=1;sePoint=nwPoint.add(new L.Point(tileSize,tileSize));nw=crs.project(n.unproject(nwPoint,t));se=crs.project(n.unproject(sePoint,t));tilewidth=se.x-nw.x;t=n.getZoom();ident=this.matrixIds[t].identifier;X0=this.matrixIds[t].topLeftCorner.lng;Y0=this.matrixIds[t].topLeftCorner.lat;tilecol=Math.floor((nw.x-X0)/tilewidth);tilerow=-Math.floor((nw.y-Y0)/tilewidth);url=L.Util.template(this._url,{s:this._getSubdomain(e)});return url+L.Util.getParamString(this.wmtsParams,url)+"&tilematrix="+ident+"&tilerow="+tilerow+"&tilecol="+tilecol},setParams:function(e,t){L.extend(this.wmtsParams,e);if(!t){this.redraw()}return this},getDefaultMatrix:function(){var e=new Array(22);for(var t=0;t<22;t++){e[t]={identifier:""+t,topLeftCorner:new L.LatLng(20037508.3428,-20037508.3428)}}return e}});L.tileLayer.wmts=function(e,t){return new L.TileLayer.WMTS(e,t)}




