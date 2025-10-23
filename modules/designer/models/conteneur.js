class Conteneur {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.children = [];
    this.gap = 4;
    this.align = "flex-start";
    this.background_color = "#c6c6c6";
    this.background_image = "";
    this.padding_top_bottom = "4vw";
    this.padding_left_right = "4vw";
    this.border_top_left_radius = 0;
    this.border_top_right_radius = 0;
    this.border_bottom_left_radius = 0;
    this.border_bottom_right_radius = 0;
    this.direction = "row";
    this.width = 100;
    this.vertAlign = "center";
    this.bg_file = undefined;
    this.opacity = 1;
    this.type = "conteneur";
    // Marges
    this.margin_top = 0;
    this.margin_bottom = 0;
    this.margin_left = 0;
    this.margin_right = 0;
  }

  render() {
    let children_template = "";
    for (let item of this.children) {
      children_template += item.render();
    }
    return `
        <div onclick="Edit.edit_conteneur('${this.id}')" class="conteneur" style="
        display:flex;
        opacity:${this.opacity};
        gap:${this.gap}vw;
        background-color:${this.background_color};
        background-image:${this.background_image};
        width:${this.width}%;
        padding:${this.padding_top_bottom} ${this.padding_left_right};
        align-items:${this.vertAlign};
        flex-direction:${this.direction};
        justify-content:${this.align};
        border-top-left-radius:${this.border_top_left_radius}px;
        border-top-right-radius:${this.border_top_right_radius}px;
        border-bottom-left-radius:${this.border_bottom_left_radius}px;
        border-bottom-right-radius:${this.border_bottom_right_radius}px;
        margin-top:${this.margin_top}vw;
        margin-bottom:${this.margin_bottom}vw;
        margin-left:${this.margin_left}vw;
        margin-right:${this.margin_right}vw;
        ">
          ${children_template}
        </div>
        `;
  }

  from_json(json) {
    this.id = json.id;
    this.children = this.children_from_json(json.children);
    this.gap = json.gap;
    this.align = json.align;
    this.background_color = json.background_color;
    this.background_image =
      json.bg_file != undefined ? URL.createObjectURL(json.bg_file) : "";
    this.padding_top_bottom = json.padding_top_bottom;
    this.padding_left_right = json.padding_left_right;
    this.border_top_left_radius = json.border_top_left_radius;
    this.border_top_right_radius = json.border_top_right_radius;
    this.border_bottom_left_radius = json.border_bottom_left_radius;
    this.border_bottom_right_radius = json.border_bottom_right_radius;
    this.direction = json.direction;
    this.width = json.width;
    this.vertAlign = json.vertAlign;
    this.bg_file = json.bg_file;
    this.opacity = json.opacity;
    this.type = json.type;
    // Marges
    this.margin_top = json.margin_top;
    this.margin_bottom = json.margin_bottom;
    this.margin_left = json.margin_left;
    this.margin_right = json.margin_right;
  }

  children_from_json(children_json) {
    let children = [];
    for (let item of children_json) {
      let item_to_add;
      if (item.type == "titre") {
        item_to_add = new Titre();
        item_to_add.from_json(item);
      }
      if (item.type == "texte") {
        item_to_add = new Text();
        item_to_add.from_json(item);
      }
      if (item.type == "sous_titre") {
        item_to_add = new SousTitre();
        item_to_add.from_json(item);
      }
      if (item.type == "mini_texte") {
        item_to_add = new MiniTexte();
        item_to_add.from_json(item);
      }
      if (item.type == "image") {
        item_to_add = new Image_D();
        item_to_add.from_json(item);
      }
      children.push(item_to_add);
    }
    return children;
  }
}
