"use strict";
zip.workerScriptsPath = '../zip/';
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

// create map
var map = L.map('map', { 
    center: [40, -100],
    zoom: 3,
    worldCopyJump: true,
    inertia: true
});    
map.options.crs = L.CRS.EPSG3857;     

layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    zIndex: 1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);