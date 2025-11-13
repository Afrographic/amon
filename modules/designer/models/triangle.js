class Triangle {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.fill_color = "#000";
    this.posX = 0;
    this.posY = 0;
    this.rotate = 0;
    this.scale = 1;
    this.url = "";
    this.type = "triangle";
  }

  render() {
    let canvas = document.querySelector("#shape_renderer");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.beginPath();
    ctx.moveTo(10, 270);
    ctx.lineTo(290, 270);
    ctx.lineTo(150, 80);
    ctx.fillStyle = this.fill_color;
    ctx.fill();

    let rendered_img = canvas.toDataURL("image/png");
    this.url = rendered_img;

    return `
              <img onclick="Triangle_edit.edit('${this.id}')" src="${rendered_img}" style="transform-origin:top left;position:absolute;top:${this.posY}vw;left:${this.posX}vw;transform:scale(${this.scale}) rotate(${this.rotate}deg)"/>
            `;
  }

  to_json() {
    return {
      id: this.id,
      fill_color: this.fill_color,
      posX: this.posX,
      posY: this.posY,
      rotate: this.rotate,
      scale: this.scale,
      type: this.type,
    };
  }

  from_json(json) {
    this.id = json.id;
    this.fill_color = json.fill_color;
    this.posX = json.posX;
    this.posY = json.posY;
    this.rotate = json.rotate;
    this.scale = json.scale;
    this.type = json.type;
  }

  clone() {
    let clone = new Triangle();
    clone.id = `id_${Math.random() * 100000}`;
    clone.fill_color = this.fill_color;
    clone.posX = this.posX+10;
    clone.posY = this.posY+10;
    clone.rotate = this.rotate;
    clone.scale = this.scale;
    clone.type = this.type;
    return clone;
  }
}
