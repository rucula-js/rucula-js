export interface endPoint {
    name:string
    description?:string
    method:"post"|"put"|"get"
    urlrelative:string
    params:string
    body: string
}