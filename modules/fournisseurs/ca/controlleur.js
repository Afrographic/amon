//Gere la vue
class Controller {
  static editing = false;
  static editing_id = 0;
  static fournisseurs = [];

  static async show_fournisseur() {
    this.fournisseurs = await Service.get_all();
    let fournisseurView = document.querySelector("#fournisseurView");
    fournisseurView.innerHTML = "";
    for (let item of this.fournisseurs) {
      let index = this.fournisseurs.indexOf(item);
      fournisseurView.innerHTML += `
            <div class="catItem">
                <div>${
                  item.fullname
                } | <span class="c_main">${Afro.formatNumWithWhiteSpace(
        item.tel
      )}</span> </div>
                <div>
                    <img src="../../images/edit.svg" alt="" width="34px" onclick="Controller.init_edit(${index})" class="button" />
                    <img src="../../images/delete.svg" alt="" width="34px" class="button" onclick="Controller.delete(${index})"/>
                </div>
            </div>
            `;
    }
    if (this.fournisseurs.length == 0) {
      let empty = document.querySelector(".empty");
      empty.style.display = "flex";
    } else {
      let empty = document.querySelector(".empty");
      empty.style.display = "none";
    }
  }

  static async add(){
    this.editing = false;
    this.add_or_edit();
  }

  static async edit(){
    this.editing = true;
    this.add_or_edit();
  }

  static async add_or_edit() {
    let fullname = document.querySelector("#fullname").value;
    let tel = document.querySelector("#tel").value;

    if (fullname.trim().length == 0) {
      Afro.show_negative_message("Nom invalide!");
      return;
    }
    if (tel.trim().length == 0) {
      Afro.show_negative_message("Numero de telephone invalide!");
      return;
    }
    fullname = Afro.Ucase(fullname);
    let fournisseur = {
      id: this.editing_id,
      fullname: Afro.Ucase(fullname),
      tel: tel,
    };
    if (this.editing) {
      await Service.edit(fournisseur);
    } else {
      await Service.add(fournisseur);
    }
    this.show_fournisseur();
    //Reset State
    this.disableEditingState();
  }

  static disableEditingState() {
    this.editing = false;
    this.editing_id = 0;
    let addButton = document.querySelector("#addButton");
    let editButton = document.querySelector("#editButton");
    let cancelEditButton = document.querySelector("#cancelEditButton");
    addButton.style.display="block";
    editButton.style.display="none";
    cancelEditButton.style.display="none";
    let titleAjoutOrEdit = document.querySelector("#titleAjoutOrEdit");
    titleAjoutOrEdit.innerHTML ="Ajouter un fournisseur";
    document.querySelector("#fullname").value = "";
    document.querySelector("#tel").value = "";
    this.hideAddViewMobile();
  }

  static init_edit(index) {
    this.editing_id = this.fournisseurs[index].id;
    document.querySelector("#fullname").value = this.fournisseurs[index].fullname;
    document.querySelector("#tel").value = this.fournisseurs[index].tel;
    let addButton = document.querySelector("#addButton");
    let editButton = document.querySelector("#editButton");
    let cancelEditButton = document.querySelector("#cancelEditButton");
    addButton.style.display="none";
    editButton.style.display="block";
    cancelEditButton.style.display="block";
    let titleAjoutOrEdit = document.querySelector("#titleAjoutOrEdit");
    titleAjoutOrEdit.innerHTML ="Modifier un fournisseur";
    this.showAddViewMobile();
  }

  static async  delete(index){
    let fournisseurName =  this.fournisseurs[index].fullname;
    if(confirm("Voulez vous vraiment supprimer le fournisseur "+fournisseurName)){
      await Service.delete(this.fournisseurs[index].id);
      this.show_fournisseur();
    }
  }

  static showAddViewMobile(){
    let addFournisseurView = document.querySelector("#addFournisseurView");
    addFournisseurView.classList.remove("inactive");
  }

  static hideAddViewMobile(){
    let addFournisseurView = document.querySelector("#addFournisseurView");
    addFournisseurView.classList.add("inactive");
  }

  
}

Controller.show_fournisseur();
Controller.disableEditingState();
