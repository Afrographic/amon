class Prefill_Data{
    static execute(cv_data){
        Create.cv = cv_data;
        Education.render_education();
        Experience.render_experience();
        Langue.render_langues();
        Logiciel.render();
        Loisir.render();
        Qualite.render();

        //Prefill Logo
        let avatar_preview = document.querySelector("#avatar_preview");
        let tempURL = URL.createObjectURL(Create.cv.photo);
        avatar_preview.style.backgroundImage = `url(${tempURL})`;

        //Prefill FullName
        let c_fullName = document.querySelector("#c_fullName");
        c_fullName.value = Create.cv.fullName;

        //Prefill Poste
        let c_poste = document.querySelector("#c_poste");
        c_poste.value = Create.cv.poste;

        //Prefill phone
        let c_phone = document.querySelector("#c_phone");
        c_phone.value = Create.cv.phone;

        //Prefill email
        let c_email = document.querySelector("#c_email");
        c_email.value = Create.cv.email;

        //Prefill Localisation
        let c_localisation  = document.querySelector("#c_localisation");
        c_localisation.value = Create.cv.localisation;

        //Prefill presentation
        let user_bio = document.querySelector("#user_bio");
        user_bio.value = Create.cv.bio;
        Tools.set_text_area_auto_grow(user_bio);
    }
}