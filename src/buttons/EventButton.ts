import {createUrl} from '../Helpers/UrlHelper';
import { button } from '../entities/form/button';
import * as table  from '../table-dependency/TableDependency';
import * as obj from '../object/ObjectManagment';
import * as axios from '../axios/Axios';

export function eventButton(buttons:button[]){
    
buttons!.
    filter(b => b.type === "button").
    forEach((button)=> {
        let element:HTMLElement|Element
        
        if(button.target != ""){
            element = document.getElementById(button.target) as HTMLElement
        }
        else{
            element = document.querySelector(`[data-id=${button.type}-${button.method}-${button.id}]`) as Element
        }
        element?.addEventListener("click", () => {
            if(table.dependenciesCount() > 0){
                alert("existem dependencias não resolvidas");
                return;
            }
            let url = createUrl(button)

            alert(url)
            axios.ax({method:button.method,url:url,data:obj.object()})
        })
    });
}
