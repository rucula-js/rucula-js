import { AfterContentInit, Component, OnInit} from '@angular/core';
import { dynamicForm } from './entities/form/dynamicForm';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './quadro.json'
import { openCloseFormDynamic } from './DOM/window/openCloseFormDynamic';
import { actionButtons } from './DOM/actionButton';
import {actionsReciverService} from './actions/actionsReciverService'
import { columnsGridjs } from './entities/form/columnsGridjs';
@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit, OnInit	 {  

  constructor(private dynamicFormService:FormDynamicService, private buttonsService?:actionButtons, private actionsReciverService?:actionsReciverService){}


  ngOnInit(): void {
      this.actionsReciverService?.getAll().subscribe((data:any) => this.datagrid = data);
  }
  openCloseForm:openCloseFormDynamic = new openCloseFormDynamic();
  datagrid:any;
  dynamicForm!:dynamicForm;





  ngAfterContentInit(): void {
    this.dynamicForm = (quadro as dynamicForm);  
    this.dynamicFormService.setForm(this.dynamicForm)
    this.openCloseForm.SetDomEvents()
    this.buttonsService!.mapActionButtons(this.dynamicForm.button);
  } 

  edit(a:any){
    console.log(a)
  }

}