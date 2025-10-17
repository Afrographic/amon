class Create {
  static visuel = new Visuel();

  static trigger_school_logo_pick(el) {
    el.innerHTML = "";
    let school_logo_picker_input = document.querySelector(
      "#school_logo_picker_input"
    );
    school_logo_picker_input.click();
  }

  static get_school_logo(e) {
    if (e.target.files.length == 0) return;
    this.visuel.logo_ecole = e.target.files[0];
    let temp_url = URL.createObjectURL(this.visuel.logo_ecole);
    //Preview logo
    let logo_ecole = document.querySelector("#logo_ecole");
    logo_ecole.style.backgroundImage = `url(${temp_url})`;
  }

  static get_nom_ecole(el) {
    this.visuel.nom_ecole = Tools.Ucase(el.value);
  }

  static get_filiere(el) {
    this.visuel.filiere = Tools.Ucase(el.value);
  }
  static get_titre(el) {
    this.visuel.titre = Tools.Ucase(el.value);
  }
  static get_theme(el) {
    this.visuel.theme = Tools.Ucase(el.value);
  }
  static get_date(el) {
    this.visuel.date = el.value;
  }
  static get_heure_debut(el) {
    this.visuel.heure_debut = el.value;
  }
  static get_heure_fin(el) {
    this.visuel.heure_fin = el.value;
  }
  static get_lieu(el) {
    this.visuel.lieu = Tools.Ucase(el.value);
  }

  static trigger_image_candidat(el) {
    el.innerHTML = "";
    let image_candidat_picker_input = document.querySelector(
      "#image_candidat_picker_input"
    );
    image_candidat_picker_input.click();
  }

  static get_image_candidat(e) {
    if (e.target.files.length == 0) return;
    this.visuel.photo_candidat = e.target.files[0];
    let temp_url = URL.createObjectURL(this.visuel.photo_candidat);
    //Preview logo
    let photo_candidat = document.querySelector("#photo_candidat");
    photo_candidat.style.backgroundImage = `url(${temp_url})`;
  }

  static get_nom_candidat(e) {
    this.visuel.nom_candidat = Tools.Ucase(e.value);
  }
  static get_president(e) {
    this.visuel.president = Tools.Ucase(e.value);
  }
  static get_rapporteur(e) {
    this.visuel.rapporteur = Tools.Ucase(e.value);
  }
  static get_examinateur(e) {
    this.visuel.examinateur = Tools.Ucase(e.value);
  }

  static execute() {
    if (this.visuel.logo_ecole == undefined) {
      alert("Veuillez importer le logo de l'ecole");
      return;
    }
    if (this.visuel.nom_ecole.trim().length == 0) {
      alert("Nom de l'ecole invalide!");
      return;
    }
    if (this.visuel.filiere.trim().length == 0) {
      alert("Filiere invalide!");
      return;
    }
    if (this.visuel.titre.trim().length == 0) {
      alert("Titre invalide!");
      return;
    }
    if (this.visuel.theme.trim().length == 0) {
      alert("Theme invalide!");
      return;
    }
    if (this.visuel.date.trim().length == 0) {
      alert("Date invalide!");
      return;
    }
    if (this.visuel.heure_debut.trim().length == 0) {
      alert("Heure de debut invalide!");
      return;
    }
    if (this.visuel.heure_fin.trim().length == 0) {
      alert("Heure de fin invalide!");
      return;
    }
    if (this.visuel.lieu.trim().length == 0) {
      alert("Heure de fin invalide!");
      return;
    }
    if (this.visuel.photo_candidat == undefined) {
      alert("Photo du candidat invalide!");
      return;
    }
    if (this.visuel.nom_candidat.trim().length == 0) {
      alert("Nom du candidat invalide!");
      return;
    }
    if (this.visuel.president.trim().length == 0) {
      alert("President du jury invalide!");
      return;
    }
    if (this.visuel.rapporteur.trim().length == 0) {
      alert("Rapporteur invalide!");
      return;
    }
    if (this.visuel.examinateur.trim().length == 0) {
      alert("Examinateur invalide!");
      return;
    }

    // Crop Candidat Photo
    let img = new Image();
    img.src = URL.createObjectURL(this.visuel.photo_candidat);
    img.onload = () => {
      Create.visuel.photo_candidat_crop = Tools.cropImageToSquare(img);
      Visuel1.render(this.visuel);
      UI.show_render();
      UI.hide_create();
    };
 
  }
}
