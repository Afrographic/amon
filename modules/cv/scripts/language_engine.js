class Langage{
    static langage_container = document.querySelector("#langage_container");

    static render(){
        this.langage_container.innerHTML = "";
        for(let i = 0 ;i <= Create.cv.langages.length-1;i++){
            this.langage_container.innerHTML += `
            <div class="language_item">
                    <div class="formItem">
                        <div class="label">Language</div>
                        <input
                            type="text"
                            placeholder="Language"
                            oninput="Langage.update_langue(this,${i})"
                            value="${Create.cv.langages[i].nom}"
                        />
                    </div>
                    <div class="formItem">
                        <div class="label">Niveau</div>
                        <input
                            type="range"
                            min="0" max="100" 
                            oninput="Langage.update_niveau(this,${i})"
                            value="${Create.cv.langages[i].niveau}"
                        />
                    </div>
            </div>
            `;
        }
    }

    static update_langue(el,i){
        Create.cv.langages[i].nom = Tools.Ucase(el.value);
    }

    static update_niveau(el,i){
        Create.cv.langages[i].niveau = el.value;
    }

    static add_new_entry(){
        Create.cv.langages.push({
            nom:"",
            niveau:50
        });
        this.render();
    }
}

