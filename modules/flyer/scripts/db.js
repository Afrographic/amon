class DB {
  static con = new JsStore.Connection();
  static config;

  static async init() {
    var data = {
      name: "config",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        config: {
          notNull: true,
          dataType: "object",
        },
      },
    };

    var db = {
      name: "djehoutyDB",
      tables: [data],
    }; 

    await this.con.initDb(db);
  }

  static async getConfig() {
    await this.init();
    let config = await this.con.select({
      from: "config",
      where: {
        id: 1,
      },
    });
    if (config.length > 0) {
      this.config = config[0].config;
      // Prefil Config Field
      Config.initConfigField();
      //Show view to create the flyer
      UI.show_create_flyer_screen();
    } else {
      // Show Config Screen
      UI.show_config_screen();
    }
  }

  static async saveConfig(config) {
   
    this.config = config;
    if (this.config == undefined) {
      await this.con.insert({
        into: "config",
        values: [
          {
            config: config,
          },
        ],
        return: true,
      });
    } else {
       await this.con.update({
        in: "config",
        where: {
          id: 1,
        },
        set: {
          config: config,
        },
      });
    }
  }
}

DB.getConfig();
