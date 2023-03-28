import './index.css'

import { FormValidator } from '../components/Formvalidator.js';
import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import { initialCards, 
    configValidation,
    profileDom,
    inputTitlePopupProfileDom,
    inputSubtitlePopupProfileDom,
    } from '../utils/constants.js';
    
import { renderer, handleAddNewCard, handleCardClick, handleSaveProfileInfo } from '../utils/utils.js';

export const newSection = new Section({ items: initialCards, renderer }, '.photo-grid', handleCardClick)

export const formValidCard = new FormValidator(configValidation, '.add-card-form')
const formValidProfile = new FormValidator(configValidation, '.edit-profile-form')

export const userInfo = new UserInfo('.profile__info-title', '.profile__info-subtitle')

const popupWithFormAddCard = new PopupWithForm('.popup-add-card', handleAddNewCard)
const popupWithFormProfileInfo = new PopupWithForm('.popup-edit-profile', handleSaveProfileInfo)

const popupProfile = new Popup('.popup-edit-profile')
const popupAddCard = new Popup('.popup-add-card')

export const newPopupWithImage = new PopupWithImage('.popup-show-card-image')

newSection.renderAllElement()

formValidCard.enableValidation()
formValidProfile.enableValidation()

popupWithFormAddCard.setEventListeners()
popupWithFormProfileInfo.setEventListeners()

popupProfile.setEventListeners()
popupAddCard.setEventListeners()

newPopupWithImage.setEventListeners()

profileDom.querySelector('.profile__info-button-edit').addEventListener('click', (evt) => {
    inputTitlePopupProfileDom.value = userInfo.getUserInfo().userName
    inputSubtitlePopupProfileDom.value = userInfo.getUserInfo().userInfo
    popupProfile.open()
})

profileDom.querySelector('.profile__add-button').addEventListener('click', (evt) => {
    formValidCard.disableBtn()
    popupAddCard.open()
})