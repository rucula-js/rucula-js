import axios from "axios";
import { Configuration } from "./Entities/Configuration";

export function ax(config:Configuration)
{
    axios({
        method: config.method,
        url: config.url,
        data: config.data})
        .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
}
