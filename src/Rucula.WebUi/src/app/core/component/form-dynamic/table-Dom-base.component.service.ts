import { Injectable } from '@angular/core';
import { table } from './entities/table';


@Injectable({
    providedIn: 'root',
})
export class TableBaseService {

    CreateTable(th?:table[],td?:object[]){

        let alignColumns:string[]=[];

        th?.forEach((item:table) => {      
            alignColumns.push(item.align)
        })

        const table =  document.getElementById("list-data"); // Obtem a Tabela 

        const row =  document.createElement('tr'); // Cria uma linha
        const header =  document.createElement('th'); // Cria uma coluna do tipo Header
        const detail =  document.createElement('td'); // Cria uma coluna do tipo Detalhe

        const NewRowHeader = row.cloneNode(true); // Cria uma nova linha utilizando um Clone
        th?.forEach((item:table, index) => {      
            let NewHeader = header.cloneNode(true); // Cria uma nova Coluna do tipo header utilizando o Clone
            NewHeader.textContent = item.name;
            (NewHeader as HTMLHeadElement).style.textAlign = alignColumns[index]
            NewRowHeader.appendChild(NewHeader)
        })
        table?.appendChild(NewRowHeader)

        td?.forEach((item:any) => {
            const NewRowDetail = row.cloneNode(true); // Cria uma nova linha utilizando um Clone    
            Object.values(item).forEach((element,index) => {
                let NewDetail = detail.cloneNode(true); // Cria uma nova Coluna do tipo Detalhe utilizando o Clone
                NewDetail.textContent = element as string;
                (NewDetail as HTMLDetailsElement).style.textAlign = alignColumns[index]
                NewRowDetail.appendChild(NewDetail)
            });
            table?.appendChild(NewRowDetail)
        })
    }
}


