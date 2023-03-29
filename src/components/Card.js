
export class Card {

    constructor(data, templateSelector, handleCardClick) {
        this._linkImage = data.link
        this._name = data.name
        this._templateSelector = templateSelector
        this._handleCardClick = handleCardClick
    }

    _getTemplate() { // получаем разметку шаблона карточки
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true)

        return cardElement
    }

    _deleteCard() {
        this._element.remove()
        this._element = null
    }

    _toggleLike() {
        this._elementLike.classList.toggle('card__like-button_active')
    }

    _handleImageClick() {
        this._handleCardClick(this._linkImage, this._name)
    }

    _setListeners() { // установка всех обработчиков 
        this._element.querySelector('.card__trash-button').addEventListener('click', this._deleteCard.bind(this))//обработчик на удаление 
        this._elementLike.addEventListener('click', this._toggleLike.bind(this))
        this._elementImage.addEventListener('click', this._handleImageClick.bind(this))
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


