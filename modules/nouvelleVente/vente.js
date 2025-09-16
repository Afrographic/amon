class NouvelleVente {
  static productsList = document.querySelector(".productsList");
  static searchTokenInput = document.querySelector("#searchToken");
  static searchButton = document.querySelector("#searchButton");
  static closeSearch = document.querySelector("#closeSearch");

  static devise = localStorage.getItem("amonDevise");

  static products = [];
  static searchedProducts = [];
  static searching = false;

  static async init() {
    this.getDataFromAmonDB()
      .then(async (records) => {
        NouvelleVente.formatProducts(JSON.parse(records[0].products));
      })
      .catch((err) => console.error("Error getting data:", err));
  }

  static formatProducts(products) {
    for (let i = 0; i <= products.length - 1; i++) {
      products[i].selected = false;
      products[i].qteToBuy = 0;
    }
    NouvelleVente.products = products;
    NouvelleVente.renderProduct();
    console.log(NouvelleVente.products);
  }

  static renderProduct() {
    this.productsList.innerHTML = "";
    for (let i = 0; i <= NouvelleVente.products.length - 1; i++) {
      this.productsList.innerHTML += NouvelleVente.buildTemplate(
        NouvelleVente.products[i]
      );
    }
  }

  static buildTemplate(product) {
    let id = product.id;
    let selected = product.selected ? "active" : "";
    let inactive = product.qteToBuy == 0 ? "inactive" :"";
    return `
        <div class="productItem">
            <div class="productName" onclick="NouvelleVente.selectProduct('${id}')">
                <div class="selector ${selected}"></div>
                <div>${product.nom} (${Afro.formatNumWithWhiteSpace(
      product.prixVente
    )} ${this.devise})</div>
            </div>
            <div class="quantity ${inactive}">
                <button onclick="NouvelleVente.decrease('${id}')">-</button>
                <div class="qteValue">${product.qteToBuy}</div>
                <button onclick="NouvelleVente.increase('${id}')">+</button>
            </div>
        </div>
        `;
  }

  static decrease(id) {
    for (let i = 0; i <= NouvelleVente.products.length - 1; i++) {
      if (NouvelleVente.products[i].id == id) {
        NouvelleVente.products[i].qteToBuy--;
        if (NouvelleVente.products[i].qteToBuy < 0) {
          NouvelleVente.products[i].qteToBuy = 0;
        }
      }
    }
    NouvelleVente.renderProduct();
  }

  static increase(id) {
    for (let i = 0; i <= NouvelleVente.products.length - 1; i++) {
      if (NouvelleVente.products[i].id == id) {
        NouvelleVente.products[i].qteToBuy++;
        if (
          NouvelleVente.products[i].qteToBuy >
          NouvelleVente.products[i].quantite
        ) {
          NouvelleVente.products[i].qteToBuy =
            NouvelleVente.products[i].quantite;
        }
      }
    }
    NouvelleVente.renderProduct();
  }

  static selectProduct(id) {
    for (let i = 0; i <= NouvelleVente.products.length - 1; i++) {
      if (NouvelleVente.products[i].id == id) {
        NouvelleVente.products[i].qteToBuy = 0;
        NouvelleVente.products[i].selected =
          !NouvelleVente.products[i].selected;
          if( NouvelleVente.products[i].selected){
            NouvelleVente.products[i].qteToBuy++;
          }
      }
    }
    NouvelleVente.renderProduct();
    NouvelleVente.closeSearchView()
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

  static searchProduct() {
    let token = this.searchTokenInput.value;
    if (token.trim().length == 0) {
      this.renderProduct();
      this.searching = false;
      return;
    }
    this.searching = true;
    this.searchButton.classList.add("inactive");
    this.closeSearch.classList.remove("inactive");
    this.searchedProducts = [];
    for (let i = 0; i <= this.products.length - 1; i++) {
      if (this.products[i].nom.toLowerCase().includes(token.toLowerCase())) {
        this.searchedProducts.push(this.products[i]);
      }
    }
    NouvelleVente.renderSearchTemplate();
  }

  static renderSearchTemplate(){
    this.productsList.innerHTML = `<p>${NouvelleVente.searchedProducts.length} Resultat(s)</p>`;
    for (let i = 0; i <= NouvelleVente.searchedProducts.length - 1; i++) {
      this.productsList.innerHTML += NouvelleVente.buildTemplate(
        NouvelleVente.searchedProducts[i]
      );
    }
  }

  static closeSearchView() {
    this.searchButton.classList.remove("inactive");
    this.closeSearch.classList.add("inactive");
    this.searchTokenInput.value = "";
    this.renderProduct();
  }
}

NouvelleVente.init();
