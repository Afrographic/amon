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

  static add_ligne() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].add_ligne();
        Create.artboard[i].render_editable_table();
        Create.render();
      }
    }
  }

  static change_tableau_value(el, k, l) {
    // Render edit value of table
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
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
}
