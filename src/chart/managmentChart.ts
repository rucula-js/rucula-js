import Chart from 'chart.js/auto';
import { frame } from '../entities/form/frame';
import { windowBaseDOM } from '../elements/window-base/WindowBase';
import { match } from 'assert';
import { httpManagment } from '../httpManagment/httpManagment';
import { getEndPoint } from '../window/Window';

export let managmentChart = (() => {

    return {
        
      create: (canvas:HTMLCanvasElement, frame:frame) => {




        
        // let  datasets =  frame.chartConfig.endPoints.map((endPointName) => {
          
        //   let dataResult = httpManagment.request(endPointName) // Todo Implemente

        //   let endPoint = getEndPoint(endPointName)

        //   let dataSet = {
        //     label: endPoint.description,
        //     borderWidth: 2,
        //     data: dataResult
        //   }

        //   return dataSet
        // })


        let config = {
          type: frame.chartConfig.type,
          data: {
            labels: frame.chartConfig.labels,
            datasets: [
              {
              label: '',
              borderWidth: 2,
              data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
              },
              {
                label: '',
                borderWidth: 2,
                data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]                }
              ]
            }
        }
        
        new Chart(canvas, config as any)
      }
    }
})()