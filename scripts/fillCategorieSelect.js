function fillCategoriesSelect(){
    let collectionsAmon = localStorage.getItem("AmonCategories");
    if(collectionsAmon ==null) return;
    if(collectionsAmon ==undefined) return;
    
    collectionsAmon = JSON.parse(collectionsAmon);

    //Fill select when creating categories
    let createCategories = document.querySelector("#createCategories");
    let EditCategories = document.querySelector("#EditCategories");
    createCategories.innerHTML = "";
    EditCategories.innerHTML = "";
    for(let i = 0 ; i<= collectionsAmon.length - 1 ; i++){
        createCategories.innerHTML+= `
        <option value="${collectionsAmon[i].catId}">${collectionsAmon[i].categoryName}</option>
        `;
        EditCategories.innerHTML+= `
        <option value="${collectionsAmon[i].catId}">${collectionsAmon[i].categoryName}</option>
        `
    }
}

fillCategoriesSelect();