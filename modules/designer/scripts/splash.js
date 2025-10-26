class Splash{
    static splash = document.querySelector("#splash");
    static async hide_splash(){
        await Utils.sleep(2300);
        this.splash.classList.add("hidden")
    }
}

Splash.hide_splash();