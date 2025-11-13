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

  static crop_left(input) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].crop_left = input.value;
        this.crop();
      }
    }
   
  }
  static crop_top(input) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].crop_top = input.value;
        this.crop();
      }
    }
  }
  static crop_right(input) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].crop_right = input.value;
        this.crop();
      }
    }
  }
  static crop_bottom(input) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].crop_bottom = input.value;
        this.crop();
      }
    }
  }

  // Crop image
  static async crop() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        // Crop image
        let img = new Image();
        img.src = URL.createObjectURL(Create.artboard[i].file);
        await img.decode();
        Create.artboard[i].url = Utils.cropImage(
          img,
          parseInt(Create.artboard[i].crop_top),
          parseInt(Create.artboard[i].crop_right),
          parseInt(Create.artboard[i].crop_bottom),
          parseInt(Create.artboard[i].crop_left)
        );
        Create.render();
      }

      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            let img = new Image();
            img.src = URL.createObjectURL(Create.artboard[i].children[j].url);
            await img.decode();
            Create.artboard[i].children[j].url = Utils.cropImage(
              img,
              parseInt(top),
              parseInt(right),
              parseInt(bottom),
              parseInt(left)
            );
            Create.render();
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

  static set_opacity(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].opacity = parseInt(el.value) / 100;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].opacity = parseInt(el.value) / 100;
            Create.render();
          }
        }
      }
    }
  }

  // MArges
  static set_margin_top(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_top = el.value;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].margin_top = el.value;
            Create.render();
          }
        }
      }
    }
  }
  static set_margin_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_left = el.value;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].margin_left = el.value;
            Create.render();
          }
        }
      }
    }
  }
  static set_margin_bottom(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_bottom = el.value;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].margin_bottom = el.value;
            Create.render();
          }
        }
      }
    }
  }

  static set_margin_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_right = el.value;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].margin_right = el.value;
            Create.render();
          }
        }
      }
    }
  }

  // Set Positions
  static set_position_relative() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].position = "relative";
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].position = "relative";
            Create.render();
          }
        }
      }
    }
  }
  static set_position_absolute() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].position = "absolute";
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].position = "absolute";
            Create.render();
          }
        }
      }
    }
  }
  static setPosY(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].posY = el.value;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].posY = el.value;
            Create.render();
          }
        }
      }
    }
  }

  static set_transform_rotate(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].rotate = el.value;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].rotate = el.value;
            Create.render();
          }
        }
      }
    }
  }

  static setPosX(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].posX = el.value;
        Create.render();
      }
      // Edit  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children[j].posX = el.value;
            Create.render();
          }
        }
      }
    }
  }

  static remove_uni_bg() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        // Remove white BG
        let img = new Image();
        img.src = URL.createObjectURL(Create.artboard[i].file);
        img.onload = () => {
          let transparent_img = Utils.remove_white_background(img);
          Create.artboard[i].url = transparent_img;
          Create.render();
        };
      }

      //Remove BG in Children
      // Clone  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            let img = new Image();
            img.src = URL.createObjectURL(Create.artboard[i].children[j].file);
            img.onload = () => {
              let transparent_img = Utils.remove_white_background(img);
              Create.artboard[i].children[j].url = transparent_img;
              Create.render();
            };
          }
        }
      }
    }
  }

  static duplicate() {
    UI.hide_all();
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard.push(Create.artboard[i].clone());
        Create.render();
      }

      // Clone  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            Create.artboard[i].children.push(
              Create.artboard[i].children[j].clone()
            );
            Create.render();
          }
        }
      }
    }
  }

  //l'odre
  static forward() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        if (i < Create.artboard.length - 1) {
          let temp = Create.artboard[i];
          Create.artboard[i] = Create.artboard[i + 1];
          Create.artboard[i + 1] = temp;
        }
        Create.render();
        break;
      }

      // Move  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            if (j < Create.artboard[i].children.length - 1) {
              let temp = Create.artboard[i].children[j];
              Create.artboard[i].children[j] =
                Create.artboard[i].children[j + 1];
              Create.artboard[i].children[j + 1] = temp;
            }

            Create.render();
            break;
          }
        }
      }
    }
  }

  static backward() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        if (i > 0) {
          let temp = Create.artboard[i];
          Create.artboard[i] = Create.artboard[i - 1];
          Create.artboard[i - 1] = temp;
        }
        Create.render();
      }

      // Move  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            if (j > 0) {
              let temp = Create.artboard[i].children[j];
              Create.artboard[i].children[j] =
                Create.artboard[i].children[j - 1];
              Create.artboard[i].children[j - 1] = temp;
            }
            Create.render();
          }
        }
      }
    }
  }

  static convert_to_grayscale() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        // Remove white BG
        let img = new Image();
        img.src = URL.createObjectURL(Create.artboard[i].file);
        img.onload = () => {
          let transparent_img = Utils.convert_to_grayscale(img);
          Create.artboard[i].url = transparent_img;
          Create.render();
        };
      }

      //Remove BG in Children
      // Clone  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            let img = new Image();
            img.src = URL.createObjectURL(Create.artboard[i].children[j].file);
            img.onload = () => {
              let transparent_img = Utils.convert_to_grayscale(img);
              Create.artboard[i].children[j].url = transparent_img;
              Create.render();
            };
          }
        }
      }
    }
  }

  static change_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        // Remove white BG
        let img = new Image();
        img.src = Create.artboard[i].url;
        img.onload = () => {
          let colored_image = Utils.change_color(img, el.value);
          Create.artboard[i].url = colored_image;
          Create.render();
        };
      }

      //Remove BG in Children
      // Clone  in conteneur children
      if (Create.artboard[i].children != undefined) {
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].id == Create.edit_id) {
            let img = new Image();
            img.src = Create.artboard[i].children[j].url;
            img.onload = () => {
              let colored_image = Utils.change_color(img, el.value);
              Create.artboard[i].children[j].url = colored_image;
              Create.render();
            };
          }
        }
      }
    }
  }

  static delete_image() {
    if (confirm("Voulez vous vraiment supprimer?")) {
      Edit.close_image_edit();
      let index = -1;
      for (let i = 0; i <= Create.artboard.length - 1; i++) {
        if (Create.artboard[i].id == Create.edit_id) {
          index = i;
        }

        let index2 = -1;
        if (Create.artboard[i].children != undefined) {
          for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
            if (Create.artboard[i].children[j].id == Create.edit_id) {
              index2 = j;
            }
          }
        }
        if (index2 != -1) {
          Create.artboard[i].children.splice(index2, 1);
          Create.render();
        }
      }
      if (index != -1) {
        Create.artboard.splice(index, 1);
        Create.render();
      }
    }
  }
}
