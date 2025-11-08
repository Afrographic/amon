class Latex {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.text = "";
    this.type = "latex";
  }

  render() {
    let render_view = document.createElement("div");
    katex.render(this.text, render_view, {
      throwOnError: false,
      displayMode: true,
    });
    return `
    <div class="b1 br8 p16 bg_grey" style="width:70%; z-index:2;" onclick="LatextEdit.init_latex_edit('${this.id}')">
     ${render_view.innerHTML}
    </div>
    `;
  }

  from_json(json) {
    this.id = json.id;
    this.text = json.text;
    this.type = json.type;
  }
  
  to_json(){
    return {
      id:this.id,
      text:this.text,
      type:this.type
    }
  }

  clone() {
    let clone = new Latex();
    clone.id = `id_${Math.random() * 20000}`;
    clone.text = this.text;
    clone.type = this.type;
    return clone;
  }
}
