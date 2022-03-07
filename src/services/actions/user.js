import { BurgersApi } from '../../utils/BurgersApi';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';
export const EDIT_USER_INFO_REQUEST = 'EDIT_USER_INFO_REQUEST';
export const EDIT_USER_INFO_SUCCESS = 'EDIT_USER_INFO_SUCCESS';
export const EDIT_USER_INFO_FAILED = 'EDIT_USER_INFO_FAILED';
export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED = 'SET_NEW_PASSWORD_FAILED';

export function getUserInfo() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_INFO_REQUEST
    });
    const accessToken = localStorage.getItem('accessToken');
    BurgersApi.getUserInfoRequest(accessToken)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: GET_USER_INFO_FAILED
        });
      }
    })
    .catch(err => {
      if (accessToken) {
        dispatch(getToken());
      }
      dispatch({
        type: GET_USER_INFO_FAILED
      });
      console.error(err);
    });
  }
}
export function editUserInfo(email, password, name) {
  return function(dispatch) {
    dispatch({
      type: EDIT_USER_INFO_REQUEST
    });
    const accessToken = localStorage.getItem('accessToken');
    BurgersApi.editUserInfoRequest(accessToken, email, password, name)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: EDIT_USER_INFO_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: EDIT_USER_INFO_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: EDIT_USER_INFO_FAILED
      });
      console.error(err);
    });
  }
}
export function getToken() {
  return function(dispatch) {
    dispatch({
      type: GET_TOKEN_REQUEST
    });
    const refreshToken = localStorage.getItem('refreshToken');
    BurgersApi.getTokenRequest(refreshToken)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_TOKEN_SUCCESS
        });
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch(getUserInfo());
      } else {
        dispatch({
          type: GET_TOKEN_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_TOKEN_FAILED
      });
      console.error(err);
    });
  }
}
export function authorize(email, password) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    BurgersApi.authorize(email, password)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.user
        });
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      } else {
        dispatch({
          type: LOGIN_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILED
      });
      console.error(err);
    });
  }
}
export function register(email, password, name) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    BurgersApi.register(email, password, name)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: REGISTER_SUCCESS,
          user: res.user
        });
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      } else {
        dispatch({
          type: REGISTER_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILED
      });
      console.error(err);
    });
  }
}
export function logout() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    const refreshToken = localStorage.getItem('refreshToken');
    BurgersApi.logout(refreshToken)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } else {
        dispatch({
          type: LOGOUT_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_FAILED
      });
      console.error(err);
    });
  }
}
export function recoverPassword(email) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    BurgersApi.resetPassword(email)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_FAILED
      });
      console.error(err);
    });
  }
}
export function setNewPasswordRequest(token, password) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    BurgersApi.setNewPassword(token, password)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_FAILED
      });
      console.error(err);
    });
  }
}
