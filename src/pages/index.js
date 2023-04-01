import './index.css'

import { FormValidator } from '../components/Formvalidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js'

import {
    configValidation,
    profileDom,
} from '../utils/constants.js';

import { renderer, handleAddNewCard, handleSaveProfileInfo, handleEditAvatar, rerenderAllCardsInPage } from '../utils/utils.js';

import { PopupConfirm } from '../components/PopupConfirm';

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: 'f2a9a4e2-fdf5-42ce-aab3-69e2f1a13e71',
        'Content-Type': 'application/json'
    }
})

export const newSection = new Section(renderer, '.photo-grid')
export const userInfo = new UserInfo('.profile__info-title', '.profile__info-subtitle', '.profile__avatar-image')

export const popupWithFormProfileInfo = new PopupWithForm('.popup-edit-profile', handleSaveProfileInfo)
const popupWithFormAddCard = new PopupWithForm('.popup-add-card', handleAddNewCard)
const popupWithFormEditAvatar = new PopupWithForm('.popup-edit-avatar', handleEditAvatar)

popupWithFormProfileInfo.setEventListeners(api.editProfileInfo.bind(api))
popupWithFormAddCard.setEventListeners(api.addNewCard.bind(api))
popupWithFormEditAvatar.setEventListeners(api.editAvatar.bind(api))

export const newPopupWithImage = new PopupWithImage('.popup-show-card-image')
export const popupConfirmDelete = new PopupConfirm('.popup-confirm', api.deleteCard.bind(api), rerenderAllCardsInPage)
popupConfirmDelete.setEventListeners()
newPopupWithImage.setEventListeners()

export const formValidCard = new FormValidator(configValidation, '.add-card-form')
const formValidProfile = new FormValidator(configValidation, '.edit-profile-form')
const formValidEditAvatar = new FormValidator(configValidation, '.edit-avatar')
formValidProfile.enableValidation()
formValidCard.enableValidation()
formValidEditAvatar.enableValidation()

//__________________________________________________________________
export let userId = ''
const fullUserInfo = api.getUserInfo()

fullUserInfo.then(data => {
    userInfo.setUserInfo(data.name, data.about)
    userInfo.setAvatar(data.avatar)
})
    .catch(err => console.log(err))

const getInitialCards = api.getInitialCards()
getInitialCards.then(data => { return data })
    .catch(err => console.log(err))

Promise.all([fullUserInfo, getInitialCards])
    .then((results) => {
        newSection.renderAllElement(results[1], results[0]._id)
        userId = results[0]._id
    })
    .catch(err => console.log(err))

profileDom.querySelector('.profile__button_type_edit-info').addEventListener('click', (evt) => {
    popupWithFormProfileInfo.setInputValues(userInfo.getUserInfo())
    popupWithFormProfileInfo.open()
})

profileDom.querySelector('.profile__button_type_add-card').addEventListener('click', (evt) => {
    formValidCard.disableBtn()
    popupWithFormAddCard.open()
})

profileDom.querySelector('.profile__button_type_edit-avatar').addEventListener('click', (evt) => {
    formValidEditAvatar.disableBtn()
    popupWithFormEditAvatar.open()
})

