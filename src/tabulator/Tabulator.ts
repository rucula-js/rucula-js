import * as axios from '../axios/Axios';
import { createUrl } from '../Helpers/UrlHelper';
import {columnsGrid} from '../entities/form/columnsGrid'
import { getColumnsGrid, getEndPoint } from '../window/Window';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { setValueInForm } from '../input-value/InputValue';

export function createLeftGrid(){

    const endPointGetAll = "get-all-grid";
    let endPoint = getEndPoint(endPointGetAll)
    let url =  createUrl(endPointGetAll)
    
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
        GetById()
    });
    }
}


function GetById(){

  const endPointGetById = "get-all-grid";
  let endPoint = getEndPoint(endPointGetById);
  let url =  createUrl(endPointGetById);

  axios.ax({
    method:"get",
    url:url,
    data:endPoint.method
  })
  .then((response:any) => {
      setValueInForm(response.request.response)
  })

}