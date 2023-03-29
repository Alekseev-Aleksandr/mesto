import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{

    constructor(selectorPopup){
        super (selectorPopup)
        this._popupFullImage = document.querySelector('.popup__full-image')
        this._popupFullImageCapture = document.querySelector('.popup__full-image-capture')
    }

    open = (image, name) =>{
        super.open()
        
        this._popupFullImage.src = image
        this._popupFullImage.alt = name
        this._popupFullImageCapture.textContent = name
    }
}
