class ClientAdd {
  static async show() {

    if (window.innerWidth <= 1000) {
      history.pushState({ page: "creer-client" }, "", "?creer-client");
      localStorage.setItem("current-page", "creer-client");
    }

    let holderView = document.querySelector("#items-clients-add-holder");
    holderView.classList.remove("items-inactive");
  }

  static hide() {
    let holderView = document.querySelector("#items-clients-add-holder");
    holderView.classList.add("items-inactive");
  }

  static async add() {
    let clientNameInput = document.querySelector(
      "#clientNameInput",
    );
    let clientNumeroInput = document.querySelector(
      "#clientNumeroInput",
    );
    let nom = clientNameInput.value.trim();
    let tel = clientNumeroInput.value.trim();
    if (nom.length == 0) {
      Afro.show_negative_message("Nom invalide");
      return;
    }
    if (tel.length == 0) {
      Afro.show_negative_message("Numero  invalide");
      return;
    }

    // Check if fournisseur
    for (let i = 0; i <= ClientSelect.clients.length - 1; i++) {
      if (
        Afro.Ucase(ClientSelect.clients[i].fullname.toLowerCase()) ==
        Afro.Ucase(nom.toLowerCase())
      ) {
        Afro.show_negative_message("Client deja enregistre");
        return;
      }
    }

    await ClientRepo.add({
      fullname: Afro.Ucase(nom),
      tel: tel,
    });

    this.hide();
    ClientSelect.renderSelect();
    Afro.show_notif(`Client ${Afro.Ucase(nom.toLowerCase())} ajoute!`);
    clientNameInput.value="";
    clientNumeroInput.value="";
  }
}
