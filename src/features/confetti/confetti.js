// JavaScript Document
(function () {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
  var canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";
  var particles = [];
  var pIndex = 0;
  var frameId = 0;

  // クラス：紙吹雪生成
  function Dot(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    // 紙吹雪の周りの線
    this.strokeColor = "#434041";
    particles[pIndex] = this;
    this.id = pIndex;
    pIndex++;
    this.life = 0;
    this.maxlife = 800; // 寿命を少し伸ばして画面端まで届きやすく
    this.degree = getRandom(0, 360);
    // 紙吹雪のおおきさ（最小値、最大値）
    this.size = Math.floor(getRandom(8, 12));
  }

  // メソッド：紙吹雪生成処理
  Dot.prototype.draw = function () {
    this.degree += 1;
    this.vx *= 0.99;
    this.vy *= 0.999;

    // 【調整】横への移動量を -1.5 から -0.8 に軽減（角度を緩やかに）
    this.x += this.vx - 0.8 + Math.cos((this.degree * Math.PI) / 600);
    this.y += this.vy;

    this.width = this.size;
    this.height = Math.cos((this.degree * Math.PI) / 20) * this.size;

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height);
    ctx.lineTo(this.x + this.width + this.width / 2, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    this.life++;
    // 画面外に完全に出るまで削除しないようマージンを確保
    if (this.life >= this.maxlife || this.y > canvas.height + 100 || this.x < -200) {
      delete particles[this.id];
    }
  };

  // メソッド：初回紙吹雪生成
  function initParticles() {
    var colors = ["#ff9054", "#3f51db", "#ef7934", "#46c59b"];
    // 初期状態では画面全体（右端のさらに外側含む）に配置
    // i<N：初期生成される紙吹雪の量　増やすとと増える
    for (var i = 0; i < 30; i++) {
      new Dot(Math.random() * (canvas.width * 1.5), Math.random() * canvas.height - canvas.height, getRandom(-2, 0), getRandom(2, 4), colors[i % 4]);
    }
  }

  // 画面幅が変更されるたび定義更新
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // メソッド：継続紙吹雪生成
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // frameId % N：紙吹雪が生成されるフレーム、減らすと増える。
    if (frameId % 50 == 0) {
      var colors = ["#ed7faf", "#72c8d6", "#fff571", "#46c59b"];
      // 【調整】発生源を「画面の左端から右端のさらに外側」まで広げる
      // これにより右下へ流れる個体も確保されます
      var startX = Math.random() * (canvas.width * 1.2);
      new Dot(startX, -50, getRandom(-2, 0), getRandom(2, 4), colors[Math.floor(Math.random() * 4)]);
    }

    for (var i in particles) {
      if (particles[i]) particles[i].draw();
    }
    frameId++;
    requestAnimationFrame(loop);
  }

  // 初回紙吹雪生成
  initParticles();
  // 継続紙吹雪生成
  loop();

  // メソッド：渡された値から値までのランダムな値を返却する。
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
})();
