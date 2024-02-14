import { button } from "./button";
import { columnsGrid } from "./columnsGrid";
import { endPoint } from "./endPoint";
import { frame } from "./frame";

type cssGrid = {
    items:[[]],
    tamplateColumns:number
    tamplateRow:number
}

export interface window{
    name: string
    type: string
    crud: string
    messageHome: string
    iconHome: string
    this: string
    pathController: string
    frames: Array<frame>
    grid: boolean
    columnsGrid: columnsGrid[]
    paramsGrid: string
    button: button[]
    joinChield: string[]
    endPoints: endPoint[]
    layout: cssGrid
}