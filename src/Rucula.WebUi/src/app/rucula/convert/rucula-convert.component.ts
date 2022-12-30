import { Component, OnInit , } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RuculaContentService } from './rucula-convert.service';
import { ContentHTML } from './ContentHTML';
import { Guid } from 'guid-typescript';
import { TagMetaHTML } from './TagMetaHTML';
import { NavLeftService } from './nav-left.service';

@Component({
  selector: 'rucula-language',
  templateUrl: './rucula-convert.component.html',
  styleUrls: ['./rucula-convert.component.css']
})
export class RuculaConvertComponent  implements OnInit {  

  constructor(private fb: FormBuilder, private rc:RuculaContentService, private nl:NavLeftService) { 
  }
  ngOnInit(){
    this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.setValue(Guid.create().toString())
    this.PrepareNavegationLeft();
    this.nl.PrepareNavegationLeft();
  }

  TagMetaHTML!:TagMetaHTML[]; 
  ContentRuculaCache:any;
  ContentHTMLCache:any;

  ContentHTML!:ContentHTML;
  ContentHTMLForm = this.fb.group({
    metacharset:['UTF-8'],
    metaviewport:['width=device-width, initial-scale=1.0'],
    metadescription:[''],
    metakeywords:[''],
    metaauthor:[''],
    metatitle:[''],
    sintaxeRucula: this.fb.group({
        guuid: ['',Validators.required],
        content: [''],
        dateCreation:[''],
        dateLastUpdate: [''],
        contentLanguageRucula:['']
    }),
    contentEstruture : this.fb.group({
      description:[] ,
      next:[] ,
      previous:[]
    })
  })

  PopNavLeft!:HTMLElement // Popup que ocorre quando há persistência de itens na NavLeft
  BtnNewLeftList!:HTMLElement 
  BtnSaveLeftList!:HTMLElement

  ActionIndicatorNavLeftButtons:Number = 0;

  PopupFormItemNavegationLeft = this.fb.group({
    summary:[''],
    tituleSubTitule:[''],
    url:['']
  });

  PrepareNavegationLeft(){
    this.PopNavLeft = document.getElementById("pop-nav-left") as HTMLElement
    this.BtnNewLeftList = document.getElementById('btn-first-nav-left') as HTMLButtonElement;
    this.BtnSaveLeftList = document.getElementById('btn-save-nav-left') as HTMLButtonElement;
    this.CloseButonFistItemNavLeftItem()
  }
  CreateListTagMetaHTML(){
    this.TagMetaHTML.push({         
        guuid:Guid.create().toString(),
        name:"meta",
        propert:"charset",
        content:this.ContentHTMLForm.get('metacharset')!.value as string,
        description:'',
        contentHTMLFk:this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.value!}
    )

    this.TagMetaHTML.push({         
      guuid:Guid.create().toString(),
      name:"meta",
      propert:"viewport",
      content:this.ContentHTMLForm.get('metaviewport')!.value as string,
      description:'',
      contentHTMLFk:this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.value!}
    )
  }
  Save(){
      document.getElementById('content-rucula')!.textContent = this.ContentRuculaCache  
  }
  PreviewContent(){
    document.getElementById('container-preview')!.style.display = "block"
    this.ContentHTML = this.ContentHTMLForm as ContentHTML
    this.ContentRuculaCache = document.getElementById('content-rucula')?.textContent!;
    this.ContentHTML.contentLanguageRucula = this.ContentRuculaCache; 
    this.rc.PreviewContent(this.ContentHTML.contentLanguageRucula!).subscribe(
      (resp:any)=> {
        document.getElementById('content-rucula-preview')!.innerHTML =  resp["content"]
      })
  }



  closePreview(){
      document.getElementById('container-preview')!.style.display = "none"
  }
  CloseNavLeft(){
    this.PopNavLeft!.style.display = "none";
  }
  OpenNavLeft(){
    this.PopNavLeft!.style.display = "flex";
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
  InitFirstItemNavLeft(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.InitNav;
    this.nl.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft()
  }
  AddNewItemNavLeft(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.Create;
    this.nl.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft()
  }
  AlterItemNav(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.Update;
    this.nl.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft()
  }
  AddChieldItemNav(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.CreateNewChield;
    this.nl.CloseButtonsCrudInItensNavLeft();
    this.OpenNavLeft() 
  }
  RemoveItemNav(){
    let countChildLi = 0 ;
    const li   = this.nl.LastItemInfocusInNavigationLeft;
    if ((li.parentNode as HTMLElement).id = "nav-left"){
      li.remove() // Entende que é o primeiro LI da lista e à remove.
      return
    }
    if ((li.parentNode as HTMLElement).nodeName == "DETAILS"){

        (li.parentNode as HTMLElement).childNodes.forEach(
          (item) => {
            if (item.nodeName == "LI")
              ++countChildLi; 
        })
        if (countChildLi > 1)
          li.remove();
        
          if(countChildLi == 1)
            (li.parentNode as HTMLElement).remove();
      } 
    this.nl.CloseButtonsCrudInItensNavLeft();
    this.OpenFirtButtonNavList();
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
      this.nl.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(details,this.nl.LastItemInfocusInNavigationLeft.nextSibling)
    } 
    else{
      this.nl.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(li,this.nl.LastItemInfocusInNavigationLeft.nextSibling)
    }
  }
  UpdateValueNavLeftItem(){
    this.nl.LastItemInfocusInNavigationLeft.textContent = String(this.PopupFormItemNavegationLeft.get('tituleSubTitule')?.value);
    this.nl.LastItemInfocusInNavigationLeft.removeAttribute('href');
    this.nl.LastItemInfocusInNavigationLeft.setAttribute('href',String(this.PopupFormItemNavegationLeft.get('url')?.value));
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
      
      this.nl.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(ol,this.nl.LastItemInfocusInNavigationLeft.nextSibling)
    } 
    else{
      ol.appendChild(li);
      this.nl.LastItemInfocusInNavigationLeft.parentNode?.insertBefore(ol,this.nl.LastItemInfocusInNavigationLeft.nextSibling)
    }
  } 
  CloseFirtButtonNavList(){
    this.BtnNewLeftList!.style.display = "none";
  }
  OpenFirtButtonNavList(){
    var nav = document.getElementById('nav-left')
    if(nav!.childNodes.length == 0){
      this.BtnNewLeftList!.style.display = "block";
    }
  }
  CloseBtnSaveLeftList(){
    this.BtnSaveLeftList.style.display = "none"
  }
  SaveNavLeft(){

  }
}

enum NavLeftButtonActionInFocus {
  InitNav = 0,
  Create = 1,
  Update = 2,
  CreateNewChield = 3,
  Delete = 4,
}
