import {TabulatorFull as Tabulator} from 'tabulator-tables';

export function createLeftGrid(){

    var tableData = [
        {os:1235215, name:"Jorge Almeida", data:"2020-01-02"},
        {os:2244224, name:"Maria Elena",data:"2029-09-09"},
        {os:387654, name:"Antony", data:"2020-01-02"},
        {os:4417, name:"Lucas Silva",data:"2029-09-09"},
        {os:4645, name:"Lucas Marcos", data:"2020-01-02"},
        {os:6466246, name:"Willian Neves",data:"2029-09-09"},
        {os:466427, name:"Antonieta Joia", data:"2020-01-02"},
        {os:4646468, name:"Jesus Aparecido",data:"2029-09-09"},
        {os:566569, name:"Reginaldo Marinho", data:"2020-01-02"},
        {os:169960, name:"João Pedro",data:"2029-09-09"},
        {os:19695361, name:"João Lucas Mariano Brito", data:"2020-01-02"},
        {os:14864882, name:"Marluce",data:"2029-09-09"},
        {os:15454453, name:"Nathalia", data:"2020-01-02"},
        {os:14554, name:"Nicole",data:"2029-09-09"},
        {os:1455885, name:"Nilza", data:"2020-01-02"},
        {os:155556, name:"Bene",data:"2029-09-09"},
        {os:15584337, name:"Marcia", data:"2020-01-02"},
        {os:1343538, name:"Felipe",data:"2029-09-09"},
        {os:185559, name:"Romulo", data:"2020-01-02"},
        {os:255550, name:"Igor",data:"2029-09-09"},
        {os:23636641, name:"Leonardo Gonsal", data:"2020-01-02"},
        {os:226662, name:"ALisson Goes Maciel",data:"2029-09-09"},
        {os:264634643, name:"Caique", data:"2020-01-02"},
        {os:246643364, name:"Kaique",data:"2029-09-09"},
        {os:23465364364, name:"Sérgio", data:"2020-01-02"},
        {os:24346466, name:"Misael",data:"2029-09-09"},
        {os:24367346, name:"Edison", data:"2020-01-02"},
        {os:2434638, name:"Lucilene",data:"2029-09-09"},
        {os:2644639, name:"Julio", data:"2020-01-02"},
        {os:36434630, name:"Romulo Pereira",data:"2029-09-09"},
        {os:3644631, name:"Elizangela", data:"2020-01-02"},
        {os:3644632, name:"Luis",data:"2029-09-09"},
        {os:34646463, name:"Adão", data:"2020-01-02"},
        {os:364464, name:"Jame",data:"2029-09-09"},
        {os:36445, name:"Murilo", data:"2020-01-02"},
        {os:3464646, name:"Thiago Petri",data:"2029-09-09"},
    ]

    var table = new Tabulator("#w-grid",{
        layout:"fitColumns",
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
        {title:"Cliente", field:"name"},
        {title:"Data", field:"data"}],
      });
      

}