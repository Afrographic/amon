class DB {
  static con = new JsStore.Connection();
  static recentCV;
  static firstTime = false;

  static async init() {
    var data = {
      name: "recent",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        recent: {
          notNull: true,
          dataType: "object",
        },
      },
    };

    var db = {
      name: "djehoutyCV",
      tables: [data],
    };

    await this.con.initDb(db);
  }

  static async getRecent() {
    await this.init();
    let recentCVSaved = await this.con.select({
      from: "recent",
      where: {
        id: 1,
      },
    });
    if (recentCVSaved.length == 0) {
      this.firstTime = true;
    } else {
      Prefill_Data.execute(recentCVSaved[0].recent);
    }
  }

  static async save_recent_cv(cv) {
    this.recentCV = cv;
    if (this.firstTime) {
      await this.con.insert({
        into: "recent",
        values: [
          {
            recent: DB.recentCV,
          },
        ],
        return: true,
      });
      this.firstTime = false;
    } else {
      await this.con.update({
        in: "recent",
        where: {
          id: 1,
        },
        set: {
          recent: cv,
        },
      });
    }
  }
}

DB.getRecent();
