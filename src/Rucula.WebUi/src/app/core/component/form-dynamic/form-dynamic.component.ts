import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { dynamicForm } from './entities/form/dynamicForm';
import { FormDynamicService } from './form-dynamic.component.service';
import { TableBaseService } from './table-Dom-base.component.service';
import janelaData from './janelasData.json'
import quadro from './quadro.json'
import { openCloseFormDynamic } from './DOM/window/openCloseFormDynamic';
import { actionButtons } from './DOM/actionButton';
@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit	 {  

  constructor(private dynamicFormService:FormDynamicService,  private tableBase?:TableBaseService, private buttonsService?:actionButtons){}

  openCloseForm:openCloseFormDynamic = new openCloseFormDynamic();
  
  ngAfterContentInit(): void {
    this.tableBase?.CreateTable((quadro as dynamicForm).columns,janelaData)
    this.dynamicFormService.setForm((quadro as dynamicForm))
    this.openCloseForm.SetDomEvents()
    this.buttonsService!.mapActionButtons((quadro as dynamicForm).button);
  } 
}