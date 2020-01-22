function getPath(htmlElement) {
    console.log(htmlElement instanceof HTMLElement);
    if (!(htmlElement instanceof HTMLElement))
        return null;
    let elementId = htmlElement.getAttribute("id");
    if (elementId != null)
        return `#${elementId}`;
    let currentElement = htmlElement;
    let selectorArray = [];
    while (currentElement.parentElement != null) {
        let parentElement = currentElement.parentElement;
        let parentElementId = parentElement.getAttribute("id")
        if (parentElementId != null) {
            selectorArray.push(`#${parentElementId}`);
            break;
        }
        let currentElementIndex = Array.from(parentElement.children).indexOf(currentElement);
        selectorArray.push(`${currentElement.nodeName.toLowerCase()}:nth-child(${currentElementIndex + 1})`);
        currentElement = parentElement;
    }
    return selectorArray.reverse().join(' > ');
}