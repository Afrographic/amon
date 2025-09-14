let TodayStat = document.querySelector("#TodayStat");
let weekStat = document.querySelector("#weekStat");
let yearStat = document.querySelector("yearStat");
let devise = localStorage.getItem("amonDevise");

let ventes = [];

async function getVentesStats() {

  devise = localStorage.getItem("amonDevise");

  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });

  let historyRetrait = JSON.parse(datas[0].historyRetrait);
  console.log(historyRetrait);

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
        if(historyRetrait[i].prixVente == undefined){
          historyRetrait[i].prixVente = historyRetrait[i].prix
        }
        products.push(historyRetrait[i]);
      }
    }

    listToRender.unshift({
      date: day,
      products: products,
    });
  }


  // Set today stat
  let TodayMoney = document.querySelector("#TodayMoney");
  let todayTotalProduct = document.querySelector("#todayTotalProduct");
  todayTotalProduct.innerHTML = `${listToRender[0].products.length} Produits`;
  let total = 0;
  let benefDay = 0;
  for (let i = 0; i <= listToRender[0].products.length - 1; i++) {
    total += parseInt(listToRender[0].products[i].prix);
    benefDay += listToRender[0].products[i].prixVente - listToRender[0].products[i].prix;
  }
  TodayMoney.innerHTML = `${Afro.formatNumWithWhiteSpace(total)} ${devise}`;
  let benefTodayMoney = document.querySelector("#benefTodayMoney");
  benefTodayMoney.innerHTML = `${Afro.formatNumWithWhiteSpace(benefDay)} ${devise}`;

  //set month stat
  let monthMoney = document.querySelector("#monthMoney");
  let totalMonthProduct = document.querySelector("#totalMonthProduct");
  let totalMoneyMonth = 0;
  let totalMonthProductVariable = 0;
  let benefMonthMoney = 0;
  for (let i = 0; i <= listToRender.length - 1; i++) {
    for (let j = 0; j <= listToRender[i].products.length - 1; j++) {
      totalMoneyMonth += parseInt(listToRender[i].products[j].prix);
      benefMonthMoney += listToRender[i].products[j].prixVente - listToRender[i].products[j].prix;
    }
    totalMonthProductVariable += listToRender[i].products.length;
  }
  monthMoney.innerHTML = `${Afro.formatNumWithWhiteSpace(totalMoneyMonth)} ${devise}`;
  totalMonthProduct.innerHTML = `${totalMonthProductVariable} Produits`;
  let benefMonthMoneyView = document.querySelector("#benefMonthMoney");
  benefMonthMoneyView.innerHTML = `${Afro.formatNumWithWhiteSpace(benefMonthMoney)} ${devise}`;


}

getVentesStats();
