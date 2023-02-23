import { AfterContentInit, AfterViewInit, Component, Input } from "@angular/core";
import { Grid } from "gridjs";

@Component({
  selector:"gridjs",
  templateUrl:"./grid-js.component.html",
})
export class GridTableJSComponent implements AfterContentInit {
    
  @Input() columns:string[] = [];

    private Grid!:Grid;
    
    ngAfterContentInit(){
        this.Grid = new Grid({
        search: true,
        columns: this.columns,
        data: [
          ['John', 'john@example.com', '(353) 01 222 3333'],
          ['Mark', 'mark@gmail.com',   '(01) 22 888 4444']
        ]
    })
        this.Grid.render(document.getElementById("grid-js")!);
    }
}