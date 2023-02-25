import { button } from "./button";
import { columnsGridGet } from "./columnsGridGet";
import { columnsGridjs } from "./columnsGridjs";
import { quadro } from "./quadro";

export interface dynamicForm{
    tela:string,
    type:string,
    urlRoot:string
    urlRelativeGetAll:string
    urlRelativeGetById: string
    quadro?:Array<quadro>,
    columns:columnsGridjs[]
    button:button[]
    columnsGridGet:columnsGridGet[]
}