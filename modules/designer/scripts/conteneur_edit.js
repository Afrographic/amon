class ConteneurEdit {
  static set_center() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "center";
      }
    }
    Create.render();
  }
  static set_left() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "flex-start";
      }
    }
    Create.render();
  }
  static set_right() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "flex-end";
      }
    }
    Create.render();
  }
  static set_space_between() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "space-between";
      }
    }
    Create.render();
  }

  static edit_radius_top_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_left_radius = el.value;
      }
    }
    Create.render();
  }
  static edit_radius_top_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_right_radius = el.value;
      }
    }
    Create.render();
  }
  static edit_radius_bottom_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_left_radius = el.value;
      }
    }
    Create.render();
  }
  static edit_radius_bottom_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_right_radius = el.value;
      }
    }
    Create.render();
  }

  static edit_margin_top_bottom(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].padding_top_bottom = el.value+"vw";
      }
    }
    Create.render();
  }

  static edit_margin_left_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].padding_left_right = el.value+"vw";
      }
    }
    Create.render();
  }

  static add_conteneur_text() {
    let text = prompt("Inserez le texte");
    if (text == null) return;
    if (text.trim().length == 0) return;
    let new_text = new Text();
    new_text.value = text;
    new_text.width = "auto";
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();
  }

  static add_title() {
    let text = prompt("Inserez le texte");
    if (text == null) return;
    if (text.trim().length == 0) return;
    let new_text = new Titre();
    new_text.value = text;
    new_text.width = "auto";
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();
  }

  static add_sub_title() {
    let text = prompt("Inserez le texte");
    if (text == null) return;
    if (text.trim().length == 0) return;
    let new_text = new SousTitre();
    new_text.value = text;
    new_text.width = "auto";
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();
  }

  static add_mini_text() {
    let text = prompt("Inserez le texte");
    if (text == null) return;
    if (text.trim().length == 0) return;
    let new_text = new MiniTexte();
    new_text.value = text;
    new_text.width = "auto";
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();
  }

  static set_width(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].width = el.value;
      }
    }
    Create.render();
  }

  static set_bg_image(e){
    if(e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].background_image = `url(${url})`;
      }
    }
    Create.render();
  }
}
