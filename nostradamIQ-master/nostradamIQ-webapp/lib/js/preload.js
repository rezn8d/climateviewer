// PRELOAD
var drawingThings;
function preload() {
  var DrawingThing, c, canvas, clear, createCanvas, ct, drawThing, i, trails, results;
  TWO_PI = Math.PI * 2;
  WIDTH = screen.width; //$(window).width;
  HEIGHT = screen.height; //$(window).height;

  if (WIDTH < HEIGHT) {
    RADIUS = (WIDTH - WIDTH / 2) / 10;
  } else {
    RADIUS = (HEIGHT - HEIGHT / 2) / 10;
  }

  //document.getElementById('preloader-img').setAttribute('style', 'position:absolute; TOP:' + 50 + '%; LEFT:' + 50 + '%; width:'+ RADIUS*2 + 'px; height:' + RADIUS*2 + 'px;'); //'position:absolute; TOP:' + (HEIGHT/2 - RADIUS) + 'px; LEFT:' + (WIDTH/2 - RADIUS) + 'px; width:'+ RADIUS*2 + 'px; height:' + RADIUS*2 + 'px;');
  
  createCanvas = function() {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "preload");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    return canvas;
  };

  canvas = createCanvas();
  document.getElementById('preload-wrapper').appendChild(canvas);
  c = canvas.getContext("2d");
  trails = createCanvas();
  ct = trails.getContext("2d");

  clear = function() {
    c.fillStyle = "black";
    c.fillRect(0, 0, WIDTH, HEIGHT);
    ct.fillStyle = "black";
    ct.fillRect(0, 0, WIDTH, HEIGHT);
  };
  clear();


  DrawingThing = function(x, y) {
      this.x = x;
      this.y = y;
      this.radii = [RADIUS*1, RADIUS*2, RADIUS*3, RADIUS*4, RADIUS*5, RADIUS*6, RADIUS*7, RADIUS*8, RADIUS*9, RADIUS*10];
      this.num = this.radii.length;
      this.thetas = [Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI];
      this.thetasInc = [Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1];
  };

  DrawingThing.prototype.draw = function() {
      var i, j, ref, x, y;
      ct.strokeStyle = "rgba(255,114,20,0.1)";
      for (i = j = 0, ref = this.num; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        x = this.x + this.radii[i] * Math.cos(this.thetas[i]);
        y = this.y + this.radii[i] * Math.sin(this.thetas[i]);
        if (i > 10) {
          clear();
          ct.beginPath();
          ct.moveTo(x, y);
        }
        if (i === 0) {
          ct.beginPath();
          ct.moveTo(x, y);
        } else {
          ct.lineTo(x, y);
        }
        c.strokeStyle = "rgba(255,550,100,0)";
        c.fillStyle = "white";
        c.beginPath();
        c.arc(this.x, this.y, this.radii[i], 0, TWO_PI, false);
        c.stroke();
        c.beginPath();
        c.arc(x, y, 2, 0, TWO_PI, false);
        c.fill();
        this.thetas[i] += this.thetasInc[i];
      }
      ct.closePath();
      ct.stroke();
    };

  drawingThings = [new DrawingThing(WIDTH/2, HEIGHT/2)];

  i = 0;
  if (drawingThings) {
    setInterval(function() {
      if (drawingThings) {
        var j, len;
        c.drawImage(trails, 0, 0);
        i += 1;
        if (i > 1000) {
          clear();
          delete DrawingThing;
          drawingThings = [new DrawingThing(WIDTH/2, HEIGHT/2)];
          i = 0;
        }
        results = [];
        for (j = 0, len = drawingThings.length; j < len; j++) {
          drawThing = drawingThings[j];
          results.push(drawThing.draw());
        }
        return results;
      }
    }, 30);
  }

  return;
}

var showPreload = function() {
  $('#cesiumContainer').hide();
  $('#preload-wrapper').show();
  preload();
}

var hidePreload = function() {
  $('#preload-wrapper').hide();
  $('#cesiumContainer').show();
  delete drawingThings;
}