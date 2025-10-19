class Charte {
  static init_coloring() {
    let primary = localStorage.getItem("primary_color_menu");
    if (primary == null) return;
    this.color_flyer(primary);
  }

  static getPrimaryColor(e) {
    let primaryColorPrev2 = document.querySelector("#primaryColorPrev2");
    primaryColorPrev2.style.backgroundColor = `${e.target.value}`;
    localStorage.setItem("primary_color_menu", e.target.value);
    this.color_flyer(e.target.value);
  }

  static openPrimaryPicker() {
    let primaryPicker = document.querySelector("#primaryPicker");
    primaryPicker.click();
    primaryPicker.blur();
  }

  static color_flyer(color) {
    let primaryColorPrev2 = document.querySelector("#primaryColorPrev2");
    primaryColorPrev2.style.backgroundColor = color;

    let dark_color = Tools.hexToRgba(Tools.rgb_to_hex(Tools.darkenColor(color,80)));
    let complementary_color = ColorUtils.getAnalogousColors(color);
    //Color prices
    let pricesViews = document.querySelectorAll(".menu_item tr td:last-child");
    for (let item of pricesViews) {
      item.style.color = complementary_color[0];
    }
    //Color overlay
    let m1_overlay = document.querySelector("#m1_overlay");
    m1_overlay.style.backgroundColor = dark_color;
  }
}
