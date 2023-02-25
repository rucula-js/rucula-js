import { AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { dynamicForm } from './entities/form/dynamicForm';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './quadro.json'
import { openCloseFormDynamic } from './DOM/window/openCloseFormDynamic';
import { actionButtons } from './DOM/actionButton';
import {actionsReciverService} from './actions/actionsReciverService'
@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit, OnInit	 {  

  constructor(private dynamicFormService:FormDynamicService, private buttonsService?:actionButtons,private actionsReciverService?:actionsReciverService){}
  ngOnInit(): void {
      this.dynamicForm = (quadro as dynamicForm);  
      this.GetAll()
  }
  openCloseForm:openCloseFormDynamic = new openCloseFormDynamic();
  datagrid:any;
  dynamicForm!:dynamicForm;
  ngAfterContentInit(): void {
    this.dynamicFormService.setForm(this.dynamicForm)
    this.openCloseForm.SetDomEvents()
    this.buttonsService!.urlRoot = this.dynamicForm.urlRoot;
    this.buttonsService!.mapActionButtons(this.dynamicForm.button);
  } 
  GetById(parameters:string){
    this.actionsReciverService
    ?.getById(this.dynamicForm.urlRoot+this.dynamicForm.urlRelativeGetById+"?"+parameters)
    .subscribe((data:any) =>
      this.inputValueForm(data)
    );
  }

  GetAll(){
    this.actionsReciverService
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
    });
    (document.getElementById("create-new") as HTMLButtonElement).click();
  }

}