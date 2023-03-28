import { Card } from '../components/Card.js';
import { formValidCard } from '../pages/index.js';
import { newSection } from '../pages/index.js';
import { newPopupWithImage } from '../pages/index.js';
import { userInfo } from '../pages/index.js';

export const renderer = (cardInfo) => {

    const newCard = new Card({ link: cardInfo.link, name: cardInfo.name }, '.template-card', handleCardClick)

    const dataInTemplate = newCard.generateCard()
    newSection.addItem(dataInTemplate)
}

export const handleAddNewCard = function ({ firstName: inputName, profession: inputLink }) {

    renderer({ link: inputLink, name: inputName })
    formValidCard.disableBtn()

}

export const handleSaveProfileInfo = function ({ firstName: firstName, profession: profession }) {
    userInfo.setUserInfo(firstName, profession)
}

export const handleCardClick = (image, name) => {
    newPopupWithImage.open(image, name)
}