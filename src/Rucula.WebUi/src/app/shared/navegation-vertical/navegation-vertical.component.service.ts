import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NavegationVerticalService {
    
  constructor(private fb: FormBuilder){}
  PopupFormItemNavegationLeft = this.fb.group({
    summary:[''],
    tituleSubTitule:[''],
    url:['']
  });
  
  ActionIndicatorNavLeftButtons:Number = 0;
  LastItemInfocusInNavigationLeft!:HTMLElement // guarda o último elemento em foco  da NavLeft
  NavigationLeft!:HTMLElement;  //  Nabegação esquerda
  BtnActionitem!:HTMLElement // é o quando de botões crud para os itens da  NavLeft
  BtnNewLeftList!:HTMLElement 
  PopNavLeft!:HTMLElement // Popup que ocorre quando há persistência de itens na NavLeft
  BtnSaveLeftList!:HTMLElement

  PrepareNavegationLeft(){
    this.PopNavLeft = document.getElementById("pop-nav-left") as HTMLElement
    this.BtnSaveLeftList = document.getElementById('btn-save-nav-left') as HTMLButtonElement;
    this.CloseButonFistItemNavLeftItem()
    this.NavigationLeft = document.getElementById("nav-left") as HTMLElement
    this.NavigationLeft.addEventListener('mouseover',(event) => this.AddButtonsCrudInItensNavLeft(event))
    this.NavigationLeft.addEventListener('click',(event) => this.CancelEventClickAnchor(event)) 
    this.BtnNewLeftList = document.getElementById('btn-first-nav-left') as HTMLButtonElement;
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

  AddNavLeftItem(){  
    switch (this.ActionIndicatorNavLeftButtons) {
      case NavLeftButtonActionInFocus.InitNav:
        this.SetFistItemNavLeftItem()
        break;
      case NavLeftButtonActionInFocus.Create:
        this.SetValueCreateNavLeftItem()
        break;
      case NavLeftButtonActionInFocus.Update:
          this.UpdateValueNavLeftItem()
          break;    
      case NavLeftButtonActionInFocus.CreateNewChield:
          this.SetValueChieldCreateNavLeftItem()
          break;    
    }
    this.CloseNavLeft()
  }
  SetFistItemNavLeftItem(){
    var nav = document.getElementById('nav-left')
    if(nav!.childNodes.length > 0) return;
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const li = document.createElement('li');
    const anchor = document.createElement('a');

    anchor.textContent = String(this.PopupFormItemNavegationLeft.get('tituleSubTitule')?.value);
    anchor.href = String(this.PopupFormItemNavegationLeft.get('url')?.value)
    li.appendChild(anchor);
    if(String(this.PopupFormItemNavegationLeft.get('summary')?.value).length > 0){
      summary.textContent = String(this.PopupFormItemNavegationLeft.get('summary')?.value);
      details.appendChild(summary)
      details.appendChild(li);
      nav?.appendChild(details)
    } 
    else{
      nav?.appendChild(li)
    }
    this.CloseFirtButtonNavList();
  }
  SetValueCreateNavLeftItem(){
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const li = document.createElement('li');
    const anchor = document.createElement('a');

    anchor.textContent = String(this.PopupFormItemNavegationLeft.get('tituleSubTitule')?.value);
    anchor.href = String(this.PopupFormItemNavegationLeft.get('url')?.value)
    li.appendChild(anchor)
    let summaryControl = this.PopupFormItemNavegationLeft.get('summary')?.value; 
    
    if(String(summaryControl).length > 0){
      summary.textContent = summaryControl as string;
      details.appendChild(summary)
      details.appendChild(li);
      this.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(details,this.LastItemInfocusInNavigationLeft.nextSibling)
    } 
    else{
      this.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(li,this.LastItemInfocusInNavigationLeft.nextSibling)
    }
  }
  UpdateValueNavLeftItem(){
    this.LastItemInfocusInNavigationLeft.textContent = String(this.PopupFormItemNavegationLeft.get('tituleSubTitule')?.value);
    this.LastItemInfocusInNavigationLeft.removeAttribute('href');
    this.LastItemInfocusInNavigationLeft.setAttribute('href',String(this.PopupFormItemNavegationLeft.get('url')?.value));
  }
  SetValueChieldCreateNavLeftItem(){
    const ol = document.createElement('ol');
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const li = document.createElement('li');
    const anchor = document.createElement('a');

    anchor.textContent = String(this.PopupFormItemNavegationLeft.get('tituleSubTitule')?.value);
    anchor.href = String(this.PopupFormItemNavegationLeft.get('url')?.value)
    li.appendChild(anchor)
    let summaryControl = this.PopupFormItemNavegationLeft.get('summary')?.value; 
    
    if(String(summaryControl).length > 0){
      summary.textContent = summaryControl as string;
      details.appendChild(summary)
      details.appendChild(li);
      ol.appendChild(details);
      
      this.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(ol,this.LastItemInfocusInNavigationLeft.nextSibling)
    } 
    else{
      ol.appendChild(li);
      this.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(ol,this.LastItemInfocusInNavigationLeft.nextSibling)
    }
  } 
  RemoveItemNav(){
    const li   = this.LastItemInfocusInNavigationLeft;

    if ((li.parentNode as HTMLElement).id == "nav-left" && (li.parentNode as HTMLElement).nodeName == "OL"){
        li.remove() // Entende que é o primeiro LI da lista e à remove.
      return
    }
    this.RemoveItemOfDetails(li);
    this.CloseButtonsCrudInItensNavLeft();
    this.OpenFirtButtonNavList();
  }
  RemoveItemOfDetails(li:HTMLElement){
    let countChildLi = 0 ;
    if ((li.parentNode as HTMLElement).nodeName == "DETAILS"){
      (li.parentNode as HTMLElement).childNodes.forEach(
        (item) => {
          if (item.nodeName == "LI")
            ++countChildLi; 
      })
      if (countChildLi > 1)
        li.remove();
      
        if(countChildLi == 1)
          (li.parentNode as HTMLElement).remove(); // Se existir apenas um LI dentro de DETAIS, então DETAIS deve ser removido 
    }
  }
  InitFirstItemNavLeft(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.InitNav;
    this.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft()
  }
  AddNewItemNavLeft(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.Create;
    this.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft()
  }
  AlterItemNav(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.Update;
    this.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft()
  }
  AddChieldItemNav(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.CreateNewChield;
    this.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft() 
  }

  OpenNavLeft(){
    this.PopNavLeft!.style.display = "flex";
  }
  CloseNavLeft(){
    this.PopNavLeft!.style.display = "none";
  }
  CloseFirtButtonNavList(){
    this.BtnNewLeftList!.style.display = "none";
  }
  CloseButonFistItemNavLeftItem(){
    var nav = document.getElementById('nav-left')
    if(nav!.childNodes.length > 0){
      this.CloseFirtButtonNavList();
    } 
    else{
      this.CloseBtnSaveLeftList();
    }
  }
  CloseBtnSaveLeftList(){
    this.BtnSaveLeftList.style.display = "none"
  }
  OpenFirtButtonNavList(){
    var nav = document.getElementById('nav-left')
    if(nav!.childNodes.length == 0){
      this.BtnNewLeftList!.style.display = "block";
    }
  }
  
}
enum NavLeftButtonActionInFocus {
  InitNav = 0,
  Create = 1,
  Update = 2,
  CreateNewChield = 3,
  Delete = 4,
}