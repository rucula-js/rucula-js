import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavegationVerticalService } from './navegation-vertical.component.service';

@Component({
  selector: 'navegation-vertical',
  templateUrl: './navegation-vertical.component.html',
  styleUrls: ['./navegation-vertical.component.css']
})
export class NavegationVerticalComponent  implements OnInit {  

  constructor(private nl:NavegationVerticalService) { }

  ngOnInit(){
    this.nl.PrepareNavegationLeft();
  }

  PopupFormItemNavegationLeft: FormGroup = this.nl.PopupFormItemNavegationLeft

  CloseNavLeft(){
    this.nl.CloseNavLeft();
  }
  AddNavLeftItem(){  
    this.nl.AddNavLeftItem()
  }
  InitFirstItemNavLeft(){
    this.nl.AddNavLeftItem()
   }
   AddNewItemNavLeft(){
     this.nl.AddNewItemNavLeft() 
   }
   AlterItemNav(){
     this.nl.AlterItemNav()
   }
   AddChieldItemNav(){
     this.nl.AddChieldItemNav()
   }
   RemoveItemNav(){
     this.nl.RemoveItemNav()
   }
   OpenNavLeft(){
    this.nl.OpenNavLeft();
  }
}
