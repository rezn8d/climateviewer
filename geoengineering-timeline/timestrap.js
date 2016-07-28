$('#slider').nivoSlider({
    pauseTime: 7000,
    pauseOnHover: false,
});

var baseUrl = "http://climateviewer.org/geoengineering-timeline/";

layers.reverse();
function loadLayers() {
  var lb = $('#timestrap'), ml = $('#milestones'), toggle = $('.timestrap-filter');
  for (var i = 0; i < layers.length; i++) {
    var l = layers[i];
    if (typeof l == "string") {
          ml.append('<li class="timestrap-control"><a class="smooth-scroll" href="#' + encodeURIComponent(l) + '">' + l + '</a></li>');
          lb.append('<div id="' + encodeURIComponent(l) + '" class="timestrap-control"><div class="milestone-wrapper"><div class="milestone">' + l + '</div></div></div>');
      } 
      if (l.section) {
          toggle.append('<option class="timestrap-control" value="' + l.sectionid + '">' + l.section + '</option>');
        if (l.visible == true) {
          ml.prepend('<li class="' + l.sectionid + ' timestrap-control"><a class="smooth-scroll" href="#' + l.sectionid + '">' + l.section + '</li>');
          lb.append('<div id="' + l.sectionid + '" class="section ' + l.sectionid + '"></div>');
        }
      } else if (l.title) {
          var encodedTitle = encodeURIComponent(l.title);
          var panel = $('<div id="' + encodedTitle + '" class="panel"></div>').appendTo(lb);
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
            linkList = $('<ol class="references"></ol>').appendTo(details);
            if (typeof l.link == "string") {
                linkList.append('<li role="presentation">' + l.link + '</li>');
            } else {
              _.each(l.link, function(theLink) {
                linkList.append('<li role="presentation"><a href="' + theLink + '" title="' + theLink + '" target="_blank" rel="nofollow">' + theLink + '</a></li>');
              });
            }
          }
          var tags = $('<div class="tags"></div>').appendTo(details);
          $('<div class="tag permalink"><a href="'+ shareLink + '"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span> permalink</a></div>').appendTo(tags);

          if (l.tags || l.category) {
            if (l.tags) {
              _.each(l.tags, function(theTag) {
                $('<div class="tag"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span> ' + theTag + '</div>').appendTo(tags);
              }); 
            }
            if (l.category) {
              if (typeof l.category == "string") { 
                  tags.append('<div class="tag"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span> ' + l.category + '</div>');
                  panel.addClass(l.category);
              } else {
                _.each(l.category, function(categories) {
                  tags.append('<div class="tag"><span class="glyphicon glyphicon-tag" aria-hidden="true"></span> ' + categories + '</div>');
                  panel.addClass(categories);
                }); 
              }
            }
          }

          if (l.image || l.video) {
            var footer = $('<div class="panel-footer"></div>').appendTo(panel);
            var footerBtns = $('<div class="timestrap-media btn-group btn-group-justified"></div>').appendTo(footer);
            if (l.image) {
              if (typeof l.image == "string") {
                var flickr = new RegExp("flickr.com");
                  if (flickr.test(l.image)) {
                    footerBtns.append('<a href="' + l.image + 'player/" title="' + l.image + '" class="btn btn-default image-link mfp-iframe" target="_blank" rel="nofollow"><img data-original="' + l.image + 'player/" class="lazy" alt="image" /></a>');
                  } else {
                    footerBtns.append('<a class="btn btn-default image-link" href="' + l.image + '" target="_blank" rel="nofollow"><img data-original="' + l.image + '" class="lazy" alt="image" /></a>');
                  }
              } else {
                _.each(l.image, function(theImage) {
                  var flickr = new RegExp("flickr.com");
                    if (flickr.test(theImage)) {
                      footerBtns.append('<a href="' + theImage + 'player/" title="' + theImage + '" class="btn btn-default image-link mfp-iframe" target="_blank" rel="nofollow"><img data-original="' + theImage + 'player/" class="lazy" alt="image" /></a>');
                    } else {
                      footerBtns.append('<a class="btn btn-default image-link" href="' + theImage + '" target="_blank" rel="nofollow"><img data-original="' + theImage + '" class="lazy" alt="image" /></a>');
                    }
                });
              }
            }
            if (l.video) {
              if (typeof l.video == "string") { 
                footerBtns.append('<a title="View Media" class="btn btn-default video-link mfp-iframe" href="https://www.youtube.com/watch?v=' + l.video + '"><div class="videoWrapper"><div class="youtube lazy" id="' + l.video + '" data-original="http://i.ytimg.com/vi/' + l.video + '/sddefault.jpg" data-params="modestbranding=1&showinfo=0&controls=0&vq=hd720" style="width: 765px; height: 574px;"><div class="play"></div></div></div></a>');
              } else {  
               _.each(l.video, function(theVideo) {
                  footerBtns.append('<a title="View Media" class="btn btn-default video-link mfp-iframe" href="https://www.youtube.com/watch?v=' + theVideo + '"><div class="videoWrapper"><div class="youtube lazy" data-original="http://i.ytimg.com/vi/' + theVideo + '/sddefault.jpg" data-params="modestbranding=1&showinfo=0&controls=0&vq=hd720" style="width: 765px; height: 574px;"><div class="play"></div></div></div></a>');
                });
              }
            }
          } // end media

        }
      }
    $('.timestrap-media').each(function() { // the containers for all your galleries
      $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true
        }
      });
    }); 
  }
  loadLayers();

$(document).ready(function () {

    $("img.lazy").lazyload({
        effect : "fadeIn"
    });
    $("div.lazy").lazyload({
        effect : "fadeIn"
    });

  $("#newest").hide();

  if ($(".container").width() > 768 ) {
    $(".links a").each(function(i, value) {
      var $link = $(value);
      var text = $link.text();
      if(text.length > 60) {
        $link.text(text.substring(0, 60) + "...");
      }
    });
  } else {
    $(".links a").each(function(i, value) {
      var $link = $(value);
      var text = $link.text();
      if(text.length > 30) {
        $link.text(text.substring(0, 30) + "...");
      }
    });
  }

  $('.timestrap-filter').change(function () {
    var target = $(this).val();
    if (target == 'show-all') {
      $('.timestrap .panel').show();
      $('.section').show();
      $('.milestone').show();
    } else {
      $('.timestrap .panel').hide();
      $('.section').hide();
      $('.milestone').hide();
      $('.' + target).show();
    }
    return false;
  });


  var $root = $('html, body');

  function smoothScroll() {
    $('.smooth-scroll').click(function() {
      var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: ($(href).offset().top - 90)
        }, 500, function () {
            window.location.hash = href;
        });
        return false;
    });
  }
  smoothScroll();

  $("#newest").click(function(e) {
    e.preventDefault();
    $('#timestrap').html(''); $(".timestrap-control").remove(); layers.reverse(); loadLayers(); $("#newest").hide(); $("#oldest").show(); smoothScroll(); $(".section i").removeClass('fa-chevron-down').addClass('fa-chevron-up');
    return false;
  });

  $("#oldest").click(function(e) {
    e.preventDefault();
    $('#timestrap').html(''); $(".timestrap-control").remove(); layers.reverse(); loadLayers(); $("#newest").show(); $("#oldest").hide(); smoothScroll(); $(".section i").removeClass('fa-chevron-up').addClass('fa-chevron-down');
    return false;
  });

  $(".timestrap-share-page").click(function(e) {
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


  $(".timestrap-web-backup").click(function(e) {
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
  $("#make-backup-submit").click(function() {
    var target = $("#make-backup").val();
    window.open('http://web.archive.org/save/' + target);
  });
  $("#view-backup-submit").click(function() {
    var target = $("#view-backup").val();
    window.open('http://web.archive.org/web/*/' + target);
  });

  $("#view-backup").keyup(function(event){
      if(event.keyCode == 13){
          $("#view-backup-submit").click();
      }
  });
  $("#make-backup").keyup(function(event){
      if(event.keyCode == 13){
          $("#make-backup-submit").click();
      }
  });

  var shareTitle = encodeURIComponent('The Weather Effect | The History of Geoengineering and Weather Modification');
  var shareImg = encodeURIComponent('http://i.imgur.com/JWNH4sA.jpg');
  var shareSummary = encodeURIComponent('The largest weather control database on the internet!  You must see our Geoengineering Timeline, Maps, Patents, Projects, Programs, and References.');

  $("#timestrap-share-panel").append('<a class="timestrap-share fa fa-fw fa-facebook" target="_blank" href="https://www.facebook.com/dialog/share?app_id=137190086632977&amp;display=page&amp;href='+ baseUrl + '&amp;redirect_uri=' + baseUrl + '" title="Facebook (share dialog)"></a><a class="timestrap-share fa fa-fw fa-twitter" target="_blank" href="https://twitter.com/share?url='+ baseUrl + '&amp;text='+ shareTitle + '&amp;via=rezn8d&amp;hashtags=wxmod" title="Twitter"></a><a class="timestrap-share fa fa-fw fa-google" target="_blank" href="https://plus.google.com/share?url='+ baseUrl + '" title="Google+"></a><a class="timestrap-share fa fa-fw fa-pinterest" target="_blank" href="https://pinterest.com/pin/create/bookmarklet/?media=' + shareImg + '&amp;url='+ baseUrl + '&amp;description='+ shareTitle + '" title="Pinterest"></a><a class="timestrap-share fa fa-fw fa-linkedin" target="_blank" href="http://www.linkedin.com/shareArticle?url='+ baseUrl + '&amp;title='+ shareTitle + '" title="Linked In"></a><a class="timestrap-share fa fa-fw fa-digg" target="_blank" href="http://digg.com/submit?url='+ baseUrl + '&amp;title='+ shareTitle + '" title="Digg"></a><a class="timestrap-share fa fa-fw fa-tumblr" target="_blank" href="http://www.tumblr.com/share/link?url='+ baseUrl + '&amp;name='+ shareTitle + '&amp;description='+ shareSummary + '" title="Tumblr"></a><a class="timestrap-share fa fa-fw fa-reddit" target="_blank" href="http://reddit.com/submit?url='+ baseUrl + '&amp;title='+ shareTitle + '" title="Reddit"></a><a class="timestrap-share fa fa-fw fa-stumbleupon" target="_blank" href="http://www.stumbleupon.com/submit?url='+ baseUrl + '&amp;title='+ shareTitle + '" title="StumbleUpon"></a><a class="timestrap-share fa fa-fw fa-delicious" target="_blank" href="https://delicious.com/save?v=5&amp;jump=close&amp;url='+ baseUrl + '&amp;title='+ shareTitle + '" title="Delicious"></a>');

  $('.timestrap-share').click(function(e) {
      e = (e ? e : window.event);
      var t = (e.target ? e.target : e.srcElement),
        width = t.data-width || 800,
        height = t.data-height || 500;

      // popup position
      var
        px = Math.floor(((screen.availWidth || 1024) - width) / 2),
        py = Math.floor(((screen.availHeight || 700) - height) / 2);

      // open popup
      var popup = window.open(t.href, "social",
        "width="+width+",height="+height+
        ",left="+px+",top="+py+
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
          color:"#4DAF7C",
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
  ]

  // PIE CHART WIDGET
  var ctx = document.getElementById("timestrap-stats").getContext("2d");
  var myDoughnutChart = new Chart(ctx).Doughnut(pie_data, {
      responsive:true, 
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

});