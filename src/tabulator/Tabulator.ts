import * as axios from '../axios/Axios';
import { createUrl } from '../Helpers/UrlHelper';
import { columnsGrid} from '../entities/form/columnsGrid'
import { configWindow } from '../window/Window';
import { RowComponent, TabulatorFull as Tabulator} from 'tabulator-tables';
import { constIdBaseWindow, eventRucula } from '../const';
import { windowBaseDOM } from '../elements/window-base/WindowBase';



export function createLeftGrid(grid:boolean = true){
  

  if(grid == false){
    
    document.getElementById(constIdBaseWindow.NEW)?.click()
    
    let containerGridLeft = document?.querySelector(".r-w .r-act#actions");
    containerGridLeft?.remove()
    return;
  }

  const endPointGetAll = "get-all-grid";
  let endPoint = configWindow.getEndPoint(endPointGetAll)
  let url =  createUrl(endPoint)
    
  axios.ax({
    method:"get",
    url:url,
    data:endPoint.method
  })
    .then((response:any) => {
      prepareGrid(response.request.response)
    })
    
    function prepareGrid(data:any){
      
      let columnsGrid:columnsGrid[] = configWindow.getColumnsGrid();
        
      var table = new Tabulator("#w-grid",{
          layout:"fitColumns",
          data:data,
          columnDefaults:{
            maxWidth:300,
          },
          rowHeight:30,
          pagination:true, 
          paginationCounter:"rows",
          autoResize:false,
          columns:columnsGrid,
      });

      table.on("rowClick", function(e, row){
         GetById(row)
        });
      }
    }

    function GetById(row:RowComponent){
      
  let endPoint = configWindow.getEndPoint("get-by-id")
  let paramsGrid = prepareParamsGrid();
  let url =  createUrl(endPoint,paramsGrid);
  axios.ax({
    method:"get",
    url:url,
    data:endPoint.method
  })
  .then((response:any) => {
    
    let rucula = windowBaseDOM.getElementRoot()
    rucula?.dispatchEvent(eventRucula.RESET_BACKGROUND_EVENT)
    
    let obj = JSON.parse(response.request.response)  
    windowBaseDOM.setObjecReload(obj)
      // setValueInForm(obj)
  })

  function prepareParamsGrid(){
    
    let params:string = configWindow.getParamsGrid();
    let reg = /{{([^})]+)}}/gm       
    let matchs = params.matchAll(reg);
  
    for(let math of matchs){
        params = params.replace(math[0],(param) => {
            return row.getCell(math[1]).getValue()
        })
    }
    
    return params;
  }
}

