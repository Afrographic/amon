class EspaceDynamiqueEdit {
  static add(to) {
    let new_ed = new EspaceDynamique();
    if (to == "conteneur") {
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          Create.artboard[i].children.push(new_ed);
        }
      }
    }

    if (to == "artboard") {
      Create.artboard.push(new_ed);
    }
    Create.render();
    UI.hide_all();
    Create.edit_id = new_ed.id;
    UI.show_espace_dynamique_editor();
  }

  static showEditor(event,id){
    UI.hide_all();
    event.stopPropagation();
    Create.edit_id = id;
    UI.show_espace_dynamique_editor();
  }
}
