class Charte {
  static init_coloring() {
    let primary = localStorage.getItem("primary_color_meet");
    if (primary == null) return;
    this.color_flyer(primary);
  }

  static getPrimaryColor(e) {
    let primaryColorPrev2 = document.querySelector("#primaryColorPrev2");
    primaryColorPrev2.style.backgroundColor = `${e.target.value}`;
    localStorage.setItem("primary_color_meet", e.target.value);
    this.color_flyer(e.target.value);
  }

  static openPrimaryPicker() {
    let primaryPicker = document.querySelector("#primaryPicker");
    primaryPicker.click();
    primaryPicker.blur();
  }

  static color_flyer(color) {
    //preview indicator
    let primaryColorPrev2 = document.querySelector("#primaryColorPrev2");
    primaryColorPrev2.style.backgroundColor = color;
    // date and hour background
    let m1_date_heure = document.querySelector("#m1_date_heure");
    m1_date_heure.style.backgroundColor = color;
    // Intervenant text
    let m1_intervenant_label = document.querySelector("#m1_intervenant_label");
    m1_intervenant_label.style.color = color;
    //Intervenant border image
    let m1_image_container = document.querySelector("#m1_image_container");
    m1_image_container.style.border = `2px solid ${color}`;
  }
}

