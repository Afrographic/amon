class DB {
    static con = new JsStore.Connection();
    static recentData;
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
        name: "djehoutyMenu",
        tables: [data],
      };
  
      await this.con.initDb(db);
    }
  
    static async getRecent() {
      await this.init();
      let recentDataSaved = await this.con.select({
        from: "recent",
        where: {
          id: 1,
        },
      });
      if (recentDataSaved.length == 0) {
        this.firstTime = true;
      } else {
        Create.visuel = recentDataSaved[0].recent;
        Prefill_Data.execute();
      }
    }
  
    static async save_recent_menu(menu) {
      this.recentData = menu;
      if (this.firstTime) {
        await this.con.insert({
          into: "recent",
          values: [
            {
              recent: DB.recentData,
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
            recent: menu,
          },
        });
      }
    }
  }
  
  DB.getRecent();
  