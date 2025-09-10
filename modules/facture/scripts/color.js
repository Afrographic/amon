let currentPrimary = "#eeb500";
let currentSecondary = "red";

function initColors(){
    let primary = localStorage.getItem("primary");
    let secondary = localStorage.getItem("secondary");

    if(primary != null){
        currentPrimary = primary;
    }

    if(secondary != null){
        currentSecondary = secondary;
    }

    editBgGradients();
    editSvgIcons();

    //Init primary
    let primaryBtn = document.querySelector(".primary");
    primaryBtn.style.backgroundColor = currentPrimary;

    //Init Secondary
    let secondaryBtn = document.querySelector(".secondary");
    secondaryBtn.style.backgroundColor = currentSecondary;
}

initColors();

function getPrimaryColor(e){
    let primary = document.querySelector(".primary");
    primary.style.backgroundColor = e.target.value;
    currentPrimary =  e.target.value;
    localStorage.setItem("primary",currentPrimary);
    editBgGradients();
    editSvgIcons();
}

function getSecondaryColor(e){
    let secondary = document.querySelector(".secondary");
    secondary.style.backgroundColor = e.target.value;
    currentSecondary = e.target.value;
    localStorage.setItem("secondary",currentSecondary);
    editBgGradients();
    editSvgIcons();
}

function openPrimaryPicker(){
    let primaryPicker = document.querySelector("#primaryPicker");
    primaryPicker.click();
    primaryPicker.blur();
}

function openSecondaryPicker(){
    let secondaryPicker = document.querySelector("#secondaryPicker");
    secondaryPicker.click();
    secondaryPicker.blur();
}

function editBgGradients(){
    let gradients =  document.querySelectorAll(".gradient");
    for(let i = 0 ; i<=gradients.length-1;i++){
        gradients[i].style.backgroundImage = `linear-gradient(45deg, ${currentPrimary}, ${currentSecondary})`
    }
}

function editSvgIcons(){
    let linearGradients = document.querySelectorAll("linearGradient");
    for(let i = 0 ; i<=linearGradients.length-1;i++){
        linearGradients[i].innerHTML = `
        <stop offset="0" stop-color="${currentPrimary}" />
        <stop offset="1" stop-color="${currentSecondary}" /> 
        `;
    }
}