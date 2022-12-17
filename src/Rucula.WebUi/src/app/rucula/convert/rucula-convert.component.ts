import { Component, OnInit , } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RuculaContentService } from './rucula-convert.service';
import { ContentHTML } from './ContentHTML';
import { Guid } from 'guid-typescript';
import { TagMetaHTML } from './TagMetaHTML';

@Component({
  selector: 'rucula-language',
  templateUrl: './rucula-convert.component.html',
  styleUrls: ['./rucula-convert.component.css']
})
export class RuculaConvertComponent  implements OnInit {  

  constructor(private fb: FormBuilder, private rc:RuculaContentService ) { 
  }
  ngOnInit(){
    this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.setValue(Guid.create().toString())
    this.NavLeft = document.getElementById("nav-left") as HTMLElement
    this.PopNavLeft = document.getElementById("pop-nav-left") as HTMLElement
    this.BtnActionitem = document.getElementById("new-item-nav") as HTMLButtonElement;
    this.NavLeft.addEventListener('mouseover',(event) => this.AddButtonsActionItens(event))
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
  LastItemWithFocusInNavLeft!:HTMLElement // guarda o último elemento em foco  da NavLeft

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

  closePreview(){
      document.getElementById('container-preview')!.style.display = "none"
  }
  CloseNavLeft(){
    this.PopNavLeft!.style.display = "none";
  }
  OpenNavLeft(){
    this.PopNavLeft!.style.display = "block";
  }
  AddNavLeftItem(){  
    switch (this.ActionIndicatorNavLeftButtons) {
      case NavLeftButtonActionInFocus.Create:
        this.SetValueCreateNavLeftItem()
        break;    
    }
    
    this.CloseNavLeft()
  }

  SetValueCreateNavLeftItem(){
    const summary = document.createElement('summary');
    const li = document.createElement('li');
    const anchor = document.createElement('a');

    anchor.textContent = String(this.NavLeftForm.get('tituleSubTitule')?.value);
    anchor.href = String(this.NavLeftForm.get('url')?.value)
    li.appendChild(anchor);

    summary.textContent = String(this.NavLeftForm.get('summary')?.value);
    
    console.log(this.LastItemWithFocusInNavLeft)
    if(summary){
      this.LastItemWithFocusInNavLeft.parentNode?.insertBefore(summary,this.LastItemWithFocusInNavLeft.nextSibling)
    } 
    else{
      console.log(this.LastItemWithFocusInNavLeft.parentNode)
      this.LastItemWithFocusInNavLeft.parentNode?.insertBefore(li,this.LastItemWithFocusInNavLeft.nextSibling)

    }
  }
  

 
  AddButtonsActionItens(e:Event){
    const element = e.target as HTMLElement;
    if (element.nodeName == "A"){
      this.BtnActionitem.style.display = "inline";
      element.after(this.BtnActionitem);
      this.LastItemWithFocusInNavLeft = element;
    }      
  }

  AddNewItemNavLeft(){
    this.ActionIndicatorNavLeftButtons = NavLeftButtonActionInFocus.Create;
    this.OpenNavLeft()
  }


  AlterItemNav(){
    this.OpenNavLeft()
    this.InsertValueNavLeftForm()
  }
  RemoveItemNav(){
    var LI = this.LastItemWithFocusInNavLeft.parentNode?.parentNode!.removeChild(this.LastItemWithFocusInNavLeft.parentNode)
    this.BtnActionitem.style.display = "none";
  }
  AddChieldItemNav(){
    const ol = document.createElement("ol");
    var li = document.createElement("li");
    ol.appendChild(li);
    var li = document.createElement("li");
    li.innerText ="axmmxalxmakxankjaxnaxkjanxjkaxnkjaxnaxjk"
    this.LastItemWithFocusInNavLeft.parentNode?.insertBefore(li,this.LastItemWithFocusInNavLeft.nextSibling)
  }

  InsertValueNavLeftForm(){
    this.NavLeftForm.get('summary')!.setValue("xaaxax"); 
    this.NavLeftForm.get('tituleSubTitule')!.setValue("xaax"); 
    this.NavLeftForm.get('url')!.setValue("xaaxaxax"); 
  }
} 

enum NavLeftButtonActionInFocus {
  Create = 1,
  Update = 2,
  CreateNewChield = 3,
  Delete = 4,
}
