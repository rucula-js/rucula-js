import * as axios from '../axios/Axios';
import { createUrl } from '../Helpers/UrlHelper';
import {columnsGrid} from '../entities/form/columnsGrid'
import { getColumnsGrid, getEndPoint, getParamsGrid } from '../window/Window';
import {RowComponent, TabulatorFull as Tabulator} from 'tabulator-tables';
import { setValueInForm } from '../input-value/InputValue';

export function createLeftGrid(){

    const endPointGetAll = "get-all-grid";
    let endPoint = getEndPoint(endPointGetAll)
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
      
        let columnsGrid:columnsGrid[] = getColumnsGrid();
        
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

  let endPoint = getEndPoint("get-by-id")
  let paramsGrid = prepareParamsGrid();
  let url =  createUrl(endPoint,paramsGrid);

  axios.ax({
    method:"get",
    url:url,
    data:endPoint.method
  })
  .then((response:any) => {
      setValueInForm(JSON.parse(response.request.response))
  })

  function prepareParamsGrid(){
    
    let params:string = getParamsGrid();
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

