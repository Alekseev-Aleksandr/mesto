import { api } from "../pages/index.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(selectorPopup, submitForm) {
        super(selectorPopup)
        this._api = api
        this._submitForm = submitForm
        this._inputName = this._popup.querySelector('.popup__input_type_firstname');
        this._inputLink = this._popup.querySelector('.popup__input_type_profession');
        this._form = this._popup.querySelector('.popup__items')
        this._inputList = this._form.querySelectorAll('.popup__input')
        this._buttonFrom = this._form.querySelector('.popup__button')

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

    setEventListeners(pushDataServerCallBack) {
        super.setEventListeners()

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            pushDataServerCallBack(this._getInputValues(),this._buttonFrom)

                .then((res) => {
                    this._submitForm(res)
                })
                .then(() => {
                    this.close()
                })
                .catch((res) => {
                    console.log(res);
                })
        })
    }

    close() {
        super.close()
        this._buttonFrom.textContent = "Сохранить"
        this._form.reset()
    }
}