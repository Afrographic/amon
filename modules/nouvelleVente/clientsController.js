class ClientsController{
    static clients = [];
    static async renderClients(){
        this.clients = await ClientsService.get_all();
        let clientsListUI = document.querySelector("#clientsListUI");
        clientsListUI.innerHTML ="";
        for(let client of this.clients){
            clientsListUI.innerHTML +=`
            <option value="${client.id}">${client.fullname}</option>
            `
        }
    }
}

ClientsController.renderClients();