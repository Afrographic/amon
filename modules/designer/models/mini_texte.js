class MiniTexte {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.value = "";
    this.font_size = "1.6vw";
    this.color = "#000";
    this.font = "ralewayRegular";
    this.text_align = "left";
    this.opacity = 1;
  }

  set_bold() {
    this.font = "ralewayBold";
  }

  render() {
    return `
        <div id="${this.id}" style="
        opacity:${this.opacity};
        font-size:${this.font_size};
        font-family:${this.font};
        color:${this.color};
        text-align:${this.text_align}
        ">
          ${this.value}
        </div>
        `;
  }
}
