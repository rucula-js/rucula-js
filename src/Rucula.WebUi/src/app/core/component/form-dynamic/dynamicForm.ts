import { quadro } from "./quadro";

export interface dynamicForm{
    tela:string,
    type:string,
    quadro?:Array<quadro>
}