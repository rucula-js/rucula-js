import { constGroupFormat, constInputClass, constTypeInput } from "../../const";
import { field } from "../../entities/form/field";
import { exportTableDependency } from "../../exports";
import { ruculaGlobal } from "../../global/GlobalConfig";
import { managmentObject } from "../../object/ObjectManagment";
import { tableDependency } from "../../table-dependency/TableDependency";
import { eventsCustom } from "./Field/EventsFieldsCustom";
import { FieldCheckbox } from "./Field/FieldCheckbox";
import { FieldCommon } from "./Field/FieldCommon";
import { FieldRadio } from "./Field/FieldRadio";
import { FieldSelect } from "./Field/FieldSelect";
import { FieldStrategy } from "./Field/FieldStrategy";
import { FieldTextArea } from "./Field/FieldTextArea";


export let fieldDOM = (() => {

    function createSpanLabelIsRequerid():HTMLSpanElement{
        const floatLabel = ruculaGlobal.getConfigurationGlobal().floatLabel

        const span = document.createElement('span'); 
        span.innerText = " *"
        span.style.color = "red";
    
        return span
    }
    
    function createGroupOfButton(element:HTMLButtonElement|HTMLAnchorElement):HTMLDivElement{
        
        const div = document.createElement('div');
        div.classList.add('r-g-i-i');

        div.appendChild(element)
        return div;
    }

    function createGroupOfInput(field:field, element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement):HTMLDivElement{
    
        const div = document.createElement('div');
        div.classList.add('r-g-i-i');
    
        const label = document.createElement('label');
    
        label.textContent = field.description
        
        if (field.requerid == true){
          label.textContent = label.textContent
          label.append(createSpanLabelIsRequerid().cloneNode(true))
        }
        
        const floatLabel = ruculaGlobal.getConfigurationGlobal().floatLabel
        
        if(floatLabel == true && (isSimple(field.type)|| isTextArea(field.type)|| isSelect(field.type))){
            div.appendChild(element)
            div.classList.add('did-floating-label-content')
            label.classList.add('did-floating-label')
            div.appendChild(label)
            
            return div
        }
    
        if(field.groupFormat == undefined){
            label.classList.add('r-label-block')
            div.appendChild(label)
            div.appendChild(element)
        }
    
        if(field.groupFormat == constGroupFormat.DOWN){
            label.classList.add('r-label-block')
            div.appendChild(element)
            div.appendChild(label)
        }
    
        if(field.groupFormat  == constGroupFormat.LEFT){
            label.classList.add('r-label-inline')
            element.style.marginRight = "8px"
            div.appendChild(element)   
            div.appendChild(label)
        }
        
        if(field.groupFormat  == constGroupFormat.RIGTH){
            label.classList.add('r-label-inline')
            element.style.marginLeft = "8px"
            div.appendChild(label)
            div.appendChild(element)
        }
    
        return div;
    }
     
    function checkTypeField(type: string|string[2]){
    
        let option = type;
        
        if(Array.isArray(type)){
            option = type[1]
        }
        
        let types = [
            "text",
            "number",
            "select",
            "checkbox",
            "date",
            "currency",
            "textarea",
            "bool",
            "radio",
            "password"
        ]
    
        if(types.indexOf(option) == -1){
            throw new Error(`Field type "${option}" is not allowed`);
        }
    }
     
    function isSimple(type:string){
                
        let condition =  
        type == constTypeInput.NUMBER || 
        type == constTypeInput.TEXT || 
        type == constTypeInput.DATE ||
        type == constTypeInput.CURRENCY ||
        type == constTypeInput.PASS
        
        return condition;
    }
    
    function isTextArea(type:string){
        return type == constTypeInput.TEXT_AREA
    }
    
    function isSelect(type:string){
            return type[0] == constTypeInput.SELECT
    }

    return {
        create:(field:field)=> {

            let element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement
            let fieldStrategy:FieldStrategy = new FieldStrategy();
        
            checkTypeField(field.type)
            
            if(isSimple(field.type)){
                fieldStrategy.setStrategy(new FieldCommon(field))
            }
            
            if(isSelect(field.type)) {
                fieldStrategy.setStrategy(new FieldSelect(field))
            }
        
            if(isCheckBox()){
                fieldStrategy.setStrategy(new FieldCheckbox(field))
            }
        
            if(isTextArea(field.type)){
                fieldStrategy.setStrategy(new FieldTextArea(field))
            }
            
            if(isRadio()) {
                fieldStrategy.setStrategy(new FieldRadio(field))
            }
        
            element = fieldStrategy.create();
            
            if(field.maxLength){
                element.setAttribute('maxlength',`${field.maxLength}`);
            }
            
            element.setAttribute("identity",field.identity);
                            
            let fragmentField = managmentObject.fragment.getFragmentForIdentity(field.identity)

            let identity = { 
                    name: fragmentField.config.line ? `${fragmentField.config.alias}.${field.propertDto}.${fragmentField.config.line}` : `${fragmentField.config.alias}.${field.propertDto}`,
                    element: element as HTMLElement,
                    row:fragmentField.config.line
            }
        
            eventsCustom.field().set(identity)
        
            managmentObject.object.field.setValueContextIdentity(field.identity,field.type, element.value);
            
            function isRadio(){
                return field.type[0]  == constTypeInput.RADIO
            }
        
            function isCheckBox(){
                return field.type[0] == constTypeInput.CHECKBOX
            }
        
            return element as HTMLSelectElement|HTMLInputElement
        },
        
        createSpanLabelIsRequerid:() => {
            return createSpanLabelIsRequerid()
        },
        
        createGroupOfInput: (field:field, element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement) => createGroupOfInput(field, element),
        
        createGroupOfButton:(element:HTMLButtonElement|HTMLAnchorElement) => createGroupOfButton(element),
        dependency: {
            focusFieldsWithDependency:() => {
            
                exportTableDependency
                   .getDependenciesNotResolded()
                   .filter(c => c.isHibernate == false)
                   ?.forEach(object => {

                        object.fieldsNotResolved?.forEach(identity => {

                        let input = document.querySelector('[identity='+identity+']')
                        input?.classList.add(constInputClass.FOCUS_IN_INPUT_WITH_DEPENDENCY)
                    })
                })
            },

            cleanFocusDependency: (input:HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement) => {
                input.classList.remove(constInputClass.FOCUS_IN_INPUT_WITH_DEPENDENCY)
            }

        }
    }
})()
