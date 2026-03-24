class ClientSelect {
  static clients = [];
  static selectedClientsId = -1;
  static async renderSelect() {
    let emptyclients = document.querySelector("#empty-area-clients");
    let uiClientsList = document.querySelector("#clients-items-container");
    let closeSearchIcon = document.querySelector(
      "#closeSearchIcon",
    );

    closeSearchIcon.style.display = "none";

    let clientsDB = await ClientRepo.get_all();

    if (clientsDB.length == 0) {
      uiClientsList.style.display = "none";
    } else {
      emptyclients.style.display = "none";
    }

    this.clients = clientsDB;
    this.#render(this.clients);
  }

  static #render(clients) {
    let uiClientsList = document.querySelector("#clients-items-container");
    uiClientsList.style.display = "flex";
    uiClientsList.innerHTML = "";
    for (const item of clients) {
      uiClientsList.innerHTML += `
       <div class="select-item-element" onclick="ClientSelect.selectItem(${item.id},'${item.fullname}')">
            <img src="images/circle.svg" alt="" width="20px">
            <div>${item.fullname}</div>
        </div>
        `;
    }
  }

  static showList() {
    if (window.innerWidth <= 1000) {
      history.pushState(
        { page: "select-client" },
        "",
        "?select-client",
      );
      localStorage.setItem("current-page", "select-client");
    }

    let itemsHolder = document.querySelector("#items-clients-holder");
    itemsHolder.classList.remove("items-inactive");
   
  }

  static hideList() {
    let itemsHolder = document.querySelector("#items-clients-holder");
    itemsHolder.classList.add("items-inactive");
  }

  static selectItem(id, name) {
    this.selectedClientsId = id;
    this.hideList();
    let selectedClient = document.querySelector("#selectedClient");
    selectedClient.innerHTML = name;
  }

  static search(input) {
    let searchIcon = document.querySelector(
      "#searchIcon",
    );
    let closeSearchIcon = document.querySelector(
      "#closeSearchIcon",
    );
    if (input.value.trim().length == 0) {
      closeSearchIcon.style.display = "none";
      searchIcon.style.display = "block";
      return;
    }
    closeSearchIcon.style.display = "block";
    searchIcon.style.display = "none";
    //render product
    let clientsFound = [];
    let token = input.value.trim().toLowerCase();
    for (const item of this.clients) {
      if (item.fullname.toLowerCase().includes(token)) {
        clientsFound.push(item);
      }
    }
    this.#render(clientsFound);
    if (clientsFound.length == 0) {
      let emptyUI = document.querySelector("#empty-area-clients");
      emptyUI.style.display = "flex";
    } else {
      let emptyUI = document.querySelector("#empty-area-clients");
      emptyUI.style.display = "none";
    }
  }

  static closeSearch() {
    let searchIcon = document.querySelector(
      "#searchIcon",
    );
    let closeSearchIcon = document.querySelector(
      "#closeSearchIcon",
    );
    let clientSearchInput = document.querySelector(
      "#clientSearchInput",
    );
    closeSearchIcon.style.display = "none";
    searchIcon.style.display = "block";
    clientSearchInput.value = "";
    this.renderSelect();
  }
}

ClientSelect.renderSelect();
