class ImageEdit {
  static crop_to_square() {
    Edit.close_image_edit();
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        // Crop image
        let img = new Image();
        img.src = URL.createObjectURL(Create.artboard[i].file);

        img.onload = () => {
          Create.artboard[i].url = Utils.cropImageToSquare(img);
          Create.render();
        };
      }

      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            // Crop image
            let img = new Image();
            img.src = URL.createObjectURL(Create.artboard[i].children[j].file);

            img.onload = () => {
              Create.artboard[i].children[j].url = Utils.cropImageToSquare(img);
              Create.render();
            };
          }
        }
      }
    }
  }

  static crop_to_16_9() {
    Edit.close_image_edit();
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        // Crop image
        let img = new Image();
        img.src = URL.createObjectURL(Create.artboard[i].file);

        img.onload = () => {
          Create.artboard[i].url = Utils.crop_16_9(img);
          Create.render();
        };
      }

      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            // Crop image
            let img = new Image();
            img.src = URL.createObjectURL(Create.artboard[i].children[j].file);

            img.onload = () => {
              Create.artboard[i].children[j].url = Utils.crop_16_9(img);
              Create.render();
            };
          }
        }
      }
    }
  }

  static replaceImage(e) {
    if (e.target.files.length == 0) return;
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].file = e.target.files[0];
        Create.artboard[i].url = URL.createObjectURL(e.target.files[0]);
        Create.render();
      }

      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].file = e.target.files[0];
            Create.artboard[i].children[j].url = URL.createObjectURL(
              e.target.files[0]
            );
            Create.render();
          }
        }
      }
    }
    Edit.close_image_edit();
  }
}
