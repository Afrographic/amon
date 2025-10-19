class Menu {
  static render() {
    let menu = document.querySelector("#menu");
    menu.innerHTML = "";
    for (let i = 0; i <= Create.visuel.menu.length - 1; i++) {
      // Build plat_items
      let plats_template = "";
      for (let j = 0; j <= Create.visuel.menu[i].plats.length - 1; j++) {
        plats_template += `
                <div class="plat_item">
                  <div class="formItem">
                    <div class="label">Plat</div>
                    <input
                      type="text"
                      placeholder="Exemple: Pommes sautes"
                      value="${Create.visuel.menu[i].plats[j].name}"
                      oninput="Menu.get_plat_name(this,${i},${j})"
                    />
                  </div>
                  <div class="formItem">
                    <div class="label">Prix</div>
                    <input
                      type="number"
                      inputmode="numeric"
                      pattern="[0-9]*"
                      placeholder="Exemple: 3000"
                      value="${Create.visuel.menu[i].plats[j].prix}"
                      oninput="Menu.get_plat_price(this,${i},${j})"
                    />
                  </div>
                </div>
                `;
      }
      menu.innerHTML += `
            <div class="menu_item">
            <div class="formItem">
              <div class="label">Jour</div>
              <input
                type="text"
                placeholder="Exemple: Lundi"
                oninput="Menu.get_jour(this)"
              />
            </div>
            <div class="plat_container">
              <div class="plats">
                    ${plats_template}
              </div>
              <div
                class="b_secondary"
                onclick="Education.add_new_eductation_entry()"
              >
                <img src="assets/images/add.svg" alt="" width="16px" />
                Ajouter un autre plat
              </div>
            </div>
          </div>
           `;
    }
  }

  static add_new_entry() {
    Create.visuel.menu.push({
      jour: "",
      plats: [
        {
          name: "",
          prix: "",
        },
      ],
    });
    this.render();
  }
}

Menu.render();
