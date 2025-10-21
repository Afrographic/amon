class Edit {
  static edit_text(text_id) {
    this.close_image_edit();
    Create.edit_id = text_id;
    let text_color_editor = document.querySelector("#text_color_editor");
    text_color_editor.classList.remove("hidden");

    //Prefill text area
    let text_edit_input = document.querySelector("#text_edit_input");
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        text_edit_input.value = Create.artboard[i].value;
      }
    }
  }

  static change_text_color(el) {
    let color = el.value;
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].color = color;
      }
    }
    Create.render();
  }

  static edit_text_value(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].value = el.value;
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

  static edit_image(image_id) {
    this.close_text_edit();
    Create.edit_id = image_id;
    let image_edit = document.querySelector("#image_edit");
    image_edit.classList.remove("hidden");
  }

  static change_image_size(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].width = el.value;
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
    }
  }

  static edit_conteneur(id) {
    Create.edit_id = id;
    let image_edit = document.querySelector("#conteneur_edit");
    image_edit.classList.remove("hidden");
  }

  static set_conteneur_bg(el){
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].background_color = el.value;
      }
    }
    Create.render();
  }
}
