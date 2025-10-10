class RenderModele4{
    static modele1 = document.querySelector("#model_4_to_render");

    static m1_logo = document.querySelector("#m4_logo");
    static m1_nom_business = document.querySelector("#m4_nom_business");
    static m1_nom_produit = document.querySelector("#m4_nom_produit");
    static m1_caracterisque = document.querySelector("#m4_cars");
    static m1_prix = document.querySelector("#m4_prix");
    static m1_prix_barre = document.querySelector("#m4_prix_barre");
    static m1_image_product = document.querySelector("#m4_image_product");
    static m1_reseau_sociaux = document.querySelector("#m4_reseau_sociaux");
    static m1_whasapp = document.querySelector("#m4_whasapp");
    static m1_addresse = document.querySelector("#m4_addresse");
    static m1_desc = document.querySelector("#m4_desc");

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
        this.m1_prix.innerHTML = `${Tools.formatNumWithWhiteSpace(flyer.prix)} ${DB.config.devise}`;

        //Render product image
        let image_product_url = flyer.crop_image;
        this.m1_image_product.src = image_product_url;

        //Render caracteristique
        this.m1_caracterisque.innerHTML ="";
        for(let i = 0 ; i<=flyer.caracteristiques.length-1;i++){
            this.m1_caracterisque.innerHTML += `
            <div class="m4_cartItem">${flyer.caracteristiques[i]}</div>
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