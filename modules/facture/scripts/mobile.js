function toggleMobileMenu(){
    let supportDev = document.querySelector(".supportDev");
    supportDev.classList.remove("supportDevMobileInactive");
}

function hideMobileMenu(){
    let supportDev = document.querySelector(".supportDev");
    supportDev.classList.add("supportDevMobileInactive");
}