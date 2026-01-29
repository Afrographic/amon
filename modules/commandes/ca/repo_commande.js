class Repo_Commande {
  static con = new JsStore.Connection();
  static async init() {
    var commandeTable = {
      name: "commandes",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        clientId: {
          notNull: true,
          dataType: "number",
        },
        commande: {
          notNull: true,
          dataType: "string",
        },
        fullDate: {
          notNull: true,
          dataType: "string",
        },
      },
    };

    await this.con.initDb({
      name: "commandesDB",
      tables: [commandeTable],
    });
  }

  static async get_all() {
    await this.init();
    let commandes = await this.con.select({
      from: "commandes",
      order:{
        by:'id',
        type:'desc'
      }
    });
    return commandes;
  }
}
