import { AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { window } from './entities/form/window';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './frame.json'
import { actionButtons } from './actions/actionButton'
import {actionsHTTPService} from './actions/actionsHTTPService'
import  {formDynamicBaseService} from './form-dynamic-base.component.service'
@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit, OnInit	 {  

  constructor(private formDynamicBase:formDynamicBaseService,private dynamicFormService:FormDynamicService, private buttonsService?:actionButtons,private actionHttp?:actionsHTTPService){}
  ngOnInit(): void {
      this.window = (quadro as unknown as window);  
      this.GetAll()
      this.SetConfigurationsForm()
  }
  datagrid:any;
  window!:window;

  ngAfterContentInit(): void {
    this.dynamicFormService.domCreateForm(this.window)
    this.buttonsService!.urlRoot = this.window.urlRoot;
    this.buttonsService!.mapActionButtons(this.window.button);
  } 
  GetById(parameters:string){
    this.actionHttp
    ?.getById(this.window.urlRoot+this.window.urlRelativeGetById+"?"+parameters)
    .subscribe((data:any) =>
      this.inputValueForm(data)
    );
  }

  GetAll(){
    this.actionHttp
    ?.getAll(this.window.urlRoot+this.window.urlRelativeGetAll)
    .subscribe((data:any) => this.datagrid = data);
  }

  inputValueForm(obj:any, objectDto:string=""){
   
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] == "string" || typeof obj[key] == "number"){  
        let atribute = "";
        objectDto == "" ? atribute = `[set=".${key}"]` : atribute = `[set="${objectDto}.${key}"]`;
        (document.querySelector(atribute) as HTMLInputElement).value = obj[key] 
      }
      if(typeof obj[key] == "object"){
        this.inputValueForm(obj[key],key);
      }
    });
    (document.getElementById("create-new") as HTMLButtonElement).click();
  }

  SetConfigurationsForm(){
    this.formDynamicBase.urlBase = this.window.urlRoot
    this.formDynamicBase.urlGetAll = this.window.urlRelativeGetAll
    this.formDynamicBase.urlGetById = this.window.urlRelativeGetById
    this.formDynamicBase.JoinChield = this.window.joinChield
  }
}