class Project {
  static saved = false;
  static async save_project() {
    if (this.saved) {
      //Just update project in DB
    } else {
      //Create a new instance of saving
      let name_project = prompt("Inserez le nom du projet");
      if (name_project == null) return;
      if (name_project.trim().length == 0) return;
      let project = {
        name_project: name_project,
        H_align: Create.H_align,
        V_align: Create.V_align,
        bg_file: Create.bg_file,
        edit_id: Create.edit_id,
        gap: Create.gap,
        V_padding: Create.V_padding,
        H_padding: Create.H_padding,
        aspect_ratio: Create.aspect_ratio,
        artboard: Create.artboard,
      };
      await DB.save_project(project);
      Project.saved = true;
    }
  }

  static render_projects() {
    let project_renderer = document.querySelector("#project_renderer");
    project_renderer.innerHTML = "";
    for (let item of DB.projects) {
      project_renderer.innerHTML += `
      <div class="project_item" onclick="Project.load_project(${DB.projects.indexOf(item)})">
        <img src="assets/images/djehouty_icon.svg" alt="" />
        <div>${item.project.name_project}</div>
       </div>
      `;
    }
  }

  static load_project(index){
    let project = DB.projects[index];
    console.log(project);
  }
}
