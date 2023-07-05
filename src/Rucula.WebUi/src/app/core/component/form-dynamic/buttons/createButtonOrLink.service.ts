import { Injectable } from '@angular/core';
import { button } from '../entities/form/button';
import { FactoryUrl } from '../http/factory-url.component.service';
import { FactoryHttp } from '../http/factory-http.component.service';
import { TableDependencyService } from '../table-dependency/table-dependency.service.component';
import { FactoryObjectService } from '../factory-object/factory-object.service.component';

@Injectable({
    providedIn: 'root',
})
export class createButtonOrLinkService {
 
    constructor( 
      private url:FactoryUrl, 
      private http:FactoryHttp,
      private dependencies:TableDependencyService,
      private object:FactoryObjectService){}

    public prepareButtonsCRUD(button:button[]){
      const ButtonsBox = document.getElementById("box-actions")
      button.forEach(b => {
        ButtonsBox?.appendChild(this.createButtonOrLink(b))  
      })
      ButtonsBox?.appendChild(this.createButtonOrLink({id:"5454",method:"cancel",link:"",icon:"bi bi-x-lg",text:"",type:"button",color:"",target:""}))
    }

    public createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
        let  buttonOrLink:HTMLButtonElement|HTMLAnchorElement      
        if(button.type != "button" && button.type != "link"){
          throw new Error("tipo do botão deve ser button ou link");
        }
        if(button.type == "button"){
          buttonOrLink = document.createElement('button')  
          buttonOrLink!.classList.add("btn")
          buttonOrLink!.classList.add("mb-1")
          buttonOrLink!.classList.add("d-block")
          
          buttonOrLink.textContent = button.text+""
        }
        if(button.type == "link"){
          buttonOrLink = document.createElement('a')
          buttonOrLink.textContent = button.text+""
          buttonOrLink.href = `${button.link}`
          buttonOrLink!.classList.add("btn-link")
          buttonOrLink!.setAttribute('target',"_blank")
        }
        buttonOrLink!.setAttribute("data-id",`${button.type}-${button.method}-${button.id}`);
        if (button.color){
          buttonOrLink!.style.backgroundColor = button.color
        }
    
        if (button.icon){
          let  icon = document.createElement('i')
          button.icon.split(" ").forEach(item => 
            icon.classList.add(item)
          )
          buttonOrLink!.appendChild(icon)
        }
        this.setEventButton(buttonOrLink!,button)
        return buttonOrLink!
    } 
    private setEventButton( buttonOrLink:HTMLButtonElement|HTMLAnchorElement,button:button){
      buttonOrLink!.addEventListener("click", () => {

        if(this.dependencies.dependenciesCount > 0){
          alert("existem dependencias não resolvidas");
          return;
        } 
        let url = this.url.createUrl(button)
        if(button.method == "post") this.http.post(url,this.object.object)
        if(button.method == "put") this.http.put(url,this.object.object)
        if(button.method == "delete")  this.http.delete(url,this.object.object)
      })
    }
}