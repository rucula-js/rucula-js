import  * as unitElement from './ElementsForm'
describe('ObjectsDOMBaseService',() => {
  
  it('#LabelIsRequerid should return HTMLSpanElement', () => {
    expect(unitElement.createSpanLabelIsRequerid().outerHTML)
    .toEqual('<span style="color: red;">*</span>')
  });
  it('#createFieldTypeInputBasic should return HTMLInputElement type input', () => {
    let DOMQuadro = unitElement.createFieldTypeInputBasic
    ({
        propertDto: "window",
        description: "Code",
        information: "",
        type: "text",
        maxLength: 10,
        max: 0,
        min: 0,
        requerid: true,
        disable: false,
        sequence: 4,
        id: "1565165"
      });
    expect(DOMQuadro.outerHTML)
    .toEqual(`<input type="text" class="form-control" style="width: 100px;">`)
  });
  it('#createFieldCheckbox should return HTMLInputElement type checkbox', () => {
    let DOMQuadro = unitElement.createFieldCheckbox
    ({
      propertDto: "check teste",
      description: "Code",
      information: "",
      type: "checkbox",
      maxLength: 10,
      max: 0,
      min: 0,
      requerid: true,
      disable: false,
      sequence: 4,
      id: "1565165"
    },);
    expect(DOMQuadro.outerHTML)
    .toEqual(`<input type="checkbox" value="off">`)
  });
  it('#createFieldTypeInputBasic should return HTMLInputElement type select (combobox)', () => {
    let DOMQuadro = unitElement.createFieldSelect
    ({
      id: "ewfffe",
      propertDto: "type",
      description: "type",
      information:"",
      type: "select",
      combo: [
        {
          value: "text",
          representation: "text"
        },
        {
          value: "number",
          representation: "number"
        },
        {
          value: "select",
          representation: "select"
        },
        {
          value: "check",
          representation: "check"
        },
        {
          value: "radio",
          representation: "radio"
        }
      ] as any,
      maxLength: 10,
      max: 0,
      min: 0,
      requerid: true,
      disable: false,
      sequence: 5
    },);
    expect(DOMQuadro.outerHTML)
    .toEqual(`<select maxlength="10"><option value="text">text</option><option value="number">number</option><option value="select">select</option><option value="check">check</option><option value="radio">radio</option></select>`)
  });
  it('#createFrame should return HTMLDivElement type block', () => {
    expect(unitElement.createFrame
    (
      {
        "name": "Frame",
        "type": "block",
        "objectDto": "frame",
        "sequence": 0,
        "fields": [],
        "id": "18544"
      }
    ).outerHTML)
    .toEqual('<div class="quadro-block" data-objectdto="frame"><h4>Frame</h4></div>')
  });
  it('#createFrame should return HTMLDivElement type line', () => {
    expect(unitElement.createFrame
    (
      {
        "name":"frames",
        "type": "line",
        "objectDto": "frame",
        "sequence": 0,
        "fields": [],
        "id": "18544"
      }
    ).outerHTML)
    .toEqual('<div class="quadro-list" data-objectdto="frame"><h4>Frame</h4></div>')
  });
  it('#createGroupOfInput should return HTMLDivElement ', () => {
    expect(unitElement.createGroupOfInput
      ({
        propertDto: "window",
        description: "Code",
        information: "",
        type: "text",
        maxLength: 10,
        max: 0,
        min: 0,
        requerid: true,
        disable: false,
        sequence: 4,
        id: "1565165"
      }).outerHTML)
    .toEqual('<div class="form-group-item"><label for="1565165">Code<span style="color: red;">*</span></label></div>')
  });
} )