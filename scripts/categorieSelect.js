class CategorieSelect {
  static cats = [];
  static selectedCatId = -1;
  static renderCategorieItems() {
    let emptyCatArea = document.querySelector("#empty-area-cats");
    let catItemsContainer = document.querySelector("#cat-items-container");
    let closeCategorieSearch = document.querySelector("#closeCategorieSearch");

    closeCategorieSearch.style.display = "none";

    let collectionsAmon = localStorage.getItem("AmonCategories");
    if (collectionsAmon == null) {
      catItemsContainer.style.display = "none";
      return;
    }
    collectionsAmon = JSON.parse(collectionsAmon);
    if (collectionsAmon.length == 0) {
      catItemsContainer.style.display = "none";
    } else {
      emptyCatArea.style.display = "none";
     
    }

    this.cats = collectionsAmon;
   
    this.#renderCats(collectionsAmon);
  }

  static #renderCats(cats) {
    let catItemsContainer = document.querySelector("#cat-items-container");
     catItemsContainer.style.display = "flex";
    
    catItemsContainer.innerHTML = "";
    for (const item of cats) {
     
      catItemsContainer.innerHTML += `
       <div class="select-item-element" onclick="CategorieSelect.selectItem(${item.catId},'${item.categoryName}')">
            <img src="images/circle.svg" alt="" width="20px">
            <div>${item.categoryName}</div>
        </div>
        `;
    }
  }

  static showCategorieList() {
     if (window.innerWidth <= 1000) {
      history.pushState({ page: "select-categorie" }, "", "/#/select-categorie");
      localStorage.setItem("current-page", "select-categorie");
    }
    let itemsHolder = document.querySelector("#items-cat-holder");
    itemsHolder.classList.remove("items-inactive");
    let addProduct = document.querySelector("#addProduct");
    addProduct.scrollTop = 0;
    addProduct.style.overflow = "hidden";

    
  }

  static hideCategorieList() {
    let itemsHolder = document.querySelector("#items-cat-holder");
    itemsHolder.classList.add("items-inactive");
    let addProduct = document.querySelector("#addProduct");
     addProduct.scrollTop = 0;
    addProduct.style.overflow = "auto";
  }

  static selectItem(catId, catName) {
    this.selectedCatId = catId;
    this.hideCategorieList();
    let selectedCategorie = document.querySelector("#selectedCategorie");
    selectedCategorie.innerHTML = catName;
  }

  static search(input) {
    let searchCategorieIcon = document.querySelector("#searchCategorieIcon");
    let closeCategorieSearch = document.querySelector("#closeCategorieSearch");
    if (input.value.trim().length == 0) {
      closeCategorieSearch.style.display = "none";
      searchCategorieIcon.style.display = "block";
      return;
    }
    closeCategorieSearch.style.display = "block";
    searchCategorieIcon.style.display = "none";
    //render product
    let catsFound = [];
    let token = input.value.trim().toLowerCase();
    for (const item of this.cats) {
      if (item.categoryName.toLowerCase().includes(token)) {
        catsFound.push(item);
      }
    }
    this.#renderCats(catsFound);
    if (catsFound.length == 0) {
      let emptyCatArea = document.querySelector("#empty-area-cats");
      emptyCatArea.style.display = "flex";
    } else {
      let emptyCatArea = document.querySelector("#empty-area-cats");
      emptyCatArea.style.display = "none";
    }
  }

  static closeSearch() {
    let searchCategorieIcon = document.querySelector("#searchCategorieIcon");
    let closeCategorieSearch = document.querySelector("#closeCategorieSearch");
    let categorieListSearchInput = document.querySelector(
      "#categorieListSearchInput",
    );
    closeCategorieSearch.style.display = "none";
    searchCategorieIcon.style.display = "block";
    categorieListSearchInput.value = "";
    this.renderCategorieItems();
  }
}

CategorieSelect.renderCategorieItems();
