class Loisir{
    static loisirs = document.querySelector("#loisirs");

    static render(){
        this.loisirs.innerHTML = "";
        for(let i = 0 ; i <= Create.cv.loisirs.length-1;i++){
            this.loisirs.innerHTML += `
            <div class="formItem">
                <div class="label">Loisir</div>
                <input
                    type="text"
                    placeholder="Loisir"
                    oninput="Loisir.update_loisir(this,${i})"
                    value="${Create.cv.loisirs[i]}"
                />
            </div>
            `
        }
    }

    static update_loisir(el,i){
        Create.cv.loisirs[i] = Tools.Ucase(el.value);
    }

    static add_new_entry(){
        Create.cv.loisirs.push("");
        this.render();
    }
}

Loisir.render();