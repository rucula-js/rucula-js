import { frame } from "../../entities/form/frame";

export function createFrame(frame:frame){
    const div = document.createElement('div');
    if (frame.type == "block")div.classList.add("quadro-block")
    if (frame.type == "line")div.classList.add('quadro-list')
    div.setAttribute('data-objectDto',frame.objectDto)
    const h5 = document.createElement('h5');
    h5.textContent = frame.name
    div.appendChild(h5)
    return div
}