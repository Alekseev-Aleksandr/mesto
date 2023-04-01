import { Api } from "../components/Api";

export const configValidation = {
    formSelector: '.popup__items',
    inputSelector: '.popup__input',
    submitBtnSelecor: '.popup__button_type_save',
    activeBtnSubmitClass: 'popup__button_active',
    activeErrorTextClass: 'popup__inputs-error_active',
    activeErrorBorderClass: 'popup__input_type_error',
}

export const profileDom = document.querySelector('.profile')

export const popupProfileDom = document.querySelector('.popup-edit-profile')

export const formPopupProfileDom = popupProfileDom.querySelector('.edit-profile-form')

