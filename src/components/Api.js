import { newSection } from "../pages"
import { userInfo } from "../pages/index"

let initialCards = []
// "77cf6af7cce7e7043f2c94d0"
export class Api {

    constructor(setFromServer) {
        this._baseUrl = setFromServer.baseUrl
        this._headers = setFromServer.headers
    }
    chekAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,
            {
                method: 'GET',
                headers: this._headers
            })
            .then((res) => {
                res = this.chekAnswer(res)
                return res
            })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`,
            {
                method: "GET",
                headers: this._headers
            })
            .then((res) => res.json())
    }

    editProfileInfo(data,element) {

        return fetch(`${this._baseUrl}/users/me`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.firstname,
                    about: data.profession
                })
            })
            .finally(()=>{
                element.textContent = "Сохраняется..."
            })

            .then((res) => {
                res = this.chekAnswer(res)
                return res
            })
            
    }

    addNewCard(data, element) {
        
        return fetch(`${this._baseUrl}/cards`,
            {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.nameImage,
                    link: data.linkImage
                })
            })
            .finally(()=>{
                element.textContent = "Сохраняется..."
            })
            .then((res) => {
                res = this.chekAnswer(res)
                return res
            })
            
    }


    editAvatar(data, element) {
        return fetch(`${this._baseUrl}/users/me/avatar`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.linkImageAvatar
                })
            })
            .finally(()=>{
                element.textContent = "Сохраняется..."
            })
            .then((res) => {
                res = this.chekAnswer(res)
                return res
            })
           
    }

    deleteCard(cardId, element) {
        return fetch(`${this._baseUrl}/cards/${cardId}`,
            {
                method: "DELETE",
                headers: this._headers,
            })
            .finally(()=>{
                element.textContent = "Удаляется..."
            })
            .then((res) => {
                res = this.chekAnswer(res)
                return res
            })
           
    }

    addLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
            {
                method: "PUT",
                headers: this._headers,
            })
            .then((res) => {
                res = this.chekAnswer(res)
                return res
            })
    }

    removeLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
            {
                method: "DELETE",
                headers: this._headers,
            })
            .then((res) => {
                res = this.chekAnswer(res)
                return res
            })
    }
}