class NouvelleVente {
  static productsList = document.querySelector(".productsList");
  static searchTokenInput = document.querySelector("#searchToken");
  static searchButton = document.querySelector("#searchButton");
  static closeSearch = document.querySelector("#closeSearch");

  static devise = localStorage.getItem("amonDevise");
  static con;

  static products = [];
  static searchedProducts = [];
  static searching = false;
  static factureProducts = [];

  static async init() {
    this.getDataFromAmonDB()
      .then(async (records) => {
        NouvelleVente.formatProducts(JSON.parse(records[0].products));
      })
      .catch((err) => console.error("Error getting data:", err));
  }

  static async initAmonDB() {
    this.con = new JsStore.Connection();
    await this.con.initDb(NouvelleVente.get_db_schema());
  }

  static get_db_schema() {
    var data = {
      name: "data",
      columns: {
        id: {
          notNull: true,
          dataType: "string",
        },
        products: {
          notNull: true,
          dataType: "string",
        },
        historyRetrait: {
          notNull: true,
          dataType: "string",
        },
        historyAjout: {
          notNull: true,
          dataType: "string",
        },
        inited: {
          notNull: true,
          dataType: "string",
        },
      },
    };
    var db = {
      name: "amonDB",
      tables: [data],
    };
    return db;
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
    NouvelleVente.products.sort(
      (a, b) => (b.selected ? 1 : 0) - (a.selected ? 1 : 0)
    );
    for (let i = 0; i <= NouvelleVente.products.length - 1; i++) {
      this.productsList.innerHTML += NouvelleVente.buildTemplate(
        NouvelleVente.products[i]
      );
    }
  }

  static buildTemplate(product) {
    let id = product.id;
    let selected = product.selected ? "active" : "";
    let inactive = product.qteToBuy == 0 ? "inactive" : "";
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
        if (NouvelleVente.products[i].qteToBuy <= 0) {
          NouvelleVente.products[i].qteToBuy = 0;
          NouvelleVente.products[i].selected = false;
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
        if (NouvelleVente.products[i].selected) {
          NouvelleVente.products[i].qteToBuy++;
        }
      }
    }
    NouvelleVente.renderProduct();
    NouvelleVente.closeSearchView();
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

  static renderSearchTemplate() {
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

  static async saveCurrentVenteAndRedirectToFacture() {
    let commandes = [];
    for (let i = 0; i <= this.products.length - 1; i++) {
      if (this.products[i].selected) {
        commandes.push(this.products[i]);
      }
    }
    if (commandes.length == 0) {
      Afro.show_negative_message("Aucun produit selectionne!");
      return;
    }

    await  NouvelleVente.updateProductStockAndHistoryVente(commandes);
    localStorage.setItem("currentVente", JSON.stringify(commandes));
    window.location.href = "../facture/kamto.html";

  }

  static getCommandeIndex(product){
    for(let i = 0 ; i<=this.products.length-1;i++){
      if(this.products[i].id == product.id){
        return i;
      }
    }
    return -1;
  }

  static async updateProductStockAndHistoryVente(commandes) {
    await this.initAmonDB();
    for (let i = 0; i <= commandes.length - 1; i++) {
      let currentIndex = NouvelleVente.getCommandeIndex(commandes[i]);
      let nbr = commandes[i].qteToBuy;
      let products = NouvelleVente.products;
      products[currentIndex].quantite -= nbr;
      //Save products to DB
      await this.con.update({
        in: "data",
        where: {
          id: "1",
        },
        set: {
          products: JSON.stringify(products),
        },
      });
      //Save history ajout to DB
      var datas = await this.con.select({
        from: "data",
        where: {
          id: "1",
        },
      });
      let historyRetrait = JSON.parse(datas[0].historyRetrait);

      //Add to history ajout
      let produit = products[currentIndex];
      for (let i = 1; i <= nbr; i++) {
        let date = new Date();
        let today = NouvelleVente.getToday();
        let fullDate = NouvelleVente.formatDate(date);
        produit.at = today;
        produit.fullDate = fullDate;
        produit.prixVente = produit.prixVente;
        historyRetrait.unshift(produit);
      }

      await this.con.update({
        in: "data",
        where: {
          id: "1",
        },
        set: {
          historyRetrait: JSON.stringify(historyRetrait),
        },
      });
    }
  }

  static  getToday() {
    let date = new Date();
    let render = date.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return render;
  }

  static  formatDate(date) {
    let render = date.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return render;
  }
}

NouvelleVente.init();
