import assert from 'assert';
import {managmentObject} from './ObjectManagment'
import windowValue from '../../exemples/ObjectManagment.Frames.json'
import { window } from '../entities/form/window';
import { frame } from '../entities/form/frame';
import { objectIsEqual } from '../test/Helper';

let obj = managmentObject();

describe('ObjectManagment', function () {
  obj.frame.initObjects(windowValue.frames as frame[])

    describe('frame', function () {
  
      it('should contain automatic value in identity propert', function () {
        
        (windowValue.frames as frame[]).forEach((item) => {
          assert.equal(item.identity.length == 36,true);
        })
        
      });
    })

    describe('field', function () {
  
      it('should contain automatic value in identity propert with frames type block', function () {
        
        (windowValue.frames as frame[]).filter(c => c.type == 'block').forEach((frame) => {
          
          frame.fields?.forEach(field => {
            assert.equal(field.identity.length == 36,true);
          })
        })

      });
    })

    describe('object', function () {
  
      it('should return complete object', function () {
        
        let objectExpected =  {
          totais:{},
          cliente:{daoinadvoiadvnadvodvi:{endereco:{}}},
          fornecedor: {endereco:{}},
          itensPedido: [],
          
        }

        let objectResult = obj.object.object.objectFull()
        
        let result = objectIsEqual(objectResult,objectExpected)
      
        assert.equal(result,true);
              
      })

      it('should return separate object for alias', function () {
        
        let objectResult = obj.object.object.objectSeparate()

        let objectExpected = {
          AliasFaturaHeader: {},
          totais: {},
          cliente: { daoinadvoiadvnadvodvi: { endereco: {} } },
          enderecoAliasVX: {},
          fornecedor: { endereco: {} },
          endCliente: {},
          AliasItensPedido: []
        }

        let result = objectIsEqual(objectResult,objectExpected)

        assert.equal(result,true);        
                  
      })

      it('should return unique object for alias', function () {
        
        let valCep = '13255432'
        
        obj.object.field.setValueContextAlias("enderecoAliasVX.cep",valCep)
        
        let objectExpected = { cep: '13255432' }

        let objectUnique = obj.object.object.objectUnique("enderecoAliasVX")
        
         let result = objectIsEqual(objectUnique,objectExpected)

         assert.equal(result,true);        
                  
      })
      it('should return values of properts without propert parent ', function () {
        
        let valCodigo = "1728847y784y"
        let valDataAbertura = "2023-01-02"
        let valDataEncerramento = "2023-02-02"
        
        obj.object.field.setValueContextAlias("AliasFaturaHeader.codigo",valCodigo)
        obj.object.field.setValueContextAlias("AliasFaturaHeader.dataAbertura",valDataAbertura)
        obj.object.field.setValueContextAlias("AliasFaturaHeader.dataEncerramento",valDataEncerramento)
        
        let codigo = obj.object.object.getPropert("AliasFaturaHeader.codigo")
        let dataAbertura = obj.object.object.getPropert("AliasFaturaHeader.dataAbertura")     
        let dataEncerramento = obj.object.object.getPropert("AliasFaturaHeader.dataEncerramento")         
        
        assert.equal(codigo,valCodigo);
        assert.equal(dataAbertura,valDataAbertura);
        assert.equal(dataEncerramento,valDataEncerramento);
        
      })

      it('should return values of properts without propert parent ', function () {

        let valCep = '13255432'

        obj.object.field.setValueContextAlias("enderecoAliasVX.cep",valCep)
        
        let cep = obj.object.object.getPropert("enderecoAliasVX.cep")

        assert.equal(cep,valCep);
     
      })

    })
});
