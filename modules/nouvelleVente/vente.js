let products = [
  {
    name: "Iphone XR",
    prixVente: 900,
    quantite: 2,
    selected: false,
  },
  {
    name: "Samsung S25",
    prixVente: 2500,
    quantite: 1,
    selected: false,
  },
  {
    name: "Pantalon Super Sans",
    prixVente: 9000,
    quantite: 4,
    selected: false,
  },
];

class NouvelleVente {
  static productsList = document.querySelector(".productsList");
  static products = [];

  static async init() {
    this.productsList.innerHTML = "";
    this.getDataFromAmonDB()
    .then(async (records) => {
      let productsFromAmon = JSON.parse(records[0].products)
      NouvelleVente.products = records[0].products;
    })
    .catch((err) => console.error("Error getting data:", err));
  }

  static renderProduct() {}

  static getDataFromAmonDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("amonDB", 1);

      request.onsuccess = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains("data")) {
          reject("Object store 'data' does not exist.");
          return;
        }

        const tx = db.transaction("data", "readonly");
        const store = tx.objectStore("data");
        const getRequest = store.getAll();

        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = (e) => reject(e.target.error);
      };

      request.onerror = (event) => {
        reject(`IndexedDB error: ${event.target.error}`);
      };
    });
  }
}

NouvelleVente.init();
