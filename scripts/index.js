let profile = document.querySelector('.profile')
let popup = document.querySelector('.popup')

let infoTitle = profile.querySelector('.profile__info-title')
let infoSubtitle = profile.querySelector('.profile__info-subtitle')
let profileInfoButtonEdit = profile.querySelector('.profile__info-button-edit')

// let popupSaveButton = popup.querySelector('.popup__save-button')

let form = popup.querySelector('.popup__items')
let popupCloseButton = popup.querySelector('.popup__close-button')
let popupInputTitle = form.querySelector('.popup__input_type_firstname')
let popupInputSubtitle = form.querySelector('.popup__input_type_profession')

const close = function () {
    popup.classList.remove('popup_opened');
}

const open = function () {
    popupInputTitle.value = infoTitle.textContent
    popupInputSubtitle.value = infoSubtitle.textContent
    popup.classList.add('popup_opened');
}

const save = function (evt) {
    evt.preventDefault()
    infoTitle.textContent = popupInputTitle.value
    infoSubtitle.textContent = popupInputSubtitle.value
    close()
}

popupCloseButton.addEventListener('click', close)
profileInfoButtonEdit.addEventListener('click', open)
form.addEventListener('submit', save)