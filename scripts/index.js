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
const popup = document.querySelector('.popup')

const infoTitle = profile.querySelector('.profile__info-title')
const infoSubtitle = profile.querySelector('.profile__info-subtitle')
const profileInfoButtonEdit = profile.querySelector('.profile__info-button-edit')

const form = popup.querySelector('.edit-profile-form')
const popupCloseButton = popup.querySelector('.popup__close-button')
const popupInputTitle = form.querySelector('.popup__input_type_firstname')
const popupInputSubtitle = form.querySelector('.popup__input_type_profession')

const close = function (popupName) {
    if (popupName === 'edit-profile') {
        popup.classList.remove('popup_opened');
    }
    else if (popupName === 'add-button') {
        popupAddCard.classList.remove('popup_opened');
    }
    else if (popupName === 'fullImage') {
        popupCardImage.classList.remove('popup_opened');
    }
}

const open = function (popupName) {
    if (popupName === 'edit-profile') {
        popupInputTitle.value = infoTitle.textContent
        popupInputSubtitle.value = infoSubtitle.textContent
        popup.classList.add('popup_opened');
    }
    else if (popupName === 'add-button') {
        popupAddCard.querySelector('.popup__input_type_firstname').value = 'Название'
        popupAddCard.querySelector('.popup__input_type_profession').value = 'Ссылка на картинку'
        popupAddCard.classList.add('popup_opened');
    }
    else if (popupName === 'fullImage') {
        popupCardImage.classList.add('popup_opened');        
    }
}

const save = function (evt, popupName) {
    evt = evt || window.event;

    if (popupName === 'edit-profile') {

        evt.preventDefault()
        infoTitle.textContent = popupInputTitle.value
        infoSubtitle.textContent = popupInputSubtitle.value
        close('edit-profile')
    }
    else if (popupName === 'add-button') {

        evt.preventDefault()
        const nameCard = popupAddCard.querySelector('.popup__input_type_firstname').value;
        const linkCard = popupAddCard.querySelector('.popup__input_type_profession').value;

        initialCards.push({ name: nameCard, link: linkCard })

        renderCard(nameCard, linkCard)
        close('add-button')
    }
}

popup.querySelector('.popup__close-button').addEventListener('click', () => close('edit-profile'))
profile.querySelector('.profile__info-button-edit').addEventListener('click', () => open('edit-profile'))
form.addEventListener('submit', () => save('', 'edit-profile'))

//----- отрисовка по массиву из 6 карт при загрузке 
function renderCards(arr) {

    arr.forEach(item => {
        renderCard(item.name, item.link)
    })
}

function renderCard(cardName, cardLink) {//рендер одной карточки 

    const photoGrid = document.querySelector('.photo-grid');
    const templateCard = document.querySelector('.template-card').content;
    const newCard = templateCard.querySelector('.card').cloneNode(true);

    newCard.querySelector('.card__image').src = cardLink
    newCard.querySelector('.card__image').alt = 'Фото пользователя'
    
    newCard.querySelector('.card__image').addEventListener('click', (evt) => {
        open('fullImage')
        popupCardImage.querySelector('.popup__full-image').src = evt.target.src;// получаем картинку в большое изображение
        popupCardImage.querySelector('.popup__full-image-capture').textContent = evt.target.nextElementSibling.textContent// получаем подпись картинки 

    })

    newCard.querySelector('.card__capture').textContent = cardName
    newCard.querySelector('.card__trash-button').addEventListener('click', () => {newCard.querySelector('.card__trash-button').parentElement.remove()})// delete card
    newCard.querySelector('.card__like-button').addEventListener('click', () => {newCard.querySelector('.card__like-button').classList.toggle('card__like-button_active')})// active like

    photoGrid.prepend(newCard);
}

renderCards(initialCards)

const popupAddCard = document.querySelector('.add-card')

popupAddCard.querySelector('.popup__close-button').addEventListener('click', () => close('add-button'))
profile.querySelector('.profile__add-button').addEventListener('click', () => open('add-button'))
popupAddCard.querySelector('.add-card-form').addEventListener('submit', () => save('', 'add-button'));

const popupCardImage = document.querySelector('.show-card-image')
popupCardImage.querySelector('.popup__close-button').addEventListener('click', () => close('fullImage'))
