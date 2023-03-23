
export class FormValidator {

    constructor(settings, selector) {
        this._settings = settings
        this._selector = selector
    }

    _showInputError (formElement, inputElement, errorMessage) {  //показать оишибку  получаем инпут проверенный на валидацию
        const formError = formElement.querySelector(`.${inputElement.id}-error`)
    
        formError.textContent = errorMessage
        formError.classList.add(this._settings.activeErrorTextClass)
        inputElement.classList.add(this._settings.activeErrorBorderClass)
    }

    _hideInputError (formElement, inputElement) { //удалить ошибку
        const formError = formElement.querySelector(`.${inputElement.id}-error`)
        formError.classList.remove(this._settings.activeErrorTextClass)
        inputElement.classList.remove(this._settings.activeErrorBorderClass)
        formError.textContent = ''
    }

    _hasValidInputs (inputArr) {
        return inputArr.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputArr, btn) { //оплучает массив инпутов и кнопку
        if (this._hasValidInputs(inputArr)) { //если есть хоть 1 невалидный инпут
            btn.classList.remove(this._settings.activeBtnSubmitClass)
            btn.setAttribute('disabled', '')
        } else {
            btn.classList.add(this._settings.activeBtnSubmitClass)
            btn.removeAttribute('disabled', '')
        }
    }

    _isValid (formElement, inputElement) {    //проверка на валидность получает инпут и форму 

        if (inputElement.validity.valid) {
            this._hideInputError(formElement, inputElement, this._settings)
        }
        else {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, this._settings)
        }
    }

    _setListeners(formElement) { //установка обработчиков каждому инпуту
        const inputArr = Array.from(formElement.querySelectorAll(this._settings.inputSelector))

        inputArr.forEach((el) => { // el html инпута 
            el.addEventListener('input', () => {
                this._isValid(formElement, el)
                this._toggleButtonState(inputArr, formElement.querySelector(this._settings.submitBtnSelecor), this._settings)
            })
        })
    }

    enableValidation() {
        
        this._setListeners(document.querySelector(this._selector)) 
        
    }

}
