export class FormValidator {

    constructor(settings, selector) {
        this._settings = settings
        this._selector = selector
    }

    _showInputError(inputElement, errorMessage) {  //показать оишибку  получаем инпут проверенный на валидацию
        const formError = this._formElement.querySelector(`.${inputElement.id}-error`)

        formError.textContent = errorMessage
        formError.classList.add(this._settings.activeErrorTextClass)
        inputElement.classList.add(this._settings.activeErrorBorderClass)
    }

    _hideInputError(inputElement) { //удалить ошибку
        const formError = this._formElement.querySelector(`.${inputElement.id}-error`)
        formError.classList.remove(this._settings.activeErrorTextClass)
        inputElement.classList.remove(this._settings.activeErrorBorderClass)
        formError.textContent = ''
    }

    _hasValidInputs() {
        return this._inputArr.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() { //оплучает массив инпутов и кнопку
        if (this._hasValidInputs(this._inputArr)) { //если есть хоть 1 невалидный инпут
            this.disableBtn()
        } else {
            this._activeBtn()
        }
    }


    _isValid(inputElement) {    //проверка на валидность получает инпут и форму 

        if (inputElement.validity.valid) {
            this._hideInputError(inputElement)
        }
        else {
            this._showInputError(inputElement, inputElement.validationMessage)
        }
    }

    _setListeners() { //установка обработчиков каждому инпуту

        this._inputArr.forEach((el) => { // el html инпута 
            el.addEventListener('input', () => {
                this._isValid(el)
                this._toggleButtonState()
            })
        })
    }

    _activeBtn() {
        this._btnSave.classList.add(this._settings.activeBtnSubmitClass)
        this._btnSave.disabled = false
    }

    disableBtn() {
        this._btnSave.classList.remove(this._settings.activeBtnSubmitClass)
        this._btnSave.disabled = true
    }

    enableValidation() {
        this._formElement = document.querySelector(this._selector)
        this._inputArr = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))
        this._btnSave = this._formElement.querySelector(this._settings.submitBtnSelecor)

        this._setListeners()

    }

}
