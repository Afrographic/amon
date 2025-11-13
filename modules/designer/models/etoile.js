class Etoile {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.fill_color = "#000";
    this.stroke_color = "red";
    this.stroke_width = 0;
    this.points = 3;
    this.posX = 0;
    this.posY = 0;
    this.rotate = 0; 
    this.scale = 1;
    this.cornerRadius = 16;
    this.url="";
    this.type = "etoile";
  }

  render() {
    let canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    let ctx = canvas.getContext("2d");
    let outerRadius = 250;
    let innerRadius = 100; 
    let cornerRadius = this.cornerRadius;
    let rotation = -Math.PI / 2;
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let points = this.points;

    const pts = [];
    const step = Math.PI / points;
    for (let i = 0; i < 2 * points; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = rotation + i * step;
      pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
    }

    // Petite fonction utilitaire
    const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
    const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
    const mul = (v, s) => ({ x: v.x * s, y: v.y * s });
    const len = (v) => Math.hypot(v.x, v.y);
    const norm = (v) => {
      const L = len(v) || 1;
      return { x: v.x / L, y: v.y / L };
    };
    const dot = (a, b) => a.x * b.x + a.y * b.y;

    ctx.beginPath();

    for (let i = 0; i < pts.length; i++) {
      const prev = pts[(i - 1 + pts.length) % pts.length];
      const cur = pts[i];
      const next = pts[(i + 1) % pts.length];

      const vPrev = norm(sub(prev, cur));
      const vNext = norm(sub(next, cur));

      let cosTheta = dot(vPrev, vNext);
      cosTheta = Math.max(-1, Math.min(1, cosTheta));
      const theta = Math.acos(cosTheta);

      let tangent = cornerRadius / Math.tan(theta / 2);
      const distPrev = len(sub(prev, cur));
      const distNext = len(sub(next, cur));
      const maxT = Math.min(distPrev, distNext) / 2 - 1e-6;
      if (tangent > maxT) tangent = maxT;

      const p1 = add(cur, mul(vPrev, tangent));
      const p2 = add(cur, mul(vNext, tangent));

      const bis = norm(add(vPrev, vNext));
      const distToCenter = cornerRadius / Math.sin(theta / 2);
      const center = add(cur, mul(bis, distToCenter));

      const startAngle = Math.atan2(p1.y - center.y, p1.x - center.x);
      const endAngle = Math.atan2(p2.y - center.y, p2.x - center.x);

      if (i === 0) ctx.moveTo(p1.x, p1.y);
      else ctx.lineTo(p1.x, p1.y);

      const cross = vPrev.x * vNext.y - vPrev.y * vNext.x;
      const anticlockwise = cross > 0;
      ctx.arc(
        center.x,
        center.y,
        cornerRadius,
        startAngle,
        endAngle,
        anticlockwise
      );
    }

    ctx.closePath();
    ctx.fillStyle = this.fill_color;
    ctx.strokeStyle = this.stroke_color;
    ctx.lineWidth = this.stroke_width;
    ctx.fill();
    if (this.stroke_width > 0) {
      ctx.stroke();
    }

    let url = canvas.toDataURL("image/png");
    this.url = url;

    return `
    <img onclick="Etoile_Edit.edit('${this.id}')" src="${url}" style="transform-origin:top left;position:absolute;top:${this.posY}vw;left:${this.posX}vw;transform:scale(${this.scale}) rotate(${this.rotate}deg)"/>
  `;
  }

  from_json(json) {
    this.id = json.id;
    this.fill_color = json.fill_color;
    this.stroke_color = json.stroke_color;
    this.stroke_width = json.stroke_width;
    this.side = json.side;
    this.posX = json.posX;
    this.posY = json.posY;
    this.rotate = json.rotate;
    this.scale = json.scale;
    this.cornerRadius = json.cornerRadius;
    this.type = json.type;
  }

  to_json() {
    return {
      id: this.id,
      fill_color: this.fill_color,
      stroke_color: this.stroke_color,
      stroke_width: this.stroke_width,
      side: this.side,
      posX: this.posX,
      posY: this.posY,
      rotate: this.rotate,
      scale: this.scale,
      cornerRadius: this.cornerRadius,
      type: this.type,
    };
  }

  clone() {
    let clone = new Etoile();
    clone.id = `id_${Math.random() * 100000}`;
    clone.fill_color = this.fill_color;
    clone.stroke_color = this.stroke_color;
    clone.stroke_width = this.stroke_width;
    clone.side = this.side;
    clone.posX = this.posX;
    clone.posY = this.posY;
    clone.rotate = this.rotate;
    clone.scale = this.scale;
    clone.cornerRadius = this.cornerRadius;
    clone.type = this.type;
    return clone;
  }
}
