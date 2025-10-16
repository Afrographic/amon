class Qualite {
  static qualites = document.querySelector("#qualites");

  static render() {
    this.qualites.innerHTML = "";
    for (let i = 0; i <= Create.cv.qualites.length - 1; i++) {
      this.qualites.innerHTML += `
            <div class="formItem">
                <div class="label">Qualite</div>
                <input
                    type="text"
                    placeholder="Qualite"
                    oninput="Qualite.update_qualite(this,${i})"
                    value="${Create.cv.qualites[i]}"
                />
            </div>
            `;
    }
  }

  static update_qualite(el, i) {
    Create.cv.qualites[i] = Tools.Ucase(el.value);
  }

  static add_new_entry(){
    Create.cv.qualites.push("");
    this.render();
  }
}

Qualite.render();
