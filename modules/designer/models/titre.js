class Titre {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.value = "";
    this.font_size = "5vw";
    this.color = "#000";
    this.font = "ralewayBlack";
    this.width = "60vw";
    this.text_align = "left";
    this.opacity = 1;
    this.line_height = "5vw";
  }

  render() {
    return `
        <div id="${this.id}" onclick="Edit.edit_text_color('${this.id}')" style="
        opacity:${this.opacity};
        font-size:${this.font_size};
        font-family:${this.font};
        color:${this.color};
        width:${this.width};
        line-height:${this.line_height};
        text-align:${this.text_align}
        ">
            ${this.value}
        </div>
        `;
  }
}
