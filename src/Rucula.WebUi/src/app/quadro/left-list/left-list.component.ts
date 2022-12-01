import { Component, Input } from '@angular/core';
import { LeftService } from './left-list.service';

@Component({
  selector: 'left-list',
  templateUrl: './left-list.component.html',
  styleUrls: ['./left-list.component.css']
})
export class LeftListComponent{  

  constructor(private ls:LeftService){ 
  }

  @Input() header = ['']
  @Input() details = ['']
}
