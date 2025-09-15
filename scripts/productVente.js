async function showNouvelleVenteView() {
    let nouveauVente = document.querySelector(".nouvelleVente");
    let nombrePiecesVente = document.querySelector("#nombrePiecesVente");
    nouveauVente.classList.remove("inactive");
    nombrePiecesVente.focus();
    nombrePiecesVente.value="";
    //Set screen title
    let product = await getProduct();
    let title = `Veuillez renseigner le nombre de pieces du produit ${product.nom} que vous avez vendu`;
    let titleNouveauVente = document.querySelector("#titleNouveauVente");
    titleNouveauVente.innerHTML = `${title}`;
    let prixVente = document.querySelector("#prixVente");
    prixVente.value = product.prixVente ?? product.prix;
  }
  
  function hideNouvelleVenteView() {
    let nouveauStock = document.querySelector(".nouvelleVente");
    nouveauStock.classList.add("inactive");
  }
  
  async function addNewVente() {
    let nombrePiecesVente = document.querySelector("#nombrePiecesVente");
    let prixVente = document.querySelector("#prixVente")
    let nbr = parseInt(nombrePiecesVente.value);
    prixVente = parseInt(prixVente.value);
    if (isNaN(nbr)) {
      alert("Nombre de piece invalide");
      return;
    }
    if(isNaN(prixVente)){
      alert("Veuillez inserer le prix de vente")
      return;
    }
    let currentIndex = getCurrentProductIndex();
    let products = await getProductsStock();
    if(nbr > products[currentIndex].quantite){
        alert("Erreur : nombre de pieces ne peut pas etre superieure au stock disponible");
        return;
    }
    products[currentIndex].quantite -= nbr;
    //Save products to DB
    await con.update({
      in: "data",
      where: {
        id: "1",
      },
      set: {
        products: JSON.stringify(products),
      },
    });
    //Save history ajout to DB
    var datas = await con.select({
      from: "data",
      where: {
        id: "1",
      },
    });
    historyRetrait = JSON.parse(datas[0].historyRetrait);
  
    //Add to history ajout
    let produit = products[currentIndex];
    for (let i = 1; i <= nbr; i++) {
      let date = new Date();
      let today = getToday();
      let fullDate = formatDate(date);
      produit.at = today;
      produit.fullDate = fullDate;
      produit.prixVente = prixVente;
      historyRetrait.unshift(produit);
    }
  
    await con.update({
      in: "data",
      where: {
        id: "1",
      },
      set: {
        historyRetrait: JSON.stringify(historyRetrait),
      },
    });

    console.log(historyRetrait);
    //Close view
    hideNouvelleVenteView();
    renderProduct();
    // recompute stats
    getVentesStats();
    computeTotalMoney();
  }
  
  async function getHistory() {
    var datas = await con.select({
      from: "data",
      where: {
        id: "1",
      },
    });
    historyRetrait = JSON.parse(datas[0].historyRetrait);
    historyAjout = JSON.parse(datas[0].historyAjout);
  }
  
  function getCurrentProductIndex() {
    let currentId = localStorage.getItem("currentProductIndex");
    currentId = parseInt(currentId);
    return currentId;
  }
  
  async function getProduct() {
    let products = await getProductsStock();
    let currentId = localStorage.getItem("currentProductIndex");
    currentId = parseInt(currentId);
    return products[currentId];
  }
  
  async function getProductsStock() {
    var datas = await con.select({
      from: "data",
      where: {
        id: "1",
      },
    });
    products = JSON.parse(datas[0].products);
    return products;
  }
  