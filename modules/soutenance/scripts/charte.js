class Charte {
  static getPrimaryColor(e) {
    let primaryColorPrev2 = document.querySelector("#primaryColorPrev2");
    primaryColorPrev2.style.backgroundColor = `${e.target.value}`;
    this.color_flyer(e.target.value);
  }
  static openPrimaryPicker() {
    let primaryPicker = document.querySelector("#primaryPicker");
    primaryPicker.click();
    primaryPicker.blur();
  }
  static color_flyer(color){
    let darkColor = Tools.darkenColor(color,50)
    // Theme label
    let v1_theme = document.querySelector(".v1_theme");
    v1_theme.style.backgroundColor = color;
    // Theme background
    let v1_theme_content = document.querySelector("#v1_theme_content");
    v1_theme_content.style.backgroundColor = darkColor;
    // Filiere label
    let v1_option_label = document.querySelector(".v1_option_label");
    v1_option_label.style.backgroundColor = darkColor;
    // Filiere text
    let v1_filiere = document.querySelector("#v1_filiere");
    v1_filiere.style.color = color;
    // Date container
    let v1_date_container = document.querySelector("#v1_date_container");
    v1_date_container.style.backgroundColor = darkColor;
    // Time container
    let v1_time_container = document.querySelector("#v1_time_container");
    v1_time_container.style.backgroundColor = darkColor;
  }
}

Charte.color_flyer("#21BFFF");
