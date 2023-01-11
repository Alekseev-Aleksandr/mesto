let profile = document.querySelector('.profile')
let popup = document.querySelector('.popup')

let infoTitle = profile.querySelector('.profile__info-title')
let infoSubtitle = profile.querySelector('.profile__info-subtitle')  

let profile__addButton = profile.querySelector('.profile__add-button')
let profile__infoButtonEdit = profile.querySelector('.profile__info-button-edit')
let popup__closeButton = popup.querySelector('.popup__close-button')
let popup__saveButton = popup.querySelector('.popup__save-button')

let popup__inputTitle = popup.querySelector('.popup__input_title_name')
let popup__inputSubtitle = popup.querySelector('.popup__input_subtitle_name')

popup__inputTitle.value = infoTitle.textContent
popup__inputSubtitle.value = infoSubtitle.textContent

const close = function() {
    popup.classList.remove('popup_opened');
}

const open = function() {
    popup.classList.add('popup_opened');
}

const save = function(evt) {
    evt.preventDefault()
    infoTitle.textContent = popup__inputTitle.value
    infoSubtitle.textContent = popup__inputSubtitle.value
    close()
}

popup__closeButton.addEventListener('click', close)
profile__infoButtonEdit.addEventListener('click', open)
popup.addEventListener('submit', save)