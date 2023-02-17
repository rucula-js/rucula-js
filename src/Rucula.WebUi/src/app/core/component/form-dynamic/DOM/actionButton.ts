import { button } from "../entities/form/button";
import { factoryObjectService } from "../factoryObjectService";

export class actionButtons{
    
    factoryObjectService:factoryObjectService = new factoryObjectService();
    actions:Map<string,button> = new Map();
    
    public mapActionButtons(buttons:button[]){
        buttons.forEach(b => {
            this.actions.set(`${b.type}-${b.method}-${b.id}`,b)
        });
        this.setEventButtons()
    }
    private setEventButtons(){
        document.querySelectorAll("#box-actions [data-id]").forEach( i =>
            i.addEventListener('click',(e)=> {
                let id =(e.currentTarget as HTMLButtonElement).getAttribute("data-id")!
                this.runEvent(id)
            })
        )
    }
    runEvent(key:string){
        this.factoryObjectService.createObjet()
        console.log(this.factoryObjectService?.objJSON)
    }
}