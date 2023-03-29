import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(selectorPopup, submitForm) {
        super(selectorPopup)
        this._submitForm = submitForm
        this._inputName = this._popup.querySelector('.popup__input_type_firstname');
        this._inputLink = this._popup.querySelector('.popup__input_type_profession');
        this._form = this._popup.querySelector('.popup__items')
        this._inputList = this._form.querySelectorAll('.popup__input')
    }

    _getInputValues = () => {
        this._formValues = {}

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value
        })

        return (this._formValues)
    }

    setInputValues(dataInputs) {
        this._inputName.value = dataInputs.userName
        this._inputLink.value = dataInputs.userInfo
    }

    setEventListeners() {
        super.setEventListeners()

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues())
            this.close()
        })
    }

    close() {
        super.close()
        
        this._form.reset()
    }
}