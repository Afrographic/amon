let note = document.querySelector("#note");
function initNote(){
    let noteSaved = localStorage.getItem("note");
    if(noteSaved == null) return;
    note.value = noteSaved;
}

initNote();