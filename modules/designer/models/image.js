class Image_D {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.url = "";
    this.file = undefined;
    this.width = 40;
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
    // Positionning
    this.position = "relative";
    this.posY = "0";
    this.posX = "0";
    this.rotate = "0";
    // Crops
    this.crop_top = 0;
    this.crop_left = 0;
    this.crop_right = 0;
    this.crop_bottom = 0;
    //Shadow
    this.shadow_color = "rgba(0,0,0,0)";
    // Type
    this.type = "image";
  }

  render() {
    let z_index = 1;
    if (this.position == "relative") {
      z_index = 2;
    }
    return `
        <img src="${this.url}" onclick="Edit.edit_image(event,'${this.id}')" style="
        width:${this.width}%;
        position:${this.position};
        top:${this.posY}%;
        z-index:${z_index};
        transform:rotate(${this.rotate}deg);
        left:${this.posX}%;
        opacity:${this.opacity};
        border-top-left-radius:${this.border_top_left_radius}px;
        border-top-right-radius:${this.border_top_right_radius}px;
        border-bottom-left-radius:${this.border_bottom_left_radius}px;
        border-bottom-right-radius:${this.border_bottom_right_radius}px;
        margin-top:${this.margin_top}vw;
        margin-bottom:${this.margin_bottom}vw;
        margin-left:${this.margin_left}vw;
        margin-right:${this.margin_right}vw;
        box-shadow:0px 7px 12px 0px ${this.shadow_color};
        "/>
        `;
  }

  from_json(json) {
    this.id = json.id;
    if (json.file.size != undefined) {
      this.url = URL.createObjectURL(json.file);
    } else {
      this.url = json.url;
    }
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
    this.position = json.position;
    this.posY = json.posY;
    this.posX = json.posX;
    this.rotate = json.rotate;
    this.shadow_color = json.shadow_color;

    this.crop_left = json.crop_left;
    this.crop_right = json.crop_right;
    this.crop_bottom = json.crop_bottom;
    this.crop_top = json.crop_top;

    this.type = json.type;
  }

  clone() {
    let clone = new Image_D();
    clone.id = `${this.id}_${Math.random() * 100}`;
    clone.url = this.url;
    clone.file = this.file;
    clone.width = this.width;
    clone.border_top_left_radius = this.border_top_left_radius;
    clone.border_top_right_radius = this.border_top_right_radius;
    clone.border_bottom_left_radius = this.border_bottom_left_radius;
    clone.border_bottom_right_radius = this.border_bottom_right_radius;
    clone.opacity = this.opacity;
    clone.margin_top = this.margin_top;
    clone.margin_bottom = this.margin_bottom;
    clone.margin_left = this.margin_left;
    clone.margin_right = this.margin_right;
    clone.position = this.position;
    clone.posY = this.posY;
    clone.posX = this.posX;
    clone.shadow_color = this.shadow_color;

    clone.crop_top = this.crop_top;
    clone.crop_bottom = this.crop_bottom;
    clone.crop_left = this.crop_left;
    clone.crop_right = this.crop_right;

    clone.rotate = this.rotate;
    clone.type = this.type;
    return clone;
  }

  async to_json() {
    let new_url;
    if (this.file.size != undefined) {
      new_url = await Utils.image_to_base_64(this.file);
    } else {
      new_url = this.url;
    }

    return {
      id: this.id,
      url: new_url,
      file: this.file,
      width: this.width,
      border_top_left_radius: this.border_top_left_radius,
      border_top_right_radius: this.border_top_right_radius,
      border_bottom_left_radius: this.border_bottom_left_radius,
      border_bottom_right_radius: this.border_bottom_right_radius,
      opacity: this.opacity,
      // Marges
      margin_top: this.margin_top,
      margin_bottom: this.margin_bottom,
      margin_left: this.margin_left,
      margin_right: this.margin_right,
      // Positionning
      position: this.position,
      posY: this.posY,
      posX: this.posX,
      rotate: this.rotate,
      shadow_color: this.shadow_color,
      //Cropping
      crop_left: this.crop_left,
      crop_right: this.crop_right,
      crop_top: this.crop_top,
      crop_bottom: this.crop_bottom,
      // Type
      type: this.type,
    };
  }
}
