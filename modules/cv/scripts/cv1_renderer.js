class CV1_renderer{
    static cv1_template;
    // Visual elements
    static cv_1_image;
    static cv1_nom;
    static cv1_poste;
    static cv_1_phone;
    static cv1_email;
    static cv1_addresse;
    static cv1_competences;
    static cv1_langue;
    static cv1_loisirs;
    static cv1_presentation;
    static cv1_education;
    static cv1_exp_container;
    static cv1_qualites;

    static init_views(){
       this.cv1_template = document.querySelector("#template_render");
        // Visual elements
       this.cv_1_image = document.querySelector("#cv_1_image");
       this.cv1_nom = document.querySelector("#cv1_nom");
       this.cv1_poste = document.querySelector("#cv1_poste");
       this.cv_1_phone = document.querySelector("#cv_1_phone");
       this.cv1_email = document.querySelector("#cv1_email");
       this.cv1_addresse = document.querySelector("#cv1_addresse");
       this.cv1_competences = document.querySelector("#cv1_competences");
       this.cv1_langue = document.querySelector("#cv1_langue");
       this.cv1_loisirs = document.querySelector("#cv1_loisirs");
       this.cv1_presentation = document.querySelector("#cv1_presentation");
       this.cv1_education = document.querySelector("#cv1_education");
       this.cv1_exp_container = document.querySelector("#cv1_exp_container");
       this.cv1_qualites = document.querySelector("#cv1_qualites");
    }


    static async render(info){
       this.init_views();

        UI.show_templates();
        UI.hide_create_cv();

        this.cv_1_image.src = info.crop_image;
        this.cv1_nom.innerHTML = info.fullName;
        this.cv1_poste.innerHTML = info.poste;
        this.cv_1_phone.innerHTML = info.phone;
        this.cv1_email.innerHTML = info.email;
        this.cv1_addresse.innerHTML = info.localisation;
        this.cv1_presentation.innerHTML = info.bio;

        //Render competences
        this.cv1_competences.innerHTML = `
        <div class="cv1_contact_label bold cv1_title">COMPETENCES</div>
        `;
        for(let i = 0 ; i <=info.logiciels.length-1;i++){
            if(info.logiciels[i].nom.trim().length == 0) continue;
            this.cv1_competences.innerHTML += `
            <div class="cv1_competence_item">
                <div class="title">
                <div class="name">${info.logiciels[i].nom}</div>
                <div class="f5">${info.logiciels[i].domaine}</div>
                </div>
                <div class="progress">
                    <div class="progress_state" style="width:${info.logiciels[i].niveau}%"></div>
                </div>
             </div>
            `;
        }

        //Render Langues
        this.cv1_langue.innerHTML = `
        <div class="cv1_contact_label bold cv1_title">LANGUES</div>
        `
        for(let i = 0 ; i <=info.langues.length-1;i++){
            if(info.langues[i].langue.trim().length ==0) continue;
            this.cv1_langue.innerHTML += `
            <div class="cv1_langue_item">
                <div class="langue_nom">${info.langues[i].langue}</div>
                <div class="progress">
                     <div class="progress_state" style="width:${info.langues[i].niveau}%"></div>
                </div>
            </div>
            `
        }

        //Render loisirs
        this.cv1_loisirs.innerHTML = `${info.loisirs.join(" | ")}`;

        //Render Qualites
        this.cv1_qualites.innerHTML = `${info.qualites.join(" | ")}`;

        //Render education
        this.cv1_education.innerHTML = `
        <div class="bold cv1_title">EDUCATION</div>
        `
        for(let i = 0 ; i<=info.educations.length-1;i++){
            if(info.educations[i].diplome.trim().length== 0) continue;
            this.cv1_education.innerHTML += `
            <div class="cv1_edu_item">
                <div class="f8">${info.educations[i].diplome}</div>
                <div class="f5">${info.educations[i].annee_obtention} • ${info.educations[i].ecole}</div>
            </div>
            ` 
        }

        //Render professionnels
        this.cv1_exp_container.innerHTML ="";
        for(let i = 0 ;i<=info.experiences.length-1;i++){
            if(info.experiences[i].poste.trim().length ==0) continue;
            let start_date = Tools.format_date(info.experiences[i].date_de_debut);
            let end_date = Tools.format_date(info.experiences[i].date_de_fin);
            this.cv1_exp_container.innerHTML += `
            <div class="cv1_item">
              <div class="cv1_header">
                <div class="dates">
                  <div class="f5">${start_date}</div>
                  <div class="f5">${end_date}</div>
                </div>
                <div class="cv1_company_poste">
                  <div class="f10">${info.experiences[i].poste}</div>
                  <div class="f8 grey cv1_company"> ${info.experiences[i].entreprise}</div>
                </div>
              </div>
              <div class="f10 grey">
               ${info.experiences[i].desc_mission}
              </div>
            </div>
            `
        }

    }

    static export(){
        Tools.export_pdf(this.cv1_template,Create.cv.fullName);
    }
}