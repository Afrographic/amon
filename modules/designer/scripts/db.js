class DB {
  static con = new JsStore.Connection();
  static projects = [];

  static async init() {
    var data = {
      name: "projects",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        project: {
          notNull: true,
          dataType: "object",
        },
      },
    };

    var db = {
      name: "djehoutDesigner",
      tables: [data],
    };

    await this.con.initDb(db);
  }

  static async getProjects() {
    await this.init();
    let projectsSaved = await this.con.select({
      from: "projects",
    });
    this.projects = projectsSaved;
    this.projects = Utils.reverse_array(this.projects);
    Project.render_projects();
  }

  static async save_project(project) {
    await this.con.insert({
      into: "projects",
      values: [
        {
          project: project,
        },
      ],
      return: true,
    });
    DB.getProjects();
  }

  static async update_project(project) {
    await this.con.update({
      in: "projects",
      where: {
        id: project.db_index,
      },
      set: {
        project: project,
      },
    });
  }

  static async delete_project(id) {
    let res = await this.con.remove({
      from: "projects",
      where: {
        id: id,
      },
    });
    console.log(res);
  }
}

DB.getProjects();
