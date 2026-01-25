class Product {
  static generateMoreInfoTemplate(product) {
    let devise = localStorage.getItem("amonDevise");
    // Caracteristiques Template
    let carsTemplate = `
        <div>
            <p>Caracteristiques</p>
            <table>
    `;
    for (let i = 0; i <= product.cars.length - 1; i++) {
      carsTemplate += `
            <tr>
               <td>${Afro.Ucase(product.cars[i].prop)}</td>
               <td>${Afro.Ucase(product.cars[i].val)}</td>
            </tr>
            `;
    }
    carsTemplate += `
            </table>
        </div>
    `;
    if (product.cars.length == 0) {
      carsTemplate = "";
    }
    //More Information template
    //Compute fournisseur name
    let fournisseur = "Non Defini";
    let collectionsAmon = localStorage.getItem("AmonFournisseurs");
    if (collectionsAmon != null) {
      if (collectionsAmon != undefined) {
        collectionsAmon = JSON.parse(collectionsAmon);
        for(let i = 0 ; i<=collectionsAmon.length-1;i++){
            if(collectionsAmon[i].catId == product.fournisseurId){
                fournisseur = collectionsAmon[i].categoryName;
            }
        }
      }
    }

    let more_info = `
        <table>
            <tr>
                <td>Prix d'achat</td>
                <td>${Afro.formatNumWithWhiteSpace(product.prix)} ${devise}</td>
            </tr>
            <tr>
                <td>Fournisseur</td>
                <td>${fournisseur}</td>
            </tr>
            <tr>
                <td>Ajouter le</td>
                <td>${product.addAt}</td>
            </tr>
            <tr>
                <td>Modifier le</td>
                <td>${product.modifiedAt}</td>
            </tr>
        </table>
        `;

    // Product Info template
    let productInfo = `
         <div class="productInfo productInfoInactive">  
            <h3>${product.nom}</h3>
                ${carsTemplate}
            <div>
                <p>Plus d'informations </p>
                ${more_info}
            </div>
            <div class="primary_btn" onclick="Product.closeProductInfo(this)">OK</div>
         </div>
        `;

    return productInfo;
  }

  static closeProductInfo(el) {
    el.parentNode.classList.add("productInfoInactive");
  }
}
