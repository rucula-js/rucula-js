import { Command } from "./Command";
import { CrudReciverService } from "./CrudReciverService";

export class SaveCommand implements Command
{
    private CrudReciver:CrudReciverService;
    
    
    constructor(crudReciver:CrudReciverService){
        this.CrudReciver = crudReciver;
    }
    Execute(): void {
        this.CrudReciver.Save();
    }
}