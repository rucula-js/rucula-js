export function createTitle(title: string): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add('r-w-t');
    const h2 = document.createElement("h2");
    h2.textContent = title;
    div.appendChild(h2)
    return div;
}