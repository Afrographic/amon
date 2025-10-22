class Create {
  static cv = new CV();
  static template = "";

  static get_user_image_input = document.querySelector("#get_user_image_input");
  static avatar_preview = document.querySelector("#avatar_preview");
  static template_render = document.querySelector("#template_render");

  static getImage(e) {
    if (e.target.files.length == 0) return;
    this.cv.photo = e.target.files[0];
    let tempURL = URL.createObjectURL(this.cv.photo);
    avatar_preview.style.backgroundImage = `url(${tempURL})`;
  }

  static trigger_profile_select() {
    this.get_user_image_input.click();
  }

  static get_full_name(el) {
    this.cv.fullName = Tools.Ucase(el.value);
  }

  static get_poste(el) {
    this.cv.poste = Tools.Ucase(el.value);
  }
  static get_phone(el) {
    this.cv.phone = Tools.formatNumWithWhiteSpace(el.value);
  }
  static get_email(el) {
    this.cv.email = el.value;
  }
  static get_bio(el) {
    this.cv.bio = Tools.Ucase(el.value);
  }
  static get_localisation(el) {
    this.cv.localisation = Tools.Ucase(el.value);
  }

  static fetch_template() {
    fetch("templates/cv_1.html").then((res) => {
      res.text().then((val) => {
        Create.formatTemplate(val);
      });
    });
  }

  static formatTemplate(raw_template) {
    raw_template = raw_template.split("<body>")[1];
    raw_template = raw_template.split("<script>")[0];
    Create.template_render.innerHTML = raw_template;
  }

  static execute() {
    if (this.cv.photo == undefined) {
      alert("Veuillez importer votre photo");
      return;
    }
    if (this.cv.fullName.trim().length == 0) {
      alert("Nom complet invalide");
      return;
    }
    if (this.cv.localisation.trim().length == 0) {
      alert("Localisation invalide");
      return;
    }
    if (this.cv.poste.trim().length == 0) {
      alert("Poste invalide");
      return;
    }
    if (this.cv.bio.trim().length == 0) {
      alert("Presentation invalide");
      return;
    }
    if (this.cv.email.trim().length == 0) {
      alert("Email invalide");
      return;
    }
    if (this.cv.phone.trim().length == 0) {
      alert("Telephone invalide");
      return;
    }
 
    // Crop image
    let img = new Image();
    img.src = URL.createObjectURL(this.cv.photo);

    img.onload = () => {
      Create.cv.crop_image = Tools.cropImageToSquare(img);
      CV1_renderer.render(this.cv);
      //Saved backend
      DB.save_recent_cv(Create.cv);
    };
  }
}

Create.fetch_template();
