import config from "./exemples/config.global.json";
import input from './exemples/ordemServicoApiControl.json'
import { Rucula } from "./src/Rucula"

import { initGlobalConfiguration } from "./src/global/GlobalConfig"

import "tabulator-tables/dist/css/tabulator.css"
import "./public/style.css"
import "./public/normalize.css"
import "bootstrap-icons/font/bootstrap-icons.min.css";

(()=> {
    
    initGlobalConfiguration(config as any)
    
    let rucula = new Rucula(input as any,"js");

    var form = document.getElementById("form-rucula-js")

    form?.addEventListener("before-send-object-http", (e) => {
        console.log(rucula.get())
    })

    form?.addEventListener("send-object-http-error", (e) => {
        alert("Erro HTTP")
    })

    form?.addEventListener('before.ordemDeServico.codigo',(e) => {
        
        console.log(e)
    })

    form?.addEventListener('after.ordemDeServico.codigo',() => {
        console.log("after")
    })

    form?.addEventListener('after.endereco.cep',(e) => {
        
        let cep = (document?.getElementsByName('block.endereco.cep')[0] as HTMLInputElement).value

        const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(apiUrl)
        .then(response => {

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            
            return response.json();
        })
        .then(data => {

            rucula.set({ type:'block', objectDto:"endereco", propertDto: "logradouro",  value: data["logradouro"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "bairro", value: data["bairro"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "cidade", value: data["logradouro"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "estado", value: data["uf"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "pais", value:"BR"})
    
          }) 
        .catch(error => {
            console.error('Erro na requisição:', error.message);
          });
        })


        function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

})()