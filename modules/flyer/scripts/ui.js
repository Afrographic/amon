class UI{
    static config = document.querySelector("#config");
    static modele1 = document.querySelector("#modele1");
    static flyerInfo = document.querySelector("#flyerInfo");

    static show_config_screen(){
        this.config.classList.remove("hidden")
    }

    static hide_config_screen(){
        this.config.classList.add("hidden")
    }

    static show_create_flyer_screen(){
        this.flyerInfo.classList.remove("hidden")
    }

    static hide_create_flyer_screen(){
        this.flyerInfo.classList.add("hidden")
    }

    static show_rendered_flyer_screen(){
        this.modele1.classList.remove("hidden")
    }

    static hide_rendered_flyer_screen(){
        this.modele1.classList.add("hidden")
    }
}