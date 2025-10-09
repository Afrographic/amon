class Config {
  static logoPickerInput = document.querySelector("#logoPicker");
  static logoPlaceHolder = document.querySelector(".logoPlaceHolder");
  static configLogo = document.querySelector("#configLogo");
  static logoFile = undefined;

  // Input
  static nomBusiness = document.querySelector("#nomBusiness");
  static numeroWhatsapp = document.querySelector("#numeroWhatsapp");
  static nomFacebook = document.querySelector("#nomFacebook");
  static adresse = document.querySelector("#adresse");
  static devise = document.querySelector("#devise");

  // Temp canvas for default logo
  static canvas;

  static initConfigField() {
    nomBusiness.value = DB.config.nomBusiness;
    numeroWhatsapp.value = DB.config.numeroWhatsapp;
    nomFacebook.value = DB.config.nomFacebook;
    adresse.value = DB.config.adresse;
    devise.value = DB.config.devise;
    // preload the logo
    this.#renderLogoHelper(DB.config.logoFile);
  }

  static triggerFilePick() {
    this.logoPickerInput.click();
  }

  static renderLogo(e) {
    if (e.target.files.length == 0) return;
    let logo = e.target.files[0];
    this.#renderLogoHelper(logo);
  }

  static #renderLogoHelper(logo) {
    let tempURL = URL.createObjectURL(logo);
    this.logoPlaceHolder.style.display = "none";
    this.configLogo.classList.remove("inactive");
    this.configLogo.src = tempURL;
    this.logoFile = logo;
  }

  static async saveInfo() {
    //Check for valid input
    let nomBusinessValue = this.nomBusiness.value ?? "";
    let numeroWhatsappValue = this.numeroWhatsapp.value ?? "";
    let nomFacebookValue = this.nomFacebook.value ?? "";
    let adresseValue = this.adresse.value ?? "";
    let deviseValue = this.devise.value ?? "";

    if (nomBusinessValue.trim().length == 0) {
      alert("Nom de votre business invalide!");
      return;
    }
    if (numeroWhatsappValue.trim().length == 0) {
      alert("Numero whatsapp Invalide!");
      return;
    }
    if(deviseValue.trim().length == 0){
      alert("Devise invalide");
      return;
    }
   
    if (adresseValue.trim().length == 0) {
      alert("Adresse  Invalide!");
      return;
    }
   
    if(nomFacebookValue.trim().length == 0){
      nomFacebookValue = nomBusinessValue;
    }
    // Loading default Logo in case of no logo

    Tools.generateLogo(nomBusinessValue.trim()[0]);

    this.canvas.toBlob(async (blob) => {
      // Creating config object
      let configObject = {
        logoFile: this.logoFile ?? blob,
        nomBusiness: Tools.Ucase(nomBusinessValue),
        numeroWhatsapp: Tools.formatNumWithWhiteSpace(numeroWhatsappValue),
        nomFacebook: Tools.Ucase(nomFacebookValue),
        adresse: Tools.Ucase(adresseValue),
        devise: deviseValue.toUpperCase()
      };

      //Save Config to DB
      await DB.saveConfig(configObject);

      //Hide the view
      UI.hide_config_screen();

      //Show create view
      UI.show_create_flyer_screen()
    }, "image/png");
  }
}
