class Polygone_Edit {
  static add() {
    let polygone = new Polygone();
    Create.edit_id = polygone.id;
    Create.artboard.push(polygone);
    Create.render();
    UI.hide_add_graphix();
    UI.show_polygone_edit();
  }

  static edit(id) {
    Create.edit_id = id;
    UI.hide_all();
    UI.show_polygone_edit();
  }

  static color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].fill_color = el.value;
        Create.render();
      }
    }
  }

  static size(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].scale = parseInt(el.value) / 20;
        Create.render();
      }
    }
  }

  static side(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].side = parseInt(el.value);
        Create.render();
      }
    }
  }

  static side_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].stroke_color = el.value;
        Create.render();
      }
    }
  }

  static side_width(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].stroke_width = el.value;
        Create.render();
      }
    }
  }

  static posY(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].posY = el.value;
        Create.render();
      }
    }
  }

  static posX(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].posX = el.value;
        Create.render();
      }
    }
  }

  static arrondis(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].cornerRadius = parseInt(el.value);
        Create.render();
      }
    }
  }

  static duplicate() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        let new_item = Create.artboard[i].clone();
        Create.artboard.push(new_item);
        Create.render();
        Utils.show_notif("Dupliquer avec succes!");
        Create.edit_id = new_item.id;
        UI.show_polygone_edit();
        break;
      }
    }
  }

  static delete() {
    if (confirm("Voulez vous vraiment supprimer le polygone?")) {
      let index = -1;
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          index = i;
        }
      }
      Create.artboard.splice(index, 1);
      Create.render();
      UI.hide_polygone_edit();
    }
  }

  static rotate(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].rotate = el.value;
        Create.render();
      }
    }
  }

  static image() {
    // Importing the image
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.classList.add("hidden");
    input.click();
    input.addEventListener("change", async (e) => {
      let file = e.target.files[0];
      let image = new Image();
      image.src = URL.createObjectURL(file);
      await image.decode();

      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          // Turn image to Black
          Create.artboard[i].fill_color = "#000";
          Create.artboard[i].stroke_width = 0;
          Create.artboard[i].render();
          //Create the clipping mask
          let mask = new Image();
          mask.src = Create.artboard[i].url;
          await mask.decode();
          let clipping_mask = Utils.clipping_mask(image, mask);
          //Append the new image
          let new_image = new Image_D();
          new_image.url = clipping_mask;
          Create.artboard[i] = new_image;
          //Rendering
          UI.hide_all();
          Create.render();
          break;
        }
      }
    });
  }
}
