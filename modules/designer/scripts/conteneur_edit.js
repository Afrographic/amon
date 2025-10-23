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
        Create.artboard[i].padding_top_bottom = el.value + "vw";
      }
    }
    Create.render();
  }

  static edit_margin_left_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].padding_left_right = el.value + "vw";
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

  static set_bg_image(e) {
    if (e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].background_image = `url(${url})`;
        Create.artboard[i].bg_file = e.target.files[0];
      }
    }
    Create.render();
  }

  static set_vertical() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].direction = `column`;
      }
    }
    Create.render();
  }
  static set_horizontal() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].direction = `row`;
      }
    }
    Create.render();
  }

  static set_gap(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].gap = el.value;
      }
    }
    Create.render();
  }

  static set_ver_left() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].vertAlign = "flex-start";
      }
    }
    Create.render();
  }
  static set_ver_center() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].vertAlign = "center";
      }
    }
    Create.render();
  }
  static set_ver_right() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].vertAlign = "flex-end";
      }
    }
    Create.render();
  }

  static darken_bg() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        if (Create.artboard[i].bg_file == undefined) return;
        // Crop image
        let img = new Image();
        img.src = URL.createObjectURL(Create.artboard[i].bg_file);
        img.onload = () => {
          let darken_image_url = Utils.darken_image(img);
          Create.artboard[i].background_image = `url(${darken_image_url})`;
          Create.render();
        };
      }
    }
  }
 
  // Margins
  static set_margin_top(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_top = el.value;
      }
    }
    Create.render();
  }
  static set_margin_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_left = el.value;
      }
    }
    Create.render();
  }
  static set_margin_bottom(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_bottom = el.value;
      }
    }
    Create.render();
  }
  static set_margin_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_right = el.value;
      }
    }
    Create.render();
  }
  // Opacite
  static set_opacity(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].opacity = parseInt(el.value)/100;
      }
    }
    Create.render();
  }
}
