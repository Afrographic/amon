class FilterHistoryVente{
    static venteMoisFilter;
    static venteAnneeFilter;
    static month;
    static year;

    static init(){
        this.venteMoisFilter = document.querySelector("#venteMoisFilter");
        this.venteAnneeFilter = document.querySelector("#venteAnneeFilter");
        venteAnneeFilter.innerHTML =  getCurrentYear();
        venteMoisFilter.innerHTML = Afro.Ucase(getCurrentMonth());
        this.month = getCurrentMonth();
        this.year = getCurrentYear();
    }

    static nextYear(){
        let current = parseInt(this.venteAnneeFilter.innerHTML);
        let next = current+1;
        this.venteAnneeFilter.innerHTML = next;
        this.year = next;
        this.compute_history();
    }

    static prevYear(){
        let current = parseInt(this.venteAnneeFilter.innerHTML);
        let prev = current-1;
        this.venteAnneeFilter.innerHTML = prev;
        this.year = prev;
        this.compute_history();
    }

    static nextMonth(){
        let current = venteMoisFilter.innerHTML.toLowerCase();
        switch(current){
            case "janvier":
                venteMoisFilter.innerHTML = "Fevrier";
                break;
            case "fevrier":
                venteMoisFilter.innerHTML = "Mars";
                break;
            case "mars":
                venteMoisFilter.innerHTML = "Avril";
                break;
            case "avril":
                venteMoisFilter.innerHTML = "Mai";
                break;
            case "mai":
                venteMoisFilter.innerHTML = "Juin";
                break;
            case "juin":
                venteMoisFilter.innerHTML = "Juillet";
                break;
            case "juillet":
                venteMoisFilter.innerHTML = "Aout";
                break;
            case "aout":
                venteMoisFilter.innerHTML = "Septembre";
                break;
            case "septembre":
                venteMoisFilter.innerHTML = "Octobre";
                break;
            case "octobre":
                venteMoisFilter.innerHTML = "Novembre";
                break;
            case "novembre":
                venteMoisFilter.innerHTML = "Decembre";
                break;
            case "decembre":
                venteMoisFilter.innerHTML = "Janvier";
                break;
        }
        this.month = venteMoisFilter.innerHTML.toLowerCase();
        this.compute_history();
    }

    static prevMonth(){
        let current = venteMoisFilter.innerHTML.toLowerCase();
        switch(current){
            case "janvier":
                venteMoisFilter.innerHTML = "Decembre";
                break;
            case "fevrier":
                venteMoisFilter.innerHTML = "Janvier";
                break;
            case "mars":
                venteMoisFilter.innerHTML = "Fevrier";
                break;
            case "avril":
                venteMoisFilter.innerHTML = "Mars";
                break;
            case "mai":
                venteMoisFilter.innerHTML = "Avril";
                break;
            case "juin":
                venteMoisFilter.innerHTML = "Mai";
                break;
            case "juillet":
                venteMoisFilter.innerHTML = "Juin";
                break;
            case "aout":
                venteMoisFilter.innerHTML = "Juillet";
                break;
            case "septembre":
                venteMoisFilter.innerHTML = "Aout";
                break;
            case "octobre":
                venteMoisFilter.innerHTML = "Septembre";
                break;
            case "novembre":
                venteMoisFilter.innerHTML = "Octobre";
                break;
            case "decembre":
                venteMoisFilter.innerHTML = "Novembre";
                break;
        }
        this.month = venteMoisFilter.innerHTML.toLowerCase();
        this.compute_history();
    }

    static compute_history(){
        showHistoryRetrait(this.month,this.year);
    }
}

FilterHistoryVente.init();