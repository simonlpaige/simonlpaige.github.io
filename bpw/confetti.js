/* Brookside Party Warehouse - confetti engine
   Lightweight canvas particle system. Bursts on load and on demand.
   Exposes window.Confetti.burst(), .pop(x,y), .setIntensity(v), .spawnAt(x,y,count,opts) */

(function () {
  var COLORS = ["#E63946", "#F4862A", "#F6C443", "#4FB477", "#3A86E0", "#E86A92"];

  function ConfettiEngine(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.running = false;
    this.intensity = 1;
    this.resize();
    var self = this;
    window.addEventListener("resize", function () { self.resize(); });
    this.loop = this.loop.bind(this);
  }
  ConfettiEngine.prototype.resize = function () {
    var dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + "px";
    this.canvas.style.height = window.innerHeight + "px";
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  };
  ConfettiEngine.prototype.spawn = function (x, y, count, opts) {
    count = count || 80;
    opts = opts || {};
    var n = Math.round(count * this.intensity);
    for (var i = 0; i < n; i++) {
      var angle = opts.angle != null
        ? opts.angle + (Math.random() - 0.5) * (opts.spread || Math.PI)
        : Math.random() * Math.PI * 2;
      var speed = (opts.speedMin || 6) + Math.random() * (opts.speedMax || 10);
      var shapeRoll = Math.random();
      this.particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (opts.lift || 4),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 5 + Math.random() * 7,
        shape: shapeRoll < 0.4 ? "rect" : (shapeRoll < 0.7 ? "circle" : "ribbon"),
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        life: 1,
        decay: 0.004 + Math.random() * 0.006,
        gravity: 0.18 + Math.random() * 0.08,
        drag: 0.985,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.05 + Math.random() * 0.08
      });
    }
    this.start();
  };
  ConfettiEngine.prototype.burst = function () {
    var W = window.innerWidth;
    var H = window.innerHeight;
    this.spawn(0, H - 20, 100, { angle: -Math.PI / 3, spread: Math.PI / 3.4, speedMin: 12, speedMax: 22, lift: 6 });
    this.spawn(W, H - 20, 100, { angle: -2 * Math.PI / 3, spread: Math.PI / 3.4, speedMin: 12, speedMax: 22, lift: 6 });
    this.spawn(W / 2, H * 0.65, 60, { speedMin: 4, speedMax: 9, lift: 3 });
  };
  ConfettiEngine.prototype.pop = function (x, y) {
    this.spawn(x, y, 40, { speedMin: 3, speedMax: 8, lift: 2 });
  };
  ConfettiEngine.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    requestAnimationFrame(this.loop);
  };
  ConfettiEngine.prototype.loop = function () {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= p.decay;
      if (p.life <= 0 || p.y > window.innerHeight + 40) {
        this.particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
      } else if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -1.5, p.size, 3);
      }
      ctx.restore();
    }
    if (this.particles.length > 0) {
      requestAnimationFrame(this.loop);
    } else {
      this.running = false;
    }
  };

  var engine = null;
  function getEngine() {
    if (engine) return engine;
    var canvas = document.getElementById("__confetti");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "__confetti";
      canvas.className = "confetti-canvas";
      canvas.setAttribute("aria-hidden", "true");
      document.body.appendChild(canvas);
    }
    engine = new ConfettiEngine(canvas);
    return engine;
  }

  // Respect reduced-motion preference
  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  window.Confetti = {
    burst: function () { if (!reducedMotion()) getEngine().burst(); },
    pop: function (x, y) { if (!reducedMotion()) getEngine().pop(x, y); },
    setIntensity: function (v) { getEngine().intensity = v; },
    spawnAt: function (x, y, count, opts) { if (!reducedMotion()) getEngine().spawn(x, y, count, opts); }
  };

  // Auto-burst on first load if the page opts in via <body data-confetti="burst">
  document.addEventListener("DOMContentLoaded", function () {
    if (document.body && document.body.getAttribute("data-confetti") === "burst") {
      setTimeout(function () { window.Confetti.burst(); }, 220);
    }
  });
})();
