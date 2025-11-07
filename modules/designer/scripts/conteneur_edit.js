class ConteneurEdit {
  static set_center() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "center";
      }
    }
    Create.render();
  }
  static set_left() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "flex-start";
      }
    }
    Create.render();
  }
  static set_right() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "flex-end";
      }
    }
    Create.render();
  }
  static set_space_between() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].align = "space-between";
      }
    }
    Create.render();
  }

  static edit_radius_top_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_left_radius = el.value;
      }
    }
    Create.render();
  }
  static edit_radius_top_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_right_radius = el.value;
      }
    }
    Create.render();
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

  static edit_radius_bottom_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_left_radius = el.value;
      }
    }
    Create.render();
  }
  static edit_radius_bottom_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_right_radius = el.value;
      }
    }
    Create.render();
  }

  static edit_margin_top_bottom(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].padding_top_bottom = el.value + "vw";
      }
    }
    Create.render();
  }

  static edit_margin_left_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].padding_left_right = el.value + "vw";
      }
    }
    Create.render();
  }

  static add_conteneur_text() {
   
    let new_text = new Text();
    new_text.width = "auto";
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();

    Edit.edit_text({},new_text.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static add_title() {
   
    let new_text = new Titre();
    new_text.width = "auto"; 
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();

    Edit.edit_text({},new_text.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static add_sub_title() {
   
    let new_text = new SousTitre();
    new_text.width = "auto";
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();

    Edit.edit_text({},new_text.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static add_mini_text() {
    
    let new_text = new MiniTexte();
    new_text.width = "auto";
    //Append text to conteur
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].children.push(new_text);
      }
    }
    Create.render();

    Edit.edit_text({},new_text.id);
    // Focus text edit area
    let text_edit_input = document.querySelector("#text_edit_input");
    text_edit_input.focus();
  }

  static set_width(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].width = el.value;
      }
    }
    Create.render();
  }

  static set_bg_image(e) {
    if (e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].background_image = `url(${url})`;
        Create.artboard[i].bg_file = e.target.files[0];
      }
    }
    Create.render();
  }

  static set_vertical() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].direction = `column`;
      }
    }
    Create.render();
  }
  static set_horizontal() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].direction = `row`;
      }
    }
    Create.render();
  }

  static set_gap(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].gap = el.value;
      }
    }
    Create.render();
  }

  static set_ver_left() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].vertAlign = "flex-start";
      }
    }
    Create.render();
  }
  static set_ver_center() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].vertAlign = "center";
      }
    }
    Create.render();
  }
  static set_ver_right() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].vertAlign = "flex-end";
      }
    }
    Create.render();
  }

  static darken_bg() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        if (Create.artboard[i].bg_file == undefined) return;
        // Crop image
        let img = new Image();
        img.src = URL.createObjectURL(Create.artboard[i].bg_file);
        img.onload = () => {
          let darken_image_url = Utils.darken_image(img);
          Create.artboard[i].background_image = `url(${darken_image_url})`;
          Create.render();
        };
      }
    }
  }

  // Margins
  static set_margin_top(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_top = el.value;
      }
    }
    Create.render();
  }
  static set_margin_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_left = el.value;
      }
    }
    Create.render();
  }
  static set_margin_bottom(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_bottom = el.value;
      }
    }
    Create.render();
  }
  static set_margin_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].margin_right = el.value;
      }
    }
    Create.render();
  }
  // Opacite
  static set_opacity(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].opacity = parseInt(el.value) / 100;
      }
    }
    Create.render();
  }

  // Set Grid
  static setGrid() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].display = "Grid";
        // Set children width to 100%
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].type == "image") {
            Create.artboard[i].children[j].width = 100;
          } else {
            Create.artboard[i].children[j].width = "100%";
          }
        }
      }
    }
    Create.render();
  }

  //set Flex
  static setFlex() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].display = "flex";
        // Set children width to 100%
        for (let j = 0; j <= Create.artboard[i].children.length - 1; j++) {
          if (Create.artboard[i].children[j].type == "image") {
            Create.artboard[i].children[j].width = 50;
          } else {
            Create.artboard[i].children[j].width = "50%";
          }
        }
      }
    }
    Create.render();
  }

  //Set column count
  static setColumn(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].colonnes_pour_grille = el.value;
      }
    }
    Create.render();
  }

  //Duplicate
  static duplicate() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard.push(Create.artboard[i].clone());
      }
    }
    Create.render();
    Edit.close_conteneur_edit();
  }

  // Set Positions
  static set_position_relative() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].position = "relative";
        Create.render();
      }
    }
  }
  static set_position_absolute() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].position = "absolute";
        Create.render();
      }
    }
  }
  static setPosY(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].posY = el.value;
        Create.render();
      }
    }
  }
  static setPosX(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].posX = el.value;
        Create.render();
      }
    }
  }

  //Border Top
  static set_size_border_top(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_size = el.value;
        Create.render();
      }
    }
  }
  static set_color_border_top(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_color = el.value;
        Create.render();
      }
    }
  }
  static set_ligne_border_top() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_type = "solid";
        Create.render();
      }
    }
  }
  static set_pointilles_border_top() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_top_type = "dashed";
        Create.render();
      }
    }
  }
  //Border bottom
  static set_size_border_bottom(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_size = el.value;
        Create.render();
      }
    }
  }
  static set_color_border_bottom(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_color = el.value;
        Create.render();
      }
    }
  }
  static set_ligne_border_bottom() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_type = "solid";
        Create.render();
      }
    }
  }
  static set_pointilles_border_bottom() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_bottom_type = "dashed";
        Create.render();
      }
    }
  }
  //Border Left
  static set_size_border_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_left_size = el.value;
        Create.render();
      }
    }
  }
  static set_color_border_left(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_left_color = el.value;
        Create.render();
      }
    }
  }
  static set_ligne_border_left() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_left_type = "solid";
        Create.render();
      }
    }
  }
  static set_pointilles_border_left() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_left_type = "dashed";
        Create.render();
      }
    }
  }
  //Border Right
  static set_size_border_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_right_size = el.value;
        Create.render();
      }
    }
  }
  static set_color_border_right(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_right_color = el.value;
        Create.render();
      }
    }
  }
  static set_ligne_border_right() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_right_type = "solid";
        Create.render();
      }
    }
  }
  static set_pointilles_border_right() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].border_right_type = "dashed";
        Create.render();
      }
    }
  }

  // Configuration du degrade
  static set_degrade_first_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].deg_first_color = el.value;
        if (Create.artboard[i].background_image.trim().length == 0) {
          Create.artboard[i].background_image = `url()`;
        }
        Create.render();
      }
    }
  }
  static set_degrade_second_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].deg_second_color = el.value;
        if (Create.artboard[i].background_image.trim().length == 0) {
          Create.artboard[i].background_image = `url()`;
        }

        Create.render();
      }
    }
  }
  static set_degrade_rotate(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].deg_rotate = el.value;

        Create.render();
      }
    }
  }

  static set_degrade_lineaire() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].deg_type = "linear";
        Create.render();
      }
    }
  }

  static set_degrade_radiale() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].deg_type = "radial";
        Create.render();
      }
    }
  }

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
    }
  }
}
