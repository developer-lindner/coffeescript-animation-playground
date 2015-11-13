(function() {
  var Ball, Fountain, Line, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var canvas, context, currentVis, form, i, len, visual, visuals;
    canvas = $(".canvas")[0];
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    context = canvas.getContext('2d');
    currentVis = 0;
    visuals = [
      {
        id: 0,
        name: "Animation 1",
        fn: new Fountain(canvas, context)
      }, {
        id: 1,
        name: "Animation 2",
        fn: new Line(canvas, context)
      }
    ];
    $(window).on("resize", function() {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      return visuals[currentVis].fn.canvasResized(canvas);
    });
    form = $(".controls form");
    form.prepend("<div class=\"form-group\">\n    <select class=\"form-control\"></select>\n</form>");
    for (i = 0, len = visuals.length; i < len; i++) {
      visual = visuals[i];
      form.find("select").append("<option value=" + visual.id + ">" + visual.name + "</option>");
    }
    form.find("select").change(function(e) {
      visuals[currentVis].fn.tearDown();
      currentVis = form.find("select").val();
      return visuals[currentVis].fn.setUpAndStart();
    });
    return visuals[currentVis].fn.setUpAndStart();
  });

  Ball = (function() {
    function Ball(radius, color) {
      this.getBounds = bind(this.getBounds, this);
      this.draw = bind(this.draw, this);
      this.utils = new Utils;
      if (radius === void 0) {
        radius = 40;
      }
      if (color === void 0) {
        color = "#ff0000";
      }
      this.x = 0;
      this.y = 0;
      this.radius = radius;
      this.vx = 0;
      this.vy = 0;
      this.rotation = 0;
      this.scaleX = 1;
      this.scaleY = 1;
      this.color = this.utils.parseColor(color);
    }

    Ball.prototype.draw = function(context1) {
      this.context = context1;
      this.context.save();
      this.context.translate(this.x, this.y);
      this.context.rotate(this.rotation);
      this.context.scale(this.scaleX, this.scaleY);
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.fill();
      return this.context.restore();
    };

    Ball.prototype.getBounds = function() {
      return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.radius * 2,
        height: this.radius * 2
      };
    };

    return Ball;

  })();

  Fountain = (function() {
    function Fountain(canvas1, context1) {
      var ball, i, num, ref;
      this.canvas = canvas1;
      this.context = context1;
      this.tearDown = bind(this.tearDown, this);
      this.draw = bind(this.draw, this);
      this.setUpAndStart = bind(this.setUpAndStart, this);
      this.utils = new Utils;
      this.mouse = this.utils.captureMouse(this.canvas);
      this.numBalls = 80;
      this.gravity = 0.5;
      this.balls = [];
      for (num = i = 0, ref = this.numBalls; 0 <= ref ? i < ref : i > ref; num = 0 <= ref ? ++i : --i) {
        ball = new Ball(2, Math.random() * 0xffffff);
        ball.x = this.canvas.width / 2;
        ball.y = this.canvas.height;
        ball.vx = Math.random() * 2 - 1;
        ball.vy = Math.random() * -10 - 10;
        this.balls.push(ball);
      }
    }

    Fountain.prototype.setUpAndStart = function() {
      return this.draw();
    };

    Fountain.prototype.draw = function() {
      var ball, i, len, ref;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ref = this.balls;
      for (i = 0, len = ref.length; i < len; i++) {
        ball = ref[i];
        ball.vy += this.gravity;
        ball.x += ball.vx * 5;
        ball.y += ball.vy;
        if (ball.x - ball.radius > this.canvas.width || ball.x + ball.radius < 0 || ball.y - ball.radius > this.canvas.height || ball.y + ball.radius < 0) {
          ball.x = this.canvas.width / 2;
          ball.y = this.canvas.height;
          ball.vx = Math.random() * 2 - 1;
          ball.vy = Math.random() * -10 - 10;
        }
        if (this.utils.containsPoint(ball.getBounds(), this.mouse.x, this.mouse.y)) {
          ball.radius += 0.5;
        }
        ball.draw(this.context);
      }
      return this.rafId = requestAnimationFrame(this.draw);
    };

    Fountain.prototype.tearDown = function() {
      return window.cancelAnimationFrame(this.rafId);
    };

    return Fountain;

  })();

  Line = (function() {
    function Line(canvas1, context1) {
      this.canvas = canvas1;
      this.context = context1;
      this.canvasResized = bind(this.canvasResized, this);
      this.tearDown = bind(this.tearDown, this);
      this.draw = bind(this.draw, this);
      this.setUpAndStart = bind(this.setUpAndStart, this);
      this.utils = new Utils;
      this.mouse = this.utils.captureMouse(this.canvas);
      this.rect = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      };
    }

    Line.prototype.setUpAndStart = function() {
      return this.draw();
    };

    Line.prototype.draw = function() {
      var dist, dx, dy;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      dx = this.rect.x - this.mouse.x;
      dy = this.rect.y - this.mouse.y;
      dist = Math.sqrt(dx * dx + dy * dy);
      this.context.fillStyle = '#000000';
      this.context.fillRect(this.rect.x - 2, this.rect.y - 2, 4, 4);
      this.context.beginPath();
      this.context.moveTo(this.rect.x, this.rect.y);
      this.context.lineTo(this.mouse.x, this.mouse.y);
      this.context.closePath();
      this.context.stroke();
      return this.rafId = requestAnimationFrame(this.draw);
    };

    Line.prototype.tearDown = function() {
      return window.cancelAnimationFrame(this.rafId);
    };

    Line.prototype.canvasResized = function(canvas1) {
      this.canvas = canvas1;
      return this.rect = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      };
    };

    return Line;

  })();

  Utils = (function() {
    function Utils() {
      this.containsPoint = bind(this.containsPoint, this);
      this.parseColor = bind(this.parseColor, this);
      this.captureMouse = bind(this.captureMouse, this);
    }

    Utils.prototype.captureMouse = function(element) {
      var body_scrollLeft, body_scrollTop, element_scrollLeft, element_scrollTop, mouse, offsetLeft, offsetTop;
      mouse = {
        x: 0,
        y: 0,
        event: null
      };
      body_scrollTop = document.body.scrollTop;
      body_scrollLeft = document.body.scrollLeft;
      element_scrollTop = document.documentElement.scrollTop;
      element_scrollLeft = document.documentElement.scrollLeft;
      offsetTop = element.offsetTop;
      offsetLeft = element.offsetLeft;
      element.addEventListener('mousemove', function(event) {
        var x, y;
        if (event.pageX || event.pageY) {
          x = event.pageX;
          y = event.pageY;
        } else {
          x = event.clientX + body_scrollLeft + element_scrollLeft;
          y = event.clientY + body_scrollTop + element_scrollTop;
        }
        mouse.x = x;
        mouse.y = y;
        return mouse.event = event;
      });
      return mouse;
    };

    Utils.prototype.parseColor = function(color, toNumber) {
      if (toNumber === true) {
        if (typeof color === 'number') {
          color | 0;
        }
        if (typeof color === 'string' && color[0] === '#') {
          color = color.slice(1);
        }
        return window.parseInt(color, 16);
      } else {
        if (typeof color === 'number') {
          color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
        }
        return color;
      }
    };

    Utils.prototype.containsPoint = function(rect, x, y) {
      return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
    };

    return Utils;

  })();

}).call(this);
