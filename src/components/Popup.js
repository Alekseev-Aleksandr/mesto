export class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup)
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close(){
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }
    
    setEventListeners(){
        const popupsArr = document.querySelectorAll('.popup')
        
        popupsArr.forEach(popup => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    this.close()
                } else if (evt.target.classList.contains('popup__close-button'))
                    this.close()
            })
        })
    }
}
