import { AfterContentInit, Component, OnInit } from '@angular/core';
import { dynamicForm } from './entities/dynamicForm';
import { factoryObjectService } from './factoryObjectService';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './quadro.json'

@Component({
  templateUrl: './form-dynamic.component.html'
})


export class FormDynamicComponent implements OnInit, AfterContentInit	 {  

  constructor(private dynamicForm:FormDynamicService, private factoryObject:factoryObjectService){}

  ngAfterContentInit(): void {
    this.dynamicForm.setForm(quadro as dynamicForm) 

  }
    ngOnInit(): void {
    }

    GetDto(){
      this.factoryObject.createObjet()
       console.log(this.factoryObject.objJSON);
    }
}