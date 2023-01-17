import { Command } from "./Command";
import { SaveCommand } from "./SaveCommand";

export class CrudIvoker {

    private CrudCommad: Command;
    

    constructor (crudCommad:Command){
        this.CrudCommad = crudCommad;
    }
    Save(){
        this.CrudCommad.Execute();
    }
    Alter(){
        
    }
}