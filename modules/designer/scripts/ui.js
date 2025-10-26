class UI {
  static show_artboard_options() {
    let artboard_options = document.querySelector("#artboard_options");
    artboard_options.classList.remove("hidden");
  }
  static hide_artboard_options() {
    let artboard_options = document.querySelector("#artboard_options");
    artboard_options.classList.add("hidden");
  }
  static show_add_graphix() {
    let add_graphix = document.querySelector("#add_graphix");
    add_graphix.classList.remove("hidden");
  }
  static hide_add_graphix() {
    let add_graphix = document.querySelector("#add_graphix");
    add_graphix.classList.add("hidden");
  }
  static show_projects() {
    let projects = document.querySelector("#projects");
    projects.classList.remove("hidden");
  }
  static hide_projects() {
    let projects = document.querySelector("#projects");
    projects.classList.add("hidden");
  }
  static show_latex_edit() {
    let latex_editor = document.querySelector("#latex_editor");
    latex_editor.classList.remove("hidden");
  }
  static hide_latex_edit() {
    let latex_editor = document.querySelector("#latex_editor");
    latex_editor.classList.add("hidden");
  }

  static hide_edit_tableau() {
    let tableau_editor = document.querySelector("#tableau_editor");
    tableau_editor.classList.add("hidden");
  }

  static hide_all() {
    this.hide_projects();
    this.hide_add_graphix();
    this.hide_artboard_options();

    Edit.close_text_edit();
    Edit.close_conteneur_edit();
    Edit.close_image_edit();
  }
}
