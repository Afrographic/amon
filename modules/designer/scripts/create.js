class Create {
  static renderer = document.querySelector("#renderer");
  // Project settings
  static name_project = "New";
  static db_index = -1;
  static H_align = "flex-start";
  static V_align = "flex-start";
  static bg_file = undefined;
  static bg_image_url = "";
  static bg_color = "#fff";
  static edit_id = "";
  static gap = 3;
  static V_padding = 5;
  static H_padding = 5;
  static aspect_ratio = "1/1";

  static deg_rotate = "0";
  static deg_first_color = "rgba(0,0,0,0)";
  static deg_second_color = "rgba(0,0,0,0)";

  static artboard = [];
  // End project settings

  static add_titre() {
    let titre = prompt("Inserez le titre");
    if (titre == null) return;
    let new_titre = new Titre();
    new_titre.value = titre;
    this.artboard.push(new_titre);
    this.render();
    UI.hide_add_graphix();
  }

  static add_sous_titre() {
    let sous_titre = prompt("Inserez le sous titre titre");
    if (sous_titre == null) return;
    let new_sous_titre = new SousTitre();
    new_sous_titre.value = sous_titre;
    this.artboard.push(new_sous_titre);
    this.render();
    UI.hide_add_graphix();
  }

  static add_text() {
    let texte = prompt("Inserez le texte");
    if (texte == null) return;
    let new_texte = new Text();
    new_texte.value = texte;
    this.artboard.push(new_texte);
    this.render();
    UI.hide_add_graphix();
  }

  static add_mini_text() {
    let mini_texte = prompt("Inserez le mini texte");
    if (mini_texte == null) return;
    let new_mini_texte = new MiniTexte();
    new_mini_texte.value = mini_texte;
    this.artboard.push(new_mini_texte);
    this.render();
    UI.hide_add_graphix();
  }

  static add_table(){
    let table = new Tableau();
    this.artboard.push(table);
    this.render();
    UI.hide_add_graphix();
  }

  static add_image() {
    let image_input = document.querySelector("#image_input");
    image_input.click();
  }

  static get_image(e) {
    if (e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    let image = new Image_D();
    image.url = url;
    image.file = e.target.files[0];
    this.artboard.push(image);
    this.render();
    UI.hide_add_graphix();
  }

  static add_conteneur() {
    UI.hide_add_graphix();
    let conteneur = new Conteneur();
    this.artboard.push(conteneur);
    this.render();
  }

  static render() {
    let renderer = document.querySelector("#renderer");
    renderer.style.alignItems = this.H_align;
    renderer.style.justifyContent = this.V_align;
    renderer.style.backgroundColor = this.bg_color;
    renderer.style.gap = this.gap + "vw";
    renderer.style.aspectRatio = this.aspect_ratio;
    renderer.style.padding = `${this.V_padding}vw ${this.H_padding}vw`;

    if(this.bg_color == undefined){
      this.bg_color = "#fff";
    }
    if (this.bg_color.trim().length == 0) {
      renderer.style.background = `linear-gradient(
        ${this.deg_rotate}deg,
          ${this.deg_first_color},
          ${this.deg_second_color}
        ), url(${this.bg_image_url})`;
    }

    renderer.innerHTML = "";
    for (let el of this.artboard) {
      renderer.innerHTML += el.render();
    }
  }

  static set_gap(el) {
    this.gap = el.value;
    this.render();
  }

  static setVPadding(el) {
    this.V_padding = el.value;
    this.render();
  }

  static setHPadding(el) {
    this.H_padding = el.value;
    this.render();
  }

  static set_bg(el) {
    let renderer = document.querySelector("#renderer");
    this.bg_color = el.value;
    renderer.style.backgroundImage = "";
    this.render();
  }

  static set_bg_image(e) {
    if (e.target.files.length == 0) return;
    this.bg_file = e.target.files[0];
    this.bg_image_url = URL.createObjectURL(e.target.files[0]);
    this.deg_first_color="rgba(0,0,0,0)";
    this.deg_second_color="rgba(0,0,0,0)";
    this.bg_color ="";
    this.render();
  }
 
  // Alignement horizontale
  static setHoriAlignLeft() {
    this.H_align = "flex-start";
    //Align text elements
    for (let item of this.artboard) {
      item.text_align = "left";
    }
    this.render();
  }
  static setHoriAlignRight() {
    this.H_align = "flex-end";
    //Align text elements
    for (let item of this.artboard) {
      item.text_align = "right";
    }
    this.render();
  }
  static setHoriAlignCenter() {
    this.H_align = "center";
    //Align text elements
    for (let item of this.artboard) {
      item.text_align = "center";
    }
    this.render();
  }
  // Alignement verticale
  static setVertAlignTop() {
    this.V_align = "flex-start";
    this.render();
  }
  static setVertAlignBottom() {
    this.V_align = "flex-end";
    this.render();
  }
  static setVertAlignCenter() {
    this.V_align = "center";
    this.render();
  }
  static setSpaceBetween() {
    this.V_align = "space-between";
    this.render();
  }

  static export() {
    let renderer = document.querySelector("#renderer");
    Utils.exportImage(renderer, `Flyer_${this.name_project}`);
  }

  static reset() {
    if (confirm("Voulez vous vraiment tous effacer?")) {
      this.artboard = [];
      this.render();
      let renderer = document.querySelector("#renderer");
      renderer.style.backgroundImage = "";
      renderer.style.backgroundColor = "#fff";
    }
  }

  static darken_bg() {
    if (this.bg_file == undefined) return;
    // Crop image
    let img = new Image();
    img.src = URL.createObjectURL(this.bg_file);
    img.onload = () => {
      let darken_image_url = Utils.darken_image(img);
      this.bg_image_url = darken_image_url;
      Create.render();
    };
  }

  static set_automatic_height() {
    this.aspect_ratio = "";
    this.render();
  }
  static set_taille_carre() {
    this.aspect_ratio = "1/1";
    this.render();
  }
  static set_taille_A4() {
    this.aspect_ratio = "210/297";
    this.render();
  }
  static set_taille_cinematique() {
    this.aspect_ratio = "16/9";
    this.render();
  }

  // Configuration du degrade
  static set_degrade_first_color(el) {
    this.deg_first_color = el.value;
    this.bg_color="";
    this.render();
  }
  static set_degrade_second_color(el) {
    this.deg_second_color = el.value;
    this.bg_color="";
    this.render();
  }
  static set_degrade_rotate(el) {
    this.deg_rotate = el.value;
    this.bg_color="";
    this.render();
  }
}

Create.render();
