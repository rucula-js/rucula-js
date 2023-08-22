import { field } from "./field";
import { line } from "./line";
export interface frame{
    name: string,
    type: string,
    id: string,
    objectDto: string,
    sequence:number
    child?: string,
    fields?:Array<field>
    line?:Array<line>
}