import { Component } from '@angular/core';
import { CrudIvoker } from './CrudInvoker';
import { CrudReciverService } from './CrudReciverService';
import { SaveCommand } from './SaveCommand';


@Component({
  selector: 'btn-crud',
  templateUrl: './btn-crud.component.html',
  styleUrls: ['./btn-crud.component.css']
})


export class ButtonsCrudComponent {  

  Save(){
    const inoker = new CrudIvoker(new SaveCommand(new CrudReciverService()));
    inoker.Save();
  }
  Alter(){

  }
}