class QR_code_generator {
  static generate(text) {
    let qr_code = document.querySelector("#qr_code");
    qr_code.innerHTML ="";
    new QRCode(qr_code, {
      text: text,
      width: 250,
      height: 250,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
}
