class ProductImageService {
  static con2 = new JsStore.Connection();

  static async init() {
    var data = {
      name: "AmonProductImages",
      columns: {
        images: {
          notNull: true,
          dataType: "object",
        },
      },
    };

    var db = {
      name: "AmonProductImages",
      tables: [data],
    };

    await this.con2.initDb(db);
  }

  static saveProductImage(productId){
    console.log(productId);
    console.log(imageProductFile);
  }
}

ProductImageService.init();


// Import image file
function triggerFileSelect() {
  let productImageFileInput = document.querySelector("#productImageFileInput");
  productImageFileInput.click();
}

function getImage(e) {
  let file = e.target.files[0];
  let importImage = document.querySelector(".importImage");
  let url = URL.createObjectURL(file);
  importImage.style.backgroundImage = `url(${url})`;
  importImage.innerHTML = "";
  imageProductFile = file;
  console.log(imageProductFile);
}
