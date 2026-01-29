class ClientsService{
    static async get_all(){
        await ClientRepo.init();
        let clients = await ClientRepo.get_all();
        return clients;
    }
}