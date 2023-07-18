import { AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { window } from './entities/form/window';
import { WindowService } from './window/window.component.service';
import { InputValueService } from './input-value/input-value.service.component';

@Component({
  selector:'rucula',
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit	{  

  @Input() window = {};

  constructor(private windowService: WindowService, 
    private inputValueService: InputValueService){}

  datagrid:any;

  ngAfterContentInit(): void {
    this.windowService.domCreateForm(this.window as window)
  } 
}