class FreeDraw {
  static brush_color = "#000";
  static brush_size = 10;
  static currentDraw = "";

  static launch() {
    const canvas = document.getElementById("freeDraw");
    const ctx = canvas.getContext("2d");
    const brushSizeInput = document.getElementById("brushSize");

    let drawing = false;
    let lastX = 0,
      lastY = 0;
    let lastTime = 0;
    let size = parseInt(this.brush_size);
    let velocity = 0;
    let lineWidth = size;

    // Smooth taper control
    function getTaperedSize(distance, maxSize) {
      const taper = Math.min(distance / 50, 1); // 0 to 1
      return maxSize * (0.3 + 0.7 * taper); // starts small, grows to full size
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("touchstart", start, { passive: false });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchmove", draw, { passive: false });

    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseleave", end);
    canvas.addEventListener("touchend", end);

    // brushSizeInput.addEventListener("input", () => {
    //   size = parseInt(brushSizeInput.value);
    // });

    function getPos(e) {
      if (e.touches && e.touches.length)
        return {
          x: e.touches[0].clientX - canvas.offsetLeft,
          y: e.touches[0].clientY - canvas.offsetTop,
        };
      return { x: e.offsetX, y: e.offsetY };
    }

    function start(e) {
      e.preventDefault();
      drawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      lastTime = Date.now();
    }

    function draw(e) {
      if (!drawing) return;
      e.preventDefault();
      const pos = getPos(e);
      const now = Date.now();
      const delta = now - lastTime;
      const dist = Math.hypot(pos.x - lastX, pos.y - lastY);
      velocity = dist / delta;

      // taper based on movement (simulate pressure)
      const taperedSize = getTaperedSize(dist, size);
      const newLineWidth = taperedSize * (1 / (1 + velocity));

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = FreeDraw.brush_color;
      ctx.lineWidth = newLineWidth;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      lastX = pos.x;
      lastY = pos.y;
      lastTime = now;
      lineWidth = newLineWidth;
    }

    function end() {
      if (!drawing) return;
      drawing = false;

      // draw a small tapering endpoint
      ctx.beginPath();
      ctx.arc(lastX, lastY, lineWidth * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
      //Save current state
      FreeDraw.currentDraw = canvas.toDataURL("image/png");
    }
  }
}
