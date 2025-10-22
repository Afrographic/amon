class Conteneur {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.children = [];
    this.gap = 4;
    this.align = "flex-start";
    this.background_color = "#c6c6c6";
    this.background_image ="";
    this.padding_top_bottom = "4vw";
    this.padding_left_right = "4vw";
    this.border_top_left_radius = 0;
    this.border_top_right_radius = 0;
    this.border_bottom_left_radius = 0;
    this.border_bottom_right_radius = 0;
    this.width=100;
  }

  render() {
    let children_template = "";
    for (let item of this.children) {
      children_template += item.render();
    }
    return `
        <div onclick="Edit.edit_conteneur('${this.id}')" class="conteneur" style="
        display:flex;
        gap:${this.gap}vw;
        background-color:${this.background_color};
        background-image:${this.background_image};
        width:${this.width}%;
        padding:${this.padding_top_bottom} ${this.padding_left_right};
        align-items:center;
        justify-content:${this.align};
        border-top-left-radius:${this.border_top_left_radius}px;
        border-top-right-radius:${this.border_top_right_radius}px;
        border-bottom-left-radius:${this.border_bottom_left_radius}px;
        border-bottom-right-radius:${this.border_bottom_right_radius}px;
        ">
          ${children_template}
        </div>
        `;
  }
}
