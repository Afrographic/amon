class Polygone {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.fill_color = "#000";
    this.stroke_color = "red";
    this.stroke_width = 0;
    this.side = 3;
    this.posX = 0;
    this.posY = 0;
    this.rotate = 0;
    this.scale = 1;
    this.cornerRadius = 16;
    this.type = "polygone";
  }

  render() {
    let canvas = document.createElement("canvas");
    canvas.width = 260;
    canvas.height = 260;
    let ctx = canvas.getContext("2d");
    let outerRadius = 120;
    let cornerRadius = this.cornerRadius;
    let rotation = -Math.PI / 2;
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let sides = this.side;

    // calculer sommets du polygone régulier
    const pts = [];
    for (let i = 0; i < sides; i++) {
      const angle = rotation + (i / sides) * Math.PI * 2;
      pts.push({
        x: cx + Math.cos(angle) * outerRadius,
        y: cy + Math.sin(angle) * outerRadius,
      });
    }

    // helper: vecteur, norme, normalisation
    const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
    const len = (v) => Math.hypot(v.x, v.y);
    const norm = (v) => {
      const L = len(v) || 1;
      return { x: v.x / L, y: v.y / L };
    };
    const dot = (a, b) => a.x * b.x + a.y * b.y;
    const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
    const mul = (v, s) => ({ x: v.x * s, y: v.y * s });

    ctx.beginPath();

    for (let i = 0; i < sides; i++) {
      const prev = pts[(i - 1 + sides) % sides];
      const cur = pts[i];
      const next = pts[(i + 1) % sides];

      // vecteurs depuis curr vers prev et next
      const vPrev = norm(sub(prev, cur));
      const vNext = norm(sub(next, cur));

      // angle interne en curr
      let cosTheta = dot(vPrev, vNext);
      cosTheta = Math.max(-1, Math.min(1, cosTheta));
      const theta = Math.acos(cosTheta); // angle entre vPrev et vNext

      // distance tangent le long des bords pour atteindre le point de tangence
      let tangent = cornerRadius / Math.tan(theta / 2);

      // limiter tangent s'il dépasse la moitié des longueurs d'arête adjacentes
      const distPrev = len(sub(prev, cur));
      const distNext = len(sub(next, cur));
      const maxT = Math.min(distPrev, distNext) / 2 - 1e-6; // marge min
      if (tangent > maxT) {
        tangent = maxT;
        // on ajuste cornerRadius pour rester cohérent
        cornerRadius = tangent * Math.tan(theta / 2);
      }

      // points de tangence sur les deux arêtes
      const p1 = add(cur, mul(vPrev, tangent)); // sur arête (cur->prev)
      const p2 = add(cur, mul(vNext, tangent)); // sur arête (cur->next)

      // centre de l'arc (sur la bissectrice)
      const bis = norm(add(vPrev, vNext));
      // si vPrev ≈ -vNext (angle ≈ 180°) la bis est presque zéro -> cas plat
      let center;
      if (Math.abs(bis.x) < 1e-9 && Math.abs(bis.y) < 1e-9) {
        // coin presque plat; prendre arc de rayon cornerRadius perpendiculaire
        center = add(cur, {
          x: -vPrev.y * cornerRadius,
          y: vPrev.x * cornerRadius,
        });
      } else {
        const distToCenter = cornerRadius / Math.sin(theta / 2);
        center = add(cur, mul(bis, distToCenter));
      }

      // angles pour l'arc
      const startAngle = Math.atan2(p1.y - center.y, p1.x - center.x);
      const endAngle = Math.atan2(p2.y - center.y, p2.x - center.x);

      // pour le premier sommet on moveTo le p1
      if (i === 0) {
        ctx.moveTo(p1.x, p1.y);
      } else {
        // relier depuis le précédent arc jusqu'à p1 par une ligne (ou déjà relié)
        ctx.lineTo(p1.x, p1.y);
      }

      // détermination du sens de dessin de l'arc : on veut arc "intérieur"
      // On calcule cross pour savoir si l'orientation est cw/ccw
      const cross = vPrev.x * vNext.y - vPrev.y * vNext.x;
      const anticlockwise = cross > 0; // si cross >0 => arc sens anti-horaire pour polygone CCW

      // dessiner l'arc du p1 à p2 autour de center
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
    // style par défaut (modifiable)
    ctx.fillStyle = this.fill_color;
    ctx.strokeStyle = this.stroke_color;
    ctx.lineWidth = this.stroke_width;
    ctx.fill();
    if (this.stroke_width > 0) {
      ctx.stroke();
    }

    let url = canvas.toDataURL("image/png");

    return `
    <img onclick="Polygone_Edit.edit('${this.id}')" src="${url}" style="transform-origin:center;position:absolute;top:${this.posY}vw;left:${this.posX}vw;transform:scale(${this.scale}) rotate(${this.rotate}deg)"/>
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
    let clone = new Polygone();
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
