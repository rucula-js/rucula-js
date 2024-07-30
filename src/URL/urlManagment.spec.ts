import assert from 'assert';
import { ruculaGlobal } from '../global/GlobalConfig';
import { URLRucula } from './urlManagment';
import { exportManagmentObject } from '../exports';


let managmentObjectTest = exportManagmentObject;

describe('urlManagment', function () {

    ruculaGlobal.initGlobalConfiguration(
    {
        environments:[{
            env:"development",
            hostname:"http://localhost",
            port: "5016"
        }],
        localizations:[{
            locales:"pt-BR",
            language:"Brasil" ,
            currency:"BRL",
            maxDecimal:5
        }]

    } as any);


    var frames:any[] = [
          {
            name: "frame",
            type: "block",
            objectDto: "frame",
            alias: "aliasTestURL",
            fields: [
                {
                propertDto: "codigo",
                description: "Codigo"
              }
            ]
          },
    
    ]
     
    managmentObjectTest.frame.initObjects(frames);
    managmentObjectTest.object.field.setValueContextAlias("aliasTestURL.codigo","MyValueTest")

    describe('UrlBase shold create url by controller', function () {
  
        it('createURL  ', function () {

            let button:any = {
                URL:{
                    path:'',
                    params:'codigo={aliasTestURL.codigo}'
                }
            }
            
            let url = new URLRucula(button.URL,managmentObjectTest.object.field);

            let result = url.getURL();

        })

        it('UrlBase shold create url by path', function () {

            let button:any = {
                URL:{
                    relative:'servico/venda/cliente?codigo={aliasCliente.codigo}',
                }
            }
             let result = new URLRucula(button.URL, exportManagmentObject.object.object);

        })
    })    
});
