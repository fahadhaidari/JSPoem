window.onload = function() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const quads = [];
  const size = 5;
  const colors = ["#EEEEEE", "#4444FF", "#FF4422"];

  context.translate(0, 0);

  const update = function() {
    if (quads.length) {
      animate();
    }
    requestAnimationFrame(update);
  }

  const init = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 100; i ++) {
      for (let j = 0; j < 20; j ++) {
        const quad = new Quad(300 + i * size, 20 + j * size, size, size);
        quads.push(quad);
      }
    }
  }

  const animate = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < quads.length; i ++) {
      const quad = quads[i];
      quad.draw();
    }
  }

  function Quad(x, y, width, height) {
    var xVel = Math.random() * 10;
    var yVel = Math.random() * 10;
    var color = null;
    var colorIndex = 0;
    var angle = Math.random() * 20;
    const speed = .1;
    const xTp = 600;
    const yTp = 450;

    (function() {
      colorIndex = Math.round(Math.random() * colors.length);
      context.fillStyle = colors[colorIndex];
      context.fillRect(x, y, width, height);
      context.stroke();
    })()

    this.draw = function() {
      const dx = xTp - x;
      const dy = yTp - y;
      const alphaFactor = (canvas.width - x) * 0.002;

      angle = Math.atan2(dy, dx);
      xVel += Math.cos(angle);
      yVel += Math.sin(angle);
      x += xVel * speed;
      y += yVel * speed;

      context.fillStyle =  colors[colorIndex];
      context.fillRect(x, y, width * alphaFactor, height * alphaFactor);
    }
  }

  init();

  requestAnimationFrame(update);
}
