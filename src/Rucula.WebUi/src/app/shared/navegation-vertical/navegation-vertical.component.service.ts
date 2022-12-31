import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  LastItemInfocusInNavigationLeft!:HTMLElement // guarda o último elemento LI em foco da NavLeft
  LastItemAnchorfocusInNavigationLeft!:HTMLAnchorElement // guarda o último elemento LI em foco da NavLeft
  LastItemSUMMARYfocusInNavigationLeft!:HTMLElement // guarda o último elemento LI em foco da NavLeft
  NavigationLeft!:HTMLElement;  //  Nabegação esquerda
  BtnActionitem!:HTMLElement // é o quando de botões crud para os itens da  NavLeft
  BtnNewLeftList!:HTMLElement 
  PopNavLeft!:HTMLElement // Popup que ocorre quando há persistência de itens na NavLeft
  BtnSaveLeftList!:HTMLElement

  ResetFormItemNavegationLeft(){
    this.PopupFormItemNavegationLeft.get('summary')?.setValue('')
    this.PopupFormItemNavegationLeft.get('tituleSubTitule')?.setValue('')
    this.PopupFormItemNavegationLeft.get('url')?.setValue('')
  }
  PrepareNavegationLeft(){
    this.PopNavLeft = document.getElementById("pop-nav-left") as HTMLElement
    this.BtnSaveLeftList = document.getElementById('btn-save-nav-left') as HTMLButtonElement;
    this.NavigationLeft = document.getElementById("nav-left") as HTMLElement
    this.NavigationLeft.addEventListener('mouseover',(event) => this.AddButtonsCrudInItensNavLeft(event))
    this.NavigationLeft.addEventListener('click',(event) => this.CancelEventClickAnchor(event)) 
    this.BtnNewLeftList = document.getElementById('btn-first-nav-left') as HTMLButtonElement;
    this.BtnActionitem = document.getElementById("new-item-nav") as HTMLButtonElement;
    this.CloseButonFistItemNavLeftItem()
  }
  AddButtonsCrudInItensNavLeft(e:Event){
    const element = e.target as HTMLElement;
    if (element.nodeName == "A"){
      this.BtnActionitem.style.display = "inline";
      element.after(this.BtnActionitem);
      this.LastItemInfocusInNavigationLeft = element.parentNode as HTMLElement;
      this.LastItemAnchorfocusInNavigationLeft = element as HTMLAnchorElement;  
    }      
    if(element.nodeName == "SUMMARY"){
    this.BtnActionitem.style.display = "inline";
    element.append(this.BtnActionitem);
    this.LastItemInfocusInNavigationLeft = element as HTMLAnchorElement
    this.LastItemSUMMARYfocusInNavigationLeft = element as HTMLAnchorElement
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
    this.ResetFormItemNavegationLeft()
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
    if(this.LastItemInfocusInNavigationLeft.nodeName == "SUMMARY"){
      this.LastItemSUMMARYfocusInNavigationLeft.textContent = String(this.PopupFormItemNavegationLeft.get('summary')?.value); 
    }
    if(this.LastItemInfocusInNavigationLeft.nodeName == "LI"){
      this.LastItemAnchorfocusInNavigationLeft.textContent = String(this.PopupFormItemNavegationLeft.get('tituleSubTitule')?.value);
      this.LastItemAnchorfocusInNavigationLeft.removeAttribute('href');
      this.LastItemAnchorfocusInNavigationLeft.setAttribute('href',String(this.PopupFormItemNavegationLeft.get('url')?.value));   
    }
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
    this.CloseButtonsCrudInItensNavLeft();
    this.CheckAndRemoveItem(this.LastItemInfocusInNavigationLeft)
  }
  CheckAndRemoveItem(item:HTMLElement){

    let countChildsNode = 0;

    countChildsNode = CountNumberChieldNodes(item.parentNode as HTMLElement);

    if (item.parentNode?.nodeName == "OL" && (item.parentNode as HTMLElement).id == "nav-left" && countChildsNode == 1){
      item.remove() // Entende que é o unico filho do OL principal e o remove
      this.OpenFirtButtonNavList();
      return
    }
    if (countChildsNode > 1){
      item.remove(); // Caso o Pai tenha mais de um filho, o item em foco é removido na hora
      return
    } 
    if (countChildsNode == 1)
    {
      this.CheckAndRemoveItem(item.parentNode as HTMLElement) 
      /* 
        Ao saber que o Pai tem apenas um filho, é feito a leitura dos pais mais superiores até encontrar saber o nó que deve ser removido
        Nota: Esse procedimento remove OL's e DETAILS que poderiam ficar sem filhos na lista
      */
    }
    function CountNumberChieldNodes(item:HTMLElement){
      let countChilds = 0;
      item?.childNodes.forEach((i) => {
        if (i.nodeName == "OL" || i.nodeName == "LI" || i.nodeName == "DETAILS")
        countChilds++;
      })
      return countChilds;
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
    this.PopupFormItemNavegationLeft.get('summary')?.setValue(this.LastItemSUMMARYfocusInNavigationLeft.textContent)
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