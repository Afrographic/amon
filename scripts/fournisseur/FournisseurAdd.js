class FournisseurAdd {
  static async show() {

    if (window.innerWidth <= 1000) {
      history.pushState({ page: "creer-fournisseur" }, "", "/#/creer-fournisseur");
      localStorage.setItem("current-page", "creer-fournisseur");
    }

    let addProduct = document.querySelector("#addProduct");
    addProduct.scrollTop = 0;
    addProduct.style.overflow = "hidden";

    let holderView = document.querySelector("#items-fournisseur-add-holder");
    holderView.classList.remove("items-inactive");
  }

  static hide() {
    let holderView = document.querySelector("#items-fournisseur-add-holder");
    holderView.classList.add("items-inactive");
    let addProduct = document.querySelector("#addProduct");
    addProduct.style.overflow = "auto";
  }

  static async add() {
    let nomFournisseurCreateInput = document.querySelector(
      "#nomFournisseurCreateInput",
    );
    let numeroFournisseurCreateInput = document.querySelector(
      "#numeroFournisseurCreateInput",
    );
    let nom = nomFournisseurCreateInput.value.trim();
    let tel = numeroFournisseurCreateInput.value.trim();
    if (nom.length == 0) {
      Afro.show_negative_message("Nom invalide");
      return;
    }
    if (tel.length == 0) {
      Afro.show_negative_message("Numero invalide invalide");
      return;
    }

    // Check if fournisseur
    for (let i = 0; i <= FournisseurSelect.fournisseurs.length - 1; i++) {
      if (
        Afro.Ucase(FournisseurSelect.fournisseurs[i].fullname.toLowerCase()) ==
        Afro.Ucase(nom.toLowerCase())
      ) {
        Afro.show_negative_message("Fournisseur deja enregistre");
        return;
      }
    }

    await Repo.add({
      fullname: Afro.Ucase(nom),
      tel: tel,
    });
    this.hide();
    FournisseurSelect.renderSelect();
    Afro.show_notif(`Fournisseur ${Afro.Ucase(nom.toLowerCase())} ajoute!`);
    nomFournisseurCreateInput.value="";
    numeroFournisseurCreateInput.value="";
  }
}
