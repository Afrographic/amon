class ProductImageService {
  static con2 = new JsStore.Connection();

  static async init() {
    var data = {
      name: "AmonProductImages",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
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

  static async saveProductImage(productId) {
    let imageItem = {
      productId: productId,
      imageFile: imageProductFile,
    };

    let images = await this.con2.insert({
      into: "AmonProductImages",
      values: [
        {
          images: imageItem,
        },
      ],
      return: true,
    });

    return images[0].id;
  }

  static async editProductImage(productId,imageId) {
    console.log(productId);
    console.log(imageId);
    imageId = imageId ?? -1;
    let imageItem = {
      productId: productId,
      imageFile: imageProductFile,
    };

    let updated = await this.con2.update({
      in: "AmonProductImages",
      set: {
        images: imageItem,
      },
      where: {
        id: imageId,
      },
    });

    if (updated == 0) {
      // The product didn't have an image
      let images = await this.con2.insert({
        into: "AmonProductImages",
        values: [
          {
            images: imageItem,
          },
        ],
        return: true,
      });
      return images[0].id;
    }else{
        return -1;
    }
  }
 
  static async getImageFile(imageId){
    let images = await this.con2.select({
        from: "AmonProductImages",
        where : {
            id : imageId
        }
    });
    return images[0].images.imageFile
  }

  static async getImageURL(imageId){
    let images = await this.con2.select({
        from: "AmonProductImages",
        where : {
            id : imageId
        }
    });

    if(images.length > 0){
       let file =  images[0].images.imageFile;
       if(file == undefined) return "";
       return URL.createObjectURL(file);
    }else{
        return "";
    }

  }
}

ProductImageService.init();

// Import image file
function triggerFileSelect() {
  let productImageFileInput = document.querySelector("#productImageFileInput");
  productImageFileInput.click();
}

function getImage(e) {
  if (e.target.files.length == 0) return;
  let file = e.target.files[0];
  let importImage = document.querySelector(".importImage");
  let url = URL.createObjectURL(file);
  importImage.style.backgroundImage = `url(${url})`;
  importImage.innerHTML = "";
  imageProductFile = file;
}

// Import image file
function triggerFileSelectEdit() {
  let productImageFileInput = document.querySelector(
    "#productImageEditFileInput"
  );
  productImageFileInput.click();
}

function getImageEdit(e) {
  if (e.target.files.length == 0) return;
  let file = e.target.files[0];
  let importImage = document.querySelector(".importImageEdit");
  let url = URL.createObjectURL(file);
  importImage.style.backgroundImage = `url(${url})`;
  importImage.innerHTML = "";
  imageProductFile = file;
}
