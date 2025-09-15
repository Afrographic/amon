let totalMoneyToEarn = document.querySelector("#totalMoneyToEarn");

async function computeTotalMoney(){
    let products = await getProductsStock();
    let total = 0;
    for(let i = 0 ;i<=products.length-1;i++){
        let price = parseInt(products[i].prix);
        let qte = parseInt(products[i].quantite);
        total += price *qte;
    }
    totalMoneyToEarn.innerHTML = `${Afro.formatNumWithWhiteSpace(total)} ${devise}`;
}
computeTotalMoney();