
export class Section {

    constructor(renderer , selectorContainer) {
        this._renderer = renderer
        this._container = document.querySelector(selectorContainer)
    }

    renderAllElement(initaialArray, userId) {
        this._clearSection()
        this._intitialArray = initaialArray
        this._intitialArray.forEach(cardInfo => {
            this._renderer(cardInfo, userId)
        });
    }

    addItem(domElement) { // ф-ция рендеринга одной карты 
        this._container.append(domElement);
    }

    _clearSection(){
        const arrForDelete = this._container.querySelectorAll('.card')
        arrForDelete.forEach(el => {el.remove()})
    }
}
