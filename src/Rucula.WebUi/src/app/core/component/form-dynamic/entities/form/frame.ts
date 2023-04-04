import { field } from "./field";
import { line } from "./line";
export interface frame{
    name: string,
    type: string,
    id: string,
    objectDto: string,
    child?: string,
    field?:Array<field>
    line?:Array<line>
}