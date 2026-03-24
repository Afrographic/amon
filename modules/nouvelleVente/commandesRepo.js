class CommandeRepo {
  static con = new JsStore.Connection();
  static async init() {
    await this.con.initDb({
      name: "commandesDB",
      tables: [],
    });
  }

  static async save(commande) {
    console.log(commande);
    await this.init();
    await this.con.insert({
      into: "commandes",
      values: [
        {
          clientId: ClientSelect.selectedClientsId,
          commande: commande.commandes,
          fullDate: commande.fullDate,
        },
      ],
      return: true,
    });
  }
}
