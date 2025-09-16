async function showHistoryAjout() {
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });

  let historyAjout = JSON.parse(datas[0].historyAjout);

  let listToRender = [];
  let currentMonth = getCurrentMonth();
  let currentYear = getCurrentYear();
  let currenDay = getCurrentDay();

  for (let i = 1; i <= parseInt(currenDay); i++) {
    let day = `${i} ${currentMonth} ${currentYear}`;
    let products = [];

    //Fetch corresponding products
    for (let i = 0; i <= historyAjout.length - 1; i++) {
      if (historyAjout[i].at == day) {
        products.push(historyAjout[i]);
      }
    }

    //get unique products
    let uniqueProducts = [];
    for(let k = 0 ; k<=products.length-1;k++){
      if(!Afro.isInArray(products[k].nom,uniqueProducts)){
        uniqueProducts.unshift(products[k].nom)
      }
    }

    //count products
    let productCount = [];
    for(let i = 0 ; i<=uniqueProducts.length-1;i++){
      let productCountItem = {
        nom:uniqueProducts[i],
        products:[],
      }
      for(let j = 0 ; j<= products.length-1;j++){
        if(products[j].nom == uniqueProducts[i]){
          productCountItem.products.unshift(products[j])
        }
      }
      productCount.unshift(productCountItem);
    }

    listToRender.unshift({
      date: day,
      products: products,
      productCount:productCount
    });

  }


  //show history ajout full view
  let historyAjoutView = document.querySelector(".historyAjout");
  historyAjoutView.classList.remove("inactive");

  //render div elements
  let render = document.querySelector("#historyAjoutListingView");
  render.innerHTML = "";
  for (let i = 0; i <= listToRender.length - 1; i++) {
    render.innerHTML += `<div>`;
    render.innerHTML += `
    <div class="historyTitle">
      <div>${listToRender[i].date}</div>
      <div>${listToRender[i].products.length}</div>
    </div>
    `;
    if (listToRender[i].products.length == 0) {
      render.innerHTML += `
      <div class="historyListing">
        <div class="p16 tac">Aucun stock</div>
      </div>
      `;
    } else {
      let items = "";
      for (let j = 0; j <= listToRender[i].productCount.length - 1; j++) {
        items += `
         <div class="listingItem">
                <div>${listToRender[i].productCount[j].products.length} ${listToRender[i].productCount[j].nom}</div>
                <div>a ${getTimeOfAddedProduct(
                  listToRender[i].products[j].fullDate
                )}</div>
         </div>`;
      }

      render.innerHTML += `
      <div class="historyListing">
         ${items}
      </div>
      `;
    }
    render.innerHTML += `</div>`;
  }
}

function closeHistoryAjout() {
  let historyAjoutView = document.querySelector(".historyAjout");
  historyAjoutView.classList.add("inactive");
}

async function showHistoryRetrait() {
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });

  let historyRetrait = JSON.parse(datas[0].historyRetrait);

  let listToRender = [];
  let currentMonth = getCurrentMonth();
  let currentYear = getCurrentYear();
  let currenDay = getCurrentDay();

  for (let i = 1; i <= parseInt(currenDay); i++) {
    let day = `${i} ${currentMonth} ${currentYear}`;
    let products = [];

    //Fetch corresponding products
    for (let i = 0; i <= historyRetrait.length - 1; i++) {
      if (historyRetrait[i].at == day) {
        products.push(historyRetrait[i]);
      }
    }

    //get unique products
    let uniqueProducts = [];
    for(let k = 0 ; k<=products.length-1;k++){
      if(!Afro.isInArray(products[k].nom,uniqueProducts)){
        uniqueProducts.unshift(products[k].nom)
      }
    }

    //count products
    let productCount = [];
    for(let i = 0 ; i<=uniqueProducts.length-1;i++){
      let productCountItem = {
        nom:uniqueProducts[i],
        products:[],
      }
      for(let j = 0 ; j<= products.length-1;j++){
        if(products[j].nom == uniqueProducts[i]){
          productCountItem.products.unshift(products[j])
        }
      }
      productCount.unshift(productCountItem);
    }

    listToRender.unshift({
      date: day,
      products: products,
      productCount:productCount
    });
  }

  //show history ajout full view
  let historyAjoutView = document.querySelector(".historyRetrait");
  historyAjoutView.classList.remove("inactive");

  let devise = localStorage.getItem("amonDevise")

  //render div elements
  let render = document.querySelector("#historyRetraitListingView");
  render.innerHTML = "";
  for (let i = 0; i <= listToRender.length - 1; i++) {

    //Compute total money made
    let totalMoney = 0;
    for(k = 0 ; k<=listToRender[i].productCount.length - 1;k++){
      totalMoney += listToRender[i].products[k].prixVente * listToRender[i].productCount[k].products.length;
    }
    render.innerHTML += `<div>`;
    render.innerHTML += `
    <div class="historyTitle">
      <div>${listToRender[i].date}</div>
      <div class="green">${Afro.formatNumWithWhiteSpace(totalMoney)} ${devise}</div>
    </div>
    `;
    if (listToRender[i].products.length == 0) {
      render.innerHTML += `
      <div class="historyListing">
        <div class="p16 tac">Aucune vente</div>
      </div>
      `;
    } else {
      let items = "";
      for (let j = 0; j <= listToRender[i].productCount.length - 1; j++) {
        items += `
         <div class="listingItem">
                <div>${listToRender[i].productCount[j].products.length} ${listToRender[i].productCount[j].nom}</div>
                <div>${Afro.formatNumWithWhiteSpace(
                  listToRender[i].products[j].prixVente * listToRender[i].productCount[j].products.length)
                } ${devise}</div>
         </div>`;
      }

      render.innerHTML += `
      <div class="historyListing">
         ${items}
      </div>
      `;
    }
    render.innerHTML += `</div>`;
  }
}

function closeHistoryRetrait(){
  let historyAjoutView = document.querySelector(".historyRetrait");
  historyAjoutView.classList.add("inactive");
}

function getTimeOfAddedProduct(date) {
  date = date.split("à");
  return date[1];
}

function getCurrentMonth() {
  let date = new Date();
  let render = date.toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  render = render.split(" ");
  return render[1];
}

function getCurrentYear() {
  let date = new Date();
  let render = date.toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  render = render.split(" ");
  return render[2];
}

function getCurrentDay() {
  let date = new Date();
  let render = date.toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  render = render.split(" ");
  return render[0];
}

function getMonth(date) {
  let dateSplitted = date.split(" ");
  return dateSplitted[1];
}


/*
 let product = {
    nom: "nom",
    prix: "prix",
    fournisseur: "fournisseur",
    marque: "Marque",
    quantite: 0,
    addAt: "addAt",
    modifiedAt: "modifiedAt",
    id: 1450554555,
    at:12 janvier 2015,
    fullDate:12 janvier 2018 a 12 h 15
  };
*/
