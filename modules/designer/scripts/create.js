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
  static deg_type = "linear";
  static deg_first_color = "rgba(0,0,0,0)";
  static deg_second_color = "rgba(0,0,0,0)";

  static artboard = [];
  static history = [];
  // End project settings

  static add_titre() {
    let new_titre = new Titre();
    this.artboard.push(new_titre);
    this.render();
    UI.hide_add_graphix();

    Edit.edit_text({}, new_titre.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static add_sous_titre() {
    let new_sous_titre = new SousTitre();
    this.artboard.push(new_sous_titre);
    this.render();
    UI.hide_add_graphix();

    Edit.edit_text({}, new_sous_titre.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static add_text() {
    let new_texte = new Text();
    this.artboard.push(new_texte);
    this.render();
    UI.hide_add_graphix();

    Edit.edit_text({}, new_texte.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static add_mini_text() {
    let new_mini_texte = new MiniTexte();
    this.artboard.push(new_mini_texte);
    this.render();
    UI.hide_add_graphix();

    Edit.edit_text({}, new_mini_texte.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static add_table() {
    let table = new Tableau();
    this.artboard.push(table);
    this.render();
    TableauEdit.show_edit_tableau(table.id);
    UI.hide_add_graphix();
  }

  static add_image() {
    let image_input = document.querySelector("#image_input");
    image_input.click();
  }

  static async get_image(e) {
    if (e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    let image = new Image_D();
    image.url = await Utils.image_to_base_64(e.target.files[0]);
    image.file = e.target.files[0];
    this.artboard.push(image);
    this.render();
    UI.hide_add_graphix();
    Create.edit_id = image.id;
    UI.show_image_edit();
  }

  static async add_icon(number) {
    let image = new Image();
    image.src = `assets/icons/Asset ${number}.png`;
    await image.decode();
    let url = Utils.change_color(image, "#000");
    let image_to_add = new Image_D();
    image_to_add.width = 8;
    image_to_add.url = url;

    if (Icones.in_conteneur == false) {
      this.artboard.push(image_to_add);
    } else {
      // Add in conteneur
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          Create.artboard[i].children.push(image_to_add);
        }
      }
      Icones.in_conteneur = false;
    }

    this.render();
    UI.hide_add_icon();
  }

  static add_conteneur() {
    UI.hide_add_graphix();
    let conteneur = new Conteneur();
    this.artboard.push(conteneur);
    this.render();
    Edit.edit_conteneur(conteneur.id);
  }

  static revert() {
    if (this.history.length == 0) return;
    this.artboard = this.history[this.history.length-1];
    this.history.pop();
    Create.render(true);
  }

  static async render(history = false) {
    let renderer = document.querySelector("#renderer");
    renderer.style.alignItems = this.H_align;
    renderer.style.justifyContent = this.V_align;
    renderer.style.backgroundColor = this.bg_color;
    renderer.style.gap = this.gap + "vw";
    renderer.style.aspectRatio = this.aspect_ratio;
    renderer.style.padding = `${this.V_padding}vw ${this.H_padding}vw`;

    if (this.bg_color == undefined) {
      this.bg_color = "#fff";
    }
    if (this.bg_color.trim().length == 0) {
      if (this.deg_type == "linear") {
        renderer.style.background = `linear-gradient(
          ${this.deg_rotate}deg,
            ${this.deg_first_color},
            ${this.deg_second_color}
          ), url(${this.bg_image_url})`;
      } else {
        renderer.style.background = `radial-gradient(
            ${this.deg_first_color},
            ${this.deg_second_color}
          ), url(${this.bg_image_url})`;
      }
    }

    //Render Free Draw canvas
    let width = renderer.clientWidth;
    let height = renderer.clientHeight;
    renderer.innerHTML = `
    <canvas id="freeDraw" width="${width}" height="${height}" style="position:absolute;top:0;left:0;"></canvas>
    `;

    for (let el of this.artboard) {
      renderer.innerHTML += el.render();
    }

    if (!history) {
      // Save history
      let new_history = [];
      for (let item of this.artboard) {
        new_history.push(item.clone());
      }
      this.history.push(new_history);
    }
    //Launch Free Draw
    if(window.innerWidth >= 800){
      FreeDraw.launch();
    }
   
    // --Keep previous state
    if (FreeDraw.currentDraw.trim().length == 0) return;
    let canvas = document.querySelector("#freeDraw");
    let ctx = canvas.getContext("2d");
    let image_object = new Image();
    image_object.src = FreeDraw.currentDraw;
    await image_object.decode();
    ctx.drawImage(image_object, 0, 0, canvas.width, canvas.height);
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

  static async set_bg_image(e) {
    if (e.target.files.length == 0) return;
    this.bg_file = e.target.files[0];
    this.bg_image_url = await Utils.image_to_base_64(this.bg_file);
    this.deg_first_color = "rgba(0,0,0,0)";
    this.deg_second_color = "rgba(0,0,0,0)";
    this.bg_color = "";
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
    this.bg_color = "";
    this.render();
  }
  static set_degrade_second_color(el) {
    this.deg_second_color = el.value;
    this.bg_color = "";
    this.render();
  }
  static set_degrade_rotate(el) {
    this.deg_rotate = el.value;
    this.bg_color = "";
    this.render();
  }

  static set_degrade_radial() {
    this.deg_type = "radial";
    this.render();
  }

  static invert_degrade() {
    let temp = this.deg_first_color;
    this.deg_first_color = this.deg_second_color;
    this.deg_second_color = temp;
    this.render();
  }

  static set_degrade_lineaire() {
    this.deg_type = "linear";
    this.render();
  }
}

Create.render();
