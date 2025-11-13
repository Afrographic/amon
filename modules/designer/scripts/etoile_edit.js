class Etoile_Edit{
    static add() {
        let etoile = new Etoile();
        Create.edit_id = etoile.id;
        Create.artboard.push(etoile);
        Create.render();
        UI.hide_add_graphix();
        UI.show_etoile_edit();
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
    
      static points(el) {
        for (let i = 0; i <= Create.artboard.length - 1; i++) {
          if (Create.artboard[i].id == Create.edit_id) {
            Create.artboard[i].points = parseInt(el.value);
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
        if (confirm("Voulez vous vraiment supprimer l'etoile?")) {
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
}