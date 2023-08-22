export interface field {
    id: string
    description: string
    type: string
    combo?:[],
    checkbox?:checkbox
    maxLength?: number
    max?: number
    min?: number
    requerid: boolean
    disable: boolean
    propertDto: string
    value?: string
    information?:string
    sequence:number
    formula?:string[]
}
interface checkbox {
    on:string,
    off:string,
}
