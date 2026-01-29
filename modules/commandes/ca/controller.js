class Controller {
  static commandes = [];
  static totalCommandes = 0;
  static clientIndex = 0;
  static async getClientCommandes() {
    this.commandes = await Service.getClientCommandes();
    this.renderClientsList();
    this.initView();
  }

  static renderClientsList() {
    let clientsRenderer = document.querySelector("#clientsRenderer");
    clientsRenderer.innerHTML = "";
    for (const item of this.commandes) {
      let index = this.commandes.indexOf(item);
      Controller.totalCommandes += item.commandes.length;
      let active = item.active ? "active" : "";
      clientsRenderer.innerHTML += `
            <div class="clientItem ${active}" onclick="Controller.loadCommandes(${index})">
                <div>${item.fullname}</div>
                <div>${item.commandes.length} Commandes</div>
            </div>
            `;
    }
  }

  static initView() {
    let commandesView = document.querySelector("#commandesView");
    commandesView.innerHTML = "";
    this.hideEmptyView();
    let totalCommandesUI = document.querySelector("#totalCommandes");
    totalCommandesUI.innerHTML = `${Controller.totalCommandes} Commandes`;
  }

  static loadCommandes(index) {
    this.clientIndex = index;
    for (let i = 0; i <= this.commandes.length - 1; i++) {
      this.commandes[i].active = false;
    }
    this.commandes[index].active = true;
    this.renderClientsList();
    this.hideTotalCommandes();
    this.renderCommandesUI(this.commandes[index]);
  }

  static renderCommandesUI(commande) {
    let commandesView = document.querySelector("#commandesView");
    if (commande.commandes.length == 0) {
      this.showEmptyView();
    } else {
      this.hideEmptyView();
    }
    commandesView.innerHTML = "";
    for (let item of commande.commandes) {
        let index = commande.commandes.indexOf(item);
        let totalMoney = this.computeTotalMoney(item.commande);
        let monnaie = localStorage.getItem("amonDevise");
        let productsString = this.mergeProductAsString(item.commande);
      commandesView.innerHTML += `
        <div class="commandeItem">
            <div>${item.fullDate}</div>
            <div>${productsString}</div>
            <div>${Afro.formatNumWithWhiteSpace(totalMoney)} ${monnaie}</div>
            <img src="images/facture.svg" alt="" title="Generer la facture" onclick="Controller.genererFacture(${index})" />
        </div>
      `;
    }
  }

  static genererFacture(index){
    let clientInfo = this.commandes[this.clientIndex];
    let commande = this.commandes[this.clientIndex].commandes[index];
    localStorage.setItem("currentVente", JSON.stringify(commande.commande));
    localStorage.setItem("currentClientName", clientInfo.fullname);
    localStorage.setItem("currentClientPhone", clientInfo.tel);
    window.location.href = "../facture/kamto.html";
  }

  static computeTotalMoney(commande){
    let total = 0;
    for(let item of commande){
        total += parseInt(item.prix) * item.qte
    }
    return total;
  }

  static mergeProductAsString(commande){
    let str="";
    for(let item of commande){
        let index = commande.indexOf(item);
        let dot = "•"
        if(index ==0){
            dot="";
        }
        
        str += ` ${dot} ${item.qte} ${item.nom}`
    }
    return str;
  }

  static hideTotalCommandes() {
    let totalCommandesUI = document.querySelector("#initialView");
    totalCommandesUI.style.display = "none";
  }
  static showTotalCommandes() {
    let totalCommandesUI = document.querySelector("#initialView");
    totalCommandesUI.style.display = "flex";
  }

  static showEmptyView() {
    let emptyView = document.querySelector("#emptyView");
    emptyView.style.display = "flex";
  }
  static hideEmptyView() {
    let emptyView = document.querySelector("#emptyView");
    emptyView.style.display = "none";
  }
}

Controller.getClientCommandes();
