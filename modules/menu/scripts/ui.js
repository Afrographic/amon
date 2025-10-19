class UI{
    static hide_create(){
        let create = document.querySelector("#create");
        create.classList.add("hidden");
    }
    static show_create(){
        let create = document.querySelector("#create");
        create.classList.remove("hidden");
    }
    static show_render(){
        let renderer = document.querySelector("#renderer");
        renderer.classList.remove("hidden");
    }
    static hide_render(){
        let renderer = document.querySelector("#renderer");
        renderer.classList.add("hidden");
    }
}