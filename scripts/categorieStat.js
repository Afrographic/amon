async function computeCategorieStat() {
  //Get Categories
  let categoriesAmon = localStorage.getItem("AmonCategories");
  categoriesAmon = JSON.parse(categoriesAmon);

 

  //Get products
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });
  let products = JSON.parse(datas[0].products);

  //Get sell history
  let sellHistory = JSON.parse(datas[0].historyRetrait);

  //Compute categorie total product
  for (let i = 0; i <= categoriesAmon.length - 1; i++) {
    let products_add = [];
    for (let j = 0; j <= products.length - 1; j++) {
      if (products[j].catId == categoriesAmon[i].catId) {
        products_add.push(products[j]);
      }
    }
    categoriesAmon[i].products = products_add;
  }

  //Compute vente per categories
  for (let i = 0; i <= categoriesAmon.length - 1; i++) {
    let products_add = [];
    let benefice = 0;
    for (let j = 0; j <= sellHistory.length - 1; j++) {
      if (sellHistory[j].catId == categoriesAmon[i].catId) {
        products_add.push(sellHistory[j]);
        //Compute benefice
        if (sellHistory[j].prixVente == undefined) {
          sellHistory[j].prixVente = historyRetrait[i].prix;
        }
        benefice += sellHistory[j].prixVente - historyRetrait[i].prix;
      }
    }
    categoriesAmon[i].sellProducts = products_add;
    categoriesAmon[i].benefice = benefice;
  }

  console.log(categoriesAmon);

  //render view

  //Get devise
  let devise = localStorage.getItem("amonDevise");
  let cats = document.querySelector(".cats");
  cats.innerHTML = "";
  if (categoriesAmon.length == 0) {
    cats.computedStyleMap.display = "none";
  } else {
    cats.computedStyleMap.display = "flex";
    for (let i = 0; i <= categoriesAmon.length - 1; i++) {
        cats.innerHTML += `
        <div class="catItem">
            <div>
                <div>${categoriesAmon[i].categoryName}</div>
                <div class="totalProduct">${categoriesAmon[i].products.length} Produits</div>
            </div>
            <div class="benefBlock">
                <div>Benefice</div>
                <div class="benef">${Afro.formatNumWithWhiteSpace(categoriesAmon[i].benefice)} ${devise}</div>
            </div>
        </div>
        `
    }
  }
 
  
}

computeCategorieStat();
