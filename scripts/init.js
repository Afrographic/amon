
// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.error("SW registration failed", err));
}
//Detect if the is already installed
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();
  deferredPrompt = e;

  // Show your custom install UI (button, modal, banner)
  const installBtn = document.getElementById("installBtn");
  installBtn.style.display = "flex";

  installBtn.addEventListener("click", () => {
    installBtn.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {

      } else {

      }
      deferredPrompt = null;
    });
  });
});

//End Detect
//Reset App
function initResetApp() {
  let resetAppView = document.querySelector(".resetApp");
  resetAppView.classList.remove("inactive");
}
function resetApp() {
  //Delete DB
  indexedDB.deleteDatabase("amonDB");
  window.location.reload();
}
function cancelResetApp() {
  let resetAppView = document.querySelector(".resetApp");
  resetAppView.classList.add("inactive");
}
//Init nom de la boutique
let nomBoutiqueStatic = "";
function initNomBoutique() {
  let nomBoutiqueLocale = localStorage.getItem("nomBoutique");
  if (nomBoutiqueLocale == null) {
    //Show add nom boutique screen
    showWelcomeScreen();
  } else {
    let nomBoutique = document.querySelector("#nomBoutique");
    nomBoutiqueStatic = nomBoutiqueLocale;
    nomBoutique.value = nomBoutiqueStatic;
    //hide welcome screen
    hideWelcomeScreen();
    setNameStore();
  }
}
initNomBoutique();

function start() {
  let devise = document.querySelector("#devise");
  let nomBoutique = document.querySelector("#nomBoutique");
  if (nomBoutique.value.trim().length == 0) {
    Afro.show_negative_message("Nom de la boutique invalide!");
    return;
  }

  if (devise.value.trim().length == 0) {
    Afro.show_negative_message("Devise invalide!");
    return;
  }
  localStorage.setItem("nomBoutique", nomBoutique.value);
  localStorage.setItem("amonDevise", devise.value);
  nomBoutiqueStatic = nomBoutique.value;
  setNameStore();
  hideWelcomeScreen();
  getVentesStats();
  computeTotalMoney();
}

function hideWelcomeScreen() {
  let welcome = document.querySelector(".welcome");
  welcome.classList.add("inactive");
}

function showWelcomeScreen() {
  let welcome = document.querySelector(".welcome");
  welcome.classList.remove("inactive");
}

function setNameStore() {
  let nomBoutiqueLocale = localStorage.getItem("nomBoutique");
  let nameStore = document.querySelector("#nameStore");
  let nameStore2 = document.querySelector("#nameStore2");
  let nameStoreExport = document.querySelector("#nameStoreExport");
  nameStore.innerHTML = nomBoutiqueLocale;
  nameStore2.innerHTML = nomBoutiqueLocale;
  nameStoreExport.innerHTML = nomBoutiqueLocale;
}

// Start of DB Block
let con = new JsStore.Connection();
async function init_DB() {
  await con.initDb(this.get_db_schema());
  this.init_data();
}

function get_db_schema() {
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

async function init_data() {
  let data = await con.select({
    from: "data",
  });

  if (data.length == 0) {
    let value = {
      id: "1",
      products: "[]",
      historyRetrait: "[]",
      historyAjout: "[]",
      inited: "false",
    };
    await con.insert({
      into: "data",
      values: [value],
    });
  } else {
    products = JSON.parse(data[0].products);
    saveLightProductToLocalStorageForFacture();
    renderProduct();
  }
}

async function saveToDB() {
  await con.update({
    in: "data",
    where: {
      id: "1",
    },
    set: {
      products: JSON.stringify(products),
    },
  });
} 

async function saveHistoryAjoutToDB() {
  await con.update({
    in: "data",
    where: {
      id: "1",
    },
    set: {
      historyAjout: JSON.stringify(historyAjout),
    },
  });
}

async function saveHistoryRetraitToDB() {
  await con.update({
    in: "data",
    where: {
      id: "1",
    },
    set: {
      historyRetrait: JSON.stringify(historyRetrait),
    },
  });
}

async function getProducts() {
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });
  products = JSON.parse(datas[0].products);
}

async function getHistory() {
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });
  if(datas.length == 0) return;
  historyRetrait = JSON.parse(datas[0].historyRetrait);
  historyAjout = JSON.parse(datas[0].historyAjout);
}

getHistory();

async function initAllData() {
  await init_DB();
  // await getProducts();
}

initAllData();

// End of DB BLock

let products = [
  // {
  //     nom: "Iphone XR",
  //     prix: "210 000 XAF",
  //     fournisseur: "AfriCom",
  //     marque: "Apple",
  //     quantite: 15,
  //     addAt: "13 Fevrier 2025 a 13h24",
  //     modifiedAt: "13 Octobre 2025 a 17h00",
  //     id: 15866454884545,
  // },
  // {
  //     nom: "Mac Book Pro",
  //     prix: "300 000 XAF",
  //     fournisseur: "Kenedy",
  //     marque: "Apple",
  //     quantite: 15,
  //     addAt: "13 Fevrier 2025 a 13h24",
  //     modifiedAt: "13 Octobre 2025 a 17h00",
  //     id: 4585520021,
  // },
];
let historyRetrait = [];
let historyAjout = [];

function TriggerImportJSON() {
  let importFile = document.querySelector("#importFile");
  importFile.click();
}

function getImportedFile(e) {
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  fetch(url)
    .then((response) => response.json())
    .then((json) => processImportedDate(json));
}

function processImportedDate(json) {
  products = products.concat(json);
  saveToDB();
  renderProduct();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function launchPrint() {
  await sleep(350);
  hidePrint();
  window.print();
  showPrint();
}

function showPrint() {
  let exportPDFButton = document.getElementById("exportPDFButton");
  let closeExport = document.getElementById("closeExport");
  let exportProducts = document.getElementById("exportProducts");
  let searchProduct = document.querySelector(".searchProduct");

  exportPDFButton.classList.remove("inactive");
  closeExport.classList.remove("inactive");
  exportProducts.style.overflow = "auto";
  searchProduct.classList.remove("inactive");
}

function hidePrint() {
  let exportPDFButton = document.getElementById("exportPDFButton");
  let closeExport = document.getElementById("closeExport");
  let exportProducts = document.getElementById("exportProducts");
  let searchProduct = document.querySelector(".searchProduct");
  exportPDFButton.classList.add("inactive");
  closeExport.classList.add("inactive");
  searchProduct.classList.add("inactive");
  exportProducts.style.overflow = "hidden";
}

function launchExport() {
  let ExportWrapper = document.querySelector(".ExportWrapper");
  let productsContainer = document.querySelector("#productsContainer");

  ExportWrapper.classList.remove("inactive");
  productsContainer.classList.add("inactive");
}

function closeLaunchExport() {
  let ExportWrapper = document.querySelector(".ExportWrapper");
  let productsContainer = document.querySelector("#productsContainer");

  ExportWrapper.classList.add("inactive");
  productsContainer.classList.remove("inactive");
}

// Search of a product

let nomProduitSearch = document.getElementById("nomProduitSearch");
let searchView = document.querySelector(".searchResult");
let totalSearchResult = document.querySelector("#totalSearchResult");
function search() {
  searchView.classList.remove("inactive");
  let val = nomProduitSearch.value.trim();
  let searchedProducts = [];
  if (val.length == 0) {
    Afro.show_negative_message("Nom du produit invalide");
    return;
  }
  for (let i = 0; i <= products.length - 1; i++) {
    if (products[i].nom.toLowerCase().includes(val.toLowerCase())) {
      searchedProducts.push(products[i]);
    }
  }

  //Display empty
  let renderEmptyResult = document.querySelector("#renderEmptyResult");

  if (searchedProducts.length == 0) {
    renderEmptyResult.classList.remove("inactive");
  }

  totalSearchResult.innerHTML = `${searchedProducts.length} Produits`;

  // Render products
  let renderSearchResult = document.querySelector("#renderSearchResult");
  renderSearchResult.innerHTML = "";

  let devise = localStorage.getItem("amonDevise");
  for (let i = 0; i <= searchedProducts.length - 1; i++) {
    renderSearchResult.innerHTML += `
              <div class="productItem">

                <div class="productItemClass productItemClassInactive" onclick="hideMenu(this)">
                          
                          <button class="tertiaryBtn" onclick="closeSearch();incrementProduct(event);showNouveauStockView();" id="${searchedProducts[i].id}">Nouveau Stock</button>
                          <button class="tertiaryBtn" onclick="closeSearch();decrementProduct(event);showNouvelleVenteView()" id="${searchedProducts[i].id}">Nouvelle Vente</button>
                    
                          <button class="tertiaryBtn" onclick="closeSearch();editProduct(event)" id="${searchedProducts[i].id}">Editer</button>
                          <button  class="tertiaryBtn" onclick="closeSearch();deleteProduct(event)" id="${searchedProducts[i].id}">Supprimer</button>
                
                  </div>

                  <div class="productItemTitle">
                      <h3>${ Afro.Ucase(searchedProducts[i].nom)}</h3>
                      <div class="row aic">
                          <img src="images/info.svg" width="24px"/>
                          <div class="clickArea" onclick="showMenu(this)">
                            <img src="images/option.svg" />
                          </div>  
                      </div>  
                   </div>
                  
                  <table>
                      <tr>
                          <td>Prix d'achat</td>
                          <td>${Afro.formatNumWithWhiteSpace(searchedProducts[i].prix)} ${devise}</td>
                      </tr>
                      <tr>
                          <td>Fournisseur</td>
                          <td>${ Afro.Ucase(searchedProducts[i].fournisseur)}</td>
                      </tr>
                      <tr>
                          <td>Marque</td>
                          <td>${ Afro.Ucase(searchedProducts[i].marque)}</td>
                      </tr>
                      <tr>
                          <td>Quantite</td>
                          <td>${searchedProducts[i].quantite}</td>
                      </tr>
                      <tr>
                          <td>Ajouter le</td>
                          <td>${searchedProducts[i].addAt}</td>
                      </tr>
                      <tr>
                          <td>Modifier le</td>
                          <td>${searchedProducts[i].modifiedAt}</td>
                      </tr>
                  </table>

                  
              </div>
              `;
  }
}

function closeSearch() {
  searchView.classList.add("inactive");
}

let addProductElement = document.getElementById("addProduct");
let addProduitButton = document.querySelector(".addProduitButton");
let empty = document.querySelector(".empty");

function addProduct() {
  ProductCaracteristique.initCreateCars();
  
  let nomInput = document.getElementById("nomInput");

  addProductElement.classList.remove("inactive");
  addProductElement.classList.add("active");
  addProduitButton.classList.add("inactive");

  //Empty adding image block
  let importImage = document.querySelector(".importImage");
  importImage.style.backgroundImage = ``;
  importImage.innerHTML = `
  <img src="images/addImage.svg" alt="" width="24px">
  <div>Importer une image</div>
  `
}

function closeAddProduct() {
  addProductElement.classList.add("inactive");
  addProductElement.classList.remove("active");
  addProduitButton.classList.remove("inactive");
}

let exportWrapperDate = document.getElementById("exportWrapperDate");
let exportDate = new Date();
let dateString = formatDate(exportDate);
exportWrapperDate.innerHTML = `Rapport du ${dateString}`;

function formatDate(date) {
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

function saveLightProductToLocalStorageForFacture() {
  let productsToLocal = [];
  for (let i = 0; i <= products.length - 1; i++) {
    productsToLocal.push({
      article: products[i].nom,
      prix: products[i].prix,
    });
  }
  localStorage.setItem("productsLight", JSON.stringify(productsToLocal));
}

async function addProductToDatabase() {
  let createCategories = document.querySelector("#createCategories");

  let nomInput = document.getElementById("nomInput");
  let prixInput = document.getElementById("prixInput");
  let prixVenteInput = document.getElementById("prixVenteInput");
  let fournisseurInput = document.getElementById("fournisseurInput");
  let marqueInput = document.getElementById("marqueInput");
  let quantiteInput = document.getElementById("quantiteInput");
  let catId = createCategories.value;


  let product = {
    nom: "nom",
    prix: "prix",
    fournisseur: "fournisseur",
    marque: "Marque",
    quantite: 0,
    addAt: "addAt",
    modifiedAt: "modifiedAt",
    id: 1450554555,
    catId:catId,
    prixVente:""
  };

  let addAt = new Date();
  let modifiedAt = new Date();

  if (nomInput.value.trim().length == 0) {
    Afro.show_negative_message("Nom invalide");
    return;
  }
  if (prixInput.value.trim().length == 0) {
    Afro.show_negative_message("Prix invalide");
    return;
  }
  if (prixVenteInput.value.trim().length == 0) {
    Afro.show_negative_message("Prix de vente invalide");
    return;
  }
  if (fournisseurInput.value.trim().length == 0) {
    Afro.show_negative_message("Fournisseur invalide");
    return;
  }
  if (marqueInput.value.trim().length == 0) {
    Afro.show_negative_message("Marque invalide");
    return;
  }
  if (quantiteInput.value.trim().length == 0) {
    Afro.show_negative_message("Quantite invalide");
    return;
  }

  let productId = crypto.randomUUID();

  product.nom = Afro.Ucase(nomInput.value.trim());
  product.prix = prixInput.value.trim();
  product.fournisseur =  Afro.Ucase(fournisseurInput.value.trim());
  product.marque =  Afro.Ucase(marqueInput.value.trim());
  product.quantite = quantiteInput.value.trim();
  product.addAt = formatDate(addAt);
  product.modifiedAt = formatDate(modifiedAt);
  product.id = productId;
  product.catId = catId;
  product.prixVente = prixVenteInput.value.trim();
  product.cars = ProductCaracteristique.carsToSave;
  ProductCaracteristique.cars = [];
  product.color = ProductColor.selectedColor;

  //Save product Image
  let imageId = await ProductImageService.saveProductImage(productId);
  product.imageId = imageId;

 

  products.unshift(product);
  renderProduct();

  nomInput.value = "";
  prixInput.value = "";
  prixVenteInput.value ="";
  fournisseurInput.value = "";
  marqueInput.value = "";
  quantiteInput.value = "";
  closeAddProduct();
 
  // alert("Produit ajouter avec succes!");
  saveToDB();
  saveLightProductToLocalStorageForFacture();

  //Update stock for history
  //Save history ajout to DB
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });
  historyAjout = JSON.parse(datas[0].historyAjout);

  //Add to history ajout
  let produit = product;
  for (let i = 1; i <= produit.quantite; i++) {
    let date = new Date();
    let today = getToday();
    let fullDate = formatDate(date);
    produit.at = today;
    produit.fullDate = fullDate;
    historyAjout.unshift(produit);
  }

  await con.update({
    in: "data",
    where: {
      id: "1",
    },
    set: {
      historyAjout: JSON.stringify(historyAjout),
    },
  });

  computeTotalMoney();
  computeCategorieStat();
}

function renderProduct() {
  let exportWrapperDate = document.getElementById("exportWrapperDate");
  let exportDate = new Date();
  let dateString = formatDate(exportDate);
  exportWrapperDate.innerHTML = `Rapport du ${dateString}`;

  if (products.length > 0) {
    empty.classList.add("Hinactive");
  } else {
    empty.classList.remove("Hinactive");
  }

  let exportProducts = document.getElementById("exportProducts");
  let productsContainer = document.getElementById("productsContainer");

  let totalProduct = document.getElementById("totalProduct");
  let exportTotalProduct = document.getElementById("exportTotalProduct");

  productsContainer.innerHTML = "";
  exportProducts.innerHTML = "";

  totalProduct.innerHTML = `${products.length} Produits`;
  exportTotalProduct.innerHTML = `${products.length} Produits`;

  let devise = localStorage.getItem("amonDevise");

  for (let i = 0; i <= products.length - 1; i++) {

    if(products[i].catId == undefined){
     
    
    productsContainer.innerHTML += `
    
              <div class="productItem">

                <div class="productItemClass">
                    
                    <button class="tertiaryBtn" onclick="incrementProduct(event);showNouveauStockView()" id="${products[i].id}">Nouveau stock</button>
                    <button class="tertiaryBtn" onclick="decrementProduct(event);showNouvelleVenteView()" id="${products[i].id}">Nouvelle vente</button>
              
                    <button onclick="editProduct(event)" class="tertiaryBtn" id="${products[i].id}">Editer</button>
                    <button onclick="deleteProduct(event)" class="tertiaryBtn" id="${products[i].id}">Supprimer</button>
        
                 </div>


                   <div class="productItemTitle">
                      <h3>${products[i].nom}</h3>
                      <div class="clickArea">
                        <img src="images/option.svg" />
                      </div>    
                   </div>
                  <table>
                      <tr>
                          <td>Prix d'achat</td>
                          <td>${Afro.formatNumWithWhiteSpace(products[i].prix)} ${devise}</td>
                      </tr>
                      <tr>
                          <td>Fournisseur</td>
                          <td>${products[i].fournisseur}</td>
                      </tr>
                      <tr>
                          <td>Marque</td>
                          <td>${products[i].marque}</td>
                      </tr>
                      <tr>
                          <td>Quantite</td>
                          <td>${products[i].quantite}</td>
                      </tr>
                      <tr>
                          <td>Ajouter le</td>
                          <td>${products[i].addAt}</td>
                      </tr>
                      <tr>
                          <td>Modifier le</td>
                          <td>${products[i].modifiedAt}</td>
                      </tr>
                  </table>

                 
              </div>
              `;

    exportProducts.innerHTML += `
              <div class="productItem">
                  <h3>${products[i].nom}</h3>
                  <table>
                      <tr>
                          <td>Prix d'achat</td>
                          <td>${Afro.formatNumWithWhiteSpace(products[i].prix)} ${devise}</td>
                      </tr>
                      <tr>
                          <td>Fournisseur</td>
                          <td>${products[i].fournisseur}</td>
                      </tr>
                      <tr>
                          <td>Marque</td>
                          <td>${products[i].marque}</td>
                      </tr>
                      <tr>
                          <td>Quantite</td>
                          <td>${products[i].quantite}</td>
                      </tr>
                      <tr>
                          <td>Ajouter le</td>
                          <td>${products[i].addAt}</td>
                      </tr>
                      <tr>
                          <td>Modifier le</td>
                          <td>${products[i].modifiedAt}</td>
                      </tr>
                  </table>
              </div>
              `;

        }
  }

  
}

renderProduct();
let EditProductElement = document.querySelector("#EditProduct");
let nomEditInput = document.querySelector("#nomEditInput");
let prixEditInput = document.querySelector("#prixEditInput");
let prixVenteEditInput = document.querySelector("#prixVenteEditInput");
let fournisseurEditInput = document.querySelector(
  "#fournisseurEditInput"
);
let fournisseurMarqueEdit = document.querySelector(
  "#fournisseurMarqueEdit"
);
let productIdToEdit = 0;

async function editProduct(event) {
  let id = event.target.id;
  productIdToEdit = id;
  EditProductElement.classList.remove("inactive");

  for (let i = 0; i <= products.length - 1; i++) {
    if (products[i].id == id) {
      nomEditInput.value = products[i].nom;
      prixEditInput.value = products[i].prix;
      prixVenteEditInput.value = products[i].prixVente ?? products[i].prix;
      fournisseurEditInput.value = products[i].fournisseur;
      fournisseurMarqueEdit.value = products[i].marque;

       //Prefill selected categorie
      let EditCategories = document.querySelector("#EditCategories");
      EditCategories.value =  products[i].catId;

      //Prefill product color
      if(products[i].color != undefined){
        let colorEdit = document.querySelector("#colorEdit");
        colorEdit.value = products[i].color;
      }

      //Prefill product caracteristiques
      ProductCaracteristique.cars = products[i].cars;
      ProductCaracteristique.initEdit();

      //Prefill product image
      let importImage = document.querySelector(".importImageEdit");
      if(products[i].imageId != undefined){
        let imageFile = await ProductImageService.getImageFile( products[i].imageId);
        if(imageFile == undefined){
          importImage.style.backgroundImage = ``;
          importImage.innerHTML = `
          <img src="images/addImage.svg" alt="" width="24px">
          <div>Importer une image</div>
          `
          return;
        }
        let url = URL.createObjectURL(imageFile);
        importImage.style.backgroundImage = `url(${url})`;
        importImage.innerHTML = "";
        imageProductFile = imageFile;
      }else{
        
        importImage.style.backgroundImage = ``;
        importImage.innerHTML = `
        <img src="images/addImage.svg" alt="" width="24px">
        <div>Importer une image</div>
        `
      }
      
    }
  }


  renderProduct();
}

function deleteProduct(event) {
  if (confirm("Voulez vous vraiment supprimer le produit ?")) {
    let id = event.target.id;
    let index = 0;
    for (let i = 0; i <= products.length - 1; i++) {
      if (products[i].id == id) {
        index = i;
      }
    }
    products.splice(index, 1);
    saveToDB();
    renderProduct();
    computeTotalMoney();
    computeCategorieStat();
  }
}

async function editProductSave() {
  

  let id = productIdToEdit;

  let EditCategories = document.querySelector("#EditCategories");
  let catId =   EditCategories.value ;

  if (nomEditInput.value.trim().length == 0) {
    Afro.show_negative_message("Nom invalide");
    return;
  }
  if (prixEditInput.value <= 0) {
    Afro.show_negative_message("Prix d'achat invalide!");
    return;
  }
  if (prixVenteEditInput.value <= 0) {
    Afro.show_negative_message("Prix de vente invalide!");
    return;
  }
  if (fournisseurEditInput.value.trim().length == 0) {
    Afro.show_negative_message("Fournisseur invalide!");
    return;
  }
  for (let i = 0; i <= products.length - 1; i++) {
    if (products[i].id == id) {
      let imageId = await ProductImageService.editProductImage(products[i].id ,products[i].imageId);

      products[i].nom = nomEditInput.value.trim();
      products[i].prix = prixEditInput.value.trim();
      products[i].marque = fournisseurMarqueEdit.value.trim();
      products[i].fournisseur = fournisseurEditInput.value.trim();
      let date = new Date();
      products[i].modifiedAt = formatDate(date);
      products[i].catId = catId;
      products[i].prixVente = prixVenteEditInput.value;

      if(imageId != -1){
        products[i].imageId = imageId;
      }
      
    }
  }
 
  renderProduct();
  closeEditProduct();
  saveToDB();
  computeTotalMoney();
  computeCategorieStat();
}

function closeEditProduct() {
  EditProductElement.classList.add("inactive");
}

function incrementProduct(event) {
  let id = event.target.id;
  let index = -1;
  for (let i = 0; i <= products.length - 1; i++) {
    if (products[i].id == id) {
      index = i;
      products[i].quantite++;
      localStorage.setItem("currentProductIndex", `${i}`);
    }
  }
  // saveToDB();
  // renderProduct();
  // addToHistoryAjout(products[index]);
}

function decrementProduct(event) {
  let id = event.target.id;
  let index = -1;
  for (let i = 0; i <= products.length - 1; i++) {
    if (products[i].id == id) {
      index = i;
      localStorage.setItem("currentProductIndex", `${i}`);
      if (products[i].quantite == 0) {
        break;
      }
      products[i].quantite--;
    }
  }
  // saveToDB();
  // renderProduct();
  // addToHistoryRetrait(products[index]);
}

function addToHistoryAjout(produit) {
  let date = new Date();
  let today = getToday();
  let fullDate = formatDate(date);
  produit.at = today;
  produit.fullDate = fullDate;
  historyAjout.unshift(produit);
  saveHistoryAjoutToDB();
}

function addToHistoryRetrait(produit) {
  let date = new Date();
  let today = getToday();
  let fullDate = formatDate(date);
  produit.at = today;
  produit.fullDate = fullDate;
  historyRetrait.unshift(produit);
  saveHistoryRetraitToDB();
}

function getToday() {
  let date = new Date();
  let render = date.toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return render;
}

function exportAsJSON() {
  let date = new Date();
  let dateStr = formatDate(date);
  let arr = dateStr.split(" ");
  dateStr = arr.join("_");
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(products));
  var aNode = document.createElement("a");
  aNode.setAttribute("href", dataStr);
  aNode.setAttribute("download", "Amon" + dateStr + ".json");
  document.body.appendChild(aNode);
  aNode.click();
  aNode.remove();
}
