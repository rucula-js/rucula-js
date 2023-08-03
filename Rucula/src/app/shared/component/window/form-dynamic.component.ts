import { AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { window } from './entities/form/window';
import { domCreateForm } from './window/WindowFactory';
import { setValueInForm } from './input-value/InputValue';

@Component({
  selector:'rucula',
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit	{  

  @Input() window = {};
  
  datagrid:any;

  ngAfterContentInit(): void {
    console.log(this.window)
    domCreateForm(this.window as window)
  } 
}