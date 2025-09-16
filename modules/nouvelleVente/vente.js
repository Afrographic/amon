
class NouvelleVente {
  static productsList = document.querySelector(".productsList");
  static devise = localStorage.getItem("amonDevise");
  static products = [];

  static async init() {
    this.getDataFromAmonDB()
    .then(async (records) => {
      NouvelleVente.formatProducts(JSON.parse(records[0].products))
    })
    .catch((err) => console.error("Error getting data:", err));
  }

  static formatProducts(products){
    for(let i = 0 ; i<=products.length-1;i++){
        products[i].selected = false;
        products[i].qteToBuy = 0;
    }
    NouvelleVente.products = products;
    NouvelleVente.renderProduct();
    console.log( NouvelleVente.products);
  }

  static renderProduct() {
    this.productsList.innerHTML = "";
    for(let i = 0 ; i<= NouvelleVente.products.length-1;i++){
        let id = NouvelleVente.products[i].id;
        let selected = NouvelleVente.products[i].selected ? "active" :"";
        this.productsList.innerHTML += `
        <div class="productItem">
            <div class="productName" onclick="NouvelleVente.selectProduct('${id}')">
                <div class="selector ${selected}"></div>
                <div>${NouvelleVente.products[i].nom} (${Afro.formatNumWithWhiteSpace(NouvelleVente.products[i].prixVente)} ${this.devise})</div>
            </div>
            <div class="quantity">
                <button>-</button>
                <div class="qteValue">0</div>
                <button>+</button>
            </div>
        </div>
        `
    }
  }

  static selectProduct(id){
    console.log(id);
    
    for(let i = 0 ;i <= NouvelleVente.products.length - 1; i++){
        if(NouvelleVente.products[i].id == id){
            NouvelleVente.products[i].selected = !NouvelleVente.products[i].selected;
        }
    }
    NouvelleVente.renderProduct();
  }

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
