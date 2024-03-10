import assert from 'assert';
import { tableDependency } from './TableDependency';
import { field } from '../entities/form/field';
import { fragmentField } from '../object/ObjectAliases';

describe('TableDependency', function () {

    describe('object', function () {
  
      it('expectedDependency should create expectations of dependencies for the field', function () {
        
        let field = {
          requerid: true,
          maxLength: 12,
          max: 2,
          min: 1
        } as field
        
        let expected = tableDependency.expectedDependency(field)
        
        assert.equal(expected,"1,2:12,3:2,4:1,")
      })
      
      it('expectedDependency must return true when option is 1, and value is empty, null or undefined', function () {
            
        let field = {
          requerid: true,
        } as field
        
        let expectedDependency = tableDependency.expectedDependency(field)

        let fragmentField:fragmentField = {
          key : {
            identity:"qw12ere2w1"
        },
        config:{
            fragmentObjectIdentity: "", 
            alias:"",
            identity: "",
            propertDto:"",
            line: undefined,
            dependency:expectedDependency
          }    
        }

        let toApply0 = tableDependency.toApplyOrRemoveDependency(fragmentField,'')
        let toApply1 = tableDependency.toApplyOrRemoveDependency(fragmentField,'1')
        let toApply2 = tableDependency.toApplyOrRemoveDependency(fragmentField,null)
        let toApply3 = tableDependency.toApplyOrRemoveDependency(fragmentField,'scs')
        let toApply4 = tableDependency.toApplyOrRemoveDependency(fragmentField,undefined)
        let toApply5 = tableDependency.toApplyOrRemoveDependency(fragmentField,'scsccs')
        
        assert.equal(toApply0,true)
        assert.equal(toApply1,false)
        assert.equal(toApply2,true)
        assert.equal(toApply3,false)
        assert.equal(toApply4,true)
        assert.equal(toApply5,false)


      });

      it('expectedDependency must return true when option is 2:2, and value is superior', function () {
            
        let field = {
           maxLength: 2,
        } as field
        
        let expectedDependency = tableDependency.expectedDependency(field)

        let fragmentField:fragmentField = {
          key : {
            identity:"qw12ere2w1"
        },
        config:{
            fragmentObjectIdentity: "", 
            alias:"",
            identity: "",
            propertDto:"",
            line: undefined,
            dependency:expectedDependency
          }    
        }

        let toApply = tableDependency.toApplyOrRemoveDependency(fragmentField,'VAL')
        assert.equal(toApply,true)
      });
    })    
});
