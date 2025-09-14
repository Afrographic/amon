function fillCategoriesSelect(){
    let collectionsAmon = localStorage.getItem("AmonCategories");
    collectionsAmon = JSON.parse(collectionsAmon);
    console.log(collectionsAmon);

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