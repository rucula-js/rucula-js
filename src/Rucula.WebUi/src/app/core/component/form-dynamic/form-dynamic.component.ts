import { AfterContentInit, Component} from '@angular/core';
import { dynamicForm } from './entities/form/dynamicForm';
import { FormDynamicService } from './form-dynamic.component.service';
import quadro from './quadro.json'
import { openCloseFormDynamic } from './DOM/window/openCloseFormDynamic';
import { actionButtons } from './DOM/actionButton';
@Component({
  templateUrl: './form-dynamic.component.html',
  styleUrls:['./form-dynamic.component.css']
})

export class FormDynamicComponent implements AfterContentInit	 {  

  constructor(private dynamicFormService:FormDynamicService, private buttonsService?:actionButtons){}

  openCloseForm:openCloseFormDynamic = new openCloseFormDynamic();
  
  windowColuns:string[] = [];
  dynamicForm!:dynamicForm;

  ngAfterContentInit(): void {
    this.dynamicForm = (quadro as dynamicForm); 
    this.windowColuns = this.dynamicForm.columns 
    this.dynamicFormService.setForm(this.dynamicForm)
    this.openCloseForm.SetDomEvents()
    this.buttonsService!.mapActionButtons(this.dynamicForm.button);
  } 

}