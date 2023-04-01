import { newSection, userId } from "../pages/index.js";
import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
    constructor(selectorPopup, api) {
        super(selectorPopup)
        this._api = api
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__button_type_confirm').addEventListener('click', this.delereCardConfirm.bind(this))
    }

    delereCardConfirm() {
        this._api.deleteCard(this._cardId)
            .then(() => {
                newSection.updateSection(userId)
                    .then(() => {
                        this.close()
                    })
                    .catch(err =>{ 
                        console.log(err);
                    })
            })

    }

    open(cardId) {
        super.open()
        this._cardId = cardId
    }

}