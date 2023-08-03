import { field } from '../entities/form/field';
import { window } from '../entities/form/window';
import { frame } from '../entities/form/frame';
import { button } from '../entities/form/button';
import { prepareButtons } from '../buttons/Button';
import { eventButton } from '../buttons/EventButton';
import * as consoleUi  from '../console/Console'
import {createTableDependency,setDependency}  from '../table-dependency/TableDependency';
import * as unitElement from '../elements/ElementsForm'
import {createObject,joinChield,setPropertDto} from '../object/ObjectManagment';
import { setWindow } from './Window';
import { setEventListenerForInput, setEvents } from './WindowEvent';
import { FieldStrategy } from './Field/FieldStrategy';
import { FieldCommon } from './Field/FieldCommon';
import { FieldCheckbox } from './Field/FieldCheckbox';
import { FieldSelect } from './Field/FieldSelect';

'use strict';

let _form!:HTMLElement;
let _frameInFocu!:frame; 
        
export function domCreateForm(windowConfiguration:window){
    createTableDependency(windowConfiguration.frames!)
    joinChield(windowConfiguration.joinChield)  
    createObject(windowConfiguration.frames)
    setWindow(windowConfiguration);
    _form = unitElement.getForm();
    createFrames(windowConfiguration.frames)
    setUrlrelativeInButtons(windowConfiguration.button)
    createButtons(windowConfiguration.button)
    setEvents()
    consoleUi.set() 
}
function createFrames(frames:frame[]){
    frames?.forEach(frame => {
    _frameInFocu = frame 
    switch (frame.type) {
      case 'block':
        createFrameBlock(frame);
        break;
      case 'line':
          createFrameLine(frame);
          break;
      default:
        throw new Error(`Frame type "${frame.type}" is not allowed`); 
    }
  })
}
function createFrameBlock(frame:frame){
    const frameElement = unitElement.createFrame(frame)
    let sortFields = frame.fields!.sort(c => c.sequence);

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexWrap = "wrap";
    
    sortFields.forEach(field => {
        let f = createField(field); 
        div.appendChild(f)
    })
    frameElement.appendChild(div)
    _form.appendChild(frameElement)
}
function createFrameLine(frame:frame){
    const line =  unitElement.createFrame(frame)
    const table = document.createElement('table');
    table.classList.add("table-form")
    const header = prepareLineHeaderTable(frame.fields!);
    table.appendChild(header)
    const detail = prepareLineDetailTable(frame.fields!);
    table.appendChild(detail)
    line.appendChild(table)
    _form.appendChild(line)
}

function prepareLineHeaderTable(fields:Array<field>):HTMLTableSectionElement{
    let tr = document.createElement('tr');
    let thead = document.createElement('thead');
    thead.appendChild(tr);
    fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.description
        if(field.requerid == true){
        th.textContent = th.textContent
        th.append(unitElement.createSpanLabelIsRequerid().cloneNode(true))
        }
        unitElement.alignColumnOfTable(field,th)
        tr.appendChild(th)
    })
    return thead;
}
function prepareLineDetailTable(fields:Array<field>):HTMLTableSectionElement{
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.setAttribute('data-objecdto',_frameInFocu.objectDto)
    fields.forEach(field =>{
        const td = document.createElement('td');
        td.appendChild(createField(field));
        unitElement.alignColumnOfTable(field,td)
        tr.appendChild(td)
    })
    return tbody;
}
function createField(field:field):HTMLDivElement|HTMLSelectElement|HTMLInputElement{
  
    let element:HTMLSelectElement|HTMLInputElement
    let fieldStrategy:FieldStrategy = new FieldStrategy();
    checkTypeField(field.type)
    if(field.type == "text" || field.type == "number") fieldStrategy.setStrategy(new FieldCommon())
    if(field.type == "select") fieldStrategy.setStrategy(new FieldSelect())
    if(field.type == "checkbox") fieldStrategy.setStrategy(new FieldCheckbox())
    element = fieldStrategy.create(field);
    setEventListenerForInput(element)      
    unitElement.addAttributesSetAndName(element,_frameInFocu.type,_frameInFocu.objectDto,String(field.propertDto))
    setPropertDto(element);
    setDependency(element)
    if(_frameInFocu.type == "block"){
        const formGroup = unitElement.createGroupOfInput(field)
        formGroup.appendChild(element)
        return formGroup as HTMLDivElement
    }
    return element as HTMLSelectElement|HTMLInputElement
}
function checkTypeField(type: string){
    let types = ["text","number","select","checkbox"]
    if(types.indexOf(type) == -1)
        throw new Error(`Field type "${type}" is not allowed`);
}
function createButtons(buttons:button[],type:string="CRUD"){
    if(type == "CRUD"){
        prepareButtons(buttons)
    }
    eventButton(buttons)
}
function setUrlrelativeInButtons(buttons:button[],pathController:string = ""){
    buttons.map(b => {
        if(b.urlrelative == null || b.urlrelative == "") b.urlrelative = pathController;
    })
}

