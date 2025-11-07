class Police{
    // 31 Polices
    static police =[
        "ralewayRegular",
        "ralewayBlack",
        "ralewayBold",
        "Clemente-regular",
        "Clemente-bold",
        "Clemente-ultra-bold",
        "comforta-regular",
        "comforta-bold",
        "google-sans-regular",
        "google-sans-bold",
        "open-sans-regular",
        "open-sans-bold",
        "open-sans-extra-bold",
        "poppins-regular",
        "poppins-bold",
        "poppins-black",
        "schwab",
        "vignette",
        "advert",
        "barbarian",
        "butterCup",
        "lovely",
        "filxgirl",
        "hello",
        "krinkes",
        "lazy",
        "lova",
        "love",
        "manbow",
        "smith",
        "weather"
    ]

    static init(){
        let police_list = document.querySelector("#police_list");
        police_list.innerHTML ="";
        for(let i = 0 ; i <=this.police.length-1;i++){
            police_list.innerHTML += `
            <div class="policeItem" onclick="Edit.change_font('${this.police[i]}')">
                <div class="police_name">${this.police[i]}</div>
                <div class="police_preview_text" style="font-family:${this.police[i]}">Rendu</div>
            </div>
            `
        }
    }
}

Police.init();