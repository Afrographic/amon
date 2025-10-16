class Logiciel {
  static logiciels_container = document.querySelector("#logiciels_container");

  static render() {
    this.logiciels_container.innerHTML = "";
    for (let i = 0; i <= Create.cv.logiciels.length - 1; i++) {
      this.logiciels_container.innerHTML += `
            <div class='logiciel_item'>
                <div class="formItem">
                    <div class="label">Nom</div>
                    <input
                        type="text"
                        placeholder="Nom"
                        oninput="Logiciel.update_nom(this,${i})"
                        value="${Create.cv.logiciels[i].nom}"
                    />
                </div>
                <div class="formItem">
                    <div class="label">Domaine</div>
                    <input
                        type="text"
                        placeholder="Domaine"
                        oninput="Logiciel.update_domaine(this,${i})"
                        value="${Create.cv.logiciels[i].domaine}"
                    />
                </div>
                <div class="formItem">
                    <div class="label">Niveau</div>
                    <input
                        type="range"
                        min="0" max="100" 
                        oninput="Logiciel.update_niveau(this,${i})"
                        value="${Create.cv.logiciels[i].niveau}"
                    />
                </div>
            </div>
            `;
    }
  }

  static update_nom(el, i) {
    Create.cv.logiciels[i].nom = Tools.Ucase(el.value);
  }
  static update_domaine(el, i) {
    Create.cv.logiciels[i].domaine = Tools.Ucase(el.value);
  }
  static update_niveau(el, i) {
    Create.cv.logiciels[i].niveau = el.value;
  }

  static add_new_entry() {
    Create.cv.logiciels.push({
      nom: "",
      domaine: "",
      niveau: 50,
    });
    this.render();
  }
}

Logiciel.render();
