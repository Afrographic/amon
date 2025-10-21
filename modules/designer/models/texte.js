class Text {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.value = "";
    this.font_size = "3vw";
    this.color = "#000";
    this.font = "ralewayRegular";
    this.text_align = "left";
    this.opacity = 1;
    this.line_height= "4.3vw";
  }

  set_bold() {
    this.font = "ralewayBold";
  }

  render() {
    return `
    <div id="${this.id}" onclick="Edit.edit_text('${this.id}')" style="
    opacity:${this.opacity};
    font-size:${this.font_size};
    font-family:${this.font};
    color:${this.color};
    line-height: ${this.line_height};
    text-align:${this.text_align};
    width: 70vw;
    ">
      ${this.value}
    </div>
    `;
  }
}
