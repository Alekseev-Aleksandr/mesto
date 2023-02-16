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
//template card
const templateCard = document.querySelector('.template-card').content;
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
const popupFullImage = popupCardImage.querySelector('.popup__full-image')
const popupFullImageCapture = popupCardImage.querySelector('.popup__full-image-capture')

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

    const nameCard = inputTitlePopupAddCard.value;
    const linkCard = inputSubtitlePopupAddCard.value;

    renderCard(createCard(nameCard, linkCard))

    evt.target.reset()
    evt.submitter.classList.remove('popup__save-button_active');
    evt.submitter.setAttribute('disabled', '');

    closePopup(popupAddCard)
}

const createCard = function (cardName, cardLink) {
    const newCard = templateCard.querySelector('.card').cloneNode(true);
    // наполяем карточку 
    newCard.querySelector('.card__capture').textContent = cardName
    newCard.querySelector('.card__image').src = cardLink
    newCard.querySelector('.card__image').alt = 'Фото пользователя'

    newCard.querySelector('.card__trash-button').addEventListener('click', () => {
        newCard.querySelector('.card__trash-button').closest('.card').remove()
    }) // delete card

    newCard.querySelector('.card__like-button').addEventListener('click', () => {
        newCard.querySelector('.card__like-button').classList.toggle('card__like-button_active')
    }) // active like

    // добавляем возможность  получить большую картинку по клику
    newCard.querySelector('.card__image').addEventListener('click', (evt) => {
        openPopup(popupCardImage)
        popupFullImage.src = evt.target.src;// получаем картинку в большое изображение
        popupFullImage.alt = evt.target.closest('.card').querySelector('.card__capture').textContent
        popupFullImageCapture.textContent = evt.target.closest('.card').querySelector('.card__capture').textContent// получаем подпись картинки
    })

    return newCard
}
//----- отрисовка по массиву из 6 карт при загрузке 
function renderCards(arr) {
    arr.forEach(item => {
        renderCard(createCard(item.name, item.link))
    })
}

function renderCard(card) {
    photoGrid.prepend(card)
}
// closed popup press esc and click on overlay
const closePopupForClickOverlay = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
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
            }
            if (evt.target.classList.contains('popup__close-button'))
                closePopup(popup)
        })
    })
}

const setDisabledBtn = (popup) => {
    const inputPopupFirstname = (popup.querySelector('.popup__input_type_firstname'))
    const inputPopupProfession = (popup.querySelector('.popup__input_type_profession'))
    if (inputPopupFirstname.value === "" || inputPopupProfession.value === "") {
        popup.querySelector('.popup__save-button').setAttribute('disabled', '')
    }
}

// open popup
profile.querySelector('.profile__info-button-edit').addEventListener('click', (evt) => {
    inputTitlePopupProfile.value = infoTitle.textContent
    inputSubtitlePopupProfile.value = infoSubtitle.textContent
    openPopup(popupProfile)
})

profile.querySelector('.profile__add-button').addEventListener('click', (evt) => {
    setDisabledBtn(popupAddCard)
    openPopup(popupAddCard)
})

// save popup
formPopupProfile.addEventListener('submit', saveProfileInfo)
formPopupAddCard.addEventListener('submit', addNewCard);

setListenersClose()
renderCards(initialCards)
