class SousTitre {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.value = "";
    this.font_size = "4vw";
    this.color = "#000";
    this.font = "ralewayBold";
    this.width = "60vw";
    this.text_align = "left";
    this.opacity = 1;
  }

  render() {
    return `
        <div id="${this.id}" onclick="Create.edit_text_color('${this.id}')" style="
        opacity:${this.opacity};
        font-size:${this.font_size};
        font-family:${this.font};
        color:${this.color};
        width:${this.width};
        text-align:${this.text_align}
        ">
          ${this.value}
        </div>
        `;
  }
}
