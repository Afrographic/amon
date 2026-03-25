let searchProduct = document.querySelector(".searchProduct");
function showMenu() {
  searchProduct.classList.remove("searchProductInactive");
  if (window.innerWidth <= 1000) {
    history.pushState({ page: "menu" }, "", "?menu");
    localStorage.setItem("current-page", "menu");
  }
}

function hideMenu() {
  searchProduct.classList.add("searchProductInactive");
}
