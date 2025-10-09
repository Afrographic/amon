class QR_code_generator{
    static generate(link){
        let holders = document.querySelectorAll(".qr_code");
        for(let item of holders){
            item.innerHTML ="";
            new QRCode(item, {
                text: link,
                width: 50,
                height: 50,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
              });
        }
    }
}
