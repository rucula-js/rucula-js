import { Component, OnInit , } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtractRuculaService } from './extract-rucula.service';
import { ContentHTML } from './ContentHTML';
import { Guid } from 'guid-typescript';
import { TagMetaHTML } from './TagMetaHTML';
import { ContentEstruture } from './ContentEstruture';
import { ContentEstrutureService } from './ContentEstruture.service';

@Component({
  selector: 'rucula-language',
  templateUrl: './rucula-convert.component.html',
  styleUrls: ['./rucula-convert.component.css']
})
export class RuculaConvertComponent  implements OnInit {  

  constructor(private fb: FormBuilder, private er:ExtractRuculaService, private contentEstrutureService:ContentEstrutureService) { }
  ngOnInit(){
    this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.setValue(Guid.create().toString())
  }
  TagMetaHTML!:TagMetaHTML[]; 
  ContentRuculaCache:any;

  ContentEstruture!:ContentEstruture;
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
      description:[''] ,
      next:[''] ,
      previous:['']
    })
  })

  CreateListTagMetaHTML(){
    this.TagMetaHTML = new  Array();
    this.TagMetaHTML.push({         
        guuid:Guid.create().toString(),
        name:"meta",
        propert:"charset",
        content:this.ContentHTMLForm.get('metacharset')!.value as string,
        description:''} as TagMetaHTML
    )
    this.TagMetaHTML.push({         
      guuid:Guid.create().toString(),
      name:"meta",
      propert:"viewport",
      content:this.ContentHTMLForm.get('metaviewport')!.value as string,
      description:''}
    )
    this.TagMetaHTML.push({         
      guuid:Guid.create().toString(),
      name:"meta",
      propert:"description",
      content:this.ContentHTMLForm.get('metadescription')!.value as string,
      description:''}
    )
    this.TagMetaHTML.push({         
      guuid:Guid.create().toString(),
      name:"meta",
      propert:"keywords",
      content:this.ContentHTMLForm.get('metakeywords')!.value as string,
      description:''}
    )
    this.TagMetaHTML.push({         
      guuid:Guid.create().toString(),
      name:"meta",
      propert:"author",
      content:this.ContentHTMLForm.get('metaauthor')!.value as string,
      description:''}
    )

    this.TagMetaHTML.push({         
      guuid:Guid.create().toString(),
      name:"meta",
      propert:"title",
      content:this.ContentHTMLForm.get('metatitle')!.value as string,
      description:''}
    )
  }
  Save(){      
      this.CreateListTagMetaHTML();
      let contentEstruture:ContentEstruture = {
        guuid: this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.value as string,
        description: this.ContentHTMLForm.get('contentEstruture')!.get('description')!.value as string,
        next: this.ContentHTMLForm.get('contentEstruture')!.get('next')!.value as string,
        previous: this.ContentHTMLForm.get('contentEstruture')!.get('previous')!.value as string,
        contentHTMLFk: this.ContentHTML = {
          guuid: this.ContentHTMLForm.get('sintaxeRucula')!.get('guuid')!.value as string,
          contentLanguageRucula: document.getElementById('content-rucula')!.textContent as string,
          tagMetaHTML: this.TagMetaHTML
        }
      }
      this.contentEstrutureService.Save(contentEstruture).subscribe();
  }
  PreviewContent(){
    document.getElementById('container-preview')!.style.display = "block"
    this.ContentHTML = this.ContentHTMLForm as ContentHTML
    this.ContentRuculaCache = document.getElementById('content-rucula')?.textContent!;
    this.ContentHTML.contentLanguageRucula = this.ContentRuculaCache; 
    this.er.PreviewContent(this.ContentHTML.contentLanguageRucula!).subscribe(
      (resp:any)=> {
        document.getElementById('content-rucula-preview')!.innerHTML =  resp["content"]
      })
  }
  closePreview(){
      document.getElementById('container-preview')!.style.display = "none"
  }
}
