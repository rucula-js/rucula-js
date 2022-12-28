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

  constructor(private fb: FormBuilder, private rc:RuculaContentService, private nl:NavLeftService  ) { 
  }
  ngOnInit(){
    this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.setValue(Guid.create().toString())
    this.NavLeft = document.getElementById("nav-left") as HTMLElement
    this.PopNavLeft = document.getElementById("pop-nav-left") as HTMLElement
    this.BtnActionitem = document.getElementById("new-item-nav") as HTMLButtonElement;
    this.NavLeft.addEventListener('mouseover',(event) => this.AddButtonsActionItens(event))
    this.CloseButonFistItemNavLeftItem()
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

  NavLeft!:HTMLElement;  //  É o elemento principal da lista esqueda
  PopNavLeft!:HTMLElement // Popup que ocorre quando há persistência de itens na NavLeft
  BtnActionitem!:HTMLElement // é o quando de botões crud para os itens da  NavLeft

  ActionIndicatorNavLeftButtons:Number = 0;

  NavLeftForm = this.fb.group({
    summary:[''],
    tituleSubTitule:[''],
    url:['']
  });


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

  AddButtonsActionItens(e:Event){
    const element = e.target as HTMLElement;
    if (element.nodeName == "A"){
      this.BtnActionitem.style.display = "inline";
      element.after(this.BtnActionitem);
      this.nl.LastItemWithFocusInNavLeft = element;
    }      
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
    this.OpenNavLeft()
  }
  AddNewItemNavLeft(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.Create;
    this.OpenNavLeft()
  }
  AlterItemNav(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.Update;
    this.OpenNavLeft()
  }
  AddChieldItemNav(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.CreateNewChield;
    this.OpenNavLeft() 
  }
  RemoveItemNav(){
    var LI = this.nl.LastItemWithFocusInNavLeft.parentNode?.parentNode!.removeChild(this.nl.LastItemWithFocusInNavLeft.parentNode)
    this.BtnActionitem.style.display = "none";
  }

  CloseButonFistItemNavLeftItem(){
    var nav = document.getElementById('nav-left')
    if(nav!.childNodes.length > 0){
      this.CloseFirtButtonNavList();
    } 
  }
  SetFistItemNavLeftItem(){
    var nav = document.getElementById('nav-left')
    if(nav!.childNodes.length > 0) return;
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const li = document.createElement('li');
    const anchor = document.createElement('a');

    anchor.textContent = String(this.NavLeftForm.get('tituleSubTitule')?.value);
    anchor.href = String(this.NavLeftForm.get('url')?.value)
    li.appendChild(anchor);
    if(String(this.NavLeftForm.get('summary')?.value).length > 0){
      summary.textContent = String(this.NavLeftForm.get('summary')?.value);
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

    anchor.textContent = String(this.NavLeftForm.get('tituleSubTitule')?.value);
    anchor.href = String(this.NavLeftForm.get('url')?.value)
    li.appendChild(anchor)
    let summaryControl = this.NavLeftForm.get('summary')?.value; 
    
    if(String(summaryControl).length > 0){
      summary.textContent = summaryControl as string;
      details.appendChild(summary)
      details.appendChild(li);
      this.nl.LastItemWithFocusInNavLeft.parentNode?.insertBefore(details,this.nl.LastItemWithFocusInNavLeft.nextSibling)
    } 
    else{
      this.nl.LastItemWithFocusInNavLeft.parentNode?.insertBefore(li,this.nl.LastItemWithFocusInNavLeft.nextSibling)
    }
  }
  UpdateValueNavLeftItem(){
    this.nl.LastItemWithFocusInNavLeft.textContent = String(this.NavLeftForm.get('tituleSubTitule')?.value);
    this.nl.LastItemWithFocusInNavLeft.removeAttribute('href');
    this.nl.LastItemWithFocusInNavLeft.setAttribute('href',String(this.NavLeftForm.get('url')?.value));
  }
  SetValueChieldCreateNavLeftItem(){
    const ol = document.createElement('ol');
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const li = document.createElement('li');
    const anchor = document.createElement('a');

    anchor.textContent = String(this.NavLeftForm.get('tituleSubTitule')?.value);
    anchor.href = String(this.NavLeftForm.get('url')?.value)
    li.appendChild(anchor)
    let summaryControl = this.NavLeftForm.get('summary')?.value; 
    
    if(String(summaryControl).length > 0){
      summary.textContent = summaryControl as string;
      details.appendChild(summary)
      details.appendChild(li);
      ol.appendChild(details);
      
      this.nl.LastItemWithFocusInNavLeft.parentNode?.insertBefore(ol,this.nl.LastItemWithFocusInNavLeft.nextSibling)
    } 
    else{
      ol.appendChild(li);
      this.nl.LastItemWithFocusInNavLeft.parentNode?.insertBefore(ol,this.nl.LastItemWithFocusInNavLeft.nextSibling)
    }
  } 
  CloseFirtButtonNavList(){
    const bnt = document.getElementById('btn-first-nav-left')
    bnt!.style.display = "none";
  }
}

enum NavLeftButtonActionInFocus {
  InitNav = 0,
  Create = 1,
  Update = 2,
  CreateNewChield = 3,
  Delete = 4,
}
