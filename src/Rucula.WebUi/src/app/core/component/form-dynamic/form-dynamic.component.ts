import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { dynamicForm } from './entities/dynamicForm';
import { factoryObjectService } from './factoryObjectService';
import { FormDynamicService } from './form-dynamic.component.service';
import { TableBaseService } from './table-Dom-base.component.service';
import swall from 'sweetalert';
import janelaData from './janelasData.json'
import quadro from './quadro.json'

@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})


export class FormDynamicComponent implements AfterContentInit	 {  

  constructor(private dynamicForm:FormDynamicService, private factoryObject:factoryObjectService, private tableBase?:TableBaseService){}

  ngAfterContentInit(): void {
    this.SetDomEvents()
    this.tableBase?.CreateTable((quadro as dynamicForm).columns,janelaData)
  }
  SetDomEvents(){
    document.getElementById("create-new")?.addEventListener('click',() => this.OpenFormDynamic())
  }
  OpenFormDynamic(){
    document.getElementById("box-window")!.style.display = "flex"
    this.dynamicForm.setForm(quadro as dynamicForm) 
  }
}