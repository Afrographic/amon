class UI{
    static show_artboard_options(){
        let artboard_options = document.querySelector("#artboard_options");
        artboard_options.classList.remove("hidden");
    }
    static hide_artboard_options(){
        let artboard_options = document.querySelector("#artboard_options");
        artboard_options.classList.add("hidden");
    }
    static show_add_graphix(){
        let add_graphix  = document.querySelector("#add_graphix");
        add_graphix.classList.remove("hidden");
    }
    static hide_add_graphix(){
        let add_graphix  = document.querySelector("#add_graphix");
        add_graphix.classList.add("hidden");
    }
}