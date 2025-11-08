class Triangle_edit {
    static add() {
      let triangle = new Triangle();
      Create.edit_id = triangle.id;
      Create.artboard.push(triangle);
      Create.render();
      UI.hide_add_graphix();
      UI.show_triangle_edit();
    }
  
    static edit(id) {
      Create.edit_id = id;
      UI.show_triangle_edit();
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
  
    static duplicate() {
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          let new_triangle = Create.artboard[i].clone();
          Create.artboard.push(new_triangle);
          Create.render();
          Utils.show_notif("Dupliquer avec succes!");
        }
      }
    }
  
    static delete() {
      if (confirm("Voulez vous vraiment supprimer le triangle?")) {
        let index = -1;
        for (let i = 0; i <= Create.artboard.length - 1; i++) {
          if (Create.artboard[i].id == Create.edit_id) {
            index = i;
          }
        }
        Create.artboard.splice(index, 1);
        Create.render();
        UI.hide_triangle_edit();
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
  