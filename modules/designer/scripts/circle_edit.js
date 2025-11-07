class Circle_edit {
  static add() {
    let circle = new Circle();
    Create.edit_id = circle.id;
    Create.artboard.push(circle);
    Create.render();
    UI.hide_add_graphix();
    UI.show_circle_edit();
  }

  static edit(id) {
    Create.edit_id = id;
    UI.show_circle_edit();
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

  static border_size(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].strokeWidth = el.value;
        Create.render();
      }
    }
  }

  static set_border_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].stroke_color = el.value;
        Create.render();
      }
    }
  }

  static duplicate() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        let new_circle = Create.artboard[i].clone();
        Create.artboard.push(new_circle);
        Create.render();
        Utils.show_notif("Dupliquer avec succes!");
      }
    }
  }

  static delete() {
    if (confirm("Voulez vous vraiment supprimer le cercle?")) {
      let index = -1;
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          index = i;
        }
      }
      Create.artboard.splice(index, 1);
      Create.render();
      UI.hide_circle_edit();
    }
  }

  static toggle_half() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        if (Create.artboard[i].demi == 0) {
          Create.artboard[i].demi = 1;
        } else {
          Create.artboard[i].demi = 0;
        }
        Create.render();
      }
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
}
