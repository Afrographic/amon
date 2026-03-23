class CategorieAdd {
  static showCategorieAddScreen() {
    let addProduct = document.querySelector("#addProduct");
    addProduct.scrollTop = 0;
    addProduct.style.overflow = "hidden";

    let addCategorieHolder = document.querySelector("#items-cat-add-holder");
    addCategorieHolder.classList.remove("items-inactive");
    let nomCategorieInput = document.querySelector("#nomCategorieInput");
    nomCategorieInput.focus();
  }

  static hideCategorieAddScreen() {
    let addCategorieHolder = document.querySelector("#items-cat-add-holder");
    addCategorieHolder.classList.add("items-inactive");
    let addProduct = document.querySelector("#addProduct");
    addProduct.style.overflow = "auto";
  }

  static addCategorie() {
    let nomCategorieInput = document.querySelector("#nomCategorieInput");
    if (nomCategorieInput.value.trim().length == 0) return;
    let catName = Afro.Ucase(nomCategorieInput.value.trim());
    let catId = Afro.generate_unique_id_from_time();
    let name = Afro.Ucase(catName);

    for (let i = 0; i <= CategorieSelect.cats.length - 1; i++) {
      if (Afro.Ucase(CategorieSelect.cats[i].categoryName) === name) {
        Afro.show_notif("Cette categorie existe deja!", true);
        return;
      }
    }

    CategorieSelect.cats.unshift({
      categoryName: name,
      catId: catId,
    });
    localStorage.setItem(
      "AmonCategories",
      JSON.stringify(CategorieSelect.cats),
    );
    CategorieSelect.renderCategorieItems();
    this.hideCategorieAddScreen();
    Afro.show_notif(`Categorie ${name} ajoutee avec succes!`);
    nomCategorieInput.value = "";
  }
}
