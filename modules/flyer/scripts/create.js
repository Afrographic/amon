
class Flyer{
    constructor(){
        this.nom  = "";
        this.prix = "";
        this.desc = "";
        this.caracteristiques =[""];
        this.image_file = undefined;
        this.crop_image="";
    }
}

class Create{
    static flyer = new Flyer();
    static product_image_import_input = document.querySelector("#product_image_import_input");
    static previewImageArea = document.querySelector("#previewImageArea");
    static caracteristiques_container = document.querySelector("#caracteristiques_container");

    static edit_info(){
        UI.show_config_screen();
        UI.hide_create_flyer_screen();
    }

    static trigger_product_image_import(){
        this.product_image_import_input.click();
    }

    static process_product_image(e){
        if(e.target.files.length == 0) return;
        this.flyer.image_file = e.target.files[0];
        //Preview image
        let temp_url = URL.createObjectURL(this.flyer.image_file);
        previewImageArea.style.backgroundImage = `url(${temp_url})`;
        previewImageArea.innerHTML ="";
    }

    static getName(input){
        this.flyer.nom = Tools.Ucase(input.value);
    }

    static getPrix(input){
        this.flyer.prix = input.value;
    }

    static getDesc(input){
        this.flyer.desc = Tools.Ucase(input.value);
    }

    static generateFlyer(){

        if(this.flyer.image_file == undefined){
            alert("Veuillez importer une image !");
            return;
        }
        if(this.flyer.nom.trim().length == 0){
            alert("Nom invalide!");
            return;
        }
        if(this.flyer.prix.trim().length == 0){
            alert("Prix invalide!");
            return;
        }
        
        let caracteristiques = this.get_caracteristiques_to_save();
        if(caracteristiques.length == 0){
            alert("Veuillez renseigner au moins une caracteristique!");
            return;
        }
        // Render Flyer
        let flyer_to_render = this.flyer;
        flyer_to_render.caracteristiques = caracteristiques;

        //Crop image
        let image_product_url = URL.createObjectURL(flyer_to_render.image_file);
        // Crop image
        let img = new Image();
        img.src = image_product_url;
        
        img.onload = () =>{
            flyer_to_render.crop_image = Tools.cropImageToSquare(img);
            RenderModele1.render(flyer_to_render);
            RenderModele2.render(flyer_to_render);
            RenderModele3.render(flyer_to_render);
        }
       
    }

    static get_caracteristiques_to_save(){
        let result = [];
        for(let item of this.flyer.caracteristiques){
            if(item.trim().length > 0){
                result.push(item)
            }
        }
        return result;
    }
    
    static render_caracteristique(){
        this.caracteristiques_container.innerHTML ="";
        for(let i = 0 ; i<=this.flyer.caracteristiques.length-1;i++){
            this.caracteristiques_container.innerHTML += 
            `
            <div class="formItem">
                <div class="label">Caracteristique ${i+1}</div>
                <input type="text" value="${this.flyer.caracteristiques[i]}" placeholder="Caracteristique ${i+1}" onkeyup="Create.update_caracteristique(this,${i})" />
            </div>
            `
        }
        //Focus on last input
        let lastInput = document.querySelector("#caracteristiques_container .formItem:last-child input");
        lastInput.focus();
    }

    static update_caracteristique(input,index){
        this.flyer.caracteristiques[index] = input.value;
    }

    static add_new_caracteristique(){
        this.flyer.caracteristiques.push("");
        this.render_caracteristique();
    }
}

Create.render_caracteristique();