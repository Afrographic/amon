class LatextEdit {
  static add_new() {
    let latex = new Latex();
    Create.artboard.push(latex);
    Create.render();
    Create.edit_id = latex.id;
    UI.hide_add_graphix();
    UI.show_latex_edit();
  }

  static edit_value(el) {
    console.log(Create.edit_id);
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].text = el.value;
        Create.render();
      }
    }
  }

  static init_latex_edit(id) {
    Create.edit_id = id;
    UI.show_latex_edit();
    let latex_input_for_edit = document.querySelector("#latex_input_for_edit");
    // Init input with the latex value
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        latex_input_for_edit.value = Create.artboard[i].text ;
      }
    }
  }
}
