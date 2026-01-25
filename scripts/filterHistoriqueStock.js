class FilterHistoryStock{
    static stockMoisFilter;
    static stockAnneeFilter;
    static month;
    static year;

    static init(){
        this.stockMoisFilter = document.querySelector("#stockMoisFilter");
        this.stockAnneeFilter = document.querySelector("#stockAnneeFilter");
        stockAnneeFilter.innerHTML =  getCurrentYear();
        stockMoisFilter.innerHTML = Afro.Ucase(getCurrentMonth());
        this.month = getCurrentMonth();
        this.year = getCurrentYear();
    }

    static nextYear(){
        let current = parseInt(this.stockAnneeFilter.innerHTML);
        let next = current+1;
        this.stockAnneeFilter.innerHTML = next;
        this.year = next;
        this.compute_history();
    }

    static prevYear(){
        let current = parseInt(this.stockAnneeFilter.innerHTML);
        let prev = current-1;
        this.stockAnneeFilter.innerHTML = prev;
        this.year = prev;
        this.compute_history();
    }

    static nextMonth(){
        let current = stockMoisFilter.innerHTML.toLowerCase();
        switch(current){
            case "janvier":
                stockMoisFilter.innerHTML = "Fevrier";
                break;
            case "fevrier":
                stockMoisFilter.innerHTML = "Mars";
                break;
            case "mars":
                stockMoisFilter.innerHTML = "Avril";
                break;
            case "avril":
                stockMoisFilter.innerHTML = "Mai";
                break;
            case "mai":
                stockMoisFilter.innerHTML = "Juin";
                break;
            case "juin":
                stockMoisFilter.innerHTML = "Juillet";
                break;
            case "juillet":
                stockMoisFilter.innerHTML = "Aout";
                break;
            case "aout":
                stockMoisFilter.innerHTML = "Septembre";
                break;
            case "septembre":
                stockMoisFilter.innerHTML = "Octobre";
                break;
            case "octobre":
                stockMoisFilter.innerHTML = "Novembre";
                break;
            case "novembre":
                stockMoisFilter.innerHTML = "Decembre";
                break;
            case "decembre":
                stockMoisFilter.innerHTML = "Janvier";
                break;
        }
        this.month = stockMoisFilter.innerHTML.toLowerCase();
        this.compute_history();
    }

    static prevMonth(){
        let current = stockMoisFilter.innerHTML.toLowerCase();
        switch(current){
            case "janvier":
                stockMoisFilter.innerHTML = "Decembre";
                break;
            case "fevrier":
                stockMoisFilter.innerHTML = "Janvier";
                break;
            case "mars":
                stockMoisFilter.innerHTML = "Fevrier";
                break;
            case "avril":
                stockMoisFilter.innerHTML = "Mars";
                break;
            case "mai":
                stockMoisFilter.innerHTML = "Avril";
                break;
            case "juin":
                stockMoisFilter.innerHTML = "Mai";
                break;
            case "juillet":
                stockMoisFilter.innerHTML = "Juin";
                break;
            case "aout":
                stockMoisFilter.innerHTML = "Juillet";
                break;
            case "septembre":
                stockMoisFilter.innerHTML = "Aout";
                break;
            case "octobre":
                stockMoisFilter.innerHTML = "Septembre";
                break;
            case "novembre":
                stockMoisFilter.innerHTML = "Octobre";
                break;
            case "decembre":
                stockMoisFilter.innerHTML = "Novembre";
                break;
        }
        this.month = stockMoisFilter.innerHTML.toLowerCase();
        this.compute_history();
    }

    static compute_history(){
        showHistoryAjout(this.month,this.year);
    }
}

FilterHistoryStock.init();

