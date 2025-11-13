class Rectangle {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.fill_color = "#000";
    this.stroke_color = "red";
    this.stroke_width = 0;
    this.posX = 0;
    this.posY = 0;
    this.rotate = 0;
    this.width = 450;
    this.height = 20;
    this.scale = 1;
    this.type = "rectangle";
  }

  render() {
    let canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = this.fill_color;
    ctx.fillRect(30, 30, this.width, this.height);
    ctx.lineWidth = this.stroke_width;
    ctx.strokeStyle = this.stroke_color;
    if (this.stroke_width > 0) {
      ctx.strokeRect(30, 30, this.width, this.height);
    }
    let url = canvas.toDataURL("image/png");

    return `
    <img onclick="RectangleEdit.edit('${this.id}')" src="${url}" style="transform-origin:top left;position:absolute;top:${this.posY}vw;left:${this.posX}vw;transform:scale(${this.scale}) rotate(${this.rotate}deg)"/>
  `;
  }

  from_json(json) {
    this.id = json.id;
    this.fill_color = json.fill_color;
    this.stroke_color = json.stroke_color;
    this.stroke_width = json.stroke_width;
    this.posX = json.posX;
    this.posY = json.posY;
    this.rotate = json.rotate;
    this.width = json.width;
    this.height = json.height;
    this.scale = json.scale;
    this.type = json.type;
  }

  to_json() {
    return {
      id: this.id,
      fill_color: this.fill_color,
      stroke_color: this.stroke_color,
      stroke_width: this.stroke_width,
      posX: this.posX,
      posY: this.posY,
      rotate: this.rotate,
      width: this.width,
      height: this.height,
      scale: this.scale,
      type: this.type,
    };
  }

  clone() {
    let c = new Rectangle();
    c.id = `id_${Math.random() * 100000}`;
    c.fill_color = this.fill_color;
    c.stroke_color = this.stroke_color;
    c.stroke_width = this.stroke_width;
    c.posX = this.posX;
    c.posY = this.posY;
    c.rotate = this.rotate;
    c.width = this.width;
    c.height = this.height;
    c.scale = this.scale;
    c.type = this.type;
    return c;
  }
}
