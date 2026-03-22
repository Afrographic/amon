/*
      if (window.innerWidth <= 1000) {
        history.pushState({ page: "reset" }, "", "/reset");
        localStorage.setItem("current-page", "reset");
      }
      */
// handle Back button

window.onpopstate = function (event) {
  if (localStorage.getItem("current-page") == "/#/menu") {
    hideMobileMenu();
  }
  if (localStorage.getItem("current-page") == "/#/history") {
    hideHistory();
  }
  if (localStorage.getItem("current-page") == "/#/facture") {
    closePreviewFacture();
  }
  if (localStorage.getItem("current-page") == "/#/config") {
    hideConfig();
    window.history.pushState(
      { page: "home" },
      "",
      "modules/facture/kamto.html",
    );
  }
  if (localStorage.getItem("current-page") == "/#/articles") {
    hideArticleView();
    window.history.pushState(
      { page: "home" },
      "",
      "modules/facture/kamto.html",
    );
  }
  if (localStorage.getItem("current-page") == "/#/clients") {
    hideClientView();
    window.history.pushState(
      { page: "home" },
      "",
      "modules/facture/kamto.html",
    );
  }
};
