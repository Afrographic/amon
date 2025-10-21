class Conteneur {
  constructor() {
    this.children = [];
    this.gap = 4;
    this.align="flex-start";
  }

  render() {
    let children_template = "";
    for (let item of this.children){
        children_template += item.render();
    }
      return `
        <div style="
        display:flex;
        gap:${this.gap}px;
        flex-wrap:wrap;
        align-items:center;
        justify-content:${this.align};
        ">
          ${children_template}
        </div>
        `;
  }
}
