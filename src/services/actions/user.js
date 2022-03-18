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

export const getUserInfoRequest = () => ({type: GET_USER_INFO_REQUEST});
export const getUserInfoSuccess = user => ({type: GET_USER_INFO_SUCCESS, user});
export const getUserInfoFailed = () => ({type: GET_USER_INFO_FAILED});
export const editUserInfoRequest = () => ({type: EDIT_USER_INFO_REQUEST});
export const editUserInfoSuccess = user => ({type: EDIT_USER_INFO_SUCCESS, user});
export const editUserInfoFailed = () => ({type: EDIT_USER_INFO_FAILED});
export const getTokenRequest = () => ({type: GET_TOKEN_REQUEST});
export const getTokenSuccess = () => ({type: GET_TOKEN_SUCCESS});
export const getTokenFailed = () => ({type: GET_TOKEN_FAILED});
export const loginRequest = () => ({type: LOGIN_REQUEST});
export const loginSuccess = user => ({type: LOGIN_SUCCESS, user});
export const loginFailed = () => ({type: LOGIN_FAILED});
export const registerRequest = () => ({type: REGISTER_REQUEST});
export const registerSuccess = user => ({type: REGISTER_SUCCESS, user});
export const registerFailed = () => ({type: REGISTER_FAILED});
export const logoutRequest = () => ({type: LOGOUT_REQUEST});
export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
export const logoutFailed = () => ({type: LOGOUT_FAILED});

export function getUserInfo() {
  return function(dispatch) {
    dispatch(getUserInfoRequest());
    const accessToken = localStorage.getItem('accessToken');
    BurgersApi.getUserInfoRequest(accessToken)
    .then(res => {
      if (res && res.success) {
        dispatch(getUserInfoSuccess(res.user));
      } else {
        dispatch(getUserInfoFailed());
      }
    })
    .catch(err => {
      if (accessToken) {
        dispatch(getToken());
      }
      dispatch(getUserInfoFailed());
      console.error(err);
    });
  }
}
export function editUserInfo(email, password, name) {
  return function(dispatch) {
    dispatch(editUserInfoRequest());
    const accessToken = localStorage.getItem('accessToken');
    BurgersApi.editUserInfoRequest(accessToken, email, password, name)
    .then(res => {
      if (res && res.success) {
        dispatch(editUserInfoSuccess(res.user));
      } else {
        dispatch(editUserInfoFailed());
      }
    })
    .catch(err => {
      dispatch(editUserInfoFailed());
      console.error(err);
    });
  }
}
export function getToken() {
  return function(dispatch) {
    dispatch(getTokenRequest());
    const refreshToken = localStorage.getItem('refreshToken');
    BurgersApi.getTokenRequest(refreshToken)
    .then(res => {
      if (res && res.success) {
        dispatch(getTokenSuccess());
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch(getUserInfo());
      } else {
        dispatch(getTokenFailed());
      }
    })
    .catch(err => {
      dispatch(getTokenFailed());
      console.error(err);
    });
  }
}
export function authorize(email, password) {
  return function(dispatch) {
    dispatch(loginRequest());
    BurgersApi.authorize(email, password)
    .then(res => {
      if (res && res.success) {
        dispatch(loginSuccess(res.user));
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      } else {
        dispatch(loginFailed());
      }
    })
    .catch(err => {
      dispatch(loginFailed());
      console.error(err);
    });
  }
}
export function register(email, password, name) {
  return function(dispatch) {
    dispatch(registerRequest());
    BurgersApi.register(email, password, name)
    .then(res => {
      if (res && res.success) {
        dispatch(registerSuccess(res.user));
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      } else {
        dispatch(registerFailed());
      }
    })
    .catch(err => {
      dispatch(registerFailed());
      console.error(err);
    });
  }
}
export function logout() {
  return function(dispatch) {
    dispatch(logoutRequest());
    const refreshToken = localStorage.getItem('refreshToken');
    BurgersApi.logout(refreshToken)
    .then(res => {
      if (res && res.success) {
        dispatch(logoutSuccess());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } else {
        dispatch(logoutFailed());
      }
    })
    .catch(err => {
      dispatch(logoutFailed());
      console.error(err);
    });
  }
}
