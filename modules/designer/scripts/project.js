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
      // Degrade configuration
      deg_rotate: Create.deg_rotate,
      deg_first_color: Create.deg_first_color,
      deg_second_color: Create.deg_second_color,
      artboard: Create.artboard,
    };
    if (this.saved) {
      //Just update project in DB
      DB.update_project(project);
      alert("Enregistrer avec succes!");
    } else {
      //Create a new instance of saving
      let name_project;
      if (Create.name_project == "New") {
        name_project = prompt("Enregistrer le projet, Inserez le nom");
        Create.name_project = name_project;
      } else {
        name_project = Create.name_project;
      }

      if (name_project == null) return;
      if (name_project.trim().length == 0) return;
      project.name_project = name_project;
      await DB.save_project(project);
      Project.saved = true;
      // Set project name
      let nom_project = document.querySelector("#nom_project");
      nom_project.innerHTML = Create.name_project;
      alert("Enregistrer avec succes!");
    }
  }

  static render_projects() {
    let project_renderer = document.querySelector("#project_renderer");
    project_renderer.innerHTML = "";
    for (let item of DB.projects) {
      project_renderer.innerHTML += `
      <div class="project_item" >
        <img src="assets/images/djehouty_icon.svg" alt="" />
        <div onclick="Project.load_project(${DB.projects.indexOf(item)})">${
        item.project.name_project
      }</div>
        <div class="f1" onclick="Project.load_project(${DB.projects.indexOf(
          item
        )})"></div>
        <img src="assets/images/edit.svg" alt="" style="width:4.5vw;" onclick="Project.update_project_name(${DB.projects.indexOf(
          item
        )})" />
        <img src="assets/images/delete.svg" alt="" onclick="Project.delete_project(${DB.projects.indexOf(
          item
        )})" />
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
      if (project.artboard[i].type == "tableau") {
        item = new Tableau();
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
    if (project.bg_color.trim().length == 0) {
      Create.bg_image_url =
        project.bg_file != undefined
          ? URL.createObjectURL(project.bg_file)
          : "";
    }else{
      Create.bg_image_url ="";
    }
    Create.bg_color = project.bg_color;
    Create.edit_id = project.edit_id;
    Create.gap = project.gap;
    Create.V_padding = project.V_padding;
    Create.H_padding = project.H_padding;
    Create.aspect_ratio = project.aspect_ratio;
    // Degrade configuration
    Create.deg_rotate = project.deg_rotate;
    Create.deg_first_color = project.deg_first_color;
    Create.deg_second_color = project.deg_second_color;

    Create.render();
    UI.hide_projects();
    // Set project name
    let nom_project = document.querySelector("#nom_project");
    nom_project.innerHTML = project.name_project;
    this.saved = true;
  }

  static create_new() {
    this.saved = false;
    Create.name_project = "New";
    Create.db_index = -1;
    Create.artboard = [];
    Create.H_align = "flex-start";
    Create.V_align = "flex-start";
    Create.bg_file = undefined;
    Create.bg_image_url = "";
    Create.bg_color = "#fff";
    Create.edit_id = "";
    Create.gap = 3;
    Create.V_padding = 5;
    Create.H_padding = 5;
    Create.aspect_ratio = "1/1";
    //Create new project
    Create.render();
    this.save_project();
  }

  static async delete_project(index) {
    if (confirm("Voulez vous vraiment supprimer le projet")) {
      await DB.delete_project(DB.projects[index].id);
      DB.projects.splice(index, 1);
      Project.render_projects();
    }
  }

  static async update_project_name(index) {
    let name_projet = prompt(
      "Editer le nom du projet",
      DB.projects[index].project.name_project
    );
    if (name_projet == null) return;
    if (name_projet.trim().length == 0) return;
    DB.projects[index].project.name_project = name_projet;
    DB.projects[index].project.db_index = DB.projects[index].id;
    await DB.update_project(DB.projects[index].project);
    Project.render_projects();
  }
}
