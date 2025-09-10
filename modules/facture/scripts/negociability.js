let negociable = false;

function setNegociable(el){
    el.firstElementChild.classList.toggle("active");
    el.parentNode.lastElementChild.firstElementChild.classList.remove("active");
    negociable = true;
}

function setNonNegociable(el){
    el.firstElementChild.classList.toggle("active");
    el.parentNode.firstElementChild.firstElementChild.classList.remove("active");
    negociable = false;
}