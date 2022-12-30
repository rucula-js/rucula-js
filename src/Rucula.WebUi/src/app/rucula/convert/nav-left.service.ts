import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavLeftService{
    
    LastItemInfocusInNavigationLeft!:HTMLElement // guarda o último elemento em foco  da NavLeft
    NavigationLeft!:HTMLElement;  //  Nabegação esquerda
    BtnActionitem!:HTMLElement // é o quando de botões crud para os itens da  NavLeft


    PrepareNavegationLeft(){
      this.NavigationLeft = document.getElementById("nav-left") as HTMLElement
      this.NavigationLeft.addEventListener('mouseover',(event) => this.AddButtonsCrudInItensNavLeft(event))
      this.NavigationLeft.addEventListener('click',(event) => this.CancelEventClickAnchor(event)) 

      this.BtnActionitem = document.getElementById("new-item-nav") as HTMLButtonElement;
    }
    AddButtonsCrudInItensNavLeft(e:Event){
      const element = e.target as HTMLElement;
      if (element.nodeName == "A"){
        this.BtnActionitem.style.display = "inline";
        element.after(this.BtnActionitem);
        this.LastItemInfocusInNavigationLeft = element.parentNode as HTMLElement;
      }      
    }
    CloseButtonsCrudInItensNavLeft(){
      this.BtnActionitem.style.display ="none";
    }
    CancelEventClickAnchor(e:Event){
      const element = e.target as HTMLElement;
      if (element.nodeName == "A")
      e.preventDefault();
    }
    
}