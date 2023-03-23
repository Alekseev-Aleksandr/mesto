import { openPopup, popupCardImage } from "./index.js"

export class Card {

    constructor(linkImage, text, selector) {
        this._linkImage = linkImage
        this._text = text
        this._selector = selector
    }

    _getTemplate() { // получаем разметку шаблона карточки
        const cardElement = document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true)

        return cardElement
    }
    _setListenerBtnDelete() {
        this._element.querySelector('.card__trash-button').addEventListener('click', () => { //обработчик на удаление 
            this._element.querySelector('.card__trash-button').closest('.card').remove()
        })
    }
    _setListenerBtnLike() {
        this._element.querySelector('.card__like-button').addEventListener('click', (evt) => { // обработчик лайка
            this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
        })
    }
    _setListenerFullImage() {
        this._popupFullImage = document.querySelector('.popup__full-image')
        this._popupFullImageCapture = document.querySelector('.popup__full-image-capture')

        this._element.querySelector('.card__image').addEventListener('click', (evt) => { // обработчик нажатия на картинку
            openPopup(popupCardImage)
            this._popupFullImage.src = evt.target.src;// получаем картинку в большое изображение
            this._popupFullImage.alt = evt.target.closest('.card').querySelector('.card__capture').textContent
            this._popupFullImageCapture.textContent = evt.target.closest('.card').querySelector('.card__capture').textContent
        })
    }

    _setListeners() { // установка всех обработчиков 
        this._setListenerBtnDelete()
        this._setListenerBtnLike()
        this._setListenerFullImage()
    }

    generateCardes() { // записать в разметку данные 
        this._element = this._getTemplate()

        this._element.querySelector('.card__capture').textContent = this._text
        this._element.querySelector('.card__image').src = this._linkImage
        this._element.querySelector('.card__image').alt = 'Фото пользователя'

        this._setListeners()

        return this._element
    }
}


