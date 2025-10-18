class Create {
  static visuel = new Visuel();

  static trigger_import_logo(el) {
    el.innerHTML = "";
    let logo_input = document.querySelector("#logo_input");
    logo_input.click();
  }

  static get_logo(e) {
    if (e.target.files.length == 0) return;
    this.visuel.logo = e.target.files[0];
    let temp_url = URL.createObjectURL(this.visuel.logo);
    let logo_placeholder = document.querySelector("#logo_placeholder");
    logo_placeholder.style.backgroundImage = `url(${temp_url})`;
  }

  static get_nom_communaute(el) {
    this.visuel.nom_communaute = Tools.Ucase(el.value);
  }

  static get_theme(el) {
    this.visuel.theme = Tools.Ucase(el.value);
  }

  static trigger_image_fond(el) {
    el.innerHTML = "";
    let image_fond_input = document.querySelector("#image_fond_input");
    image_fond_input.click();
  }

  static get_image_fond(e) {
    if (e.target.files.length == 0) return;
    this.visuel.image_fond = e.target.files[0];
    let temp_url = URL.createObjectURL(this.visuel.image_fond);
    let image_fond_placeholder = document.querySelector(
      "#image_fond_placeholder"
    );
    image_fond_placeholder.style.backgroundImage = `url(${temp_url})`;
  }

  static trigger_photo_intervenant(el) {
    el.innerHTML = "";
    let photo_intervenant_input = document.querySelector(
      "#photo_intervenant_input"
    );
    photo_intervenant_input.click();
  }

  static get_photo_intervenant(e) {
    if (e.target.files.length == 0) return;
    this.visuel.photo_intervenant = e.target.files[0];
    let temp_url = URL.createObjectURL(this.visuel.photo_intervenant);
    let photo_intervenant_placeholder = document.querySelector(
      "#photo_intervenant_placeholder"
    );
    photo_intervenant_placeholder.style.backgroundImage = `url(${temp_url})`;
  }

  static get_nom_intervenant(el) {
    this.visuel.nom_intervenant = Tools.Ucase(el.value);
  }

  static get_poste(el) {
    this.visuel.poste = Tools.Ucase(el.value);
  }

  static get_date(el) {
    this.visuel.date = Tools.Ucase(el.value);
  }
  static get_plateforme(el) {
    this.visuel.plateforme = Tools.Ucase(el.value);
  }
  static get_lien_code(el) {
    this.visuel.lien = Tools.Ucase(el.value);
  }

  static execute() {
    if (this.visuel.logo == undefined) {
      alert("Logo invalide!");
      return;
    }
    if (this.visuel.nom_communaute.trim().length == 0) {
      alert("Nom de la communaute invalide!");
      return;
    }
    if (this.visuel.theme.trim().length == 0) {
      alert("Theme invalide!");
      return;
    }
    if (this.visuel.image_fond == undefined) {
      alert("Image de fond invalide!");
      return;
    }
    if (this.visuel.photo_intervenant == undefined) {
      alert("Photo de l'intervenant invalide!");
      return;
    }
    if (this.visuel.nom_intervenant.trim().length == 0) {
      alert("Nom de l'intervenant invalide!");
      return;
    }
    if (this.visuel.poste.trim().length == 0) {
      alert("Poste invalide!");
      return;
    }
    if (this.visuel.date.trim().length == 0) {
      alert("Date invalide!");
      return;
    }
    if (this.visuel.plateforme.trim().length == 0) {
      alert("Plateforme invalide!");
      return;
    }
    if (this.visuel.lien.trim().length == 0) {
      alert("Lien du meet invalide!");
      return;
    }

    // Crop Candidat Photo
    let img = new Image();
    img.src = URL.createObjectURL(this.visuel.photo_intervenant);
    img.onload = () => {
      Create.visuel.crop_photo_intervenant = Tools.cropImageToSquare(img);
    //   Visuel1.render(this.visuel);
    //   UI.show_render();
    //   UI.hide_create();
    };
  }
}
