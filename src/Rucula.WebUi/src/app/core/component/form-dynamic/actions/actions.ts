import { commandAction } from "./commandAction";
import { actionsReciverService } from "./actionsReciverService";
import { saveCommand } from "./saveCommand";
import { invokerAction } from "./invokerAction";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root',
})
export class actions{

    private actionsReciverService!:actionsReciverService;
    private commandAction!:commandAction;
    private invokerAction!:invokerAction;
    
    post(configuration:any, object:any){
        this.actionsReciverService = new actionsReciverService();
        this.commandAction = new saveCommand(this.actionsReciverService)
        this.invokerAction = new invokerAction();
        this.invokerAction.SetCommmand(this.commandAction);
        this.invokerAction.ExecuteCommmand();
    }
}