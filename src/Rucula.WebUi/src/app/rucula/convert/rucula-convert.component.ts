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


  PopupFormItemNavegationLeft = this.nl.PopupFormItemNavegationLeft

  PrepareNavegationLeft(){
    
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

  OpenNavLeft(){
    this.nl.OpenNavLeft();
  }
  CloseNavLeft(){
    this.nl.CloseNavLeft();
  }
  closePreview(){
      document.getElementById('container-preview')!.style.display = "none"
  }
  AddNavLeftItem(){  
    this.nl.AddNavLeftItem()
  }
  InitFirstItemNavLeft(){
   this.nl.AddNavLeftItem()
  }
  AddNewItemNavLeft(){
    this.nl.AddNewItemNavLeft()
  }
  AlterItemNav(){
    this.nl.AlterItemNav()
  }
  AddChieldItemNav(){
    this.nl.AddChieldItemNav()
  }
  RemoveItemNav(){
    this.nl.RemoveItemNav()
  }
  
}
