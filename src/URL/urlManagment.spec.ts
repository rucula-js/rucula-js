import assert from 'assert';
import { ruculaGlobal } from '../global/GlobalConfig';
import { urlManagment } from './urlManagment';

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

    describe('UrlBase shold create url by controller', function () {
  
        it('createURL  ', function () {

            let button:any = {
                URL:{
                    path:'',
                    params:'codigo={aliasCliente.codigo}'
                }
            }
            let result = urlManagment.createURL('Cliente',button);
        })

        it('UrlBase shold create url by path', function () {

            let button:any = {
                URL:{
                    path:'servico/venda/cliente?codigo={aliasCliente.codigo}',
                    params:''
                }
            }
            let result = urlManagment.createURL('Cliente',button);
        })
    })    
});
