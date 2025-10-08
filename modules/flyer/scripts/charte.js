class Charte{
    static default_primary = "#2b76ff";
    static default_secondary = "#d5a100";

    static primary = document.querySelector("#primary");
    static secondary = document.querySelector("#secondary");
    static m1_prix = document.querySelector("#m1_prix");
    static m1_container = document.querySelector("#m1_container");

    static m2_prix = document.querySelector("#m2_prix");

    static color_flyer(){
        let primary_saved = localStorage.getItem("primary");
        let secondary_saved = localStorage.getItem("secondary");

        // When localStorage is empty, its value is set to null
        if(primary_saved == null){
            localStorage.setItem("primary",this.default_primary);
            primary_saved = this.default_primary;
        }else{
            this.default_primary = primary_saved;
        }
        if(secondary_saved == null){
            localStorage.setItem("secondary",this.default_secondary);
            secondary_saved = this.default_secondary;
        }else{
            this.default_secondary = secondary_saved;
        }

        //Prefill editing circle
        this.primary.style.backgroundColor = primary_saved;
        this.secondary.style.backgroundColor = secondary_saved;

        //Recolor flyer Modele 1
        let dark_primary = Tools.darkenColor(primary_saved,50);
        this.m1_prix.style.backgroundColor = secondary_saved;
        this.m1_container.style.backgroundImage = `linear-gradient(180deg, ${primary_saved}, ${dark_primary})`

        //Recolor flyer modele 2
        this.m2_prix.style.backgroundColor = secondary_saved;
        // - Recolor caracteristique
        let carItems = document.querySelectorAll(".m2_carItem");
        for(let item of carItems){
            item.style.backgroundImage = `linear-gradient(180deg, ${primary_saved}, ${dark_primary})`
        }
        let dots = document.querySelectorAll(".m2_carItem .dot");
        for(let item of dots){
            item.style.backgroundColor = secondary_saved;
        }
    }


    static getPrimaryColor(e){
        localStorage.setItem("primary",e.target.value);
        this.color_flyer();
    }

    static getSecondaryColor(e){
        localStorage.setItem("secondary",e.target.value);
        this.color_flyer();
    }

    static openPrimaryPicker(){
        let primaryPicker = document.querySelector("#primaryPicker");
        primaryPicker.click();
        primaryPicker.blur();
    }
    
    static openSecondaryPicker(){
        let secondaryPicker = document.querySelector("#secondaryPicker");
        secondaryPicker.click();
        secondaryPicker.blur();
    }
}

Charte.color_flyer();