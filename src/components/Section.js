
export class Section {

    constructor(renderer , selectorContainer, api) {
        this._api = api
        this._renderer = renderer
        this._container = document.querySelector(selectorContainer)
    }

    renderAllElement(initaialArray, userId) {
        this._intitialArray = initaialArray
        this._intitialArray.forEach(cardInfo => {
            this._renderer(cardInfo, userId)
        });
    }

    addItem(domElement) { // ф-ция рендеринга одной карты 
        this._container.append(domElement);
    }

    updateSection (userId) {
        return this._api.getInitialCards()
            .then(res => {
                this._clearSection()
                this.renderAllElement(res, userId)
            })
            .catch(err =>{ 
                console.log(err);
            })
        
    }

    _clearSection(){
        const arrForDelete = this._container.querySelectorAll('.card')
        arrForDelete.forEach(el => {el.remove()})
    }
}
