class Repo {
  static con = new JsStore.Connection();

  static async init() {
    var data = {
      name: "clients",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        fullname: {
          notNull: true,
          dataType: "string",
        },
        tel: {
          notNull: true,
          dataType: "string", 
        },
      },
    };

    var db = {
      name: "clientsDB",
      tables: [data],
    };

    await this.con.initDb(db);
  }

  static async get_all() {
    let fournisseurs = await this.con.select({
      from: "clients",
    });
    return fournisseurs;
  }

  static async add(fournisseur){
    let added = await this.con.insert({
      into: "clients",
      values: [
        {
          fullname: fournisseur.fullname,
          tel: fournisseur.tel,
        },
      ],
      return: true,
    });
    return added[0].id;
  }

  static async edit(fournisseur){
    await this.con.update({
      in: "clients",
      set: {
        fullname: fournisseur.fullname,
        tel: fournisseur.tel,
      },
      where: {
        id: fournisseur.id,
      },
    });
  }

  static async delete(id){
    await this.con.remove({
      from: "clients",
      where: {
        id: id,
      },
    });
  }
}

