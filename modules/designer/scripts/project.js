class Project {
  static saved = false;
  static async save_project() {
    let project = {
      name_project: Create.name_project,
      db_index: Create.db_index,
      H_align: Create.H_align,
      V_align: Create.V_align,
      bg_file: Create.bg_file,
      edit_id: Create.edit_id,
      bg_color: Create.bg_color,
      gap: Create.gap,
      V_padding: Create.V_padding,
      H_padding: Create.H_padding,
      aspect_ratio: Create.aspect_ratio,
      artboard: Create.artboard,
    };
    if (this.saved) {
      //Just update project in DB
      DB.update_project(project);
    } else {
      //Create a new instance of saving
      let name_project = prompt("Enregistrer le projet, Inserez le nom");
      if (name_project == null) return;
      if (name_project.trim().length == 0) return;
      project.name_project = name_project;
      await DB.save_project(project);
      Project.saved = true;
    }
  }

  static render_projects() {
    let project_renderer = document.querySelector("#project_renderer");
    project_renderer.innerHTML = "";
    for (let item of DB.projects) {
      project_renderer.innerHTML += `
      <div class="project_item" onclick="Project.load_project(${DB.projects.indexOf(
        item
      )})">
        <img src="assets/images/djehouty_icon.svg" alt="" />
        <div>${item.project.name_project}</div>
       </div>
      `;
    }
  }

  static load_project(index) {
    let project = DB.projects[index].project;
    // parse artboard
    let artBoard = [];
    for (let i = 0; i <= project.artboard.length - 1; i++) {
      let item;
      if (project.artboard[i].type == "titre") {
        item = new Titre();
        item.from_json(project.artboard[i]);
      }
      if (project.artboard[i].type == "texte") {
        item = new Text();
        item.from_json(project.artboard[i]);
      }
      if (project.artboard[i].type == "sous_titre") {
        item = new SousTitre();
        item.from_json(project.artboard[i]);
      }
      if (project.artboard[i].type == "mini_texte") {
        item = new MiniTexte();
        item.from_json(project.artboard[i]);
      }
      if (project.artboard[i].type == "image") {
        item = new Image_D();
        item.from_json(project.artboard[i]);
      }
      if (project.artboard[i].type == "conteneur") {
        item = new Conteneur();
        item.from_json(project.artboard[i]);
      }
      artBoard.push(item);
    }
    Create.artboard = artBoard;
    Create.name_project = project.name_project;
    Create.db_index = DB.projects[index].id;
    Create.H_align = project.H_align;
    Create.V_align = project.V_align;
    Create.bg_file = project.bg_file;
    Create.bg_image_url =
      project.bg_file != undefined ? URL.createObjectURL(project.bg_file) : "";
    Create.bg_color = project.bg_color;
    Create.edit_id = project.edit_id;
    Create.gap = project.gap;
    Create.V_padding = project.V_padding;
    Create.H_padding = project.H_padding;
    Create.aspect_ratio = project.aspect_ratio;
    Create.render();
    UI.hide_projects();
    this.saved = true;
  }
}
