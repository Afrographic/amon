class Service{
    static async get_all(){
        await Repo.init();
        let fournisseurs = await Repo.get_all();
        return fournisseurs;
    }

    static async add(fournisseur){
        let id = await Repo.add(fournisseur);
        return id;
    }

    static async edit(fournisseur){
        await Repo.edit(fournisseur);
    }

    static async delete(id){
        await Repo.delete(id);
    }
}