class Image_D {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.url = "";
    this.file = undefined;
    this.width = 60;
    this.border_top_left_radius = 4;
    this.border_top_right_radius = 4;
    this.border_bottom_left_radius = 4;
    this.border_bottom_right_radius = 4;
    this.opacity = 1;
    // Marges
    this.margin_top = 0;
    this.margin_bottom = 0;
    this.margin_left = 0;
    this.margin_right = 0;
    this.type = "image";
  }

  render() {
    return `
        <img src="${this.url}" onclick="Edit.edit_image(event,'${this.id}')" style="
        width:${this.width}%;
        opacity:${this.opacity};
        border-top-left-radius:${this.border_top_left_radius}px;
        border-top-right-radius:${this.border_top_right_radius}px;
        border-bottom-left-radius:${this.border_bottom_left_radius}px;
        border-bottom-right-radius:${this.border_bottom_right_radius}px;
        margin-top:${this.margin_top}vw;
        margin-bottom:${this.margin_bottom}vw;
        margin-left:${this.margin_left}vw;
        margin-right:${this.margin_right}vw;
        "/>
        `;
  }

  from_json(json) {
    this.id = json.id;
    this.url = URL.createObjectURL(json.file);
    this.file = json.file;
    this.width = json.width;
    this.border_top_left_radius = json.border_top_left_radius;
    this.border_top_right_radius = json.border_top_right_radius;
    this.border_bottom_left_radius = json.border_bottom_left_radius;
    this.border_bottom_right_radius = json.border_bottom_right_radius;
    this.opacity = json.opacity;
    // Marges
    this.margin_top = json.margin_top;
    this.margin_bottom = json.margin_bottom;
    this.margin_left = json.margin_left;
    this.margin_right = json.margin_right;
    this.type = json.type;
  }
}
