
function initDevise(){
    let devise = document.querySelector("#devise");
    let deviseSaved = localStorage.getItem("amonDevise");  
    if(deviseSaved == null) return;  
    devise.value = deviseSaved;
}

initDevise();