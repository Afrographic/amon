class Visuel1 {
  static mount() {
    fetch("modeles/m1/m1.html").then((res) => {
      res.text().then((val) => {
        Visuel1.formatTemplate(val);
      });
    });
  }

  static formatTemplate(raw_template) {
    raw_template = raw_template.split("<body>")[1];
    raw_template = raw_template.split("<script>")[0];
    let v1_render = document.querySelector("#v1_render");
    //Reset icons paths
    raw_template = raw_template.replace(
      "images/celandar.png",
      "modeles/m1/images/celandar.png"
    );
    raw_template = raw_template.replace(
      "images/time.png",
      "modeles/m1/images/time.png"
    );
    raw_template = raw_template.replace(
      "images/position.png",
      "modeles/m1/images/position.png"
    );
    v1_render.innerHTML = raw_template;
  }

  static render(visuel) {
    // Background Image
    let m1_background_image = document.querySelector("#m1_background_image");
    let bg_url = URL.createObjectURL(visuel.image_fond);
    m1_background_image.style.backgroundImage = `url(${bg_url})`;
    //Logo
    let m1_logo = document.querySelector("#m1_logo");
    m1_logo.src = `${URL.createObjectURL(visuel.logo)}`;
    //Nom de la communaute
    let m1_nom_communaute = document.querySelector("#m1_nom_communaute");
    m1_nom_communaute.innerHTML = visuel.nom_communaute;
    //Theme du meet
    let m1_theme = document.querySelector("#m1_theme");
    m1_theme.innerHTML = visuel.theme;
    //Photo Intervenant
    let m1_photo_intervenant = document.querySelector("#m1_photo_intervenant");
    m1_photo_intervenant.src = visuel.crop_photo_intervenant;
    //Intervenant name
    let m1_intervenant_name = document.querySelector("#m1_intervenant_name");
    m1_intervenant_name.innerHTML = visuel.nom_intervenant;
    //Poste ou Metier intervenant
    let m1_poste = document.querySelector("#m1_poste");
    m1_poste.innerHTML = visuel.poste;
    //Date
    let m1_date_value = document.querySelector("#m1_date_value");
    m1_date_value.innerHTML = `${Tools.get_week_day(visuel.date)},${Tools.format_date(visuel.date)}`
    //Time
    let m1_heure_value = document.querySelector("#m1_heure_value");
    m1_heure_value.innerHTML = `${visuel.heure_debut} - ${visuel.heure_fin}`;
    //Lieu du meet
    let m1_lieu_value = document.querySelector("#m1_lieu_value");
    m1_lieu_value.innerHTML = visuel.plateforme;
  }
}

Visuel1.mount();
