import { DebugNode, Injectable } from "@angular/core";
import { actionsHTTPService } from "./actionsHTTPService";
import { button } from "../entities/form/button";
import { factoryObjectService } from "../create-object/factory-object-service";
import { HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class actionButtons{
constructor(private actionHttp:actionsHTTPService, private factoryObjectService:factoryObjectService, private router: Router){}

    headers!:HttpHeaders
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
        let configButton = this.actions.get(key);
        switch (configButton!.method){
            case "post":
                this.post(configButton!)
                break;
            case "put":
                this.put(configButton!)
                break;
            case "delete":
                this.delete(configButton!)                
                break;        
        }
    }
    post(configButton:button){
        this.OpenCloseLoader(true);
        let url = this.urlRoot+configButton?.urlrelative;
        this.actionHttp!.post(url,this.getObject())
            .subscribe({
                complete:() => {
                    this.finallySucess("Registro Salvo!")
                },
                error:(e) => {
                    this.finallyError(e)
                }
            }
        );
    }
    put(configButton:button){
        this.OpenCloseLoader(true);
        this.factoryObjectService.createObjet()
        this.actionHttp!.put(this.urlRoot+configButton?.urlrelative,this.factoryObjectService.objJSON)
        .subscribe({
            complete:() => {
                this.finallySucess("Registro Alterado!")
            },
            error:(e) => {
                this.finallyError(e)
            }
        })
    }
    delete(configButton:button){
        this.OpenCloseLoader(true);
        this.factoryObjectService.createObjet()    
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body:this.factoryObjectService.objJSON
            };
        this.actionHttp!.delete(this.urlRoot+configButton?.urlrelative,options).subscribe({
            complete:() => {
                this.finallySucess("Registro Excluido!")
            },
            error:(e) => {
                this.finallyError(e)
            }
        })
    }
    OpenCloseLoader(open:boolean){
        if (open){
            this.loader.style.display = "flex"
        }
        else{
            this.loader.style.display = "none"
        }
    }
    getObject(){
        this.factoryObjectService.createObjet()
        return this.factoryObjectService.objJSON
    }
    finallySucess(message:string){
        setTimeout(() =>{
            this.OpenCloseLoader(false);
            alert(message);
        },1000)
    }
    finallyError(e:any){
        setTimeout(() =>{
            this.OpenCloseLoader(false);
            alert("Erro:" +e);
        },1000)
    }
}