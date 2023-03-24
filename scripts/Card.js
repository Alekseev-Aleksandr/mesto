import { openPopupFullImage } from "./index.js"

export class Card {

    constructor(data, templateSelector) {
        this._linkImage = data.link
        this._name = data.name
        this._templateSelector = templateSelector
    }

    _getTemplate() { // получаем разметку шаблона карточки
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true)

        return cardElement
    }

    _setListenerBtnDelete() {
        this._element.querySelector('.card__trash-button').addEventListener('click', () => { //обработчик на удаление 
            this._element.remove()
            this._element = null
        })
    }

    _setListenerBtnLike() {
       this._elementLike.addEventListener('click', (evt) => { // обработчик лайка
            this._elementLike.classList.toggle('card__like-button_active')
        })
    }

    _setListenerFullImage() {
        this._elementImage.addEventListener('click', () => openPopupFullImage(this._linkImage, this._name)) // обработчик нажатия на картинку
    }

    _setListeners() { // установка всех обработчиков 
        this._setListenerBtnDelete()
        this._setListenerBtnLike()
        this._setListenerFullImage()
    }

    generateCard() { // записать в разметку данные 
        this._element = this._getTemplate()
        this._elementImage = this._element.querySelector('.card__image')
        this._elementLike = this._element.querySelector('.card__like-button')

        this._element.querySelector('.card__capture').textContent = this._name
        this._elementImage.src = this._linkImage
        this._elementImage.alt = this._name

        this._setListeners()

        return this._element
    }
}


