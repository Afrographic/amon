class Visuel1 {
  static mount() {
    fetch("modeles/m1/m1.html").then((res) => {
      res.text().then((val) => {
        Visuel1.formatTemplate(val);
      });
    });
  }

  static formatTemplate(raw_template) {
    raw_template = raw_template.split("<body>")[1];
    raw_template = raw_template.split("<script>")[0];
    let v1_render = document.querySelector("#v1_render");
    v1_render.innerHTML = raw_template;
  }

  static render(visuel) {
    // Set Logo
    let m1_logo = document.querySelector("#m1_logo");
    m1_logo.src = `${URL.createObjectURL(visuel.logo)}`;
    // Set Nom restaurant
    let m1_nom_restaurant = document.querySelector("#m1_nom_restaurant");
    m1_nom_restaurant.innerHTML = visuel.nom_restaurant;
    // Set Text accrocheur
    let m1_texte_accrocheur = document.querySelector("#m1_texte_accrocheur");
    m1_texte_accrocheur.innerHTML = visuel.texte_accroche;
    // set Menu
    let menu_container = document.querySelector("#menu_container");
    menu_container.innerHTML = "";
    for (let i = 0; i <= visuel.menu.length - 1; i++) {
      // Build menu items
      let menu_items = "<table>";
      for (let j = 0; j <= visuel.menu[i].plats.length - 1; j++) {
        menu_items += `
        <tr>
          <td>${visuel.menu[i].plats[j].name}</td>
          <td>${Tools.format_number(visuel.menu[i].plats[j].prix)} ${
          visuel.devise
        }</td>
        </tr>
        `;
      }
      menu_items += "</table>";
      menu_container.innerHTML += `
      <div class="menu_item">
        <div class="day_name">${visuel.menu[i].jour}</div>
        ${menu_items}
      </div>
      `;
    }
    //Set phone
    let m1_phone = document.querySelector("#m1_phone");
    m1_phone.innerHTML = Tools.format_number(visuel.phone);
    //Set localisation
    let m1_localisation = document.querySelector("#m1_localisation");
    m1_localisation.innerHTML = visuel.localisation;
    //Set Background Image
    let m1_content = document.querySelector("#m1_content");
    m1_content.style.backgroundImage = `url(images/food/${Tools.rand(1, 27)}.JPG)`;
    //Set images
    let m1_imageItem = document.querySelectorAll(".m1_imageItem");
    for (let item of m1_imageItem) {
      item.style.backgroundImage = `url(images/food/${Tools.rand(1, 27)}.JPG)`;
    }
    // Set date
    let m1_date = document.querySelector("#m1_date");
    m1_date.innerHTML = visuel.date;

    //Init coloring
    Charte.init_coloring();
  }

  static export() {
    let v1_render = document.querySelector("#v1_render");
    Tools.exportImage(v1_render, "Menu");
  }
}

Visuel1.mount();
