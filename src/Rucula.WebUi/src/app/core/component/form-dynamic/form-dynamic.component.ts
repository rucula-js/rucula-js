import { AfterContentInit, Component, OnInit } from '@angular/core';
import { dynamicForm } from './dynamicForm';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './quadro.json'

@Component({
  selector: 'form-dynamic',
  templateUrl: './form-dynamic.component.html',
  styleUrls: ['./form-dynamic.component.css']
})


export class FormDynamicComponent implements OnInit, AfterContentInit	 {  

  constructor(private dynamicForm:FormDynamicService){}

  ngAfterContentInit(): void {
    this.dynamicForm.setForm(quadro as dynamicForm) 

  }
    ngOnInit(): void {
    }
}