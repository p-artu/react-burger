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
}

export const BurgersApi = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
