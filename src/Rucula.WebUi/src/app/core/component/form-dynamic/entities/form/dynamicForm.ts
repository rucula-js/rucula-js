import { button } from "./button";
import { columnsGridjs } from "./columnsGridjs";
import { quadro } from "./quadro";

export interface dynamicForm{
    tela:string,
    type:string,
    quadro?:Array<quadro>,
    columns:columnsGridjs[]
    button:button[]
}