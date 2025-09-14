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
                <img src="../../images/edit.svg" alt="" width="34px" onclick="editCat(${collectionsAmon[i].catId})">
                <img src="../../images/delete.svg" alt="" width="34px" onclick="deleteCat(${collectionsAmon[i].catId})">
            </div>
        </div>
        `
    }
}

renderCollection();

function addCollection(){
    let nomCat = prompt("Nom de la categorie")
    if(nomCat.trim().length == 0){
        alert("Nom Invalide!")
        return;
    }
    let catId = Afro.generate_unique_id_from_time();
    let name = Afro.Ucase(nomCat);
    collectionsAmon.unshift({
        categoryName : name,
        catId : catId
    });
    localStorage.setItem("AmonCategories",JSON.stringify(collectionsAmon));
    renderCollection();
}

function editCat(catId){
    let catData = getCatNameAndIndex(catId);
    let name = prompt("Nouveau nom",catData.categoryName);
    if(name.trim().length == 0){
        alert("Nom invalide!");
        return;
    }
    collectionsAmon[catData.index].categoryName = name;
    localStorage.setItem("AmonCategories",JSON.stringify(collectionsAmon)); 
    renderCollection();
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