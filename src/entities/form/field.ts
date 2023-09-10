export interface field {
    id: string
    description: string
    type: string
    combo?:[],
    checkbox?:checkbox
    textarea:textarea
    maxLength?: number
    max?: number
    min?: number
    requerid: boolean
    disable: boolean
    propertDto: string
    value?: string
    information?:string
    sequence:number
    width:number
    formula?:string[]
}
interface checkbox {
    on:string,
    off:string,
}
interface textarea {
    rows:number
    cols:number
}
