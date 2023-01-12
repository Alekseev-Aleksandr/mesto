let profile = document.querySelector('.profile')
let popup = document.querySelector('.popup')

let infoTitle = profile.querySelector('.profile__info-title')
let infoSubtitle = profile.querySelector('.profile__info-subtitle')  

let profileInfoButtonEdit = profile.querySelector('.profile__info-button-edit')
let popupCloseButton = popup.querySelector('.popup__close-button')
// let popupSaveButton = popup.querySelector('.popup__save-button')

let popupInputTitle = popup.querySelector('.popup__input_title_name')
let popupInputSubtitle = popup.querySelector('.popup__input_subtitle_name')

popupInputTitle.value = infoTitle.textContent
popupInputSubtitle.value = infoSubtitle.textContent

const close = function() {
    popup.classList.remove('popup_opened');
}

const open = function() {
    popup.classList.add('popup_opened');
}

const save = function(evt) {
    evt.preventDefault()
    infoTitle.textContent = popupInputTitle.value
    infoSubtitle.textContent = popupInputSubtitle.value
    close()
}

popupCloseButton.addEventListener('click', close)
profileInfoButtonEdit.addEventListener('click', open)
popup.addEventListener('submit', save)