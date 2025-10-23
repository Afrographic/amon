class BtnExplains {
  static async hide() {
    let options_btn_explainer = document.querySelector(
      "#options_btn_explainer"
    );
    options_btn_explainer.classList.add("inactive");
  }

  static async show() {
    let options_btn_explainer = document.querySelector(
      "#options_btn_explainer"
    );
    options_btn_explainer.classList.remove("inactive");
  }
}
