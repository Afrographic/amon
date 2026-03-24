function toggleMobileMenu() {
  let supportDev = document.querySelector(".supportDev");
  supportDev.classList.remove("supportDevMobileInactive");
  if (window.innerWidth <= 1000) {
    window.history.pushState({ page: "menu" }, "", "?menu");
    localStorage.setItem("current-page", "/#/menu");
  }
}

function hideMobileMenu() {
  let supportDev = document.querySelector(".supportDev");
  supportDev.classList.add("supportDevMobileInactive");
}
