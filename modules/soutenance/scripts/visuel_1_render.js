class Visuel1 {
  static mount() {
    fetch("modeles/visuel_1/visuel_1.html").then((res) => {
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
      "modeles/visuel_1/images/celandar.png"
    );
    raw_template = raw_template.replace(
      "images/time.png",
      "modeles/visuel_1/images/time.png"
    );
    raw_template = raw_template.replace(
      "images/location.png",
      "modeles/visuel_1/images/location.png"
    );
    raw_template = raw_template.replace(
      "images/pharaon.png",
      "modeles/visuel_1/images/pharaon.png"
    );
    raw_template = raw_template.replace(
      "../../assets/images/afroSign.svg",
      "assets/images/afroSign.svg"
    );
    raw_template = raw_template.replace(
      "images/diploma.png",
      "modeles/visuel_1/images/diploma.png"
    );

    v1_render.innerHTML = raw_template;
  }

  static render(visuel){
    //Render school Logo
    let tempURL = URL.createObjectURL(visuel.logo_ecole);
    let v1_logo_ecole = document.querySelector("#v1_logo_ecole");
    v1_logo_ecole.src = tempURL;
    //Nom de l'ecole
    let v1_nom_ecole = document.querySelector("#v1_nom_ecole");
    v1_nom_ecole.innerHTML = visuel.nom_ecole;
    // Titre
    let v1_titre = document.querySelector("#v1_titre");
    v1_titre.innerHTML = visuel.titre;
    //Photo Candidat
    let v1_photo_candidat = document.querySelector("#v1_photo_candidat");
    v1_photo_candidat.src = `${visuel.photo_candidat_crop}`;
    // Nom du candidat
    let v1_nom_candidat = document.querySelector("#v1_nom_candidat");
    v1_nom_candidat.innerHTML = visuel.nom_candidat;
    // Filiere du candidat
    let v1_filiere = document.querySelector("#v1_filiere");
    v1_filiere.innerHTML = visuel.filiere;
    // Theme
    let v1_theme_content = document.querySelector("#v1_theme_content");
    v1_theme_content.innerHTML = visuel.theme;
    // President
    let v1_president = document.querySelector("#v1_president");
    v1_president.innerHTML = visuel.president;
    //Rapporteur
    let v1_rapporteur = document.querySelector("#v1_rapporteur");
    v1_rapporteur.innerHTML = visuel.rapporteur;
    //Examinateur
    let v1_examinateur = document.querySelector("#v1_examinateur");
    v1_examinateur.innerHTML = visuel.examinateur;
    //Date
    let v1_date = document.querySelector("#v1_date");
    let day_name = Tools.get_week_day(visuel.date);
    let readable_date = Tools.format_date(visuel.date)
    v1_date.innerHTML = `${day_name} | ${readable_date}`;
    //Heure
    let v1_creneau = document.querySelector("#v1_creneau");
    v1_creneau.innerHTML = `${visuel.heure_debut} - ${visuel.heure_debut}`;
    //Localisation
    let v1_localisation = document.querySelector("#v1_localisation");
    v1_localisation.innerHTML = visuel.lieu;
  }

  static export(){
    let v1_render = document.querySelector("#v1_render");
    Tools.exportImage(v1_render,Create.visuel.nom_candidat);
  }
}

Visuel1.mount();
