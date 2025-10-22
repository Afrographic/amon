class Create {
  static H_align = "flex-start";
  static V_align = "flex-start";
  static edit_id = "";
  static artboard = [];
  static add_titre() {
    let titre = prompt("Inserez le titre");
    if (titre == null) return;
    let new_titre = new Titre();
    new_titre.value = titre;
    this.artboard.push(new_titre);
    this.render();
  }

  static add_sous_titre() {
    let sous_titre = prompt("Inserez le sous titre titre");
    if (sous_titre == null) return;
    let new_sous_titre = new SousTitre();
    new_sous_titre.value = sous_titre;
    this.artboard.push(new_sous_titre);
    this.render();
  }

  static add_text() {
    let texte = prompt("Inserez le texte");
    if (texte == null) return;
    let new_texte = new Text();
    new_texte.value = texte;
    this.artboard.push(new_texte);
    this.render();
  }

  static add_mini_text() {
    let mini_texte = prompt("Inserez le mini texte");
    if (mini_texte == null) return;
    let new_mini_texte = new MiniTexte();
    new_mini_texte.value = mini_texte;
    this.artboard.push(new_mini_texte);
    this.render();
  }
 
  static add_image() {
    let image_input = document.querySelector("#image_input");
    image_input.click();
  }

  static get_image(e) {
    if (e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    let image = new Image_D();
    image.url = url;
    this.artboard.push(image);
    this.render();
  }

  static add_conteneur(){
    let conteneur = new Conteneur();
    this.artboard.push(conteneur);
    this.render();
  }

  static render() {
    let renderer = document.querySelector("#renderer");
    renderer.style.alignItems = this.H_align;
    renderer.style.justifyContent = this.V_align;
    renderer.innerHTML = "";
    for (let el of this.artboard) {
      renderer.innerHTML += el.render();
    }
  }

  static set_bg(el){
    let renderer = document.querySelector("#renderer");
    renderer.style.backgroundColor = el.value;
  }

  static set_bg_image(e){
    if(e.target.files.length == 0) return;
    let url = URL.createObjectURL(e.target.files[0]);
    renderer.style.backgroundImage = `url(${url})`;
  }

  // Alignement horizontale
  static setHoriAlignLeft() {
    this.H_align = "flex-start";
    //Align text elements
    for (let item of this.artboard) {
      item.text_align = "left";
    }
    this.render();
  }
  static setHoriAlignRight() {
    this.H_align = "flex-end";
    //Align text elements
    for (let item of this.artboard) {
      item.text_align = "right";
    }
    this.render();
  }
  static setHoriAlignCenter() {
    this.H_align = "center";
    //Align text elements
    for (let item of this.artboard) {
      item.text_align = "center";
    }
    this.render();
  }
  // Alignement verticale
  static setVertAlignTop() {
    this.V_align = "flex-start";
    this.render();
  }
  static setVertAlignBottom() {
    this.V_align = "flex-end";
    this.render();
  }
  static setVertAlignCenter() {
    this.V_align = "center";
    this.render();
  }

  static export() {
    let renderer = document.querySelector("#renderer");
    let nom_flyer = prompt("Inserez le nom du projet");
    Utils.exportImage(renderer, `Flyer_${nom_flyer}`);
  }

  static reset() {
    if (confirm("Voulez vous vraiment tous effacer?")) {
      this.artboard = [];
      this.render();
      let renderer = document.querySelector("#renderer");
      renderer.style.backgroundImage ="";
      renderer.style.backgroundColor ="#fff";
    }
  }

 
}
