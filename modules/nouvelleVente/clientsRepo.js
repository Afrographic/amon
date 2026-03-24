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
    await this.init();
    let clients = await this.con.select({
      from: "clients",
      order: {
        by: "fullname",
        type: "asc",
      },
    });
    return clients;
  }

  static async add(client) {
    await this.init();
    let added = await this.con.insert({
      into: "clients",
      values: [
        {
          fullname: client.fullname,
          tel: client.tel,
        },
      ],
      return: true,
    });
    return added[0].id;
  }
}
