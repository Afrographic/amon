async function showNouveauStockView() {
  let nouveauStock = document.querySelector(".nouveauStock");
  let nombrePiecesStock = document.querySelector("#nombrePiecesStock");
  nouveauStock.classList.remove("inactive");
  nombrePiecesStock.focus();
  nombrePiecesStock.value="";
  //Set screen title
  let product = await getProduct();
  let title = `Veuillez renseigner le nombre de pieces pour ${product.nom} que vous venez de recevoir`;
  let titleNouveauStock = document.querySelector("#titleNouveauStock");
  titleNouveauStock.innerHTML = `${title}`;
}

function hideNouveauStockView() {
  let nouveauStock = document.querySelector(".nouveauStock");
  nouveauStock.classList.add("inactive");
}

async function addNewStock() {
  let nombrePiecesStock = document.querySelector("#nombrePiecesStock");
  let nbr = parseInt(nombrePiecesStock.value);
  if (isNaN(nbr)) {
    alert("Nombre de piece invalide");
    return;
  }
  let currentIndex = getCurrentProductIndex();
  let products = await getProductsStock();
  products[currentIndex].quantite = parseInt(products[currentIndex].quantite) + nbr;
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
  historyAjout = JSON.parse(datas[0].historyAjout);

  //Add to history ajout
  let produit = products[currentIndex];
  for (let i = 1; i <= nbr; i++) {
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
  //Close view
  hideNouveauStockView();
  renderProduct();
  computeTotalMoney();
  computeCategorieStat();
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
