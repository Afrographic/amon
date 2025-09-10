let note = document.querySelector("#note");
function initNote(){
    let noteSaved = localStorage.getItem("note");
    if(noteSaved == null) return;
    note.value = noteSaved;
}

initNote();

function saveNote(){
    let note = document.querySelector("#note");
    if(note.value.trim().length == 0){
        alert("Note vide!");
        return;
    }
    let savedNotes = localStorage.getItem("notes");
    if(savedNotes == null){
        let notes = [];
        notes.push(note.value.trim());
        localStorage.setItem("notes",JSON.stringify(notes));
    }else{
        savedNotes = JSON.parse(savedNotes);
        savedNotes.push(note.value);
        localStorage.setItem("notes",JSON.stringify(savedNotes));
    }
    alert("Note enregistre avec succes!");
    renderSavedNotes();
}

function addNoteOnclick(){
    let note = document.querySelector("#note");
    let noteItems = document.querySelectorAll(".note_item");
    for(let i = 0 ; i <= noteItems.length-1 ; i++){
        noteItems[i].addEventListener("click",()=>{
            note.value = noteItems[i].firstElementChild.innerHTML.trim();
        })
    }
}
addNoteOnclick();

function renderSavedNotes(){
    let savedNotes = localStorage.getItem("notes");
    let savedNotesView = document.querySelector(".savedNotesView");
    if(savedNotes == null){
       
        savedNotesView.style.display = "none";
    }else{
        savedNotesView.style.display = "block";
        savedNotes = JSON.parse(savedNotes);
        let notes = document.querySelector(".notes");
        notes.innerHTML = "";
        for(let i = 0 ; i<=savedNotes.length-1;i++){
            notes.innerHTML += `
            <div class="note_item">
                <div>${savedNotes[i]}</div>
                <img src="assets/images/delete.svg" width="20px" class="deleteNote" onclick="deleteNote(${i})"/>
            </div>
            `
        }
        addNoteOnclick();
    }
}


renderSavedNotes();

function deleteNote(index){
    if(confirm("Voulez vous vraiment supprimer la note?")){
        let notes = localStorage.getItem("notes");
        notes = JSON.parse(notes);
        notes.splice(index,1);
        localStorage.setItem("notes",JSON.stringify(notes));
        renderSavedNotes();
    }
}