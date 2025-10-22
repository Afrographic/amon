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
}
