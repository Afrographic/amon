class Education {
  static education_container = document.querySelector("#education_container");

  //Manage education
  static render_education() {
    this.education_container.innerHTML = "";
    for (let i = 0; i <= Create.cv.educations.length - 1; i++) {
      this.education_container.innerHTML += `
      <div class="education_item">
        <div class="formItem">
          <div class="label">Diplome</div>
          <input
            type="text"
            placeholder="Diplome"
            oninput="Education.update_education_diplome(this,${i})"
            value="${Create.cv.educations[i].diplome}"
          />
        </div>
        <div class="formItem">
          <div class="label">Annee d'obtention</div>
          <input
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="Annee d'obtention"
            oninput="Education.update_education_annee(this,${i})"
            value="${Create.cv.educations[i].annee_obtention}"
          />
        </div>
        <div class="formItem">
          <div class="label">Ecole</div>
          <input
            type="text"
            placeholder="Ecole"
            oninput="Education.update_education_ecole(this,${i})"
            value="${Create.cv.educations[i].ecole}"
          />
        </div>
      </div>
      `;
    }
  }

  static update_education_diplome(el, index) {
    Create.cv.educations[index].diplome = Tools.Ucase(el.value);
  }
  static update_education_annee(el, index) {
    Create.cv.educations[index].annee_obtention = el.value;
  }
  static update_education_ecole(el, index) {
    Create.cv.educations[index].ecole = Tools.Ucase(el.value);
  }

  static add_new_eductation_entry() {
    Create.cv.educations.push({
      diplome: "",
      annee_obtention: "",
      ecole: "",
    });
    this.render_education();
  }
}

Education.render_education();