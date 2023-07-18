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
    propertDto?: string
    value?: number|string|boolean|Date
    information?:string
    sequence:number
}
interface checkbox {
    on:string,
    off:string,
}
