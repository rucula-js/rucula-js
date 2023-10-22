export interface events {
    name:string
    method:"post"|"put"|"get"
    urlrelative:string
    params:string
    body: object
}