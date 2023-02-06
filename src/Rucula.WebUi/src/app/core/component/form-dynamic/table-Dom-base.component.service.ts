import { Injectable } from '@angular/core';
import { table } from './entities/table';


@Injectable({
    providedIn: 'root',
})
export class TableBaseService {

    CreateTable(th?:table[],td?:object[]){

        
        const table =  document.getElementById("list-data"); // Obtem a Tabela 

        const row =  document.createElement('tr'); // Cria uma linha
        const header =  document.createElement('th'); // Cria uma coluna do tipo Header
        const detail =  document.createElement('td'); // Cria uma coluna do tipo Detalhe

        const NewRowHeader = row.cloneNode(true); // Cria uma nova linha utilizando um Clone
        th?.forEach((item:table) => {      
            let NewHeader = header.cloneNode(true); // Cria uma nova Coluna do tipo header utilizando o Clone
            NewHeader.textContent = item.name;


            switch (item.align) {
                case "R":
                    (NewHeader as HTMLHeadElement).style.textAlign = "right"
                    break;
                case "C":
                    (NewHeader as HTMLHeadElement).style.textAlign = "center"
                    break;
                case "L":
                default:
                    (NewHeader as HTMLHeadElement).style.textAlign = "left"
                    break;
                    
            }
            

            NewRowHeader.appendChild(NewHeader)
        })
        table?.appendChild(NewRowHeader)

        td?.forEach((item:any) => {
            const NewRowDetail = row.cloneNode(true); // Cria uma nova linha utilizando um Clone    
            Object.values(item).forEach(element => {
                let NewDetail = detail.cloneNode(true); // Cria uma nova Coluna do tipo Detalhe utilizando o Clone
                NewDetail.textContent = element as string;
                NewRowDetail.appendChild(NewDetail)
            });
            table?.appendChild(NewRowDetail)
        })


    }
}


