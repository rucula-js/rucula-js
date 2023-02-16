import { commandAction } from "./commandAction";
import { actionsReciverService } from "./actionsReciverService";

export class saveCommand implements commandAction{

    private _actionsReciverService!:actionsReciverService;

    constructor(private actionsService:actionsReciverService){
        this._actionsReciverService = actionsService;
    }
    executecommand(): void {
       this.actionsService.get();
    }

}