import { Injectable } from "@angular/core";
import { actionsReciverService } from "../actions/actionsReciverService";
import { button } from "../entities/form/button";
import { factoryObjectService } from "../factoryObjectService";
import swall from 'sweetalert';


@Injectable({
    providedIn: 'root',
})
export class actionButtons{
constructor(private actionsService:actionsReciverService){}

    factoryObjectService:factoryObjectService = new factoryObjectService();
    actions:Map<string,button> = new Map();
    loader!:HTMLElement;
    urlRoot:string="";
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
        this.loader = document.getElementById("loader-box")!
        this.OpenCloseLoader(true);
        let config = this.actions.get(key);
        switch (config!.method){
            case "post":
                this.factoryObjectService.createObjet()
                this.actionsService!.post(this.urlRoot+config?.urlrelative,this.factoryObjectService.objJSON)
                .subscribe(
                    {
                        complete:() => {
                            this.OpenCloseLoader(false);
                            swall("Registro Salvo com Sucesso");
                        },
                        error:(e) => {
                            this.OpenCloseLoader(false);
                            swall("Erro Insperado Sucesso "+e);
                        }
                    }
                );
                break;
        }
    }
    OpenCloseLoader(open:boolean){
        if (open){
            this.loader.style.display = "flex"
        }
        else{
            this.loader.style.display = "none"
        }
    }
}