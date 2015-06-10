"use strict"
// drag & drop KML or KMZ files
viewer.extend(Cesium.viewerDragDropMixin);

// Set web root url
//var baseURL = 'http://localhost/climateviewer/';  // dev
var baseURL = 'http://climateviewer.com/beta3/';  // production
var activeLayers = {};
var enabledLayers = {};
var disabledLayers = {};

var randomNum = Math.floor((Math.random() * 100000000) + 1);


//var time = "TIME=2013-02-21";


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
    var layerId = b.attr('id'),
        icon = b.find('i');

    if (b.hasClass("nasa-layer")) {
        removeNasa(layerId);
        console.log('nasa ' + layerId + ' removed');

    } else if (b.hasClass('kml')) {
        var bhref = b.attr('href');
        var src = activeLayers[bhref];
        delete activeLayers[bhref];
        viewer.dataSources.remove(src);
        console.log('this ' + layerId + ' removed');
    }
    $('.' + layerId).remove();
    // Update button
    b.removeClass('btn-primary').addClass('btn-default');
    icon.removeClass('fa-check');

}


function enableLayer(b, force) {
    var layerId = b.attr('id'),
        kmlUrl = b.attr('href'),
        source = b.attr('data-source'),
        sourceUrl = b.attr('data-source-url'),
        toggle = $('.toggle-menu'),
        loading = '<img src="img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        done = '<img src="img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        icon = b.find('i');

    // SHOW LOADING ICON
    toggle.html(loading);
    icon.addClass('fa-spinner fa-pulse');

    var save = function (src) {
        if (src)
            viewer.dataSources.add(src);
        activeLayers[kmlUrl] = src;
    }

    function success(kmlData) {
        b.removeClass('btn-default').addClass('btn-primary');
        icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
        toggle.html(done);


        var details = $('<ul class="list-group layer-details ' + layerId + '" />');
        b.after(details);



        var opacity = NSlider({
            value: 0.8
        }).css({
            width: '100%',
            height: '3em'
        });

        $('<li></li>').append(opacity).appendTo(details);

        $('<li class="list-group-item"><strong>Source:</strong> ' + source + '<br><strong><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a> &bull; <a href="' + baseURL + 'index.html?layersOn=' + layerId + '">Share Layer</a></strong></li>').appendTo(details);
        if (b.hasClass('nasa-layer')) {
            var time = Cesium.JulianDate.toDate(viewer.clock.currentTime);
            $('<li class="list-group-item"><strong>Date:</strong> <span id="' + layerId + '-time">' + time + '</span></li>').appendTo(details);
            updateNasa(layerId);
        } else if (b.hasClass('zoom') && b.hasClass('kml')) {
            viewer.flyTo(kmlData.entities);
        } else if (b.hasClass('kml')) {
            $('<li class="list-group-item">.KML Geo-data <span class="badge"><a class="more-info" href="' + kmlUrl + '"><i class="fa fa-download"></i> Download</a></span></li>').appendTo(details);
        }




        /*
        $('<li class="list-group-item"><input id="' + layerId + '-opacity" type="text" class="span2" value="" data-slider-min="0" data-slider-max="2" data-slider-step=".01" data-slider-value="1" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></li>').appendTo(details);
        $('#' + layerId + '-opacity').slider().on('slideStop', function (ev) {
            var opacity = $(this).val();
            kmlData.opacity = opacity;
            console.log($(this).val())
        });
        */
    }

    function fail(error) {
        b.removeClass('btn-default').addClass('btn-warning');
        icon.removeClass('fa-spinner fa-pulse').addClass('fa-exclamation-triangle');
        toggle.html(done);
        var details = $('<ul class="list-group layer-fail"><li class="list-group-item"><i class="fa fa-ban text-warning"></i></span> ' + error + '</li></ul>');
        b.after(details);
    }

    var isKML = b.hasClass('kml');
    if (b.hasClass("nasa-layer")) {
        loadNasa(layerId);
    } else if (b.hasClass('proxy') && isKML) {
        new Cesium.KmlDataSource.load(kmlUrl, {
            proxy: new Cesium.DefaultProxy(baseURL + 'kmz.php'),
            sourceUri: kmlUrl
        }).then(function (kmlData) {
                save(kmlData);
                success(kmlData);
                console.log('kml proxy ' + layerId + ' loaded');
            }, function (error) {
                fail(error);
            });
    } else if (isKML) {
        new Cesium.KmlDataSource().load(kmlUrl).then(function (kmlData) {
            save(kmlData);
            success(kmlData);
            console.log('kml ' + layerId + ' loaded');
        }, function (error) {
            fail(error);
        });
    }

}


//    var src = new Cesium.KmlDataSource();
//    src.load(data.url);
//    viewer.dataSources.add(src);
//    activeLayers[data.url] = src;

/*
 <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
 <div class="panel panel-default">
 <div class="panel-heading" role="tab" id="headingOne">
 <h4 class="panel-title">
 <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
 Collapsible Group Item #1
 </a>
 </h4>
 </div>
 <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
 <div class="panel-body">
 Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
 </div>
 </div>
 </div>
 </div>
 */

/* BUILD SIDEBAR */
function loadLayers(includeOnly) {
    var lb = $('#accordion .panel');
    var lbc = null;
    var lbd = null;
    var lbe = null;
    for (var i = 0; i < layers.length; i++) {
        var l = layers[i];
        if (typeof l == "string") {
            //add header
            if (!includeOnly) {
                var ranId = Math.floor((Math.random() * 100000000) + 1);
                lb.append('<div class="panel-heading" role="tab" id="heading-' + l + '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#' + l + '" aria-expanded="false" aria-controls="' + l + '">' + l + '</a></h4></div>')
                lbc = $('<div id="' + l + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-' + l + '"></div>').appendTo(lb);
                lbd = $('<div class="panel-body panel-main"></div>').appendTo(lbc);
            }
        } else {
            //add layer into 'lbd'
            if (l.section) {
                if (!includeOnly) {
                    lbd.append($('<div title="' + l.section + '" class="section-title"><i class="section-icon ' + l.icon + '"></i> ' + l.section + '</div>'));
                }
            } else if (l.id) {
                var present = true;
                if (includeOnly) {
                    if (includeOnly.indexOf(l.id) == -1)
                        present = false;
                }
                if (present) {
                    if (!lbd) {
                        lb.append('<div class="panel-heading" role="tab" id="heading' + ranId + '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + ranId + '" aria-expanded="false" aria-controls="collapse' + ranId + '">Shared Layers</a></h4></div>')
                        lbc = $('<div id="collapse' + ranId + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + ranId + '"></div>').appendTo(lb);
                        lbd = $('<div class="panel-body panel-main"></div>').appendTo(lbc);
                    }
                    var kmlURL = l.kml;
                    if (kmlURL == 'nasa') {
                        //overrides based on l.id
                        lbd.append($('<a id="' + l.id + '" class="btn btn-default btn-sm layer-button nasa-layer" href="' + l.id + '" data-source="' + l.source + '" data-source-url="' + l.sourceURL + '"><i class="fa "></i> ' + l.name + '</a>'));
                    } else if (kmlURL == 'neo') {
                        lbd.append($('<a id="' + l.id + '" class="btn btn-default btn-sm layer-button neo-layer" href="' + l.id + '" data-source="' + l.source + '" data-source-url="' + l.sourceURL + '"><i class="fa "></i> ' + l.name + '</a>'));
                    } else {
                        lbe = $('<a id="' + l.id + '" class="btn btn-default btn-sm layer-button" href="' + l.kml + '" data-source="' + l.source + '" data-source-url="' + l.sourceURL + '"><i class="fa "></i> ' + l.name + '</a>');

                        if (l.zoom) {
                            lbe.addClass('zoom');
                        }
                        if (l.proxy) {
                            lbe.addClass('proxy');
                        }
                        if (l.kml) {
                            lbe.addClass('kml');
                        }
                        lbe.appendTo(lbd);
                    }
                }
            }
        }
    } // end for loop
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
    $('.layer-button').click(function (e) {
        e.preventDefault();
        var b = $(this)
        if (b.hasClass('btn-default')) {
            enableLayer(b);
        } else if (b.hasClass('btn-primary')) {
            disableLayer(b);
        } else return;
    });
    $('.layer-button').button();
    var b = $('<a class="btn btn-sm btn-primary" href="' + baseURL + '" style="display:block"><i class="fa fa-home"></i> SHOW ALL LAYERS</a>').appendTo('#accordion .panel-main');
} else {
    // Load all layers
    loadLayers();
    // Start Layer Panel Collapsed
    $('.panel-collapse').collapse("hide");
    // Create buttons and click handler
    $('.layer-button').click(function (e) {
        e.preventDefault();
        var b = $(this)
        if (b.hasClass('btn-default')) {
            enableLayer(b);
        } else if (b.hasClass('btn-primary')) {
            disableLayer(b);
        } else return;
    });

    console.log('all loaded');
}
setTimeout(function () {
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



// NASA LAYERS

/* EXAMPLE

 var blackMarble = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
 url : '//cesiumjs.org/blackmarble',
 maximumLevel : 8,
 credit : 'Black Marble imagery courtesy NASA Earth Observatory'
 }));
 blackMarble.alpha = 0.5;
 blackMarble.brightness = 2.0;

 */
function updateNasa(layerId) {
    var b = $('#' + layerId);
    var onClockUpdate = _.throttle(function () {
        var isoDateTime = viewer.clock.currentTime.toString();
        var isoDate = function (isoDateTime) {
            return isoDateTime.split("T")[0];
        };
        var time = "TIME=" + isoDate(isoDateTime);
        var current = Cesium.JulianDate.toDate(viewer.clock.currentTime);

        if (time !== previousTime) {
            previousTime = time;
            if (activeLayers[layerId]) {
                removeNasa(layerId);
                console.log(layerId + ' updated');
            }
            loadNasa(layerId);
            $('#' + layerId + '-time').html(current);
            $('#' + layerId + '-opacity').slider('setValue', 1);
            $('#' + layerId + '-brightness').slider('setValue', 1);
            $('#' + layerId + '-contrast').slider('setValue', 1);
        }
    }, 1000);

    viewer.clock.onTick.addEventListener(onClockUpdate);
    onClockUpdate();
    console.log(layerId + ' throttle added');

    b.one('click', function () {
        viewer.clock.onTick.removeEventListener(onClockUpdate);
        console.log(layerId + ' throttle removed');
    });
}


function loadNasa(layerId) {
    var b = $('#' + layerId),
        ld = $('.' + layerId),
        source = b.attr('data-source'),
        sourceUrl = b.attr('data-source-url'),
        toggle = $('.toggle-menu'),
        loading = '<img src="img/climate-viewer-loading.gif" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        done = '<img src="img/cv3d.png" title="Click here to show/hide the layer menu" alt="Menu Toggle">',
        icon = b.find('i');

    var isoDateTime = viewer.clock.currentTime.toString();
    var isoDate = function (isoDateTime) {
        return isoDateTime.split("T")[0];
    };
    var time = "TIME=" + isoDate(isoDateTime);

    var src = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "//map1.vis.earthdata.nasa.gov/wmts-webmerc/wmts.cgi?" + time,
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
    console.log(layerId + ' loaded');

    if (!ld.length) {
        b.removeClass('btn-default').addClass('btn-primary');
        icon.removeClass('fa-spinner fa-pulse').addClass('fa-check');
        toggle.html(done);
        var details = $('<ul class="list-group layer-details ' + layerId + '" />');
        b.after(details);
        $('<li class="list-group-item"><strong>Data Provider:</strong> ' + source + '<br><strong><a href="' + sourceUrl + '" target="_blank" rel="nofollow">More Info</a> &bull; <a href="' + baseURL + 'index.html?layersOn=' + layerId + '">Share Layer</a></strong></li>').appendTo(details);
        var time = Cesium.JulianDate.toDate(viewer.clock.currentTime);
        $('<li class="list-group-item"><strong>Imagery Date:</strong> <span id="' + layerId + '-time">' + time + '</span></li>').appendTo(details);

        $('<li class="list-group-item"><strong>Opacity:</strong> <input id="' + layerId + '-opacity" type="text" value="" data-slider-min="0" data-slider-max="1" data-slider-step=".01" data-slider-value="1" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Brightness:</strong> <input id="' + layerId + '-brightness" type="text" value="" data-slider-min="0" data-slider-max="2" data-slider-step=".01" data-slider-value="1" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></li>').appendTo(details);
        $('<li class="list-group-item"><strong>Contrast:</strong> <input id="' + layerId + '-contrast" type="text" value="" data-slider-min="0" data-slider-max="2" data-slider-step=".01" data-slider-value="1" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></li>').appendTo(details);
        updateNasa(layerId);
    }
    ;

    $('#' + layerId + '-opacity').slider({
        formater: function (value) {
            return 'Opacity: ' + value;
        }
    }).on('slideStop', function (ev) {
        var alpha = $(this).val();
        src.alpha = alpha;
        console.log(layerId + ' alpha = ' + alpha);
    });
    $('#' + layerId + '-brightness').slider({
        formater: function (value) {
            return 'Brightness: ' + value;
        }
    }).on('slideStop', function (ev) {
        var brightness = $(this).val();
        src.brightness = brightness;
        console.log(layerId + ' brightness = ' + brightness);
    });
    $('#' + layerId + '-contrast').slider({
        formater: function (value) {
            return 'Contrast: ' + value;
        }
    }).on('slideStop', function (ev) {
        var contrast = $(this).val();
        src.contrast = contrast;
        console.log(layerId + ' contrast = ' + contrast);
    });


};

function removeNasa(layerId) {
    var src = activeLayers[layerId];
    delete activeLayers[layerId];
    viewer.imageryLayers.remove(src, false);
    console.log(layerId + ' removed');
}


$('.nasa-button').toggle(
    function () {
        var b = $(this);
        var layerId = b.attr('data-id');
        loadNasa(layerId);
        $(this).removeClass('map-feature-off').addClass('map-feature-on');

    },
    function () {
        var b = $(this);
        var layerId = b.attr('data-id');
        removeNasa(layerId);
        $(this).removeClass('map-feature-on').addClass('map-feature-off');
        console.log('baleeted');

    }
);


function addLayer(layerId) {
    viewer.imageryLayers.add(layerId, true);
}
function removeLayer(layerId) {
    viewer.imageryLayers.remove(layerId, false);
}


// TOGGLE SUN
function showSun() {
    viewer.scene.globe.enableLighting = true;
}
function hideSun() {
    viewer.scene.globe.enableLighting = false;
}
$('#sun').toggle(
    function () {
        showSun();
        $(this).addClass('map-feature-on').removeClass('map-feature-off');
    },
    function () {
        hideSun();
        $(this).addClass('map-feature-off').removeClass('map-feature-on');
    }
);

// TOGGLE TERRAIN
var ellipsoidTerrainProvider = viewer.terrainProvider;
var cesiumTerrainProvider = new Cesium.CesiumTerrainProvider({
    url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
    requestWaterMask: true,
    requestVertexNormals: true
});
function showTerrain() {
    viewer.terrainProvider = cesiumTerrainProvider;
}
function hideTerrain() {
    viewer.terrainProvider = ellipsoidTerrainProvider;
}
$('#terrain').toggle(
    function () {
        showTerrain();
        $(this).addClass('map-feature-on').removeClass('map-feature-off');
    },
    function () {
        hideTerrain();
        $(this).addClass('map-feature-off').removeClass('map-feature-on');
    }
);

// TOGGLE SIDEBAR
var cesiumButtons = $('#baseLayerPickerContainer').add($('.cesium-viewer-toolbar'));
$('.toggle-menu').toggle(
    function () {
        $('.sidebar').slideToggle();
        cesiumButtons.show();
    },
    function () {
        $('.sidebar').slideToggle();
        cesiumButtons.hide();
    }
);

// MAP FEATURES
function clearMap() {
    $('.active-layer').trigger("click");
}

$('div.panel-heading').click(function (event) {
    var $target = $(event.target);
    $target.find('a:first-of-type').click();
});

// CLEAR LAYERS ON HOME BUTTON CLICK
$('.cesium-home-button').click(function (event) {
    $('.btn-primary').trigger('click');
});



