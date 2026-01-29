class ClientRepo {
  static con = new JsStore.Connection();
  static async init() {
    await this.con.initDb({
      name: "clientsDB",
      tables: [],
    });
  }

  static async get_all() {
    let clients = await this.con.select({
      from: "clients",
      order:{
        by:'fullname',
        type:'asc'
      }
    });
    return clients;
  }
}
