import Chart from 'chart.js/auto';
import { frame } from '../entities/form/frame';
import { windowBaseDOM } from '../elements/window-base/WindowBase';
import { constTypeFrame } from '../const';

export let managmentChart = (() => {

    return {

      create: (canvas:HTMLCanvasElement, frame:frame) => {
        
        let configChart:any = {}

        let root = windowBaseDOM.getElementRoot()
        
        let event = `${constTypeFrame.CHART}.${frame.alias}`
        
        let eventCustom = new CustomEvent(`${event}.load`, {
          detail: {
            config: (config:any)=> {
              configChart = config
            }
          },
        })

        root.dispatchEvent(eventCustom)           
        
        let chart = new Chart(canvas, configChart)

        let completeCustom = new CustomEvent(`${event}.complete`, {

          detail: {
            chart: chart
          },
        })

        root.dispatchEvent(completeCustom)
      }
    }
})()