let articles = [];
let monnaie = "XAF";

let nomArticleAdd = document.querySelector("#nomArticleAdd");
let prixMinimaleAdd = document.querySelector("#prixMinimaleAdd");

let mesArticlesView = document.querySelector(".mesArticlesView");

function showArticleView() {
  mesArticlesView.classList.remove("mesArticlesViewInactive");
}

function hideArticleView() {
  mesArticlesView.classList.add("mesArticlesViewInactive");
}

function getDataFromAmonDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("amonDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("data")) {
        reject("Object store 'data' does not exist.");
        return;
      }

      const tx = db.transaction("data", "readonly");
      const store = tx.objectStore("data");
      const getRequest = store.getAll();

      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = (e) => reject(e.target.error);
    };

    request.onerror = (event) => {
      reject(`IndexedDB error: ${event.target.error}`);
    };
  });
}

async function getArticles() {
  getDataFromAmonDB()
    .then(async (records) => {
      
      await initUserInfo();
      let productsFromAmon = JSON.parse(records[0].products)
      for(let i = 0 ; i<=productsFromAmon.length - 1; i++){
        productsFromAmon[i].article = productsFromAmon[i].nom;
        productsFromAmon[i].prix = productsFromAmon[i].prix;
        productsFromAmon[i].quantite = productsFromAmon[i].quantite;
      }
      articles = articles.concat(productsFromAmon);
      reloadArticleView();
    })
    .catch((err) => console.error("Error getting data:", err));
}

getArticles();

async function initUserInfo() {
  let data = await con.select({
    from: "KamtoData",
  });
  if (data[0] == undefined) return;
  monnaie = data[0].userValues.monnaie;
}

function updateArticles() {
  localStorage.setItem("articles", JSON.stringify(articles));
  reloadArticleView();
}

function reloadArticleView() {
  let MesArticlesList = document.querySelector(".MesArticlesList");
  let ArticlesListViewEmpty = document.querySelector("#ArticlesListViewEmpty");
  let savedArticles = document.querySelector("#savedArticles");

  MesArticlesList.innerHTML = "";
  savedArticles.innerHTML = "";

  if (articles.length == 0) {
    ArticlesListViewEmpty.classList.add("inactive");
  } else {
    ArticlesListViewEmpty.style.display = "none";
    for (let i = 0; i <= articles.length - 1; i++) {
      MesArticlesList.innerHTML += `
        <div class="parentArticleItem">
            <div class="mesArticlesItem">
              <img src="assets/images/articles.svg" alt="" width="24px" />
              <div>
                <div>${articles[i].article}</div>
                <div class="price">${articles[i].prix} ${monnaie}</div>
              </div>
            </div>
            <div class="editDeleteBtn">
              <img src="assets/images/edit.svg" alt="" width="20px" onclick="editArticle(${i})" />
              <img src="assets/images/delete.svg" alt="" width="15px" onclick="deleteArticle(${i})" />
            </div>
        </div>
        `;
      // Articles to pick
      let param = articles[i].article.replaceAll("'", "gg");
      savedArticles.innerHTML += `
        <div class="articleItem" onclick='autoLoadArticle("${param.trim()}")'>
            <img src="assets/images/articles.svg" width="15px" alt="">
            <div>${articles[i].article}</div>
        </div>
        `;
    }
  }
}

function autoLoadArticle(i) {
  console.log(i);
  i = i.replaceAll("gg", "'");
  let article;
  for (let k = 0; k <= articles.length - 1; k++) {
    if (articles[k].article == i) {
      article = articles[k];
    }
  }
  let tache = document.querySelector("#tache");
  let prixd = document.querySelector("#prix");
  tache.value = article.article;
  prixd.value = article.prix;
}

function editArticle(index) {
  nomArticleAdd.value = articles[index].article;
  prixMinimaleAdd.value = articles[index].prix;
  articles.splice(index, 1);
  updateArticles();
}

function deleteArticle(index) {
  articles.splice(index, 1);
  updateArticles();
}

function addArticle() {
  let article = nomArticleAdd.value;
  let prix = prixMinimaleAdd.value;

  if (article.trim().length == 0) {
    alert("Erreur : Nom de l'article invalide!");
    return;
  }
  if (prix <= 0) {
    alert("Erreur : Prix minimale de l'article invalide!");
    return;
  }
  articles.unshift({
    article: HelperFunction.Ucase(article),
    prix: prix,
  });
  nomArticleAdd.value = "";
  prixMinimaleAdd.value = "";
  nomArticleAdd.focus();
  updateArticles();
}

function addWithEnterArticle(e) {
  if (e.keyCode == 13) {
    addArticle();
  }
}

function showSavedArticles() {
  let savedArticles = document.querySelector(".savedArticles");
  savedArticles.classList.remove("savedArticlesInactive");
}

async function hideSavedArticles() {
  await HelperFunction.sleep(100);
  let savedArticles = document.querySelector(".savedArticles");
  savedArticles.classList.add("savedArticlesInactive");
}

function filterSavedArticle(event) {
  let savedArticles = document.querySelector("#savedArticles");
  savedArticles.innerHTML = "";
  let token = event.target.value;
  if (token.trim().length == 0) {
    for (let i = 0; i <= articles.length - 1; i++) {
      let param = articles[i].article.replaceAll("'", "gg");
      // Articles to pick
      savedArticles.innerHTML += `
        <div class="articleItem" onclick="autoLoadArticle('${param}','${articles[i].prix}')">
            <img src="assets/images/articles.svg" width="15px" alt="">
            <div>${articles[i].article}</div>
        </div>
        `;
    }
    return;
  }

  for (let i = 0; i <= articles.length - 1; i++) {
    if (articles[i].article.toLowerCase().includes(token.toLowerCase())) {
      let param = articles[i].article.replaceAll("'", "gg");
      // Articles to pick
      savedArticles.innerHTML += `
      <div class="articleItem" onclick="autoLoadArticle('${param}','${articles[i].prix}')">
          <img src="assets/images/articles.svg" width="15px" alt="">
          <div>${articles[i].article}</div>
      </div>
      `;
    }
  }
}
