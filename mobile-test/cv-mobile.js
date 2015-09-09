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


var map = L.map('map', { worldCopyJump: true, inertia: true }).setView([38.14, 19.33], 3);            

var providers = {};

providers['CartoDB_DarkMatter'] = {
    title: 'darkmatter',
    icon: '../img/stamen_toner.png',
    layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    })
};
providers['CartoDB_Positron'] = {
    title: 'positron',
    icon: '../img/cartodb_positron.png',
    layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    })
};

providers['OpenStreetMap_Mapnik'] = {
    title: 'osm',
    icon: '../img/openstreetmap_mapnik.png',
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
};

providers['OpenStreetMap_BlackAndWhite'] = {
    title: 'osm bw',
    icon: '../img/openstreetmap_blackandwhite.png',
    layer: L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
};

providers['OpenStreetMap_DE'] = {
    title: 'osm de',
    icon: '../img/openstreetmap_de.png',
    layer: L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
}


providers['Esri_WorldTerrain'] = {
    title: 'esri terrain',
    icon: '../img/esri_worldterrain.png',
    layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
        maxZoom: 13
    })
};

providers['Esri_OceanBasemap'] = {
    title: 'esri ocean',
    icon: '../img/esri_oceanbasemap.png',
    layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13
    })
};

providers['HERE_normalDay'] = {
    title: 'normalday',
    icon: '../img/here_normalday.png',
    layer: L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
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



/*
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt

  http://leafletjs.com
  https://github.com/lvoogdt
*//*global L*/
!function(o,e){"use strict";L.AwesomeMarkers={},L.AwesomeMarkers.version="2.0.1",L.AwesomeMarkers.Icon=L.Icon.extend({options:{iconSize:[35,45],iconAnchor:[17,42],popupAnchor:[1,-32],shadowAnchor:[10,12],shadowSize:[36,16],className:"awesome-marker",prefix:"glyphicon",spinClass:"fa-spin",extraClasses:"",icon:"home",markerColor:"blue",iconColor:"white"},initialize:function(o){o=L.Util.setOptions(this,o)},createIcon:function(){var o=e.createElement("div"),n=this.options;return n.icon&&(o.innerHTML=this._createInner()),n.bgPos&&(o.style.backgroundPosition=-n.bgPos.x+"px "+-n.bgPos.y+"px"),this._setIconStyles(o,"icon-"+n.markerColor),o},_createInner:function(){var o,e="",n="",i="",s=this.options;return o=s.icon.slice(0,s.prefix.length+1)===s.prefix+"-"?s.icon:s.prefix+" "+s.icon,s.spin&&"string"==typeof s.spinClass&&(e=s.spinClass),s.iconColor&&("white"===s.iconColor||"black"===s.iconColor?n="icon-"+s.iconColor:i="style='color: "+s.iconColor+"' "),"<i "+i+"class='"+s.extraClasses+" "+s.prefix+" "+o+" "+e+" "+n+"'></i>"},_setIconStyles:function(o,e){var n,i=this.options,s=L.point(i["shadow"===e?"shadowSize":"iconSize"]);n=L.point("shadow"===e?i.shadowAnchor||i.iconAnchor:i.iconAnchor),!n&&s&&(n=s.divideBy(2,!0)),o.className="awesome-marker-"+e+" "+i.className,n&&(o.style.marginLeft=-n.x+"px",o.style.marginTop=-n.y+"px"),s&&(o.style.width=s.x+"px",o.style.height=s.y+"px")},createShadow:function(){var o=e.createElement("div");return this._setIconStyles(o,"shadow"),o}}),L.AwesomeMarkers.icon=function(o){return new L.AwesomeMarkers.Icon(o)}}(this,document);

L.AwesomeMarkers.Icon.prototype.options.prefix = 'icon';

