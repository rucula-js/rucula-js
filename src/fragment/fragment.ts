import { entityConfiguration, fragmentField, fragmentObject } from "../object/ObjectAliases";
import { tableDependency } from "../table-dependency/TableDependency";

export let fragment = (() => {

    let objects: Array<fragmentObject> = new Array<fragmentObject>();
    let fields: Array<fragmentField> = new Array<fragmentField>();
    
    function checkIdentity(identity:string){
        if(identity === undefined){
            throw new Error('identity is requerid')   
        }
    }

    return {
        objects:{
            add: function(object:fragmentObject){

                checkIdentity(object.key.identity)
                
                let exist = objects.find( c => c.key.identity == object.key.identity)

                if(exist){
                    throw new Error('Object identity exists!!!');
                }

                objects.push(object)
            },

            getForFieldIdentity: function(identity:string):fragmentObject{

                let field = fragment.fields.getForIdentity(identity)
                
                return fragment.objects.getForIdentity(field.config.fragmentObjectIdentity)
            },
            getForIdentity: function(identity:string):fragmentObject{

                if(identity === undefined){
                    throw new Error('identity requerid!');
                }

                let object = objects.find( c => c.key.identity == identity)

                if(object){
                    return object
                }

                throw new Error("Object not Found");
            },
            getForAlias: function(alias:string):fragmentObject{
    
                if(alias === undefined){
                    throw new Error('alias is requerid')   
                }
                
                let object  = objects.find( (c:any )=> c.key.alias == alias)

                if(object) {
                    return object
                }

                throw new Error('object not found')   
            }

        },
        fields: {

            add:function(field:fragmentField){

                checkIdentity(field.key.identity)

                let exist = fields.find( c => c.key.identity == field.key.identity)

                if(exist){
                    throw new Error('Field identity exists!!!');
                }

                fields.push(field)
            },

            remove: function(fragment:fragmentField){
                let index = fields.indexOf(fragment)

                if(index > -1){
                    fields.splice(index,1)
                }
            },
            removeLine: function(objectIDentity:string, line:number){
                
                let _fields = fields.filter(item => item.config.fragmentObjectIdentity == objectIDentity && item.config.line == line)

                _fields.forEach(field => {
                    
                    let indexOf = fields.indexOf(field)

                    if(indexOf > -1){
                        tableDependency.removeExpectedDependency(field.key.identity)
                        fields.splice(indexOf,1)
                    }
                })
            },
             /**
             * @param {string} identity
             * @return {fragmentField} 
             */
            getForIdentity: function(identity:string):fragmentField{
        
                if(identity === undefined){
                    throw new Error('identity is requerid')   
                }

                let field = fields.find( c => c.key.identity == identity)

                if(field){
                    return field
                }

                throw new Error("field not Found");
                
            },
            /**
             * @param {entityConfiguration} config
             * @return {fragmentField} 
            */
            getForAliasAndPropert:function (config:entityConfiguration){
        
                if(config === undefined){
                 throw new Error('entityConfiguration is requerid')   
                }
        
                return  fields.find((c:any) => 
                    c.config.alias == config.aliasOrIDentity &&
                    c.config.propertDto == config.propertDto &&
                    c.config.line == config.line)
            }
        }
    }
})()