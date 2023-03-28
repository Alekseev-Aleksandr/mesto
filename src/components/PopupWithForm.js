import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(selectorPopup, submitForm) {
        super(selectorPopup)
        this._submitForm = submitForm
        this._inputName = this._popup.querySelector('.popup__input_type_firstname');
        this._inputLink = this._popup.querySelector('.popup__input_type_profession');
        this._form = this._popup.querySelector('.popup__items')

    }

    _getInputValues = () => {
        const firstName = this._inputName.value
        const profession = this._inputLink.value
        return ({ firstName: firstName, profession: profession })
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues())
            this.close()
        })
    }

    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
        this._form.reset()
    }
}