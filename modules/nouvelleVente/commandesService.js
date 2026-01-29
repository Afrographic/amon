class CommandeService{
    static async save(commande){
        await CommandeRepo.save(commande);
    }
}