async function computeRuptureStock() {
  //Get products
  var datas = await con.select({
    from: "data",
    where: {
      id: "1",
    },
  });
  let products = JSON.parse(datas[0].products);
  let productsEnRupture = [];
  for(let i = 0 ; i<=products.length-1;i++){
    if(products[i].quantite == 0){
        productsEnRupture.push(products[i]);
    }
  }

  let ruptureBlock = document.querySelector(".ruptureBlock");
  let RuptureList = document.querySelector(".RuptureList");
  RuptureList.innerHTML = "";
  if(productsEnRupture.length == 0){
    ruptureBlock.style.display = "none";
  }else{
    ruptureBlock.style.display = "flex";
    for(let i = 0 ;i<=productsEnRupture.length -1;i++){
        RuptureList.innerHTML += `
            <div class="ruptureItem">${Afro.Ucase(productsEnRupture[i].nom)}</div>
        `
    }
  }
}

computeRuptureStock();
