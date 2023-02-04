import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { dynamicForm } from './entities/dynamicForm';
import { factoryObjectService } from './factoryObjectService';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './quadro.json'
import swall from 'sweetalert';

@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})


export class FormDynamicComponent implements OnInit, AfterContentInit	 {  

  constructor(private dynamicForm:FormDynamicService, private factoryObject:factoryObjectService){}

  ngAfterContentInit(): void {
    this.dynamicForm.setForm(quadro as dynamicForm) 

  }
  @Input() Janela = "Janela"

    ngOnInit(): void {
    }

    GetDto(){
      swall("Hello world!")!;

      this.factoryObject.createObjet()
       console.log(this.factoryObject.objJSON);
    }
}