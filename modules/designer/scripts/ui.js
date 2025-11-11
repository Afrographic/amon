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

  static show_graph_editor(){
    let graph_editor = document.querySelector("#graph_editor");
    graph_editor.classList.remove("hidden");
  }

  static hide_graph_editor(){
    let graph_editor = document.querySelector("#graph_editor");
    graph_editor.classList.add("hidden");
  }

  static hide_edit_tableau() {
    let tableau_editor = document.querySelector("#tableau_editor");
    tableau_editor.classList.add("hidden");
  }

  static show_menu_services(){
    let services_supplementaire = document.querySelector("#services_supplementaire");
    services_supplementaire.classList.remove("hidden");
  }
  static hide_menu_services(){
    let services_supplementaire = document.querySelector("#services_supplementaire");
    services_supplementaire.classList.add("hidden");
  }

  static show_font_view(){
    let change_font = document.querySelector("#change_font");
    change_font.classList.remove("hidden");
  }

  static hide_font_view(){
    let change_font = document.querySelector("#change_font");
    change_font.classList.add("hidden");
  }

  static show_circle_edit(){
    let circle_editor = document.querySelector("#circle_editor");
    circle_editor.classList.remove("hidden");
  }

  static hide_circle_edit(){
    let circle_editor = document.querySelector("#circle_editor");
    circle_editor.classList.add("hidden");
  }

  static show_triangle_edit(){
    let triangle_editor = document.querySelector("#triangle_editor");
    triangle_editor.classList.remove("hidden");
  }

  static hide_triangle_edit(){
    let triangle_editor = document.querySelector("#triangle_editor");
    triangle_editor.classList.add("hidden");
  }
   

  static show_add_icon(){
    let add_icon = document.querySelector("#add_icon");
    add_icon.classList.remove("hidden");
  }

  static hide_add_icon(){
    let add_icon = document.querySelector("#add_icon");
    add_icon.classList.add("hidden");
  }

  static show_espace_dynamique_editor(){
    let espace_dynamique_editor = document.querySelector("#espace_dynamique_editor");
    espace_dynamique_editor.classList.remove("hidden");
  }
  
  static hide_espace_dynamique_editor(){
    let espace_dynamique_editor = document.querySelector("#espace_dynamique_editor");
    espace_dynamique_editor.classList.add("hidden");
  }



  static hide_all() {
    this.hide_projects();
    this.hide_add_graphix();
    this.hide_artboard_options();
    this.hide_edit_tableau();
    this.hide_graph_editor();
    this.hide_latex_edit();
    this.hide_font_view();
    this.hide_circle_edit();
    this.hide_add_icon();
    this.hide_triangle_edit();
    this.hide_espace_dynamique_editor();

    Edit.close_text_edit();
    Edit.close_conteneur_edit();
    Edit.close_image_edit();
  }
}
