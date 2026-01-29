class CommandesController{
    static async save(commandesFull,fullDate){
        let commandes = [];
        for(let item of commandesFull){
            commandes.push({
                nom:item.nom,
                prix:item.prixVente,
                qte:item.qteToBuy
            })
        }
       
        let commandeObjt ={
            clientId:document.querySelector("#clientsListUI").value,
            commandes:JSON.stringify(commandes),
            fullDate:fullDate
        }
        await CommandeService.save(commandeObjt);
    }
}