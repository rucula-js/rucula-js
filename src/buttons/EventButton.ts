import {createUrl} from '../Helpers/UrlHelper';
import { button } from '../entities/form/button';
import * as table  from '../table-dependency/TableDependency';
import * as obj from '../object/ObjectManagment';
import * as axios from '../axios/Axios';
import { getEndPoint } from '../window/Window';
import { buttonIsNotDefault } from './Button';

export function eventButton(buttons:button[]){
    
buttons!.
    filter(b => b.type === "button").
    forEach((button)=> {
        
        let element:HTMLElement
        
        if(buttonIsNotDefault(button.target) == false){
            element = document?.getElementById(button.target) as HTMLElement
            setEventClick(element)
        }

        if(buttonIsNotDefault(button.target)){
            element = document.getElementById(button.target)!
            setEventClick(element)
        }

        function setEventClick(element:HTMLElement){
            element!.addEventListener("click", () => {
                if(table.dependenciesCount() > 0){
                    alert("existem dependencias não resolvidas");
                    return;
                }
                let endPoint = getEndPoint(button.endPoint)
                let url = createUrl(endPoint)
                
                let body:unknown  = {};
    
                if(endPoint.body === "this"){
                    body = obj.object()
                }
                if(endPoint?.body?.trim().length > 0){
                   // Todo! Implementar logica para obter objeto especifico
                }
                axios.ax({method:endPoint.method,url:url,data:body})
            })
        }

    });
}

export function openCloseRightListButtons(){

    const openClose = document.getElementById("r-a-menu-vertical")
    const listRight = document.getElementById("r-a-menu-vertical-list")
    
    openClose?.addEventListener("click",() => {

        listRight?.classList.toggle("r-display-none");
    
    })
}
