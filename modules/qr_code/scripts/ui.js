class UI {
  static create_qr_code;
  static resultHolder;

  static init_views() {
    this.create_qr_code = document.querySelector("#create_qr_code");
    this.resultHolder = document.querySelector("#resultHolder");
  }

  static hide_create_qr(){
    this.create_qr_code.classList.add("hidden");
  }
  static show_create_qr(){
    this.create_qr_code.classList.remove("hidden");
  }

  static hide_result(){
    this.resultHolder.classList.add("hidden");
  }

  static show_result(){
    this.resultHolder.classList.remove("hidden");
  }
}

UI.init_views();