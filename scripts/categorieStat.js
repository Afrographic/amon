async function computeCategorieStat() {
  //Get Categories
  let categoriesAmon = localStorage.getItem("AmonCategories");
  if (categoriesAmon != null) {
    categoriesAmon = JSON.parse(categoriesAmon);
  } else {
    categoriesAmon = [];
  }

  categoriesAmon.push({
    catId: "",
    categoryName: "Non Classe",
  });

  //Get products
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });
  if (datas.length == 0) return;
  let products = JSON.parse(datas[0].products);

  //Get sell history
  let sellHistory = JSON.parse(datas[0].historyRetrait);
  let devise = localStorage.getItem("amonDevise");

  //Compute categorie total product
  for (let i = 0; i <= categoriesAmon.length - 1; i++) {
    let products_add = [];
    let productsTemplate = "";

    for (let j = 0; j <= products.length - 1; j++) {
      // Caracteristiques des produits
      if (products[j].cars == undefined) {
        products[j].cars = [];
      }
      if (products[j].catId == categoriesAmon[i].catId) {
        products_add.push(products[j]);

        let template = await Product.generateProductItemTemplate(products[j]);
        productsTemplate += template;
      }
    }
    categoriesAmon[i].products = products_add;
    categoriesAmon[i].productsTemplate = productsTemplate;
  }

  //Compute produits non classe
  let produitNonClasse = [];
  let productsTemplate = "";
  for (let i = 0; i <= products.length - 1; i++) {
    let catFound = false;
    let catId = products[i].catId;
    for (let j = 0; j <= categoriesAmon.length - 1; j++) {
      if (catId == categoriesAmon[j].catId) {
        catFound = true;
        break;
      }
    }
    if (!catFound) {
      produitNonClasse.push(products[i]);
      let template = await Product.generateProductItemTemplate(products[i]);
      productsTemplate += template;
    }
  }

  categoriesAmon[categoriesAmon.length - 1].products = produitNonClasse;
  categoriesAmon[categoriesAmon.length - 1].productsTemplate = productsTemplate;

  //Compute vente per categories
  for (let i = 0; i <= categoriesAmon.length - 1; i++) {
    //Collecte des produits vendus par categorie
    let products_add = [];
    let benefice = 0;
    for (let j = 0; j <= sellHistory.length - 1; j++) {
      if (sellHistory[j].catId == categoriesAmon[i].catId) {
        products_add.push(sellHistory[j]);
      }
    }
    categoriesAmon[i].sellProducts = products_add;
    categoriesAmon[i].benefice = benefice;

    //Calcul du benefice
    for (let k = 0; k <= products_add.length - 1; k++) {
      categoriesAmon[i].benefice +=
        parseInt(products_add[k].prixVente) - parseInt(products_add[k].prix);
    }
  }

  //render view

  //Get devise

  let cats = document.querySelector(".cats");
  cats.innerHTML = "";
  if (categoriesAmon.length == 0) {
    cats.computedStyleMap.display = "none";
  } else {
    cats.computedStyleMap.display = "flex";
    for (let i = 0; i <= categoriesAmon.length - 1; i++) {
      cats.innerHTML += `
        <div class="catItem">
            <div class="header">
              <div>
                  <div>${categoriesAmon[i].categoryName}</div>
                  <div class="totalProduct">${categoriesAmon[i].products.length} Produits</div>
              </div>
              <div class="benefBlock">
                  <div>Benefice</div>
                  <div class="benef">${Afro.formatNumWithWhiteSpace(categoriesAmon[i].benefice)} ${devise}</div>
              </div>
            </div>
            <div class="productsLists">
              ${categoriesAmon[i].productsTemplate}
            </div>
        </div>
        `;
    }
  }

  computeRuptureStock();
}

function showMenuProduct(el) {
  el.parentNode.parentNode.parentNode.firstElementChild.classList.remove(
    "productItemClassInactive",
  );
}

function showMoreInfo(el, id) {
  Product.currentProductId = id;
  if (window.innerWidth <= 1000) {
    history.pushState({ page: "more-info" }, "", "?more-info");
    localStorage.setItem("current-page", "more-info");
  }
  el.parentNode.parentNode.parentNode.lastElementChild.classList.remove(
    "productInfoInactive",
  );
}

function hideMenuProduct(el) {
  el.classList.add("productItemClassInactive");
}

computeCategorieStat();
