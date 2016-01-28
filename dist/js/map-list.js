/**
 * Created by rezn8d on 1/28/2016.
 */
var me = Self();

nobjectsIn(layers, function (x) {
    //console.log(x);
}, function (s, p, o) {
    me.addEdge(s, p, o);
});
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
                    layerButton, details, loadIcon, optIcon, label;

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
                        $('.' + h.I + '-sliders').show();
                        $('.' + h.I + '-picker').show();
                    },
                    function () {
                        $('.' + h.I + '-sliders').hide();
                        $('.' + h.I + '-picker').hide();
                        details.hide();
                        optIcon.removeClass('fa-folder-open-o active').addClass('fa-folder-o');
                    }
                ).appendTo(layerButton);
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
                            }
                        });
                    },
                    function () {
                        setTimeout(function() {
                            if (loadIcon.hasClass('check')) {
                                disableLayer(h);
                                loadIcon.removeClass('check active').addClass('play');
                                $('.' + h.I + '-picker').hide();
                                if (label.hasClass('active')) label.removeClass('active');
                                if (content.hasClass('active')) content.removeClass('active');
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
    var lb = $('#map-list');
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

initLayers();

