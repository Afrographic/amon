
async function computeCategorieStat() {

  //Get Categories
  let categoriesAmon = localStorage.getItem("AmonCategories");
  if(categoriesAmon != null) {
    categoriesAmon = JSON.parse(categoriesAmon);
  }else{
    categoriesAmon =[];
  }
  
  categoriesAmon.push({
    catId:"",
    categoryName : "Non Classe"
  })

  //Get products
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });
  if(datas.length == 0) return;
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
      if(products[j].cars == undefined){
        products[j].cars = [];
      }
      if (products[j].catId == categoriesAmon[i].catId) {
        products_add.push(products[j]);
        // Building image template
        let imagURl = await ProductImageService.getImageURL(products[j].imageId ?? -1);
        let imageTemplate ="";
        if(imagURl.length > 0){
          imageTemplate = `<div class="productImage" style="background-image:url(${imagURl})"></div>`;
        }

        //Build More info component
        let moreInfoTemplate = Product.generateMoreInfoTemplate(products[j]);
        productsTemplate += `
        <div class="productItem">

              <div class="productItemClass productItemClassInactive" onclick="hideMenu(this)">
                  
                  <button class="tertiaryBtn" onclick="closeSearch();incrementProduct(event);showNouveauStockView();" id="${products[j].id}">Nouveau Stock</button>
                  <button class="tertiaryBtn" onclick="closeSearch();decrementProduct(event);showNouvelleVenteView()" id="${products[j].id}">Nouvelle Vente</button>
            
                  <button class="tertiaryBtn" onclick="closeSearch();editProduct(event)" id="${products[j].id}">Editer</button>
                  <button  class="tertiaryBtn" onclick="closeSearch();deleteProduct(event)" id="${products[j].id}">Supprimer</button>
        
              </div>

          ${imageTemplate}
          
          <div class="productItemTitle">
              <h3>${Afro.Ucase(products[j].nom)}</h3>
              <div class="row aic g16">
                  <img src="images/info.svg" width="24px"/>
                  <div class="clickArea" onclick="showMenu(this)">
                     <img src="images/option.svg" />
                  </div>  
              </div>
                
           </div>
          
          <table>
              <tr>
                  <td>Prix de vente</td>
                  <td>${Afro.formatNumWithWhiteSpace(products[j].prixVente)} ${devise}</td>
              </tr>
              <tr>
                  <td>Quantite</td>
                  <td>${products[j].quantite}</td>
              </tr>
          </table>

          
      </div>
        `
      }
    }
    categoriesAmon[i].products = products_add;
    categoriesAmon[i].productsTemplate = productsTemplate;
  }

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
    for(let k = 0 ; k<= products_add.length-1;k++){
      categoriesAmon[i].benefice += parseInt(products_add[k].prixVente) - parseInt(products_add[k].prix);
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
        `
    }
  }

  computeRuptureStock();
 
}


function showMenu(el){
  el.parentNode.parentNode.parentNode.firstElementChild.classList.remove("productItemClassInactive")
}

function hideMenu(el){
  el.classList.add("productItemClassInactive")
}

computeCategorieStat();
