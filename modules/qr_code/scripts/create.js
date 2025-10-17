class Create {
  static title = "";
  static text_to_encode = "";

  static get_title(e) {
    this.title = e.value;
  }

  static get_text_to_encode(e) {
    this.text_to_encode = e.value;
  }

  static execute() {
    if (this.text_to_encode.trim().length == 0) {
      alert("Contenu a encoder invalide!");
      return;
    }
    // Update title
    let title_qr_code = document.querySelector("#title_qr_code");
    if (this.title.trim().length > 0) {
      title_qr_code.innerHTML = this.title;
    } else {
      title_qr_code.innerHTML = "QR Code";
    }
    QR_code_generator.generate(this.text_to_encode);
    UI.show_result();
    UI.hide_create_qr();
  }

  static export() {
    Utils.exportImage(this.title);
  }
}
