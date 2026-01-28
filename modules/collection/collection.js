let collectionsAmon = [];
function renderCollection(){
    let collections = localStorage.getItem("AmonCategories");
    if(collections == null){
        let catitems  = document.querySelector(".catitems");
        let empty = document.querySelector(".empty")
        catitems.style.display = "none";
        empty.style.display = "flex";
    }else{
        let catitems  = document.querySelector(".catitems");
        let empty = document.querySelector(".empty")
        catitems.style.display = "flex";
        empty.style.display = "none";

        collectionsAmon   = JSON.parse(collections);
        renderView();
    }
}

function renderView(){
    let catitems  = document.querySelector(".catitems");
    catitems.innerHTML = "";
    for(let i = 0 ; i <= collectionsAmon.length -1 ; i++){
        catitems.innerHTML+= `
        <div class="catItem">
            <div> ${collectionsAmon[i].categoryName}</div>
            <div>
                <img src="../../images/edit.svg" alt="" width="34px" class="button" onclick="editInit(${collectionsAmon[i].catId})">
                <img src="../../images/delete.svg" alt="" width="34px" class="button" onclick="deleteCat(${collectionsAmon[i].catId})">
            </div>
        </div>
        `
    }
}

renderCollection();

function addCollection(){
    let nomCategorieInput = document.querySelector("#nomCategorie")

    if(nomCategorieInput.value.trim().length == 0){
        Afro.show_negative_message("Nom invalide!");
        return;
    }
    let nomCat = nomCategorieInput.value;
    let catId = Afro.generate_unique_id_from_time();
    let name = Afro.Ucase(nomCat);
    collectionsAmon.unshift({
        categoryName : name,
        catId : catId
    });
    localStorage.setItem("AmonCategories",JSON.stringify(collectionsAmon));
    renderCollection();
    nomCategorieInput.value = "";
}

let catEditId = 0;
function editInit(catId){
    catEditId = catId;
    let catData = getCatNameAndIndex(catEditId);
    document.querySelector("#nomCategorie").value = catData.categoryName;
    let editCatBtn = document.querySelector("#editCatBtn");
    let cancelEditCatBtn = document.querySelector("#cancelEditCatBtn");
    let actionButton = document.querySelector("#actionButton");
    editCatBtn.style.display = "block";
    cancelEditCatBtn.style.display = "block";
    actionButton.style.display = "none";
}

function editCat(){
    let catData = getCatNameAndIndex(catEditId);
    let name = document.querySelector("#nomCategorie").value;
    if(name.trim().length == 0){
        Afro.show_negative_message("Nom invalide!");
        return;
    }
    collectionsAmon[catData.index].categoryName = name;
    localStorage.setItem("AmonCategories",JSON.stringify(collectionsAmon)); 
    renderCollection();
    initView();
}

function deleteCat(catId){
    let catData = getCatNameAndIndex(catId);
    if(confirm(`Voulez vous vraiment supprimer la categorie ${catData.categoryName}`)){
        collectionsAmon.splice(catData.index,1);
        localStorage.setItem("AmonCategories",JSON.stringify(collectionsAmon)); 
        renderCollection();
    }
}

function getCatNameAndIndex(catId){
    for(let i = 0 ; i <= collectionsAmon.length -1 ; i++){
        if(collectionsAmon[i].catId == catId){
            return {
                categoryName : collectionsAmon[i].categoryName,
                index : i
            }
        }
    }
}

function initView(){
    let editCatBtn = document.querySelector("#editCatBtn");
    let cancelEditCatBtn = document.querySelector("#cancelEditCatBtn");
    let actionButton = document.querySelector("#actionButton");
    editCatBtn.style.display = "none";
    cancelEditCatBtn.style.display = "none";
    actionButton.style.display = "block";
    document.querySelector("#nomCategorie").value = "";
}
initView();