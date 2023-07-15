import { AfterContentInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { Grid } from "gridjs";
import { columnsGridGet } from "src/app/shared/component/window/entities/form/columnsGridGet";
import { columnsGridjs } from "src/app/shared/component/window/entities/form/columnsGridjs";

@Component({
  selector:"gridjs",
  templateUrl:"./grid-js.component.html",
})
export class GridTableJSComponent implements AfterContentInit {
    
  @Input() columns:columnsGridjs[] = [];
  @Input() columnsGridGet:columnsGridGet[] = [];
  @Input() data:any;
  @Output() newItemEvent = new EventEmitter<string>();
  private Grid!:Grid;
  
    ngAfterContentInit(){
        
      this.Grid = new Grid({
        search: true,
        sort: true,
        fixedHeader: true,
        resizable: true,
        columns:this.columns,
        pagination:true,
        data: () => {
          return new Promise(resolve => {
            setTimeout(() =>
              resolve(this.data), 1000);
          })
        },
        language: {
          'search': {
            'placeholder': '🔍 Search...'
          },
          'pagination': {
            'previous': '⬅️',
            'next': '➡️',
            'showing': '😃 Displaying',
            'results': () => 'Records'
          }
        }
      })
      this.Grid.render(document.getElementById("grid-js")!);
      this.Grid.on('rowClick', (a,b) => this.editItemGrid(a.currentTarget));
    }

    editItemGrid(a:any) {
      let intrucionGridGet:string = ""
      this.columnsGridGet.forEach(parameter => {
        intrucionGridGet+=`${parameter.parameterUrl}=${a.querySelector(`[data-column-id=${parameter.parameterGrid}]`)?.textContent}&`
      });
      this.newItemEvent.emit(this.RemoveLastSpecialCharacter(intrucionGridGet));
    }
    RemoveLastSpecialCharacter(value:string){
      return  value.slice(0,value.length-1)
    }


}