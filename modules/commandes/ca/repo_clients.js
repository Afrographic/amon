class RepoClient {
  static con = new JsStore.Connection();
  static async init() {
    await this.con.initDb({
      name: "clientsDB",
      tables: [],
    });
  }

  static async get_all() {
    await this.init();
    let clients = await this.con.select({
      from: "clients",
    });
    return clients;
  }
}
