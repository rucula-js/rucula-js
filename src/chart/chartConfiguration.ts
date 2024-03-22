export interface chartConfiguration {
    type: 'bar'|'line'
    labels:string[]|number[]
    parsing: {
        yAxisKey: ''
        xAxisKey: ''
    }
    endPoints:string[]
}
