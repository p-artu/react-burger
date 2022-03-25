import {BASE_URL} from './constants';

interface IApi {
  options: {
    baseUrl: string,
    headers: { [header: string]: string }
  };
  _baseUrl: string;
  _headers: { [header: string]: string };
}

class Api implements IApi {
  options: { baseUrl: string; headers: { [header: string]: string }; };
  _baseUrl: string;
  _headers: { [header: string]: string };
  constructor(options: { baseUrl: string; headers: { [header: string]: string }; }) {
    this.options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  private _checkResponse(res: Response) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  public getIngredientsRequest() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers,
      method: 'GET',
    })
    .then(this._checkResponse)
  }
  public getNumberRequest(dataIds: string) {
    return fetch(`${this._baseUrl}/orders`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ 
        "ingredients": dataIds
      })
    })
    .then(this._checkResponse)
  }
  public getUserInfoRequest(accessToken: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        authorization: accessToken
      },
      method: 'GET',
    })
    .then(this._checkResponse)
  }
  public editUserInfoRequest(accessToken: string, email: string, password: string, name: string) {
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
  public authorize(email: string, password: string) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse);
  }
  public register(email: string, password: string, name: string) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password, name})
    })
    .then(this._checkResponse);
  }
  public logout(refreshToken: string) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({token: refreshToken})
    })
    .then(this._checkResponse);
  }
  public getTokenRequest(refreshToken: string) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({token: refreshToken})
    })
    .then(this._checkResponse);
  }
  public resetPassword(email: string) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email})
    })
    .then(this._checkResponse);
  }
  public setNewPassword(token: string, password: string) {
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
