import { Card } from './Card.js';
import { FormValidator } from './Formvalidator.js';

const configValidation = {
    formSelector: '.popup__items',
    inputSelector: '.popup__input',
    submitBtnSelecor: '.popup__save-button',
    activeBtnSubmitClass: 'popup__save-button_active',
    activeErrorTextClass: 'popup__inputs-error_active',
    activeErrorBorderClass: 'popup__input_type_error',
}

const initialCards = [
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

const profile = document.querySelector('.profile')
const photoGrid = document.querySelector('.photo-grid');
// разметки попапов 
const popupProfile = document.querySelector('.popup-edit-profile')
const popupCardImage = document.querySelector('.popup-show-card-image')
const popupAddCard = document.querySelector('.popup-add-card')
// text value name/proffession
const infoTitle = profile.querySelector('.profile__info-title')
const infoSubtitle = profile.querySelector('.profile__info-subtitle')
//form
const formPopupProfile = popupProfile.querySelector('.edit-profile-form')
const formPopupAddCard = popupAddCard.querySelector('.add-card-form')
// inputs
const inputTitlePopupProfile = formPopupProfile.querySelector('.popup__input_type_firstname')
const inputSubtitlePopupProfile = formPopupProfile.querySelector('.popup__input_type_profession')
const inputTitlePopupAddCard = formPopupAddCard.querySelector('.popup__input_type_firstname');
const inputSubtitlePopupAddCard = formPopupAddCard.querySelector('.popup__input_type_profession');
// from full image 
const popupFullImage = document.querySelector('.popup__full-image')
const popupFullImageCapture = document.querySelector('.popup__full-image-capture')


const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupForPressEsc)
}

const closePopup = function (popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupForPressEsc)
}

const saveProfileInfo = function (evt) {
    evt.preventDefault()
    infoTitle.textContent = inputTitlePopupProfile.value
    infoSubtitle.textContent = inputSubtitlePopupProfile.value
    closePopup(popupProfile)
}

const addNewCard = function (evt) {
    evt.preventDefault()

    const link = inputSubtitlePopupAddCard.value;
    const name = inputTitlePopupAddCard.value;

    renderCard({ link, name }, '.template-card')

    evt.target.reset()
    formValidCard.disableBtn()
    // evt.submitter.classList.remove('popup__save-button_active');
    // evt.submitter.disabled = true;

    closePopup(popupAddCard)
}

const openPopupFullImage = function (link, name) {

    openPopup(popupCardImage)

    popupFullImage.src = link;// получаем картинку в большое изображение
    popupFullImage.alt = name
    popupFullImageCapture.textContent = name

}

function createCard(data, templateSelector){
    const newCard = new Card(data, templateSelector)

    return newCard
}

function renderCard(data, templateSelector) {
    photoGrid.prepend(createCard(data, templateSelector).generateCard())
}

const closePopupForPressEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened')
        closePopup(popup);
    }
}

const setListenersClose = () => {
    const popupsArr = document.querySelectorAll('.popup')
    popupsArr.forEach(popup => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup)
            } else if (evt.target.classList.contains('popup__close-button'))
                closePopup(popup)
        })
    })
}
// open popup
profile.querySelector('.profile__info-button-edit').addEventListener('click', (evt) => {
    inputTitlePopupProfile.value = infoTitle.textContent
    inputSubtitlePopupProfile.value = infoSubtitle.textContent
    openPopup(popupProfile)
})

profile.querySelector('.profile__add-button').addEventListener('click', (evt) => {
    formValidCard.disableBtn()
    openPopup(popupAddCard)
})

// save popup
formPopupProfile.addEventListener('submit', saveProfileInfo)
formPopupAddCard.addEventListener('submit', addNewCard);
setListenersClose()

initialCards.forEach(newCardProp => {
    renderCard(newCardProp, '.template-card')
})

const formValidProfile = new FormValidator(configValidation, '.edit-profile-form')
formValidProfile.enableValidation()

const formValidCard = new FormValidator(configValidation, '.add-card-form')
formValidCard.enableValidation()

export { openPopup, popupCardImage, renderCard, openPopupFullImage }