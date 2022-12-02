import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RuculaService } from './rucula-convert.service';

@Component({
  selector: 'rucula-language',
  templateUrl: './rucula-convert.component.html',
  styleUrls: ['./rucula-convert.component.css']
})
export class RuculaConvertComponent  {  

  constructor(private fb: FormBuilder, private rs:RuculaService) { 
  }

}
