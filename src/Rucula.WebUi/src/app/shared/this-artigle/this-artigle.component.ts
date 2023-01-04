import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'this-artigle',
  templateUrl: './this-artigle.component.html',
  styleUrls: ['./this-artigle.component.css']
})
export class NavegationVerticalComponent  implements OnInit {  
  
  ngOnInit(){
    this.PrepareTitles();
  }
  @Input() IdContentOfTitles = '';
  Titles:String[]=[];
  PrepareTitles(){
    document.getElementById(this.IdContentOfTitles)?.childNodes.forEach(
      (i) => {
        if(i.nodeName == "H1")
        this.Titles.push(i.textContent as String)
      }
    );
  }
}
