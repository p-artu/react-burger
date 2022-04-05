import { BurgersApi } from '../../utils/BurgersApi';
import { TUser } from '../../utils/types';
import { AppThunk, AppDispatch } from '../types';

import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILED,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from '../constants';
import {
  IGetUserInfoRequest,
  IGetUserInfoSuccess,
  IGetUserInfoFailed,
  IEditUserInfoRequest,
  IEditUserInfoSuccess,
  IEditUserInfoFailed,
  IGetTokenRequest,
  IGetTokenSuccess,
  IGetTokenFailed,
  ILoginRequest,
  ILoginSuccess,
  ILoginFailed,
  IRegisterRequest,
  IRegisterSuccess,
  IRegisterFailed,
  ILogoutRequest,
  ILogoutSuccess,
  ILogoutFailed
} from '../types';

export const getUserInfoRequest = (): IGetUserInfoRequest => ({type: GET_USER_INFO_REQUEST});
export const getUserInfoSuccess = (user: TUser): IGetUserInfoSuccess => ({type: GET_USER_INFO_SUCCESS, user});
export const getUserInfoFailed = (): IGetUserInfoFailed => ({type: GET_USER_INFO_FAILED});
export const editUserInfoRequest = (): IEditUserInfoRequest => ({type: EDIT_USER_INFO_REQUEST});
export const editUserInfoSuccess = (user: TUser): IEditUserInfoSuccess => ({type: EDIT_USER_INFO_SUCCESS, user});
export const editUserInfoFailed = (): IEditUserInfoFailed => ({type: EDIT_USER_INFO_FAILED});
export const getTokenRequest = (): IGetTokenRequest => ({type: GET_TOKEN_REQUEST});
export const getTokenSuccess = (): IGetTokenSuccess => ({type: GET_TOKEN_SUCCESS});
export const getTokenFailed = (): IGetTokenFailed => ({type: GET_TOKEN_FAILED});
export const loginRequest = (): ILoginRequest => ({type: LOGIN_REQUEST});
export const loginSuccess = (user: TUser): ILoginSuccess => ({type: LOGIN_SUCCESS, user});
export const loginFailed = (): ILoginFailed => ({type: LOGIN_FAILED});
export const registerRequest = (): IRegisterRequest => ({type: REGISTER_REQUEST});
export const registerSuccess = (user: TUser): IRegisterSuccess => ({type: REGISTER_SUCCESS, user});
export const registerFailed = (): IRegisterFailed => ({type: REGISTER_FAILED});
export const logoutRequest = (): ILogoutRequest => ({type: LOGOUT_REQUEST});
export const logoutSuccess = (): ILogoutSuccess => ({type: LOGOUT_SUCCESS});
export const logoutFailed = (): ILogoutFailed => ({type: LOGOUT_FAILED});

export const getUserInfo: AppThunk = () => {
  return function(dispatch) {
    dispatch(getUserInfoRequest());
    const accessToken: any = localStorage.getItem('accessToken');
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
export const editUserInfo: AppThunk = (email, password, name) => (dispatch: AppDispatch) => {
  dispatch(editUserInfoRequest());
  const accessToken: any = localStorage.getItem('accessToken');
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
export const getToken: AppThunk = () => {
  return function(dispatch) {
    dispatch(getTokenRequest());
    const refreshToken: any = localStorage.getItem('refreshToken');
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
export const authorize: AppThunk = (email, password) => (dispatch: AppDispatch) => {
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
export const register: AppThunk = (email, password, name) => (dispatch: AppDispatch) => {
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
export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutRequest());
  const refreshToken: any = localStorage.getItem('refreshToken');
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
