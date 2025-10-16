class Experience {
  static experience_container = document.querySelector("#experience_container");

  static render_experience() {
    this.experience_container.innerHTML = "";
    for (let i = 0; i <= Create.cv.experiences.length - 1; i++) {
      this.experience_container.innerHTML += `
            <div class="education_item">
                <div class="formItem">
                    <div class="label">Poste</div>
                    <input
                        type="text"
                        placeholder="Poste"
                        oninput="Experience.update_poste(this,${i})"
                        value="${Create.cv.experiences[i].poste}"
                    />
                </div>
                <div class="formItem">
                    <div class="label">Entreprise</div>
                    <input
                        type="text"
                        placeholder="Entreprise"
                        oninput="Experience.update_entreprise(this,${i})"
                        value="${Create.cv.experiences[i].entreprise}"
                    />
                </div>
                <div class="formItem">
                    <div class="label">Date de debut</div>
                    <input
                        type="date"
                        placeholder="Date de debut"
                        oninput="Experience.update_date_de_debut(this,${i})"
                        value="${Create.cv.experiences[i].date_de_debut}"
                    />
                </div>
                <div class="formItem">
                    <div class="label">Date de fin</div>
                    <input
                        type="date"
                        placeholder="Date de fin"
                        oninput="Experience.update_date_de_fin(this,${i})"
                        value="${Create.cv.experiences[i].date_de_fin}"
                    />
                </div>
                <div class="formItem">
                    <div class="label">Description de la mission realise</div>
                    <textarea
                        placeholder="Sur quoi avez vous travailler avec precision?"
                        oninput="Experience.update_desc_mission(this,${i});Tools.set_text_area_auto_grow(this)"
                    >${Create.cv.experiences[i].desc_mission}</textarea>
                </div>
            </div>
            `;
    }
    this.set_textarea_height();
  }

  static set_textarea_height(){
    let els = document.querySelectorAll(".education_item textarea");
    for(let el of els){
      Tools.set_text_area_auto_grow(el);
    }
  }

  static update_poste(el, index) {
    Create.cv.experiences[index].poste = Tools.Ucase(el.value);
  }
  static update_entreprise(el, index) {
    Create.cv.experiences[index].entreprise = Tools.Ucase(el.value);
  }
  static update_date_de_debut(el, index) {
    Create.cv.experiences[index].date_de_debut = el.value;
  }
  static update_date_de_fin(el, index) {
    Create.cv.experiences[index].date_de_fin = el.value;
  }
  static update_desc_mission(el, index) {
    Create.cv.experiences[index].desc_mission = Tools.Ucase(el.value);
  }

  static add_new_experience_entry() {
    Create.cv.experiences.push({
      poste: "",
      entreprise: "",
      date_de_debut: "",
      date_de_fin: "",
      desc_mission: "",
    });
    this.render_experience();
  }
}

Experience.render_experience();
