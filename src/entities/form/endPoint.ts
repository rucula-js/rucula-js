export interface endPoint {
    name:string
    method:"post"|"put"|"get"
    urlrelative:string
    params:string
    body: string
}