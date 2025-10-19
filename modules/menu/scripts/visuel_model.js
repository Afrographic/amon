class Visuel {
  constructor() {
    let date = new Date();
    this.logo = undefined;
    this.nom_restaurant = "";
    this.devise = "FCFA";
    this.texte_accroche = "";
    this.menu = [
      {
        jour: "", 
        plats: [
          {
            name: "",
            prix: "", 
          }, 
        ], 
      }, 
    ];
    this.phone = "";
    this.localisation = "";
    this.date = Tools.Ucase(date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }));
  }
}
