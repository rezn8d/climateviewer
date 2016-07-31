var baseUrl = "http://climateviewer.org/geoengineering-timeline/";

// Show newest entries first
layers.reverse();

function loadLayers() {
    var lb = $('#timestrap'),
        ml = $('#milestones'),
        toggle = $('#filters');
    
    function doLinks(link, linkList) {
        _.each(link, function (theLink) {
            linkList.append('<li role="presentation"><a href="' + theLink + '" title="' + theLink + '" target="_blank" rel="nofollow">' + theLink + '</a></li>');
        });
    }
    
    function doTags(tag, tags) {
        _.each(tag, function (theTag) {
            $('<div class="tag"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span> ' + theTag + '</div>').appendTo(tags);
        });
    }
    
    function doCats(cat,tags, wrapper) {
        _.each(l.category, function (categories) {
            tags.append('<div class="tag"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span> ' + categories + '</div>');
            wrapper.addClass(categories);
        });
    }
    
    function doImg(img, slider) {
        _.each(img, function (theImage) {
            var flickr = new RegExp("flickr.com");
            if (flickr.test(theImage)) {
                slider.append('<li><a href="' + theImage + 'player/" title="' + theImage + '" class="image-link mfp-iframe"><div class="videoWrapper"><img data-original="' + theImage + 'player/" class="lazy" alt="image" /></div></a></li>');
            } else {
                slider.append('<li><a class="image-link" href="' + theImage + '"><div class="videoWrapper"><img data-original="' + theImage + '" class="lazy" alt="image" /></div></a></li>');
            }
        });
    }
    
    function doVid(vid, slider) {
        _.each(vid, function (theVideo) {
            slider.append('<li><a title="View Media" class="video-link mfp-iframe" href="https://www.youtube.com/watch?v=' + theVideo + '"><div class="videoWrapper"><div class="youtube lazy" data-original="http://i.ytimg.com/vi/' + theVideo + '/sddefault.jpg" data-params="modestbranding=1&showinfo=0&controls=0&vq=hd720" style="width: 765px; height: 574px;"><div class="play"></div></div></div></a></li>');
        });
    }
    
    for (var i = 0; i < layers.length; i++) {
        var l = layers[i];
        if (typeof l == "string") {
            ml.append('<li class="timestrap-control"><a class="smooth-scroll" href="#' + encodeURIComponent(l) + '">' + l + '</a></li>');
            lb.append('<div id="' + encodeURIComponent(l) + '" class="panel year-panel col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="milestone-wrapper"><div class="milestone">' + l + '</div></div></div>');
        }
        if (l.section) {
            toggle.append('<button class="button btn btn-primary" data-filter=".' + l.sectionid + '">' + l.section + '</button>');
            if (l.visible === true) {
                ml.prepend('<li class="' + l.sectionid + ' timestrap-control"><a class="smooth-scroll" href="#' + l.sectionid + '">' + l.section + '</li>');
                lb.append('<div id="' + l.sectionid + '" class="section col-xs-12 col-sm-6 col-md-4 col-lg-3' + l.sectionid + '"></div>');
            }
        } else if (l.title) {
            var encodedTitle = encodeURIComponent(l.title);
            var panelWrap = $('<div id="' + encodedTitle + '" class="panel col-xs-12 col-sm-6 col-md-4 col-lg-3"></div>').appendTo(lb);
            var panel = $('<div class="panel-contents"></div>').appendTo(panelWrap);
            var shareLink = baseUrl + 'index.html#' + encodedTitle;

            if (l.featured) {
                var header = $('<div class="panel-heading" style="background: #fff url(' + l.featured + ') no-repeat top center;"></div>').appendTo(panel);
            }
            var body = $('<div class="panel-body"></div>').appendTo(panel);
            var title = $('<h3 class="media-heading">' + l.title + '</h3>').appendTo(body);
            var time = $('<h4 class="time"><i class="timestrap-share fa fa-fw fa-clock-o"></i></h4>').appendTo(body);

            if (l.month) {
                time.append('<span class="month">&nbsp;' + l.month + ',&nbsp;</span>');
            }
            if (l.year) {
                time.append('<span class="year">' + l.year + '</span>');
            }
            if (l.until) {
                time.append('<span class="until">&nbsp;&dash;&nbsp;' + l.until + '</span></div>');
            }

            var detailsWrap = $('<div class="media"></div>').appendTo(body);
            var details = $('<div class="media-body"></div>').appendTo(detailsWrap);

            if (l.details) {
                $('<div class="details well">' + l.details + '</div>').appendTo(details);
            }

            if (l.link) {
                $('<h6>References</h6>').appendTo(details);
                var linkList = $('<ol class="references"></ol>').appendTo(details);
                if (typeof l.link == "string") {
                    linkList.append('<li role="presentation">' + l.link + '</li>');
                } else {
                    doLinks(l.link, linkList);
                }
            }
            var tags = $('<div class="tags"></div>').appendTo(details);
            $('<div class="tag permalink"><a href="' + shareLink + '"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span> permalink</a></div>').appendTo(tags);

            if (l.tags || l.category) {
                if (l.tags) {
                    doTags(l.tags,tags);
                }
                if (l.category) {
                    if (typeof l.category == "string") {
                        tags.append('<div class="tag"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span> ' + l.category + '</div>');
                        panelWrap.addClass(l.category);
                    } else {
                        doCats(l.category, tags, panelWrap);
                    }
                }
            }
            var footer, wrapper, slider;
            if (l.image || l.video) {
                footer = $('<div class="panel-footer"></div>').appendTo(panel);
                wrapper = $('<div class="timestrap-media"></div>').appendTo(footer);
                slider = $('<ul class="unslider-wrap"></ul>').appendTo(wrapper);
                if (l.image) {
                    if (typeof l.image == "string") {
                        var flickr = new RegExp("flickr.com");
                        if (flickr.test(l.image)) {
                            slider.append('<li><a href="' + l.image + 'player/" title="' + l.image + '" class="image-link mfp-iframe"><div class="videoWrapper"><img data-original="' + l.image + 'player/" class="lazy" alt="image" /></div></a></li>');
                        } else {
                            slider.append('<li><a class="image-link" href="' + l.image + '"><div class="videoWrapper"><img data-original="' + l.image + '" class="lazy" alt="image" /></div></a></li>');
                        }
                    } else {
                        doImg(l.image, slider);
                    }
                }
                if (l.video) {
                    if (typeof l.video == "string") {
                        slider.append('<li><a title="View Media" class="video-link mfp-iframe" href="https://www.youtube.com/watch?v=' + l.video + '"><div class="videoWrapper"><div class="youtube lazy" id="' + l.video + '" data-original="http://i.ytimg.com/vi/' + l.video + '/sddefault.jpg" data-params="modestbranding=1&showinfo=0&controls=0&vq=hd720" style="width: 765px; height: 574px;"><div class="play"></div></div></div></a></li>');
                    } else {
                        doVid(l.video, slider);
                    }
                }
                //console.log(slider.children().length);
                if (slider.children().length > 1) {
                    wrapper.unslider();
                }
            } // end media
        }
    } // end loop

    $('.timestrap-media').each(function () { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });

}
loadLayers();

(function () {

    var qsRegex;
    var buttonFilter;

    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.panel',
        //layoutMode: 'masonry',
        //  isFitWidth: true,
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer'
        },
        filter: function () {
            var $this = $(this);
            var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
            var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
            return searchResult && buttonResult;
        }
    });
    $('#filters button').click(function () {
        buttonFilter = $(this).attr('data-filter');
        //console.log(buttonFilter);
        if (buttonFilter !== '*') {
            $('.year-panel').hide();
            $('#milestones .timestrap-control').hide();
        } else {
            $('.year-panel').show();
            $('#milestones .timestrap-control').show();
       }
        $grid.isotope({
            filter: buttonFilter +', .year-panel'
        });
        if (!$(this).hasClass('active')) {
            $('#filters button').removeClass('active');
            $(this).addClass('active');
        }
        $('#goTimeline').trigger('click');
    });


    // use value of search field to filter
    var $quicksearch = $('#quicksearch').keyup(debounce(function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $grid.isotope();
    }));


    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        return function debounced() {
            if (timeout) {
                clearTimeout(timeout);
            }

            function delayed() {
                fn();
                timeout = null;
            }
            setTimeout(delayed, threshold || 100);
        };
    }
    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold : 1000
    });
    $("div.lazy").lazyload({
        effect: "fadeIn",
        threshold : 1000
    });

    var $win = $(window),
        $con = $('#container'),
        $imgs = $("img.lazy");

    $con.isotope({
        onLayout: function () {
            $win.trigger("scroll");
        }
    });

    $imgs.lazyload({
        failure_limit: Math.max($imgs.length - 1, 0)
    });




    if ($(".container").width() > 768) {
        $(".links a").each(function (i, value) {
            var $link = $(value);
            var text = $link.text();
            if (text.length > 60) {
                $link.text(text.substring(0, 60) + "...");
            }
        });
    } else {
        $(".links a").each(function (i, value) {
            var $link = $(value);
            var text = $link.text();
            if (text.length > 30) {
                $link.text(text.substring(0, 30) + "...");
            }
        });
    }


    var $root = $('html, body');

    function smoothScroll() {
        $('.smooth-scroll').click(function () {
            var href = $.attr(this, 'href');
            var header = $('.header-slider').height();
            $root.animate({
                scrollTop: ($(href).offset().top - header)
            }, 500, function () {
                window.location.hash = href;
            });
            return false;
        });
    }
    smoothScroll();
    
    
    /*
    $("#newest").hide();

    $("#newest").click(function (e) {
        e.preventDefault();
        $('#timestrap').html('');
        $(".timestrap-control").remove();
        layers.reverse();
        loadLayers();
        $("#newest").hide();
        $("#oldest").show();
        smoothScroll();
        $(".section i").removeClass('fa-chevron-down').addClass('fa-chevron-up');
        return false;
    });

    $("#oldest").click(function (e) {
        e.preventDefault();
        $('#timestrap').html('');
        $(".timestrap-control").remove();
        layers.reverse();
        loadLayers();
        $("#newest").show();
        $("#oldest").hide();
        smoothScroll();
        $(".section i").removeClass('fa-chevron-up').addClass('fa-chevron-down');
        return false;
    });
*/
    $(".timestrap-share-page").click(function (e) {
        e.preventDefault();
        if ($("#timestrap-share-panel").is(':visible')) {
            $(".timestrap-chart").show();
            $(".timestrap-backup").hide();
            $("#timestrap-share-panel").hide();
        } else {
            $(".timestrap-chart").hide();
            $(".timestrap-backup").hide();
            $("#timestrap-share-panel").show();
        }
    });

    $(".timestrap-web-backup").click(function (e) {
        e.preventDefault();
        if ($("#timestrap-backup").is(':visible')) {
            $(".timestrap-chart").show();
            $(".timestrap-backup").hide();
            $("#timestrap-share-panel").hide();
        } else {
            $(".timestrap-chart").hide();
            $(".timestrap-backup").show();
            $("#timestrap-share-panel").hide();
        }
    });
    
    $("#make-backup-submit").click(function () {
        var target = $("#make-backup").val();
        window.open('http://web.archive.org/save/' + target);
    });
    
    $("#view-backup-submit").click(function () {
        var target = $("#view-backup").val();
        window.open('http://web.archive.org/web/*/' + target);
    });

    $("#view-backup").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#view-backup-submit").click();
        }
    });
    
    $("#make-backup").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#make-backup-submit").click();
        }
    });

    var shareTitle = encodeURIComponent('Weather Modification and Geoengineering Timeline | by Jim Lee of ClimateViewer News');
    var shareImg = encodeURIComponent('http://i.imgur.com/JWNH4sA.jpg');
    var shareSummary = encodeURIComponent('The largest weather control database and geoengineering timeline on the internet!');

    $("#timestrap-share-panel").append('<a class="timestrap-share fa fa-fw fa-facebook" target="_blank" href="https://www.facebook.com/dialog/share?app_id=137190086632977&amp;display=page&amp;href=' + baseUrl + '&amp;redirect_uri=' + baseUrl + '" title="Facebook (share dialog)"></a><a class="timestrap-share fa fa-fw fa-twitter" target="_blank" href="https://twitter.com/share?url=' + baseUrl + '&amp;text=' + shareTitle + '&amp;via=rezn8d&amp;hashtags=wxmod" title="Twitter"></a><a class="timestrap-share fa fa-fw fa-google" target="_blank" href="https://plus.google.com/share?url=' + baseUrl + '" title="Google+"></a><a class="timestrap-share fa fa-fw fa-pinterest" target="_blank" href="https://pinterest.com/pin/create/bookmarklet/?media=' + shareImg + '&amp;url=' + baseUrl + '&amp;description=' + shareTitle + '" title="Pinterest"></a><a class="timestrap-share fa fa-fw fa-linkedin" target="_blank" href="http://www.linkedin.com/shareArticle?url=' + baseUrl + '&amp;title=' + shareTitle + '" title="Linked In"></a><a class="timestrap-share fa fa-fw fa-digg" target="_blank" href="http://digg.com/submit?url=' + baseUrl + '&amp;title=' + shareTitle + '" title="Digg"></a><a class="timestrap-share fa fa-fw fa-tumblr" target="_blank" href="http://www.tumblr.com/share/link?url=' + baseUrl + '&amp;name=' + shareTitle + '&amp;description=' + shareSummary + '" title="Tumblr"></a><a class="timestrap-share fa fa-fw fa-reddit" target="_blank" href="http://reddit.com/submit?url=' + baseUrl + '&amp;title=' + shareTitle + '" title="Reddit"></a><a class="timestrap-share fa fa-fw fa-stumbleupon" target="_blank" href="http://www.stumbleupon.com/submit?url=' + baseUrl + '&amp;title=' + shareTitle + '" title="StumbleUpon"></a><a class="timestrap-share fa fa-fw fa-delicious" target="_blank" href="https://delicious.com/save?v=5&amp;jump=close&amp;url=' + baseUrl + '&amp;title=' + shareTitle + '" title="Delicious"></a>');

    $('.timestrap-share').click(function (e) {
        e = (e ? e : window.event);
        var t = (e.target ? e.target : e.srcElement),
            width = t.data - width || 800,
            height = t.data - height || 500;

        // popup position
        var
            px = Math.floor(((screen.availWidth || 1024) - width) / 2),
            py = Math.floor(((screen.availHeight || 700) - height) / 2);

        // open popup
        var popup = window.open(t.href, "social",
            "width=" + width + ",height=" + height +
            ",left=" + px + ",top=" + py +
            ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");

        popup.focus();
        e.preventDefault();
        e.returnValue = false;

        return !!popup;
    });



    var entries = $('.panel').length;
    var videos = $('.video-link').length;
    var photos = $('.image-link').length;
    var references = $('.references li a').length;

    $('.timestrap-entries').html(entries);
    $('.timestrap-videos').html(videos);
    $('.timestrap-photos').html(photos);
    $('.timestrap-references').html(references);

    var pie_data = [
        {
            value: entries,
            color: "#4DAF7C",
            highlight: "#55BC75",
            label: "Timeline Entries"
      },
        {
            value: videos,
            color: "#EAC85D",
            highlight: "#f9d463",
            label: "Videos"
      },
        {
            value: photos,
            color: "#E25331",
            highlight: "#f45e3d",
            label: "Photos"
      },
        {
            value: references,
            color: "#1982D1",
            highlight: "#4BF",
            label: "Reference Links"
      }
  ];

    // PIE CHART WIDGET
    var ctx = document.getElementById("timestrap-stats").getContext("2d");
    var myDoughnutChart = new Chart(ctx).Doughnut(pie_data, {
        responsive: true,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>"
    });

    /*    $(".youtube").each(function() {
        // Based on the YouTube ID, we can easily find the thumbnail image
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).replaceWith(iframe);
        });
    }); */

}());