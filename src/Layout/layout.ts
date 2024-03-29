import { constIdBaseWindow } from "../const";
import { window } from "../entities/form/window";

export function configureLayout(window:window){
    
    if(window.layout.items === undefined){
        return
    }

    let rowLength = window.layout.items.length
    let colLength = window.layout.items[0].length

    window.layout.tamplateColumns = colLength
    window.layout.tamplateRow = rowLength

    setGridContainer(window.layout.tamplateColumns,window.layout.tamplateRow)

    for (let row = 1; row <= rowLength; row++) {

        for (let col = 1; col <= colLength; col++) {
            
            let item = window.frames.find(c => c.objectDto == window.layout.items[row-1][col-1])!

            if(item == undefined){
                continue
            }
        
            if(item.layout === undefined){
                item.layout = {row:{start:-1, end:-1},col:{start:-1, end:-1}}
            }

            if(item.layout.row.start === -1){
                item.layout.row.start = row
            }
            
            if(item.layout.col.start === -1){
                item.layout.col.start = col
            }

            item.layout.row.end = row + 1
            item.layout.col.end = col + 1
        }  
    }
}

function setGridContainer(tamplateColumns:number,tamplateRows:number){
    
    let form = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
    form.style.gridTemplateColumns = `repeat(${tamplateColumns},1fr)` 
    form.style.gridTemplateRows = `repeat(${tamplateRows},1fr )`
}