class ProductCaracteristique {
  static productsCategories = document.querySelector("#productsCategories");
  static cars = [
    {
      prop: "",
      val: "",
    },
  ];

  static carsToSave = [];

  static initCreateCars() {
    this.cars = [
      {
        prop: "",
        val: "",
      },
    ];
    this.productsCategories = document.querySelector("#productsCategories");
    this.renderCar();
  }

  static initEdit() {
    this.productsCategories = document.querySelector("#productsCategoriesEdit");
    this.computeCarsToSave();
    this.cars = this.carsToSave;
    this.cars.push({
      prop: "",
      val: "",
    });
    
    this.renderCar();
  }

  static closeEdit() {
    this.cars = [
      {
        prop: "",
        val: "",
      },
    ];
    this.productsCategories = document.querySelector("#productsCategories");
  }

  static renderCar() {
    this.productsCategories.innerHTML = "";
    for (let i = 0; i <= this.cars.length - 1; i++) {
      this.productsCategories.innerHTML += `
        <div class="formItem caracItem">
            <div class="label">Caracteristique ${i + 1}</div>
            <input value="${
              this.cars[i].prop
            }" type="text" placeholder="Inserez la Propriete"  onkeyup="ProductCaracteristique.addNewProp(${i},this)" />
            <input value="${
              this.cars[i].val
            }" type="text" placeholder="Inserez la valeur"  onkeyup="ProductCaracteristique.addNewVal(${i},this)"/>
         </div>
        `;
    }
  }

  static addNewCar() {
    this.cars.push({
      prop: "",
      val: "",
    });
    this.renderCar();
    this.computeCarsToSave();
  }

  static addNewProp(i, el) {
    this.cars[i].prop = el.value;
    this.computeCarsToSave();
  }
  static addNewVal(i, el) {
    this.cars[i].val = el.value;
    this.computeCarsToSave();
  }

  static computeCarsToSave() {
    this.carsToSave = [];
    for (let i = 0; i <= this.cars.length - 1; i++) {
      if (this.cars[i].prop.trim().length > 0) {
        if (this.cars[i].val.trim().length > 0) {
          this.carsToSave.push(this.cars[i]);
        }
      }
    }
  }
}

ProductCaracteristique.renderCar();
