import { AfterContentInit, Component, OnInit} from '@angular/core';
import { window } from './entities/form/window';
import { WindowService } from './window/window.component.service';
import quadro from '../tamplate-window/frame.json'
import { InputValueService } from './input-value/input-value.service.component';
@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit, OnInit	 {  

  ngOnInit(): void {
    this.window = (quadro as unknown as window);  
  }
  constructor(private windowService: WindowService, 
    private inputValueService: InputValueService){}
  
  datagrid:any;
  window!:window;

  ngAfterContentInit(): void {
    this.windowService.domCreateForm(this.window)
  } 
}