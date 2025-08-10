let clients = [];
let clientListView = document.querySelector("#clientListView");
let nomClientListeInput = document.querySelector("#nomClientListeInput");
let mesClientsView = document.querySelector(".mesClientsView");
let nomsClientsEasyPick = document.querySelector(".nomsClients");

function showClientView() {
  mesClientsView.classList.remove("mesClientsViewInactive");
}

function hideClientView() {
  mesClientsView.classList.add("mesClientsViewInactive");
}

async function getClients() {
  var datas = await con.select({
    from: "KamtoData",
    where: {
      id: "1",
    },
  });
  if(datas[0] == undefined) return;
  clients = JSON.parse(datas[0].clients);
  renderClients();
  nomClientListeInput.focus();
}

getClients();

function renderClients() {
  let nomClientsList = document.querySelector(".nomClientsList");
  clientListView.innerHTML = ``;
  nomClientsList.innerHTML = ``;
  if (clients.length == 0) {
    clientListView.innerHTML = `
        <div class="empty">
            <img src="assets/images/empty.svg" alt="" width="64px">
            <div>Aucun clients enregistrer pour l'instant</div>
        </div>
        `;
  }
  for (let i = 0; i <= clients.length - 1; i++) {
    clientListView.innerHTML += `
        <div class="clientName">
            <div>${clients[i]}</div>
            <img src="assets/images/delete.svg" alt="" width="15px" onclick="deleteClientName(${i})" />
        </div>
        `;
    nomClientsList.innerHTML += `
         <div class="name" onclick="easySelectClient('${clients[i]}');hideEasyClientPicker();">${clients[i]}</div>
        `;
  }
}

async function easySelectClient(clientName) {
  let nomClient = document.querySelector("#nomClient");
  nomClient.value = clientName;
}

function showEasyClientPicker() {
  nomsClientsEasyPick.classList.remove("nomsClientsInactive");
}

async function hideEasyClientPicker() {
  await sleep(100);
  nomsClientsEasyPick.classList.add("nomsClientsInactive");
}

async function addNewClient() {
  if (nomClientListeInput.value.trim().length == 0) {
    alert("Nom du client invalide!");
    return;
  }
  clients.unshift(HelperFunction.Ucase(nomClientListeInput.value.trim()));
  updateClientDB();
  nomClientListeInput.value = "";
  nomClientListeInput.focus();
  renderClients();
}

function enterAddNewClient(e) {
  if (e.keyCode == 13) {
    addNewClient();
  }
}

function deleteClientName(index) {
  clients.splice(index, 1);
  updateClientDB();
  renderClients();
}

async function updateClientDB() {
  await con.update({
    in: "KamtoData",
    where: {
      id: "1",
    },
    set: {
      clients: JSON.stringify(clients),
    },
  });
}

let nomClientsList = document.querySelector(".nomClientsList");

function searchClients(event){
  let searched = [];
  let token = event.target.value;
  if(token.trim().length == 0) {
    renderClients();
    return;
  }
  nomClientsList.innerHTML = ``;

  for(let i = 0 ; i<=clients.length-1;i++){
    if(clients[i].toLowerCase().includes(token.toLowerCase())){
      searched.unshift(clients[i])
    }
  }
  
  for (let i = 0; i <= searched.length - 1; i++) {
    nomClientsList.innerHTML += `
         <div class="name" onclick="easySelectClient('${searched[i]}');hideEasyClientPicker();">${searched[i]}</div>
        `;
  }
}