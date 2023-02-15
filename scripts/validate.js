const config = {
    formSelector : '.popup__items',
    inputSelector : '.popup__input',
    submitBtnSelecor : '.popup__save-button',
    activeBtnSubmitClass : 'popup__save-button_active',
    activeErrorTextClass : 'popup__inputs-error_active',
    activeErrorBorderClass : 'popup__input_type_error', 
}   

const showInputError = (formElement, inputElement, errorMessage) => {  //показать оишибку  получаем инпут проверенный на валидацию
    const formError = formElement.querySelector(`.${inputElement.id}-error`)

    formError.textContent = inputElement.validationMessage
    formError.classList.add(config.activeErrorTextClass)
    inputElement.classList.add(config.activeErrorBorderClass)
}

const hideInputError = (formElement, inputElement) => { //удалить ошибку
    const formError = formElement.querySelector(`.${inputElement.id}-error`)
    formError.classList.remove(config.activeErrorTextClass)
    inputElement.classList.remove(config.activeErrorBorderClass)
    formError.textContent = ''
}

const isValid = (formElement, inputElement) => {    //проверка на валидность получает инпут и форму 

    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement)
    }
    else {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    }
}

const setListeners = (formElement) => { //установка обработчиков каждому инпуту
    const inputArr = Array.from(formElement.querySelectorAll(config.inputSelector))

    inputArr.forEach((el) => {
        el.addEventListener('input', () => {
            isValid(formElement, el)
            toggleButtonState(inputArr, formElement.querySelector(config.submitBtnSelecor))
        })
    })
}

const hasValidInputs = (inputArr) => {
    return inputArr.some((inputElement) => {
         return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputArr, btn) => { //оплучает массив инпутов и кнопку
    if (hasValidInputs(inputArr)) { //если есть хоть 1 невалидный инпут
        btn.classList.remove(config.activeBtnSubmitClass)
        btn.setAttribute('disabled','')
    } else {
        btn.classList.add(config.activeBtnSubmitClass)
        btn.removeAttribute('disabled','')
    }
}

const enableValidation = (config) => {
    const formsArr = Array.from(document.querySelectorAll(config.formSelector))
    formsArr.forEach((formElement) => {
        setListeners(formElement)
    })
}

enableValidation(config)
