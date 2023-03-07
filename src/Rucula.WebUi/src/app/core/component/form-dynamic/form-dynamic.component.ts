import { AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { dynamicForm } from './entities/form/dynamicForm';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './quadro-bkp.json'
import { actionButtons } from './DOM/actionButton';
import {actionsHTTPService} from './actions/actionsHTTPService'
import  {formDynamicBaseService} from './formDynamicBaseService'
@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit, OnInit	 {  

  constructor(private formDynamicBase:formDynamicBaseService,private dynamicFormService:FormDynamicService, private buttonsService?:actionButtons,private actionHttp?:actionsHTTPService){}
  ngOnInit(): void {
      this.dynamicForm = (quadro as unknown as dynamicForm);  
      this.GetAll()
      this.SetConfigurationsForm()
  }
  datagrid:any;
  dynamicForm!:dynamicForm;

  ngAfterContentInit(): void {
    this.dynamicFormService.domCreateForm(this.dynamicForm)
    this.buttonsService!.urlRoot = this.dynamicForm.urlRoot;
    this.buttonsService!.mapActionButtons(this.dynamicForm.button);
  } 
  GetById(parameters:string){
    this.actionHttp
    ?.getById(this.dynamicForm.urlRoot+this.dynamicForm.urlRelativeGetById+"?"+parameters)
    .subscribe((data:any) =>
      this.inputValueForm(data)
    );
  }

  GetAll(){
    this.actionHttp
    ?.getAll(this.dynamicForm.urlRoot+this.dynamicForm.urlRelativeGetAll)
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
    this.formDynamicBase.urlBase = this.dynamicForm.urlRoot
    this.formDynamicBase.urlGetAll = this.dynamicForm.urlRelativeGetAll
    this.formDynamicBase.urlGetById = this.dynamicForm.urlRelativeGetById
    this.formDynamicBase.JoinChield = this.dynamicForm.joinChield
  }
}