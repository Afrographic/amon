class CommandesController{
    static async save(commandesFull,fullDate){
        let commandes = [];
        let clientId = document.querySelector("#clientsListUI").value;
        console.log(clientId);
        for(let item of commandesFull){
            commandes.push({
                nom:item.nom,
                prix:item.prixVente,
                qte:item.qteToBuy
            })
        }
       
        let commandeObjt ={
            clientId:clientId,
            commandes:JSON.stringify(commandes),
            fullDate:fullDate
        }
        await CommandeService.save(commandeObjt);
    }
} 