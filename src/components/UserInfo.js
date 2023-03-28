export class UserInfo {
    constructor(selectorNameUser, selectorInfoUser){

    this._profileTitle = document.querySelector(selectorNameUser)
    this._profileSubtitle = document.querySelector(selectorInfoUser)
        
    }

    getUserInfo(){
        const userName = this._profileTitle.textContent
        const userInfo = this._profileSubtitle.textContent
        return({userName, userInfo})
    }

    setUserInfo(profileTitle, profileSubtitle){
        this._profileTitle.textContent = profileTitle
        this._profileSubtitle.textContent = profileSubtitle
    }
}