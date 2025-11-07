class Circle {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.fill_color = "#000";
    this.posX = 0;
    this.posY = 0;
    this.strokeWidth = 0;
    this.stroke_color = "red";
    this.scale = 1;
    this.type = "circle";
  }

  render() {
    let canvas = document.querySelector("#shape_renderer");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    ctx.beginPath();
    ctx.arc(150,150,120,0,Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = this.fill_color;
    ctx.fill();
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.stroke_color;
    ctx.stroke();

    let rendered_img = canvas.toDataURL("image/png");

    return `
          <img src="${rendered_img}" id=/>
        `;
  }

  from_json(json) {
    this.id = json.id;
    this.fill_color = json.fill_color;
    this.posX = json.posX;
    this.posY = json.posY;
    this.strokeWidth = json.strokeWidth;
    this.stroke_color = json.stroke_color;
    this.scale = json.scale;
    this.type = json.type;
  }

  to_json() {
    return {
      id: this.id,
      fill_color: this.fill_color,
      posX: this.posX,
      posY: this.posY,
      strokeWidth: this.strokeWidth,
      stroke_color: this.stroke_color,
      scale: this.scale,
      type: this.type,
    };
  }

  clone() {
    let clone = new Circle();
    clone.id = this.id;
    clone.fill_color = this.fill_color;
    clone.posX = this.posX;
    clone.posY = this.posY;
    clone.strokeWidth = this.strokeWidth;
    clone.stroke_color = this.stroke_color;
    clone.scale = this.scale;
    clone.type = this.type;
    return clone;
  }
}
