class CV {
  constructor() {
    this.photo = undefined;
    this.crop_photo ="";
    this.fullName = "";
    this.localisation = "";
    this.poste = "";
    this.bio = ""; 
    this.email = "";
    this.phone = "";
    
    this.educations = [
      {
        diplome: "",
        annee_obtention: "",
        ecole: "",
      },
    ];

    this.experiences = [
      {
        poste: "",
        entreprise: "",
        date_de_debut: "",
        date_de_fin: "",
        desc_mission: "",
      },
    ];

    this.langues = [
      {
        langue: "",
        niveau: 50,
      },
    ];
    this.logiciels = [
      {
        nom: "",
        domaine: "",
        niveau: 50,
      },
    ];
    this.qualites = [""];
    this.loisirs = [""];
  }
}
