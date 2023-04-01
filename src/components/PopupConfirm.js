import { userId } from "../pages/index.js";
import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
    constructor(selectorPopup, apiCallback, updateSectionCallBack) {
        super(selectorPopup)
        this._api = apiCallback
        this._updateSectionCallBack = updateSectionCallBack
        this._buttonForm = this._popup.querySelector('.popup__button_type_confirm')
    }

    setEventListeners() {
        super.setEventListeners()
        this._buttonForm.addEventListener('click', this.delereCardConfirm.bind(this))
    }

    delereCardConfirm() {
        this._buttonForm.textContent = 'Удаляется...'
        this._api(this._cardId)
            .then(() => {
                this._updateSectionCallBack(userId)
                    .then(() => {
                        this.close()
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        this._buttonForm.textContent = 'Да'
                    })
            })

    }

    open(cardId) {
        super.open()
        this._cardId = cardId
    }

}