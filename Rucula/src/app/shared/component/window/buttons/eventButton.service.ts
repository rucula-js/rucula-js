// import { FactoryUrl } from '../http/url.component.service';
import {createUrl} from '../http/UrlHelper';
import { FactoryHttp } from '../http/http.component.service';
import { button } from '../entities/form/button';
import * as table  from '../table-dependency/TableDependency';
import * as obj from '../object/ObjectManagment';

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class EventButtonOrLink{
    //! Essa estrutura será alterada para o formado padrão do TS. Isso só será possivel depois da implementação do AXIOS
  constructor( 
    private http:FactoryHttp){}
    
    setEvents(buttons:button[]){
      buttons!.
      filter(b => b.type === "button").
      forEach((button)=> {
        const element:HTMLButtonElement|HTMLAnchorElement = document.querySelector(`[data-id=${button.type}-${button.method}-${button.id}]`)!
        element.addEventListener("click", () => {
          if(table.dependenciesCount() > 0){
            alert("existem dependencias não resolvidas");
            return;
          }
          let url = createUrl(button)
          if(button.method == "post") this.http.post(url,obj.object())
          if(button.method == "put") this.http.put(url,obj.object())
          if(button.method == "delete")  this.http.delete(url,obj.object())
        })
      });
    }
}