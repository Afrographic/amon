class UI{
    static createCV = document.querySelector(".createCV");
    static templates = document.querySelector("#templates");

    static show_create_cv(){
        this.createCV.classList.remove("hidden");
    }
    static hide_create_cv(){
        this.createCV.classList.add("hidden");
    }
    static show_templates(){
        this.templates.classList.remove("hidden");
    }
    static hide_templates(){
        this.templates.classList.add("hidden");
    }
}