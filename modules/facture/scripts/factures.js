let totalFactures = document.querySelector("#totalFactures");

let factures = [
  {
    at: "13 Janvier 2025",
    client: "Tesse brunel",
    note: "Merci pour votre achat",
    total: 85000,
    monnaie: "XAF",
    produits: [
      {
        article: "Motion design 2D",
        prix: 500,
        quantite: 8,
      },
      {
        article: "Modelisation 3D",
        prix: 3500,
        quantite: 3,
      },
    ],
  },
];
let history = [];

async function getFactures() {
  var datas = await con.select({
    from: "KamtoData",
    where: {
      id: "1",
    },
  });
  if (datas[0] == undefined) return;
  factures = JSON.parse(datas[0].factures);
  totalFactures.innerHTML = `${factures.length} Factures generees`;
  formatHistory();
}

getFactures();

function saveFacture(data) {
  factures.unshift(data);
  updateFacturesDB();
}

async function updateFacturesDB() {
  await con.update({
    in: "KamtoData",
    where: {
      id: "1",
    },
    set: {
      factures: JSON.stringify(factures),
    },
  });
}

function formatHistory() {
  //Collect individual dates
  let dates = [];
  for (let i = 0; i <= factures.length - 1; i++) {
    if (!alreadySavedInDate(factures[i].at, dates)) {
      dates.unshift(factures[i].at);
    }
  }

  //Add corresponding invoice
  let invoices = [];
  for (let i = 0; i <= dates.length - 1; i++) {
    let invoiceItem = {
      date: dates[i],
      factures: [],
    };
    for (let j = 0; j <= factures.length - 1; j++) {
      if (factures[j].at == dates[i]) {
        invoiceItem.factures.push(factures[j]);
      }
    }
    invoices.unshift(invoiceItem);
  }

  history = invoices;

  // Render on screen
  let historyContainer = document.querySelector(".historyContainer");
  historyContainer.innerHTML = "";
  for (let i = 0; i <= history.length - 1; i++) {
    let facturesClients = ``;
    for (let j = 0; j <= history[i].factures.length - 1; j++) {
      facturesClients += `
      <div class="clientHistory" onclick="previewFacture('${i}-${j}')">
        <img src="assets/images/invoice.svg" alt="" width="15px" />
        <div>${history[i].factures[j].client}</div>
        <div class="f1"></div>
        <img src="assets/images/export.svg" alt="" width="24px" onclick="editFacture(event,${i},${j});hideHistory();" />
      </div>
      `;
    }
    historyContainer.innerHTML += `
    <div class="historyItem">
          <div class="date">${history[i].date}</div>
          <div class="facturesClients">
           ${facturesClients}
          </div>
    </div>
    `;
  }
}

function editFacture(e, i, j) {
  e.stopPropagation();
  i = parseInt(i);
  j = parseInt(j);
  let facture = history[i].factures[j];

  // Prefill fields
  document.querySelector("#nomClient").value = facture.client;
  document.querySelector("#numeroClient").value = facture.numeroClient;
  document.querySelector("#delaiLivraison").value = facture.delai;
  document.querySelector("#fraisLivraisonInput").value = facture.fraisLivraison;
  document.querySelector("#tvaInput").value = facture.tva;
  document.querySelector("#note").value = facture.note;
  produits = facture.produits;
  renderProduits();
}

function previewFacture(factureIndex) {
  factureIndex = factureIndex.split("-");
  i = parseInt(factureIndex[0]);
  j = parseInt(factureIndex[1]);
  let facture = history[i].factures[j];
  if (facture.negociable == undefined) {
    facture.negociable = false;
  }
  //render facture from history
  //Show numero de serie
  let factureNumeroDeSerie = document.querySelector(".factureNumeroDeSerie");
  factureNumeroDeSerie.innerHTML = `# ${facture.id ?? j}`;
  localStorage.setItem("numeroSerie", `${facture.id}`);
  //show charte graphique
  let CharteGraphique = document.querySelector(".CharteGraphique");
  CharteGraphique.classList.remove("inactive");
  //show facture
  let factureModele1 = document.querySelector(".factureModele1");
  factureModele1.classList.remove("inactive");
  //Set Logo on facture
  if (userInfo.logo != undefined) {
    let logoURL = URL.createObjectURL(userInfo.logo);
    let factureLogo2 = document.querySelector("#factureLogo2");
    factureLogo2.src = logoURL;
  }

  //create img logo element
  // factureLogo.innerHTML ="";
  // let logo = document.createElement("img");
  // logo.src = logoURL;
  // factureLogo.appendChild(logo);

  //Set name of company
  let nameCompanyFacture = document.querySelector("#nameCompanyFacture");
  nameCompanyFacture.innerHTML = `${userInfo.nomEntreprise}`;
  //Set date of facture
  let dateFacture = document.querySelector("#dateFacture");
  dateFacture.innerHTML = facture.at;
  //Set facture adresss,email and phone
  let factureAdresse = document.querySelector("#factureAdresse");
  let factureEmail = document.querySelector("#factureEmail");
  let facturePhone = document.querySelector("#facturePhone");
  factureAdresse.innerHTML = `${userInfo.adresse}`;
  factureEmail.innerHTML = `${userInfo.email}`;
  facturePhone.innerHTML = `${userInfo.numeroTelephone}`;
  //Secteur company secteur
  let secteurFacture = document.querySelector("#secteurFacture");
  secteurFacture.innerHTML = `${userInfo.secteur}`;
  //set Nom client
  if (facture.numeroClient == undefined) {
    facture.numeroClient = "";
  } else {
    facture.numeroClient = " | " + facture.numeroClient;
  }
  let factureNomClient = document.querySelector("#factureNomClient");
  factureNomClient.innerHTML = `Cher ${facture.client}  ${facture.numeroClient}`;
  localStorage.setItem("client", facture.client);
  //Set tableau des factures
  let factureTableauRender = document.querySelector("#factureTableauRender");
  factureTableauRender.innerHTML = "";
  for (let i = 0; i <= facture.produits.length - 1; i++) {
    factureTableauRender.innerHTML += `
              <tr>
                   <td>${i + 1}</td>
                   <td>${facture.produits[i].tache}</td>
                   <td>${HelperFunction.formatNumWithWhiteSpace(
                     facture.produits[i].prix
                   )} ${userInfo.monnaie}</td>
                   <td>${facture.produits[i].quantite}</td>
                   <td>${HelperFunction.formatNumWithWhiteSpace(
                     parseInt(facture.produits[i].prix) *
                       parseInt(facture.produits[i].quantite)
                   )} ${userInfo.monnaie}</td>
              </tr>
          `;
  }
  //Etat de negociation negotiateState
  let negotiateState = document.querySelector("#negotiateState");
  if (facture.negociable) {
    negotiateState.innerHTML = "Negotiable";
  } else {
    negotiateState.innerHTML = "Non negotiable";
  }

  //Set delai de livraison
  if (facture.delai != undefined) {
    let delai = document.querySelector(".delai");
    delai.style.display = "flex";
    let delaiFactureView = document.querySelector("#factureDelaiLivraison");
    delaiFactureView.innerHTML = facture.delai;
  } else {
    let delai = document.querySelector(".delai");
    delai.style.display = "none";
  }
  if (facture.delai.trim().length == 0) {
    let delai = document.querySelector(".delai");
    delai.style.display = "none";
  }

  //Set Frais livraison
  console.log(facture.fraisLivraison);
  let fraisLivraisonFacture = document.querySelector("#fraisLivraisonFacture");
  if (facture.fraisLivraison == undefined) {
    fraisLivraisonFacture.parentNode.style.display = "none";
    facture.fraisLivraison = 0;
  } else {
    let fraisLivraisonFactureView = document.querySelector(
      "#fraisLivraisonFacture"
    );
    fraisLivraisonFactureView.innerHTML = `${HelperFunction.formatNumWithWhiteSpace(
      facture.fraisLivraison
    )} ${userInfo.monnaie}`;
  }
  //Set TVA
  console.log(facture.tva);
  let tva = document.querySelector("#tva");
  if (facture.tva == undefined) {
    tva.innerHTML = "0 %";
    facture.tva = 0;
  } else {
    let tva = document.querySelector("#tva");
    tva.innerHTML = `${facture.tva} % (${HelperFunction.formatNumWithWhiteSpace(
      (facture.total * facture.tva) / 100
    )} ${userInfo.monnaie})`;
  }

  //Set Total Produit
  let FraisTotal = document.querySelector("#FraisTotal");
  FraisTotal.innerHTML = `${HelperFunction.formatNumWithWhiteSpace(
    facture.total
  )} ${userInfo.monnaie}`;

  //Set total To pay
  let FactureTotal = document.querySelector("#FactureTotal");
  FactureTotal.innerHTML = `${HelperFunction.formatNumWithWhiteSpace(
    facture.total + facture.fraisLivraison + (facture.total * facture.tva) / 100
  )} ${userInfo.monnaie}`;
  //Set proprietaire et poste
  let FactureOwner = document.querySelector("#FactureOwner");
  let facturePoseEntreprise = document.querySelector("#facturePoseEntreprise");
  FactureOwner.innerHTML = `${userInfo.nomComplet}`;
  facturePoseEntreprise.innerHTML = `${userInfo.votrePoste} ${userInfo.nomEntreprise}`;
  //Set note
  let FactureNote = document.querySelector("#FactureNote");
  if (facture.note.trim().length == 0) {
    FactureNote.parentNode.parentNode.style.display = "none";
  } else {
    FactureNote.parentNode.parentNode.style.display = "flex";
    FactureNote.innerText = facture.note;
  }

  //Hide useless elements
  let supportDev = document.querySelector(".supportDev");
  let config = document.querySelector(".config");
  let printFactureBtns = document.querySelector(".printFactureBtns");
  supportDev.classList.add("inactive");
  config.classList.add("inactive");
  printFactureBtns.classList.remove("inactive");
  //Hide history
  hideHistory();

  //hide form to generate facture
  let container_add = document.querySelector(".newFactureContentMobile");
  container_add.classList.add("inactive");
}

function alreadySavedInDate(date, dates) {
  for (let i = 0; i <= dates.length - 1; i++) {
    if (dates[i] == date) {
      return true;
    }
  }
  return false;
}

let historiqueView = document.querySelector(".historiqueView");
function showHistory() {
  historiqueView.classList.remove("historiqueViewInactive");
}

function hideHistory() {
  historiqueView.classList.add("historiqueViewInactive");
}
