class Service{
    static async getClientCommandes(){ 
        let data = [];
        let clients = await RepoClient.get_all();
        let commandes = await Repo_Commande.get_all();
        for(let item of clients){
            let commandesClients = this.getSingleClientCommande(item.id,commandes);
            item.commandes = commandesClients;
            item.active = false;
            data.push(item);
        }
       
        return data;
    }

    static getSingleClientCommande(clientId,commandes){
        let res = [];
        for(let item of commandes){
            if(item.clientId == clientId){
                item.commande = JSON.parse(item.commande);
                res.push(item);
            }
        }
        return res;
    }
}