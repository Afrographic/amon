class ClientRepo {
  static con = new JsStore.Connection();
  static async init() {
    await this.con.initDb({
      name: "clientsDB2",
      tables: [
        {
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
        },
      ],
    });
  }

  static async get_all() {
    let clients = await this.con.select({
      from: "clients",
      order: {
        by: "fullname",
        type: "asc",
      },
    });
    return clients;
  }
}
