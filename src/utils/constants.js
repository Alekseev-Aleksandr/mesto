export const configValidation = {
    formSelector: '.popup__items',
    inputSelector: '.popup__input',
    submitBtnSelecor: '.popup__save-button',
    activeBtnSubmitClass: 'popup__save-button_active',
    activeErrorTextClass: 'popup__inputs-error_active',
    activeErrorBorderClass: 'popup__input_type_error',
}

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const profileDom = document.querySelector('.profile')

export const popupProfileDom = document.querySelector('.popup-edit-profile')

export const formPopupProfileDom = popupProfileDom.querySelector('.edit-profile-form')

export const inputTitlePopupProfileDom = formPopupProfileDom.querySelector('.popup__input_type_firstname')
export const inputSubtitlePopupProfileDom = formPopupProfileDom.querySelector('.popup__input_type_profession')

