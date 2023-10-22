import axios from "axios";
import { Configuration } from "./Entities/Configuration";

export function ax(config:Configuration)
{
    axios({
        method: config.method,
        url: config.url,
        data: config.data,
    })
    .then(function (response) {
        
        alert(response.statusText);
    })
    .catch(function (error) {
        alert("ERROR")
    })
}
