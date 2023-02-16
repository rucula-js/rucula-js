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
    const buttonClose = document.getElementById("close-dinamic-form");
    (buttonClose as HTMLButtonElement).style.display = "block";
    (buttonClose as HTMLButtonElement).addEventListener('click',() => this.CloseFormDynamic())
    
    const formDynamic = document.getElementById("form-dynamic")

    if (formDynamic?.childNodes.length == 0){
      document.getElementById("box-window")!.style.display = "flex"
      this.dynamicForm.setForm(quadro as dynamicForm) 
    }
    else{
      document.getElementById("box-window")!.style.display = "flex"
    }
  }

  CloseFormDynamic(){
    document.getElementById("close-dinamic-form")!.style.display = "none"
    document.getElementById("box-window")!.style.display = "none"
  }
}