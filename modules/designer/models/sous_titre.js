class SousTitre {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.value = "Ecrire...";
    this.font_size = "4vw";
    this.color = "#000";
    this.font = "ralewayBold";
    this.width = "50%";
    this.text_align = "left";
    this.opacity = 1;
     // Marges
     this.margin_top=0;
     this.margin_bottom=0;
     this.margin_left=0;
     this.margin_right=0;
     this.type="sous_titre";
  }

  render() {
    return `
        <div id="${this.id}" onclick="Edit.edit_text(event,'${this.id}')" style="
        opacity:${this.opacity};
        font-size:${this.font_size};
        font-family:${this.font};
        color:${this.color};
        width:${this.width};
        z-index:2;
        text-align:${this.text_align};
        margin-top:${this.margin_top}vw;
        margin-bottom:${this.margin_bottom}vw;
        margin-left:${this.margin_left}vw;
        margin-right:${this.margin_right}vw;
        ">
          ${this.value}
        </div>
        `;
  }

  from_json(json) {
    this.id = json.id;
    this.value = json.value;
    this.font_size = json.font_size;
    this.color = json.color;
    this.font = json.font;
    this.width = json.width;
    this.text_align = json.text_align;
    this.opacity = json.opacity;
    this.line_height = json.line_height;
    // Marges
    this.margin_top = json.margin_top;
    this.margin_bottom = json.margin_bottom;
    this.margin_left = json.margin_left;
    this.margin_right = json.margin_right;
    this.type = json.type;
  }

  to_json(){
    return{
      id:this.id,
      value:this.value,
      font_size:this.font_size,
      color:this.color,
      font:this.font,
      width:this.width,
      text_align:this.text_align,
      opacity:this.opacity,
      line_height:this.line_height,
      // Marges
      margin_top:this.margin_top,
      margin_bottom:this.margin_bottom,
      margin_left:this.margin_left,
      margin_right:this.margin_right,
      type:this.type,
    }
  }

  clone() {
    let clone = new SousTitre();
    clone.id = `${this.id}_${Utils.generate_unique_id_from_time()}`;
    clone.value = this.value;
    clone.font_size = this.font_size;
    clone.color = this.color;
    clone.font = this.font;
    clone.width = this.width;
    clone.text_align = this.text_align;
    clone.opacity = this.opacity;
    clone.line_height = this.line_height;
    clone.margin_top = this.margin_top;
    clone.margin_bottom = this.margin_bottom;
    clone.margin_left = this.margin_left;
    clone.margin_right = this.margin_right;
    clone.type = this.type;
    return clone;
  }
}
