class Langue {
  static langue_container = document.querySelector("#langue_container");

  static render_langues() {
    this.langue_container.innerHTML = "";
    for (let i = 0; i <= Create.cv.langues.length - 1; i++) {
      this.langue_container.innerHTML += `
                <div class="langue_item">
                    <div class="formItem">
                        <div class="label">Langue</div>
                        <input
                            type="text"
                            placeholder="langue"
                            oninput="Langue.update_langue(this,${i})"
                            value="${Create.cv.langues[i].langue}"
                        />
                    </div>
                    <div class="formItem">
                        <div class="label">Niveau</div>
                        <input
                            type="range"
                            min="0" max="100" 
                            oninput="Langue.update_niveau(this,${i})"
                            value="${Create.cv.langues[i].niveau}"
                        />
                    </div>
                </div>
            `;
    }
  }

  static update_langue(el, index) {
    Create.cv.langues[index].langue = Tools.Ucase(el.value);
  }
  static update_niveau(el, index) {
    Create.cv.langues[index].niveau = el.value;
  }

  static add_new_entry() {
    Create.cv.langues.push({
      langue: "",
      niveau: 50,
    });
    this.render_langues();
  }
}
Langue.render_langues();
