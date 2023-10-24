import {createUrl} from '../Helpers/UrlHelper';
import { button } from '../entities/form/button';
import * as table  from '../table-dependency/TableDependency';
import * as obj from '../object/ObjectManagment';
import * as axios from '../axios/Axios';
import { getEndPoint } from '../window/Window';

export function eventButton(buttons:button[]){
    
buttons!.
    filter(b => b.type === "button").
    forEach((button)=> {
        let element:HTMLElement|Element
        
        if(button.target != ""){
            element = document.getElementById(button.target) as HTMLElement
        }
        else{
            let endPoint = getEndPoint(button.endPoint)
            element = document.querySelector(`[data-id=${button.type}-${endPoint.method}-${button.id}]`) as Element
        }
        element?.addEventListener("click", () => {
            if(table.dependenciesCount() > 0){
                alert("existem dependencias não resolvidas");
                return;
            }
            let url = createUrl(button.endPoint)
            let event = getEndPoint(button.endPoint) 
            
            let body:unknown  = {};

            if(event.body === "this"){
                body = obj.object()
            }
            if(event?.body?.trim().length > 0){
               // Todo! Implementar logica para obter objeto especifico
            }
            axios.ax({method:event.method,url:url,data:body})
        })
    });
}
