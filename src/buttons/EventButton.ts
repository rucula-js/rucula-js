import {createUrl} from '../Helpers/UrlHelper';
import { button } from '../entities/form/button';
import * as table  from '../table-dependency/TableDependency';
import * as obj from '../object/ObjectManagment';
import * as axios from '../axios/Axios';
import { getEndPoint } from '../window/Window';
import { buttonIsNotDefault } from './Button';
import { constIdBaseWindow, eventRucula } from '../const';

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

                let rucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS)
                rucula?.dispatchEvent(eventRucula.EVENT_BEFORE_SEND_OBJECT_HTTP)
                
                axios.ax({method:endPoint.method,url:url,data:body})
                .then(obj => {
                    rucula?.dispatchEvent(eventRucula.EVENT_SEND_OBJECT_HTTP_OK)    
                    rucula?.dispatchEvent(eventRucula.EVENT_AFTER_SEND_OBJECT_HTTP)    
                })
                .catch(obj => {
                    rucula?.dispatchEvent(eventRucula.EVENT_SEND_OBJECT_HTTP_ERROR)    
                    rucula?.dispatchEvent(eventRucula.EVENT_AFTER_SEND_OBJECT_HTTP)      
                })
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
