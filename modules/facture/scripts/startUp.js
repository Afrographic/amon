let startUp = document.querySelector(".startUp");
async function removeStartUp() {
  await sleep(1500);
  startUp.classList.add("startUpInactive");
  await sleep(250);
  startUp.style.display = "none";
}

removeStartUp();
