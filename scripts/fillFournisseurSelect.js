let collectionsAmon = [];
function fillFournisseurSelect() {
  getFournisseurDB().then((data) => {
    
    console.log(data);
    for(let item of data){
        collectionsAmon.push({
            catId:item.id,
            categoryName:item.fullname
        })
    }
    //Fill select when creating categories
    let createCategories = document.querySelector("#selectFournisseurs");
    let EditCategories = document.querySelector("#EditFournisseurSelect");
    createCategories.innerHTML = "";
    EditCategories.innerHTML = "";
    for (let i = 0; i <= collectionsAmon.length - 1; i++) {
      createCategories.innerHTML += `
        <option value="${collectionsAmon[i].catId}">${collectionsAmon[i].categoryName}</option>
        `;
      EditCategories.innerHTML += `
        <option value="${collectionsAmon[i].catId}">${collectionsAmon[i].categoryName}</option>
        `;
    }
  });
}

fillFournisseurSelect();

function getFournisseurDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("fournisseursDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("fournisseurs")) {
        reject("Object store 'data' does not exist.");
        return;
      }

      const tx = db.transaction("fournisseurs", "readonly");
      const store = tx.objectStore("fournisseurs");
      const getRequest = store.getAll();

      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = (e) => reject(e.target.error);
    };

    request.onerror = (event) => {
      reject(`IndexedDB error: ${event.target.error}`);
    };
  });
}
