class FournisseurSelect {
  static fournisseurs = [];
  static selectedFournisseurId = -1;
  static async renderSelect() {
    let emptyFournisseur = document.querySelector("#empty-area-fournisseur");
    let catItemsContainer = document.querySelector("#cat-items-container");
    let closeFournisseurSearch = document.querySelector(
      "#closeFournisseurSearch",
    );

    closeFournisseurSearch.style.display = "none";

    let fournisseursDB = await Repo.get_all();

    if (fournisseursDB.length == 0) {
      catItemsContainer.style.display = "none";
    } else {
      emptyFournisseur.style.display = "none";
    }

    this.fournisseurs = fournisseursDB;
    this.#render(this.fournisseurs);
  }

  static #render(fournisseurs) {
    let catItemsContainer = document.querySelector("#fournisseur-items-container");
    catItemsContainer.style.display = "flex";
    catItemsContainer.innerHTML = "";
    for (const item of fournisseurs) {
      catItemsContainer.innerHTML += `
       <div class="select-item-element" onclick="FournisseurSelect.selectItem(${item.id},'${item.fullname}')">
            <img src="images/circle.svg" alt="" width="20px">
            <div>${item.fullname}</div>
        </div>
        `;
    }
  }

  static showList() {
     if (window.innerWidth <= 1000) {
      history.pushState({ page: "select-fournisseur" }, "", "/#/select-fournisseur");
      localStorage.setItem("current-page", "select-fournisseur");
    }

    let itemsHolder = document.querySelector("#items-fournisseur-holder");
    itemsHolder.classList.remove("items-inactive");
    let addProduct = document.querySelector("#addProduct");
    addProduct.scrollTop = 0;
    addProduct.style.overflow = "hidden";
  }

  static hideList() {
    let itemsHolder = document.querySelector("#items-fournisseur-holder");
    itemsHolder.classList.add("items-inactive");
    let addProduct = document.querySelector("#addProduct");
    addProduct.style.overflow = "auto";
  }

  static selectItem(id, name) {
    this.selectedFournisseurId = id;
    this.hideList();
    let selectedFournisseur = document.querySelector("#selectedFournisseur");
    selectedFournisseur.innerHTML = name;
  }

  static search(input) {
    let searchFournisseurIcon = document.querySelector("#searchFournisseurIcon");
    let closeFournisseurSearch = document.querySelector("#closeFournisseurSearch");
    if (input.value.trim().length == 0) {
      closeFournisseurSearch.style.display = "none";
      searchFournisseurIcon.style.display = "block";
      return;
    }
    closeFournisseurSearch.style.display = "block";
    searchFournisseurIcon.style.display = "none";
    //render product
    let fournisseursFound = [];
    let token = input.value.trim().toLowerCase();
    for (const item of this.fournisseurs) {
      if (item.fullname.toLowerCase().includes(token)) {
        fournisseursFound.push(item);
      }
    }
    this.#render(fournisseursFound);
    if (fournisseursFound.length == 0) {
      let emptyFournisseur = document.querySelector("#empty-area-fournisseur");
      emptyFournisseur.style.display = "flex";
    } else {
      let emptyFournisseur = document.querySelector("#empty-area-fournisseur");
      emptyFournisseur.style.display = "none";
    }
  }

  static closeSearch() {
    let searchFournisseurIcon = document.querySelector("#searchFournisseurIcon");
    let closeFournisseurSearch = document.querySelector("#closeFournisseurSearch");
    let fournisseurListSearchInput = document.querySelector(
      "#fournisseurListSearchInput",
    );
    closeFournisseurSearch.style.display = "none";
    searchFournisseurIcon.style.display = "block";
    fournisseurListSearchInput.value = "";
    this.renderSelect();
  }
}

FournisseurSelect.renderSelect();
