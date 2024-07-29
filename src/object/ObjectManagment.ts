import { convertValueType } from '../Helpers/Helper';
import { constTypeFrame } from '../const';
import { frame } from '../entities/form/frame';
import { exportTableDependency } from '../exports';
import { fragment } from '../fragment/fragment';
import { entityConfiguration, fragmentField, fragmentObject } from './ObjectAliases';
import { generateUUID } from './ObjectHelper';

'use strict';

export let managmentObject = ()=> {
    
    let initialized = false;
            
    let pathObjectBase:{parent:string, alias:string, configFrame:string, }[] = [];
                    
    /**
     * @description Creates an array of fragments of type object
     * @param {frame[]} frames
     */
    function initObjects(frames:frame[]){
                
        if(initialized){
            throw new Error('Routine already initialized')
        }
        initialized = true;

        frames?.forEach(frame => {
            
            frame.identity = generateUUID('F')
            
            if(frame.alias === undefined){
                throw new Error('propert alias is Requerid');                
            }
            
            let fragmentObject:fragmentObject = {
                key: {
                    identity:frame.identity,
                    alias: frame.alias
                },
                config:{
                    objectDto: frame.objectDto,
                    identity: frame.identity,
                    object: frame.type == constTypeFrame.BLOCK ? {} : [],
                    getValueInObjectFragment: getValueInObjectFragment
                }
            }

            fragment.objects.add(fragmentObject)

            pathObjectBase.push({ parent: frame.parent, alias: frame.alias, configFrame:frame.identity })
                        
        });
    }
    
    /**
    * @description Creates an array of fragments of type Field for Frames of type 'block'
    * @param {frame} frame
    */
    function configFieldBlock(frame:frame){
        
        frame.fields?.forEach(field => {
            
            field.identity = generateUUID('I') //! This instruction should not be removed from its place, otherwise there will be problems due to missing identity not created
            
            let config:fragmentField = {
                key: {
                    identity:field.identity,
                },
                config: {
                    alias:frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: undefined,
                    dependency:''  
                } 
            }
            config.config.dependency =  exportTableDependency.createExpectedDependency(field,config)
            
            exportTableDependency.toApplyOrRemoveDependency(config, field.value)
                        
            fragment.fields.add(config)
        })    
    }    

    /**
     * @description Creates an array of fragments of type Field for Frames of type 'line', This function must be called every time a new line is created on the screen
     * @param {frame} frame
    */
    function addLine(frame:frame){
        
        let object = fragment.objects.getForIdentity(frame.identity)
        
        let newLine = object.config.object.length + 1

        object.config.object.push({rucLine:newLine})

        frame.fields?.forEach(field => {
            
            field.identity = generateUUID('I') //! This instruction should not be removed from its place, otherwise there will be problems due to missing identity not created

            let config:fragmentField = {
                key: {
                    identity:field.identity,
                },
                config: {
                    alias: frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: newLine,
                    dependency:''
                }    
            }

            config.config.dependency = exportTableDependency.createExpectedDependency(field,config)

            exportTableDependency.toApplyOrRemoveDependency(config, field.value)

            fragment.fields.add(config)

        })    
    }    
       
    /**
     * @description Creates an object respecting the parent property hierarchy.
     * @return {*} 
     */
    function createObject(){

        let configBase = pathObjectBase.find(c=> c.parent === undefined || c.parent === '')!
            
        let configFrameBase = fragment.objects.getForIdentity(configBase.configFrame)  

        let newObject  = Object.assign({},configFrameBase?.config.object) 
        
        pathObjectBase.forEach((config:{parent:string, configFrame:string }) => {
            
            let fragmentObject = fragment.objects.getForIdentity(config.configFrame)
            
            if(config.parent == '.'){
                insertObjectRoot()
                return
            }
            
            if(config.parent != '.' && config.parent !== undefined && config.parent !== ''){
                insertObjectParent(config.parent.split('.'),newObject)
                return
            }
            
            function insertObjectRoot(){
                newObject[fragmentObject!.config!.objectDto] = fragmentObject!.config!.object 
            }
            
            function insertObjectParent(parent:string[], newObject:any){
                
                if(parent.length == 0){
                    return
                }
                
                let propert = parent[0]
                                        
                if(parent.length == 1){
                    createPropertForObject()
                    return
                }
                
                if(parent.length > 1){

                    createPropertForPath()
                    let newPath = parent.slice(1,parent.length)
                    insertObjectParent(newPath, newObject[propert])
                    
                    return
                }
                
                function createPropertForObject(){

                    if(newObject[propert] === undefined){
                        newObject[propert] = {}   
                    }
                    newObject[propert][fragmentObject!.config.objectDto] = fragmentObject!.config.object
                }

                function createPropertForPath(){

                    if(newObject[propert] === undefined){
                        newObject[propert] = {}
                    }
                }
            }
        })
        return newObject
    }

    /**
     * @description Creates an object bringing without respecting the hierarchy of the parent property
     * @return {*} 
    */
    function createObjectSeparete(){
        
        let objectSeparate = {} as any;
        
        pathObjectBase.forEach((config:{parent:string, alias:string, configFrame:string }) => {
            
            let configFragment  = fragment.objects.getForIdentity(config.configFrame)
                        
            objectSeparate[config.alias] = configFragment.config.object
        })

        return objectSeparate
    }

    function createObjectForAlias(alias:string){
        
        let object  = fragment.objects.getForAlias(alias)
                        
        return object.config.object
    }

    function setValue(fragmentField:fragmentField, value:any){
        
        let fragmentObject =  fragment.objects.getForIdentity(fragmentField.config.fragmentObjectIdentity)

        if(isTypeObject()){
            fragmentObject.config.object[fragmentField?.config.propertDto] = value
        }

        if(isTypeLine()){

            let line = fragmentField?.config.line!

            let item = fragmentObject.config.object.find((c:any) => c.rucLine == line)

            if(item == undefined){
                item = {rucLine:line}
                fragmentObject.config.object.push(item)
            }
            
            item[fragmentField?.config.propertDto] = value
        }

        function isTypeObject(){
            return fragmentField?.config.line == undefined
        }

        function isTypeLine(){
            return fragmentField?.config.line != undefined
        }

        exportTableDependency.toApplyOrRemoveDependency(fragmentField,value)
    }

    function createConfigurationField(config:string):entityConfiguration {

        let opt = config.split('.')

        let entityConfiguration:entityConfiguration =  {
            aliasOrIDentity:opt[0],
            propertDto:opt[1],
            line: opt[2] == undefined ? undefined : Number(opt[2]) 
        }

        return entityConfiguration
    }

    function getValueInObjectFragment(object:any,propertDto:string,line?:number) {
        //! This function should only be used for fragmentObject
        for (var propert in object) {

            if (object.hasOwnProperty(propertDto) && line == undefined) {
                return object[propertDto];
            }
            if (Array.isArray(object) && line != undefined) {

                return getValueInObjectFragment(object[line!],propertDto)
            }

            if(typeof object === 'object') {
                return getValueInObjectFragment(object[propert],propertDto)
            }
        }
    }

    return {

        frame: {
            initObjects:(frames:frame[]) => initObjects(frames),
            configFieldBlock:(frame:frame) => configFieldBlock(frame),
            addLine:(frame:frame) => addLine(frame),                
        },

        field: {
            type: (identityField:string) => {
                
                let fragmentField = fragment.fields.getForIdentity(identityField)

                if(fragmentField.config.line == undefined){
                    return constTypeFrame.BLOCK
                }

                return constTypeFrame.LINE
            }
        },

        object: {

            field: {
                convertAliasToIdenty:(config:string) => {
    
                    let entityConfiguration = createConfigurationField(config)
                    let fragmentField = fragment.fields.getForAliasAndPropert(entityConfiguration) as fragmentField
                    return fragmentField.key.identity
                    
                },
                setValueContextAlias:(config:string, value:any) => {
    
                    let entityConfiguration = createConfigurationField(config)
                    let fragmentField = fragment.fields.getForAliasAndPropert(entityConfiguration) as fragmentField
                    setValue(fragmentField,value)
                    
                },
                setValueContextIdentity:(identity:string, type:string|string[2], value:any) => {

                    value = convertValueType(value, type)

                    let fragmentField = fragment.fields.getForIdentity(identity)
        
                    setValue(fragmentField,value)
                },
            },

            object: {

                objectFull:() => {
                    return createObject();
                },
    
                objectSeparate:() => {
                    return createObjectSeparete() 
                },

                objectUnique:(alias:string,) => {
                    return createObjectForAlias(alias) 
                },
                objectUniqueLine:(alias:string,line:number) => {
                    let object = createObjectForAlias(alias)
                    
                    object = object[line]

                    return object 
                },
                
                count:(identity:string) => {
                    
                    let object = fragment.objects.getForIdentity(identity) 

                    if(Array.isArray(object.config.object) == false){
                        return -1
                    }
                    
                    return object.config.object.length               
                 },

                removeLine:(identity:string, line:number) => {
                                              
                    let objectFragment = fragment.objects.getForIdentity(identity) 
                    
                    var indexOf = objectFragment.config.object.findIndex((c:any) => c.rucLine == line)
                    
                    objectFragment.config.object.splice(indexOf,1)
                                            
                },

                getPropert: (config:string) => {

                    let entityConfiguration = createConfigurationField(config)   
                    
                    let fragmentField = fragment.fields.getForAliasAndPropert(entityConfiguration) as fragmentField
                    
                    let fragmentObject = fragment.objects.getForIdentity(fragmentField.config.fragmentObjectIdentity)
                    
                    let object = fragmentObject.config.object

                    return fragmentObject.config.getValueInObjectFragment(object,entityConfiguration.propertDto,entityConfiguration.line) 
                }
            }
        },

        fragment: {

            getFragmentForIdentity:(identity:string):fragmentField => {
                return fragment.fields.getForIdentity(identity)
            },

            removeFragmentsLine:(objectIDentity:string, line:number) => {
                fragment.fields.removeLine(objectIDentity,line)
            },
            removeFragment:(identity:string) => {

                //TODO - manually tested - do automated testing
                let _fragment = fragment.fields.getForIdentity(identity)
                
                fragment.fields.remove(_fragment)

                exportTableDependency.removeExpectedDependency(identity)
            }
        }
    }
}