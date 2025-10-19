class Prefill_Data{
    static execute(){
        let visuel = Create.visuel;
        // Set Logo
        let logo_placeholder = document.querySelector("#logo_placeholder");
        logo_placeholder.innerHTML ="";
        logo_placeholder.style.backgroundImage = `url(${URL.createObjectURL(visuel.logo)})`;
        // Set nom restaurant
        let nom_restaurant_input = document.querySelector("#nom_restaurant_input");
        nom_restaurant_input.value = visuel.nom_restaurant;
        // Set devise
        let devise_input = document.querySelector("#devise_input");
        devise_input.value = visuel.devise;
        // Set Texte accroche
        let text_accroche = document.querySelector("#text_accroche");
        text_accroche.value = visuel.texte_accroche;
        // Render menu
        Menu.render();
        //Set phone
        let phone_input = document.querySelector("#phone_input");
        phone_input.value = visuel.phone;
        //Set localisation
        let localisation_input = document.querySelector("#localisation_input");
        localisation_input.value = visuel.localisation;
    }
}