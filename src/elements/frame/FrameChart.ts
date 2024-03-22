import { managmentChart } from "../../chart/managmentChart"
import { frame } from "../../entities/form/frame"
import { createFrame } from "./ElementFrame"

export let frameChart = (() => {
    return {
        createFrameChart:(frame:frame) => {
            
            const frameElement = createFrame(frame)
            
            let canvas = document.createElement('canvas') as HTMLCanvasElement
            canvas.setAttribute('id',frame.alias)
            
            frameElement.appendChild(canvas)

            managmentChart.create(canvas,frame)

            return frameElement
        }
    }
})()