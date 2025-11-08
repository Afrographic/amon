class Icones{
    static init(){
        let icons_list = document.querySelector("#icons_list");
        icons_list.innerHTML ="";
        for(let i = 77;i<=145;i++){
            icons_list.innerHTML += `
            <div class="iconItem" onclick="Create.add_icon(${i})">
                <img src="assets/icons/Asset ${i}.png" alt="">
            </div>
            `;
        }
    }
}

Icones.init();