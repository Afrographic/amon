class Repo {
  static con = new JsStore.Connection();

  static async init() {
    var data = {
      name: "fournisseurs",
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
      name: "fournisseursDB",
      tables: [data],
    };

    await this.con.initDb(db);
  }

  static async get_all() {
    let fournisseurs = await this.con.select({
      from: "fournisseurs",
    });
    return fournisseurs;
  }

  static async add(fournisseur){
    let added = await this.con.insert({
      into: "fournisseurs",
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
      in: "fournisseurs",
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
      from: "fournisseurs",
      where: {
        id: id,
      },
    });
  }
}

