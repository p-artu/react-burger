import {BASE_URL} from './constants';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getIngredientsRequest() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers,
      method: 'GET',
    })
    .then(this._checkResponse)
  }
  getNumberRequest(dataIds) {
    return fetch(`${this._baseUrl}/orders`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ 
        "ingredients": dataIds
      })
    })
    .then(this._checkResponse)
  }
  getUserInfo(accessToken) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        authorization: accessToken
      },
      method: 'GET',
    })
    .then(this._checkResponse)
  }
  editUserInfo(accessToken, email, password, name) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        authorization: accessToken
      },
      method: 'PATCH',
      body: JSON.stringify({email, password, name})
    })
    .then(this._checkResponse)
  }
  authorize(email, password) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse);
  }
  register(email, password, name) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password, name})
    })
    .then(this._checkResponse);
  }
  logout(refreshToken) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({token: refreshToken})
    })
    .then(this._checkResponse);
  }
  token(refreshToken) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({token: refreshToken})
    })
    .then(this._checkResponse);
  }
  resetPassword(email) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email})
    })
    .then(this._checkResponse);
  }
  setNewPassword(token, password) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password, token})
    })
    .then(this._checkResponse);
  }
}

export const BurgersApi = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
