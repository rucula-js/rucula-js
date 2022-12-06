import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RuculaContentService } from './rucula-convert.service';
import { ContentHTML } from './RuculaConvert';

@Component({
  selector: 'rucula-language',
  templateUrl: './rucula-convert.component.html',
  styleUrls: ['./rucula-convert.component.css']
})
export class RuculaConvertComponent  {  

  constructor(private fb: FormBuilder, private rc:RuculaContentService) { 
  }

  ContentRuculaCache:any;
  ContentHTMLCache:any;

  ContentHTML!:ContentHTML;
  ContentHTMLForm = this.fb.group({
      guuid: [''],
      content: [''],
      dateCreation:[''],
      dateLastUpdate: [''],
      contentLanguageRucula:['']
  })
  
  Rucula(){
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
}
