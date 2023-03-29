export class Section {

    constructor({ items, renderer }, selectorContainer) {
    this._intitialArray = items
        this._renderer = renderer
        this._container = document.querySelector(selectorContainer)
    }

    renderAllElement() {
        this._intitialArray.forEach(cardInfo => {
            this._renderer(cardInfo)
        });
    }

    addItem(domElement) { // ф-ция рендеринга одной карты 
        this._container.prepend(domElement);
    }
}
