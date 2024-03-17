import { constTypeFrame } from '../const';
import { field } from '../entities/form/field';
import { frame } from '../entities/form/frame';
import { window } from '../entities/form/window';
import { tableDependency } from '../table-dependency/TableDependency';
import { configWindow } from '../window/Window';
import { entityConfiguration, fragmentField, fragmentObject } from './ObjectAliases';
import { generateUUID } from './ObjectHelper';

'use strict';

let _object :any

export let managmentObject = (()=> {
    
    let initialized = false;
    
    let base:any = {};
    
    let fragments: Array<fragmentField|fragmentObject> = new Array<fragmentField|fragmentObject>(); 
    
    let pathObjectBase:{parent:string, alias:string, configFrame:string, }[] = [];
    
    /**
     * @param {entityConfiguration} config
     * @return {fragmentField} 
    */
    function getFragmentFieldForAliasAndPropertDto(config:entityConfiguration){
        
        if(config === undefined){
         throw new Error('entityConfiguration is requerid')   
        }

        return  fragments.find((c:any) => 
            c.config.alias == config.aliasOrIDentity &&
            c.config.propertDto == config.propertDto &&
            c.config.line == config.line)
    }
                    
     /**
     * @param {string} identity
     * @return {fragmentField | fragmentObject} 
     */
     function getFragmentForIdentity(identity:string){
        
        if(identity === undefined){
         throw new Error('identity is requerid')   
        }
        return  fragments.find( c => c.key.identity == identity)
    }

    /**
     * @param {string} alias
     * @return {fragmentObject} 
     */
    function getFragmentForAlias(alias:string){
    
        if(alias === undefined){
            throw new Error('alias is requerid')   
        }
        return  fragments.find( (c:any )=> c.key.alias == alias)
    }

    /**
     * @description Creates an array of fragments of type object
     * @param {frame[]} frames
     */
    function initConfigFrame(frames:frame[]){
                
        frames?.forEach(frame => {
            
            frame.identity = generateUUID()
            
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

            if(getFragmentForIdentity(fragmentObject.key.identity) != undefined){
                throw new Error('frame identity exists!!!');                
            }
            
            fragments.push(fragmentObject)

            if(frame.type == constTypeFrame.LINE){
                base['zzRowCount'][frame.identity] = -1
            }
    
            pathObjectBase.push({ parent: frame.parent, alias: frame.alias, configFrame:frame.identity })
            
            initConfigFields(frame)
            
        });
    }
    
    /**
    * @description Creates an array of fragments of type Field for Frames of type 'block'
    * @param {frame} frame
    */
    function configFieldBlock(frame:frame){
        
        frame.fields?.forEach(field => {
            
            field.identity = generateUUID() //! This instruction should not be removed from its place, otherwise there will be problems due to missing identity not created
            
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
                    dependency: tableDependency.createExpectedDependency(field)
                } 
            }
            
            tableDependency.toApplyOrRemoveDependency(config, field.value)
                        
            if(getFragmentForIdentity(config.key.identity) != undefined){
                throw new Error('Field identity exists!!!');                
            }    

            fragments.push(config)
        })    
    }    

    /**
     * @description Creates an array of fragments of type Field for Frames of type 'line', This function must be called every time a new line is created on the screen
     * @param {frame} frame
    */
    function configFieldNewLine(frame:frame):field[]{

        let newLine:field[] = frame.fields?.map(field => Object.create(field))!
        
        let line = getNextzzRowCount(frame.identity)
        
        newLine?.forEach(field => {
            
            field.identity = generateUUID() //! This instruction should not be removed from its place, otherwise there will be problems due to missing identity not created

            let config:fragmentField = {
                key: {
                    identity:field.identity,
                },
                config: {
                    alias: frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: line,
                    dependency: tableDependency.createExpectedDependency(field)
                }    
            }
            
            tableDependency.toApplyOrRemoveDependency(config, field.value)
            
            if(getFragmentForIdentity(config.key.identity)){
                throw new Error('Field identity exists!!!');                
            }    

            fragments.push(config)
        })    

        return newLine;
    }    
  
    function getNextzzRowCount(frameIdentity:string):number{
        return base['zzRowCount'][frameIdentity] += 1;
    }    

    function initConfigFields(frame:frame){

        if(frame.type == constTypeFrame.BLOCK){
            configFieldBlock(frame);
        }
        
        if(frame.type == constTypeFrame.LINE){
            configFieldNewLine(frame);
        }
    }
    
    /**
     * @description Creates an object respecting the parent property hierarchy.
     * @return {*} 
     */
    function createObject(){

        let configBase = pathObjectBase.find(c=> c.parent === undefined)!
            
        let configFrameBase = getFragmentForIdentity(configBase.configFrame) as fragmentObject  

        let newObject  = Object.assign({},configFrameBase?.config.object) 
        
        pathObjectBase.forEach((config:{parent:string, configFrame:string }) => {
            
            let fragmentObject = getFragmentForIdentity(config.configFrame)  as fragmentObject
            
            if(config.parent == '.'){
                insertObjectRoot()
                return
            }
            
            if(config.parent != '.' && config.parent !== undefined){
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
            
            let configFragment  = getFragmentForIdentity(config.configFrame) as fragmentObject
                        
            objectSeparate[config.alias] = configFragment.config.object
        })

        return objectSeparate
    }

    function createObjectForAlias(alias:string){
        
        let configFragment  = getFragmentForAlias(alias) as fragmentObject
                        
        return configFragment.config.object
    }

    function setValue(fragmentField:fragmentField, value:any){
        
        let fragmentObject =  getFragmentForIdentity(fragmentField.config.fragmentObjectIdentity) as fragmentObject

        if(isTypeObject()){
            fragmentObject.config.object[fragmentField?.config.propertDto] = value
        }

        if(isTypeLine()){
            
            let line = fragmentField?.config.line!

            if(fragmentObject.config.object[line] == undefined){
                fragmentObject.config.object[line] = {}
            }
            
            fragmentObject.config.object[line][fragmentField?.config.propertDto] = value
        }

        function isTypeObject(){
            return fragmentField?.config.line == undefined
        }

        function isTypeLine(){
            return fragmentField?.config.line != undefined
        }

        tableDependency.toApplyOrRemoveDependency(fragmentField,value)
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

        init:(window:window) => {

            if(initialized){
                throw new Error('Routine already initialized')
            }
            
            initialized = true;

            base['zzRowCount'] = {} as any;

            initConfigFrame(window.frames);
        },
        
        frame: {

            addFistLine:(frameIDentity:string) => {

                let configFrame = getFragmentForIdentity(frameIDentity) as fragmentObject  

                let frame = configWindow.frame.get(configFrame.key.identity)
                
                return configFieldNewLine(frame)
            },

            addNewLine: (identity: string) => {

                let configField = getFragmentForIdentity(identity) as fragmentField

                let configFrame = getFragmentForIdentity(configField!.config.fragmentObjectIdentity) as fragmentObject

                let frame = configWindow.frame.get(configFrame.key.identity)

                return configFieldNewLine(frame)
            }
        },

        field: {
            type: (identityField:string) => {
                
                let fragmentField = getFragmentForIdentity(identityField) as fragmentField

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
                    let fragmentField = getFragmentFieldForAliasAndPropertDto(entityConfiguration) as fragmentField
                    return fragmentField.key.identity
                    
                },
                setValueContextAlias:(config:string, value:any) => {
    
                    let entityConfiguration = createConfigurationField(config)
                    let fragmentField = getFragmentFieldForAliasAndPropertDto(entityConfiguration) as fragmentField
                    setValue(fragmentField,value)
                    
                },
                setValueContextIdentity:(identity:string, value:any) => {
                
                    let fragmentField = getFragmentForIdentity(identity) as fragmentField
        
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

                getPropert: (config:string) => {

                    let entityConfiguration = createConfigurationField(config)   
                    
                    let fragmentField = getFragmentFieldForAliasAndPropertDto(entityConfiguration) as fragmentField
                    
                    let fragmentObject = getFragmentForIdentity(fragmentField.config.fragmentObjectIdentity) as fragmentObject
                    
                    let object = fragmentObject.config.object

                    return fragmentObject.config.getValueInObjectFragment(object,entityConfiguration.propertDto,entityConfiguration.line) 
                }
            }
        },

        fragment: {

            getAll:() => {
                return fragments
            },
            
            getFragmentTypeField: (identiTypeField:string):fragmentField => {
                return getFragmentForIdentity(identiTypeField) as fragmentField
            },

            removeFragment:(identity:string) => {

                //TODO - manually tested - do automated testing
                let fragment = getFragmentForIdentity(identity) as fragmentField

                let index = fragments.indexOf(fragment)

                if(index > -1){
                    fragments.splice(index,1)
                }

                tableDependency.removeExpectedDependency(identity)
            }
        }
    }
})()

export function zeroNextzzRowCount(objectDto:string):number{
    return _object['zzRowCount'][objectDto] = -1;
}

function getValuePropertTypeObject(prop:string):any{
    
    const object = prop.split('.')[0]
    const propert = prop.split('.')[1]
    const line = prop.split('.')[2]
    //Todo melhorar parametro com tipo objeto
    
    if(line){
        let obj = (_object[object] as Array<any>).find(c => c.zzRowUi == line)
        return obj[propert]
    }    
    
    return _object[object][propert]
}

function deleteLine(line:{objectDto:string, line:string}){ 
    let index = (_object[line.objectDto] as Array<any>).findIndex(c => c.zzRowUi == line.line)
    _object[line.objectDto].splice(index,1)
}

export {
    getValuePropertTypeObject,
    deleteLine
}