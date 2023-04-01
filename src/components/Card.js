
export class Card {

    constructor(data, userId, templateSelector, callBackList) {

        this._templateSelector = templateSelector
        this._linkImage = data.link
        this._name = data.name
        this._likes = data.likes
        this._cardId = data._id
        this._ownerId = data.owner._id
        this._userId = userId
        this._handleCardTrashClick = callBackList.handleCardTrashClick
        this._handleCardClick = callBackList.handleCardClick
        this._callBackAddLikeCard = callBackList.handleAddLikeCard
        this._callBackRemoveLikeCard = callBackList.handleRemoveLikeCard

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
        if (this._elementLike.classList.contains('card__like-button_active')) this.rerenderCountLikes(this._callBackRemoveLikeCard)
        else this.rerenderCountLikes(this._callBackAddLikeCard)
    }

    _handleImageClick() {
        this._handleCardClick(this._linkImage, this._name)
    }

    _setListeners() { // установка всех обработчиков 
        if (this._elementTrush) {
            this._elementTrush.addEventListener('click', () => { this._handleCardTrashClick(this._cardId) })
        }

        this._elementLike.addEventListener('click', this._toggleLike.bind(this))
        this._elementImage.addEventListener('click', this._handleImageClick.bind(this))
    }

    _setTrashBtn() {
        if (this._ownerId !== this._userId) {
            this._element.removeChild(this._elementTrush)
        }
    }

    rerenderCountLikes(callBackrenderLikes) {
        callBackrenderLikes(this._cardId)
            .then(res => {
                this._likeCount.textContent = res.likes.length
                this._elementLike.classList.toggle('card__like-button_active')
            })
            .catch(err =>{ 
                console.log(err);
            })
    }

    _setLikesBtnState() {
        this._likes.forEach(userInfo => {

            if (userInfo._id === this._userId) {
                this._elementLike.classList.toggle('card__like-button_active')

            }
        });

    }

    generateCard() { // записать в разметку данные 
        this._element = this._getTemplate()
        this._elementImage = this._element.querySelector('.card__image')
        this._elementLike = this._element.querySelector('.card__like-button')
        this._likeCount = this._element.querySelector('.card__count-likes')
        this._elementTrush = this._element.querySelector('.card__trash-button')
        this._element.querySelector('.card__capture').textContent = this._name

        this._elementImage.src = this._linkImage
        this._elementImage.alt = this._name
        this._likeCount.textContent = this._likes.length

        this._setLikesBtnState()
        this._setTrashBtn()
        this._setListeners()

        return this._element
    }
}


