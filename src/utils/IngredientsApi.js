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
  getIngredients() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
      method: 'GET',
    })
    .then(this._checkResponse)
  }
}

export const IngredientsApi = new Api({
  baseUrl: `${BASE_URL}/ingredients`,
  headers: {
    'Content-Type': 'application/json'
  }
});
