import { FactoryUrl } from '../http/url.component.service';
import { FactoryHttp } from '../http/http.component.service';
import { FactoryObjectService } from '../object/object.service.component';
import { TableDependencyService } from '../table-dependency/table-dependency.service.component';
import { button } from '../entities/form/button';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class EventButtonOrLink{
    
  constructor( 
    private url:FactoryUrl, 
    private http:FactoryHttp,
    private dependencies:TableDependencyService,
    private object:FactoryObjectService){}
    
    setEvents(buttons:button[]){
      buttons!.
      filter(b => b.type === "button").
      forEach((button)=> {
        const element:HTMLButtonElement|HTMLAnchorElement = document.querySelector(`[data-id=${button.type}-${button.method}-${button.id}]`)!
        element.addEventListener("click", () => {
          if(this.dependencies.dependenciesCount > 0){
            alert("existem dependencias não resolvidas");
            return;
          }
          let url = this.url.createUrl(button)
          if(button.method == "post") this.http.post(url,this.object.object)
          if(button.method == "put") this.http.put(url,this.object.object)
          if(button.method == "delete")  this.http.delete(url,this.object.object)
        })
      });
    }
}