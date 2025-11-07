class Conteneur {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.display = "flex";
    this.colonnes_pour_grille = 2;
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
    // Positionning
    this.position = "relative";
    this.posY = "0";
    this.posX = "0";
    // Bordure bottom
    this.border_bottom_size = 0;
    this.border_bottom_color = "#000";
    this.border_bottom_type = "solid";
    // Bordure Top
    this.border_top_size = 0;
    this.border_top_color = "#000";
    this.border_top_type = "solid";
    // Bordure left
    this.border_left_size = 0;
    this.border_left_color = "#000";
    this.border_left_type = "solid";
    // Bordure right
    this.border_right_size = 0;
    this.border_right_color = "#000";
    this.border_right_type = "solid";
    // Degrade
    this.deg_rotate = "0";
    this.deg_first_color = "rgba(0,0,0,0)";
    this.deg_second_color = "rgba(0,0,0,0)";
    this.rotate = "0";
  }

  render() {
    let children_template = "";
    for (let item of this.children) {
      children_template += item.render();
    }
    return `
        <div onclick="Edit.edit_conteneur('${this.id}')" class="conteneur" style="
        display:${this.display};
        grid-template-columns:repeat(${this.colonnes_pour_grille},1fr);
        position:${this.position};
        top:${this.posY}%;
        transform:rotate(${this.rotate}deg);
        left:${this.posX}%;
        opacity:${this.opacity};
        gap:${this.gap}vw;
        background-color:${this.background_color};
        background:linear-gradient(
          ${this.deg_rotate}deg,
            ${this.deg_first_color},
            ${this.deg_second_color}
          ), ${this.background_image};

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
        border-top:${this.border_top_size}px ${this.border_top_type} ${this.border_top_color};
        border-bottom:${this.border_bottom_size}px ${this.border_bottom_type} ${this.border_bottom_color};
        border-left:${this.border_left_size}px ${this.border_left_type} ${this.border_left_color};
        border-right:${this.border_right_size}px ${this.border_right_type} ${this.border_right_color};
        ">
          ${children_template}
        </div>
        `;
  }

  from_json(json) {
    this.id = json.id;
    this.children = this.children_from_json(json.children);
    this.gap = json.gap;

    this.deg_rotate = json.deg_rotate;
    this.rotate = json.rotate;
    this.deg_first_color = json.deg_first_color;
    this.deg_second_color = json.deg_second_color;

    this.border_top_size = json.border_top_size;
    this.border_top_type = json.border_top_type;
    this.border_top_color = json.border_top_color;

    this.border_bottom_size = json.border_bottom_size;
    this.border_bottom_type = json.border_bottom_type;
    this.border_bottom_color = json.border_bottom_color;

    this.border_left_size = json.border_left_size;
    this.border_left_type = json.border_left_type;
    this.border_left_color = json.border_left_color;

    this.border_right_size = json.border_right_size;
    this.border_right_type = json.border_right_type;
    this.border_right_color = json.border_right_color;

    this.align = json.align;
    this.background_color = json.background_color;
    this.background_image =
      json.bg_file != undefined
        ? `url(${URL.createObjectURL(json.bg_file)})`
        : json.background_image;
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
    // Positionning
    this.position = json.position;
    this.posY = json.posY;
    this.posX = json.posX;
    this.display = json.display;
    this.colonnes_pour_grille = json.colonnes_pour_grille;
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

  clone() {
    let new_conteneur = new Conteneur();
    new_conteneur.id = Utils.generate_unique_id_from_time();
    new_conteneur.children = this.clone_children(this.children);
    new_conteneur.gap = this.gap;
    new_conteneur.align = this.align;
    new_conteneur.background_color = this.background_color;
    new_conteneur.background_image = this.background_image;
    new_conteneur.padding_top_bottom = this.padding_top_bottom;
    new_conteneur.padding_left_right = this.padding_left_right;
    new_conteneur.border_top_left_radius = this.border_top_left_radius;
    new_conteneur.border_top_right_radius = this.border_top_right_radius;
    new_conteneur.border_bottom_left_radius = this.border_bottom_left_radius;
    new_conteneur.border_bottom_right_radius = this.border_bottom_right_radius;
    new_conteneur.direction = this.direction;
    new_conteneur.width = this.width;
    new_conteneur.vertAlign = this.vertAlign;
    new_conteneur.bg_file = this.bg_file;
    new_conteneur.opacity = this.opacity;
    new_conteneur.rotate = this.rotate;
    new_conteneur.type = this.type;
    // Marges
    new_conteneur.margin_top = this.margin_top;
    new_conteneur.margin_bottom = this.margin_bottom;
    new_conteneur.margin_left = this.margin_left;
    new_conteneur.margin_right = this.margin_right;
    new_conteneur.display = this.display;
    new_conteneur.colonnes_pour_grille = this.colonnes_pour_grille;
    //Borders
    new_conteneur.border_top_size = this.border_top_size;
    new_conteneur.border_top_type = this.border_top_type;
    new_conteneur.border_top_color = this.border_top_color;

    new_conteneur.border_bottom_size = this.border_bottom_size;
    new_conteneur.border_bottom_type = this.border_bottom_type;
    new_conteneur.border_bottom_color = this.border_bottom_color;

    new_conteneur.border_right_size = this.border_right_size;
    new_conteneur.border_right_size = this.border_right_size;
    new_conteneur.border_right_size = this.border_right_size;

    new_conteneur.border_left_size = this.border_left_size;
    new_conteneur.border_left_size = this.border_left_size;
    new_conteneur.border_left_size = this.border_left_size;

    //Degrade
    new_conteneur.deg_rotate = this.deg_rotate;
    new_conteneur.deg_first_color = this.deg_first_color;
    new_conteneur.deg_second_color = this.deg_second_color;

    //Positionning
    new_conteneur.position = this.position;
    new_conteneur.posY = this.posY;
    new_conteneur.posX = this.posX;

    return new_conteneur;
  }

  clone_children(children) {
    let cloned = [];
    for (let i = 0; i <= children.length - 1; i++) {
      cloned.push(children[i].clone());
    }
    return cloned;
  }

  async children_to_json(children) {
    let jsons = [];
    for (let i = 0; i <= children.length - 1; i++) {
      let json = await children[i].to_json();
      jsons.push(json);
    }
    return jsons;
  }

  async to_json() {
    let bg_image = "";
    //`url(${url})`;
    if (this.bg_file != undefined) {
      bg_image = await Utils.image_to_base_64(this.bg_file);
      bg_image = `url(${bg_image})`;
    }
    return {
      id: this.id,
      display: this.display,
      colonnes_pour_grille: this.colonnes_pour_grille,
      children: await this.children_to_json(this.children),
      gap: this.gap,
      align: this.align,
      background_color: this.background_color,
      background_image: bg_image,
      padding_top_bottom: this.padding_top_bottom,
      padding_left_right: this.padding_left_right,
      border_top_left_radius: this.border_top_left_radius,
      border_top_right_radius: this.border_top_right_radius,
      border_bottom_left_radius: this.border_bottom_left_radius,
      border_bottom_right_radius: this.border_bottom_right_radius,
      direction: this.direction,
      width: this.width,
      vertAlign: this.vertAlign,
      bg_file: undefined,
      opacity: this.opacity,
      type: this.type,
      // Marges
      margin_top: this.margin_top,
      margin_bottom: this.margin_bottom,
      margin_left: this.margin_left,
      margin_right: this.margin_right,
      // Positionning
      position: this.position,
      posY: this.posY,
      posX: this.posX,
      // Bordure bottom
      border_bottom_size: this.border_bottom_size,
      border_bottom_color: this.border_bottom_color,
      border_bottom_type: this.border_bottom_type,
      // Bordure Top
      border_top_size: this.border_top_size,
      border_top_color: this.border_top_color,
      border_top_type: this.border_top_type,
      // Bordure left
      border_left_size: this.border_left_size,
      border_left_color: this.border_left_color,
      border_left_type: this.border_left_type,
      // Bordure right
      border_right_size: this.border_right_size,
      border_right_color: this.border_right_color,
      border_right_type: this.border_right_type,
      // Degrade
      deg_rotate: this.deg_rotate,
      deg_first_color: this.deg_first_color,
      deg_second_color: this.deg_second_color,
      rotate: this.rotate,
    };
  }
}
