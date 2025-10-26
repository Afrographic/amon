class TableauEdit {
  static add_colonne() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].add_colonne();
        Create.artboard[i].render_editable_table();
        Create.render();
      }
    }
  }

  static async add_ligne() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].add_ligne();
        Create.artboard[i].render_editable_table();
        Create.render();
      }
    }
  }

  static change_tableau_value(el, tableau_id, k, l) {
    // Render edit value of table
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == tableau_id) {
        Create.artboard[i].data[k][l] = el.value;
        Create.render();
      }
    }
  }

  static show_edit_tableau(id) {
    Create.edit_id = id;
    let tableau_editor = document.querySelector("#tableau_editor");
    tableau_editor.classList.remove("hidden");
    // Render edit value of table
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].render_editable_table();
      }
    }
  }

  static edit_border_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_color = el.value;
        Create.render();
      }
    }
  }

  static edit_text_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].text_color = el.value;
        Create.render();
      }
    }
  }

  static delete() {
    if (confirm("Voulez vous vraiment supprimer?")) {
      let index = -1;
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          index = i;
        }
      }
      if (index != -1) {
        Create.artboard.splice(index, 1);
        Create.render();
        UI.hide_all();
      }
    }
  }
}
