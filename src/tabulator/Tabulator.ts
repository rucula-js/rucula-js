import {TabulatorFull as Tabulator} from 'tabulator-tables';

export function createLeftGrid(){

    var tableData = [
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary Mayxaaxaxxxxxxxxxxxxxxxx ifffi ifoifeefuh iuhfiuhfiuhu heuihevuih eREga",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        {id:1, name:"Billy Bob", data:"2020-01-02"},
        {id:2, name:"Mary May",data:"2029-09-09"},
        
    ]

    var table = new Tabulator("#w-grid",{
        layout:"fitDataFill",
        data:tableData,
        columnDefaults:{
          maxWidth:300,
        },
        rowHeight:30,
        pagination:true, 
        paginationCounter:"rows",
        autoResize:false,
        columns:[
        {title:"Código Os", field:"os"},
        {title:"Nome", field:"name"},
        {title:"Data", field:"data"}],
      });
      

}