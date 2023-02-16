const config = {
    formSelector : '.popup__items',
    inputSelector : '.popup__input',
    submitBtnSelecor : '.popup__save-button',
    activeBtnSubmitClass : 'popup__save-button_active',
    activeErrorTextClass : 'popup__inputs-error_active',
    activeErrorBorderClass : 'popup__input_type_error', 
}   

const showInputError = (formElement, inputElement, errorMessage, settings) => {  //показать оишибку  получаем инпут проверенный на валидацию
    const formError = formElement.querySelector(`.${inputElement.id}-error`)

    formError.textContent = errorMessage
    formError.classList.add(settings.activeErrorTextClass)
    inputElement.classList.add(settings.activeErrorBorderClass)
}

const hideInputError = (formElement, inputElement, settings) => { //удалить ошибку
    const formError = formElement.querySelector(`.${inputElement.id}-error`)
    formError.classList.remove(settings.activeErrorTextClass)
    inputElement.classList.remove(settings.activeErrorBorderClass)
    formError.textContent = ''
}

const isValid = (formElement, inputElement, settings) => {    //проверка на валидность получает инпут и форму 

    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, settings)
    }
    else {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings)
    }
}

const setListeners = (formElement, settings) => { //установка обработчиков каждому инпуту
    const inputArr = Array.from(formElement.querySelectorAll(settings.inputSelector))

    inputArr.forEach((el) => {
        el.addEventListener('input', () => {
            isValid(formElement, el, settings)
            toggleButtonState(inputArr, formElement.querySelector(settings.submitBtnSelecor), settings)
        })
    })
}

const hasValidInputs = (inputArr) => {
    return inputArr.some((inputElement) => {
         return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputArr, btn, settings) => { //оплучает массив инпутов и кнопку
    if (hasValidInputs(inputArr)) { //если есть хоть 1 невалидный инпут
        btn.classList.remove(settings.activeBtnSubmitClass)
        btn.setAttribute('disabled','')
    } else {
        btn.classList.add(settings.activeBtnSubmitClass)
        btn.removeAttribute('disabled','')
    }
}

const enableValidation = (settings) => {
    const formsArr = Array.from(document.querySelectorAll(settings.formSelector))
    formsArr.forEach((formElement) => {
        setListeners(formElement, settings)
    })
}

enableValidation(config)
