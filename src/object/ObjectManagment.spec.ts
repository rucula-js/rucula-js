import assert from 'assert';
import {managmentObject} from './ObjectManagment'
import windowValue from '../../exemples/ObjectManagment.Frames.json'
import { window } from '../entities/form/window';
import { frame } from '../entities/form/frame';
import { objectIsEqual } from '../test/Helper';
import { fragmentField } from './ObjectAliases';

describe('ObjectManagment', function () {

    managmentObject.init(windowValue as window)

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

    describe('fragment', function () {
  
      let fragments = managmentObject.fragment.getAll() as [];
      
      it('should return list fragment', function () {
        
        assert.equal(fragments.length > 0,true);
      })

      it('should remove top 5 fragments type fragmentField', function () {


      //   let fragmentsField = fragments.filter((c:fragmentField) => c.config.propertDto != "")

      //   let actualLenght = fragmentsField.length

      //   for (let index = 0; index < 5; index++) {
          
      //     const fragment:fragmentField = fragmentsField[index];

      //     managmentObject.fragment.removeFragment(fragment.key.identity)
      //   }

      //   let newLenght = managmentObject.fragment.getAll().length

      //        assert.equal(actualLenght-5 == newLenght,true)
     })

    })

    describe('object', function () {
  
      it('should return complete object', function () {
        
        let objectExpected =  {
          totais:{},
          cliente:{daoinadvoiadvnadvodvi:{endereco:{}}},
          fornecedor: {endereco:{}},
          itensPedido: [],
          
        }

        let objectResult = managmentObject.object.object.objectFull()
        
        let result = objectIsEqual(objectResult,objectExpected)
      
        assert.equal(result,true);
              
      })

      it('should return separate object for alias', function () {
        
        let objectResult = managmentObject.object.object.objectSeparate()

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
        
        managmentObject.object.field.setValueContextAlias("enderecoAliasVX.cep",valCep)
        
        let objectExpected = { cep: '13255432' }

        let objectUnique = managmentObject.object.object.objectUnique("enderecoAliasVX")
        
         let result = objectIsEqual(objectUnique,objectExpected)

         assert.equal(result,true);        
                  
      })
      it('should return values of properts without propert parent ', function () {
        
        let valCodigo = "1728847y784y"
        let valDataAbertura = "2023-01-02"
        let valDataEncerramento = "2023-02-02"
        
        managmentObject.object.field.setValueContextAlias("AliasFaturaHeader.codigo",valCodigo)
        managmentObject.object.field.setValueContextAlias("AliasFaturaHeader.dataAbertura",valDataAbertura)
        managmentObject.object.field.setValueContextAlias("AliasFaturaHeader.dataEncerramento",valDataEncerramento)
        
        let codigo = managmentObject.object.object.getPropert("AliasFaturaHeader.codigo")
        let dataAbertura = managmentObject.object.object.getPropert("AliasFaturaHeader.dataAbertura")     
        let dataEncerramento = managmentObject.object.object.getPropert("AliasFaturaHeader.dataEncerramento")         
        
        assert.equal(codigo,valCodigo);
        assert.equal(dataAbertura,valDataAbertura);
        assert.equal(dataEncerramento,valDataEncerramento);
        
      })

      it('should return values of properts without propert parent ', function () {

        let valCep = '13255432'

        managmentObject.object.field.setValueContextAlias("enderecoAliasVX.cep",valCep)
        
        let cep = managmentObject.object.object.getPropert("enderecoAliasVX.cep")

        assert.equal(cep,valCep);
     
      })

    })
});
