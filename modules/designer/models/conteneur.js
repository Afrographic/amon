class Conteneur {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.children = [];
    this.gap = 4;
    this.align="flex-start";
    this.background_color="#c6c6c6"
    this.padding="4vw";
  }

  render() {
    let children_template = "";
    for (let item of this.children){
        children_template += item.render();
    }
      return `
        <div onclick="Edit.edit_conteneur('${this.id}')" style="
        display:flex;
        gap:${this.gap}vw;
        flex-wrap:wrap;
        background-color:${this.background_color};
        width:100%;
        padding:${this.padding};
        align-items:center;
        justify-content:${this.align};
        ">
          ${children_template}
        </div>
        `;
  }
}
