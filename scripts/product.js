class Product {
  static currentProductId;
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
    console.log(product.cars.length);
    if (product.cars.length == 0) {
      carsTemplate = "";
    }
    //More Information template
    //Compute fournisseur name
    let fournisseur = "Non Defini";

    for (let i = 0; i <= FournisseurSelect.fournisseurs.length - 1; i++) {
      if (FournisseurSelect.fournisseurs[i].id == product.fournisseurId) {
        fournisseur = FournisseurSelect.fournisseurs[i].fullname;
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
         <div class="productInfo productInfoInactive" id="product-info${product.id}">  
            <img src="images/back.svg" width="24px" onclick="Product.closeProductInfo(this)"/>
            <h2>${product.nom}</h2>
                ${carsTemplate}
            <div>
                <p>Plus d'informations </p>
                ${more_info}
            </div>
         </div>
        `;

    return productInfo;
  }

  static async generateProductItemTemplate(product) {
    let moreInfoTemplate = Product.generateMoreInfoTemplate(product);

    // Building image template
    let imagURl = await ProductImageService.getImageURL(product.imageId ?? -1);
    let imageTemplate = "";
    if (imagURl.length > 0) {
      imageTemplate = `<div class="productImage" style="background-image:url(${imagURl})"></div>`;
    }

    //Color template
    let colorTemplate = "";
    if (product.color != undefined) {
      colorTemplate = `<div  class="colorItem " style="background-color:${product.color}"></div>`;
    }

    let template = `<div class="productItem">
        
              <div class="productItemClass productItemClassInactive" onclick="hideMenuProduct(this)">
                  
                  <div class="tertiaryBtn" onclick="closeSearch();incrementProduct(event);showNouveauStockView();" id="${product.id}">
                    <img src="images/stock.svg" width="20px"/>
                    <div>  Nouveau Stock ${Afro.Ucase(product.nom)}</div>
                
                  </div>
                 
            
                  <div class="tertiaryBtn" onclick="closeSearch();editProduct(event)" id="${product.id}">
                   <img src="images/edit.svg" width="24px"/>
                    Editer ${Afro.Ucase(product.nom)}
                  </div>
                  <div  class="tertiaryBtn" onclick="closeSearch();deleteProduct(event)" id="${product.id}">
                   <img src="images/delete.svg" width="24px"/>
                  Supprimer ${Afro.Ucase(product.nom)}
                  </div>
        
              </div>

          ${imageTemplate}
          
          <div class="productItemTitle">
              <h3 class="f1">${Afro.Ucase(product.nom)}</h3>
              <div class="row aic g16">
                  ${colorTemplate}
                  <img src="images/info.svg" width="24px" onclick="showMoreInfo(this,'${product.id}')"/>
                  <div class="clickArea" onclick="showMenuProduct(this)">
                     <img src="images/option.svg" />
                  </div>  
              </div>
                
           </div>
          
          <table>
              <tr>
                  <td>Prix de vente</td>
                  <td>${Afro.formatNumWithWhiteSpace(product.prixVente)} ${devise}</td>
              </tr>
              <tr>
                  <td>Quantite</td>
                  <td>${product.quantite}</td>
              </tr>
          </table>

          ${moreInfoTemplate}

          
      </div>
        `;
    return template;
  }

  static closeProductInfo(el) {
    el.parentNode.classList.add("productInfoInactive");
  }
}
