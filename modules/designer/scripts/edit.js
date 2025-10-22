class Edit {
  static edit_text(event, text_id) {
    event.stopPropagation();
    console.log(text_id);
    this.close_image_edit();
    this.close_conteneur_edit();
    Create.edit_id = text_id;
    let text_color_editor = document.querySelector("#text_color_editor");
    text_color_editor.classList.remove("hidden");

    //Prefill text area
    let text_edit_input = document.querySelector("#text_edit_input");
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        text_edit_input.value = Create.artboard[i].value;
      }
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            text_edit_input.value = Create.artboard[i].children[j].value;
          }
        }
      }
    }
  }

  static change_text_color(el) {
    let color = el.value;
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].color = color;
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].color = color;
          }
        }
      }
    }
    Create.render();
  }

  static edit_text_value(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].value = el.value;
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].value = el.value;
            
          }
        }
      }
    }
    Create.render();
  }

  static close_text_edit() {
    let text_color_editor = document.querySelector("#text_color_editor");
    text_color_editor.classList.add("hidden");
  }

  static delete_text() {
    if (confirm("Voulez vous vraiment supprimer ce texte de votre design?")) {
      Edit.close_text_edit();
      let index = -1;
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          index = i;
        }
      }
      Create.artboard.splice(index, 1);
      Create.render();
    }
  }

  static delete_image() {
    if (
      confirm("Voulez vous vraiment supprimer cette image de votre design?")
    ) {
      Edit.close_image_edit();
      let index = -1;
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          index = i;
        }
      }
      Create.artboard.splice(index, 1);
      Create.render();
    }
  }

  static edit_image(event,image_id) {
    event.stopPropagation();
    this.close_text_edit();
    this.close_conteneur_edit();
    Create.edit_id = image_id;
    let image_edit = document.querySelector("#image_edit");
    image_edit.classList.remove("hidden");
  }

  static change_image_size(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].width = el.value;
      }

      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].width = el.value;
          }
        }
      }
    }
    Create.render();
  }

  static close_image_edit() {
    let image_edit = document.querySelector("#image_edit");
    image_edit.classList.add("hidden");
  }
  //Edit image border radius
  static edit_radius_top_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_left_radius = el.value;
      }

      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].border_top_left_radius = el.value;
          }
        }
      }
    }
    Create.render();
  }
  static edit_radius_top_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_right_radius = el.value;
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].border_top_right_radius = el.value;
          }
        }
      }
    }
    Create.render();
  }
  static edit_radius_bottom_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_left_radius = el.value;
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].border_bottom_left_radius = el.value;
          }
        }
      }
    }
    Create.render();
  }

  static edit_radius_bottom_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_right_radius = el.value;
      }
       // Edit  in conteneur children
       if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].border_bottom_right_radius = el.value;
          }
        }
      }
    }
    Create.render();
  }

  // Edit Conteneur
  static close_conteneur_edit() {
    let image_edit = document.querySelector("#conteneur_edit");
    image_edit.classList.add("hidden");
  }

  static delete_conteneur() {
    if (confirm("Voulez vous vraiment supprimer le conteneur?")) {
      let index = -1;
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          index = i;
        }
      }
      Create.artboard.splice(index, 1);
      Create.render();
      this.close_conteneur_edit();
    }
  }

  static edit_conteneur(id) {
    this.close_image_edit();
    this.close_text_edit();
    Create.edit_id = id;
    let image_edit = document.querySelector("#conteneur_edit");
    image_edit.classList.remove("hidden");
  }

  static set_conteneur_bg(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].background_color = el.value;
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

  static add_conteneur_image(e) {
    if(e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    let image = new Image_D();
    image.url = url;
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(image);
      }
    }
    Create.render();
  }
}
