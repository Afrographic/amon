class Create {
  static visuel = new Visuel();

  static trigger_import_logo(el){
    el.innerHTML = "";
    let logo_input = document.querySelector("#logo_input");
    logo_input.click();
  }

  static get_logo(e){
    if(e.target.files.length == 0) return;
    this.visuel.logo = e.target.files[0];
    let temp_url = URL.createObjectURL(this.visuel.logo);
    let logo_placeholder = document.querySelector("#logo_placeholder");
    logo_placeholder.style.backgroundImage = `url(${temp_url})`;
  }
  

  static get_nom_restaurant(el){
    this.visuel.nom_restaurant = Tools.Ucase(el.value);
  }

  static get_devise(el){
    this.visuel.devise = el.value;
  }

  static get_text_accroche(el){
    this.visuel.texte_accroche = Tools.Ucase(el.value);
  }
  static get_telephone(el){
    this.visuel.phone = el.value;
  }
  static get_localisation(el){
    this.visuel.localisation = Tools.Ucase(el.value);
  }

  static execute(){
    if(this.visuel.nom_restaurant.trim().length == 0){
      alert("Nom du restaurant invalide!");
      return;
    }
    if(this.visuel.devise.trim().length == 0){
      alert("Devise invalide!");
      return;
    }
    if(this.visuel.texte_accroche.trim().length == 0){
      alert("Texte d'accroche invalide!");
      return;
    }
    if(this.visuel.phone.trim().length == 0){
      alert("Telephone invalide!");
      return;
    }
    if(this.visuel.localisation.trim().length == 0){
      alert("Localisation invalide!");
      return;
    }
    console.log(this.visuel);
  }
}
