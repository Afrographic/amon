class RenderModele5{
    static modele1 = document.querySelector("#model_5_to_render");

    static m1_logo = document.querySelector("#m5_logo");
    static m1_nom_business = document.querySelector("#m5_nom_business");
    static m1_nom_produit = document.querySelector("#m5_title");
    static m1_caracterisque = document.querySelector("#m5_cars");
    static m1_prix = document.querySelector("#m5_prix");
    static m1_prix_barre = document.querySelector("#m5_prix_barre");
    static m1_image_product = document.querySelector("#m5_product_image");
    static m1_reseau_sociaux = document.querySelector("#m5_reseau_sociaux");
    static m1_whasapp = document.querySelector("#m5_whasapp");
    static m1_addresse = document.querySelector("#m5_localisation");
    static m1_desc = document.querySelector("#m5_desc");
    static m5_bg = document.querySelector("#m5_bg");

    static render(flyer){
        //Show renderer flyer
        UI.hide_create_flyer_screen();
        UI.show_rendered_flyer_screen();
        
        //render Company Logo
        let tempURL = URL.createObjectURL(DB.config.logoFile);
        this.m1_logo.src = tempURL;

        //Render company name
        this.m1_nom_business.innerHTML = DB.config.nomBusiness;

        //Render product name
        this.m1_nom_produit.innerHTML = flyer.nom;

        //Render product description
        this.m1_desc.innerHTML = flyer.desc;
        if(flyer.desc.trim().length == 0){
            this.m1_desc.style.display="none";
        }else{
            this.m1_desc.style.display="block";
        }

        //render product prix
        this.m1_prix.innerHTML = `
            <h1 style="color:${Charte.default_secondary}">${Tools.formatNumWithWhiteSpace(flyer.prix)}</h1>
            <span> ${DB.config.devise}</span>
        `;

        let prixBarre = parseInt(flyer.prix) + ( parseInt(flyer.prix) * 55 / 100)
        this.m1_prix_barre.innerHTML = `${Tools.formatNumWithWhiteSpace(prixBarre.toString())} ${DB.config.devise}`

        //Render product image
        let image_product_url = flyer.crop_image;
        this.m1_image_product.src = image_product_url;

        //Render BG Image
        this.m5_bg.style.backgroundImage = `url(${image_product_url})`

        //Render caracteristique
        this.m1_caracterisque.innerHTML ="";
        let light_secondary = Tools.lightenHex(Charte.default_secondary);
        for(let i = 0 ; i<=flyer.caracteristiques.length-1;i++){
            this.m1_caracterisque.innerHTML += `
            <div class="m5_car_item" style="background-color:${light_secondary};">${flyer.caracteristiques[i]}</div>
            `
        }

        //Render media sociaux
        this.m1_reseau_sociaux.innerHTML = DB.config.nomFacebook;

        //Render localisation
        this.m1_addresse.innerHTML = DB.config.adresse;

        //Render numero whatsapp
        this.m1_whasapp.innerHTML = DB.config.numeroWhatsapp;
    }

    static back_to_edit_details(){
        UI.show_create_flyer_screen();
        UI.hide_rendered_flyer_screen();
    }


    static export(){
        Tools.exportImage(this.modele1,Create.flyer.nom);
    }
}