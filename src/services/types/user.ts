import { TUser } from '../../utils/types';

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

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST;
}
export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly user: TUser;
}
export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED;
}
export interface IEditUserInfoRequest {
  readonly type: typeof EDIT_USER_INFO_REQUEST;
}
export interface IEditUserInfoSuccess {
  readonly type: typeof EDIT_USER_INFO_SUCCESS;
  readonly user: TUser;
}
export interface IEditUserInfoFailed {
  readonly type: typeof EDIT_USER_INFO_FAILED;
}
export interface IGetTokenRequest {
  readonly type: typeof GET_TOKEN_REQUEST;
}
export interface IGetTokenSuccess {
  readonly type: typeof GET_TOKEN_SUCCESS;
}
export interface IGetTokenFailed {
  readonly type: typeof GET_TOKEN_FAILED;
}
export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}
export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: TUser;
}
export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}
export type TUserActions =
  IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoFailed
  | IEditUserInfoRequest
  | IEditUserInfoSuccess
  | IEditUserInfoFailed
  | IGetTokenRequest
  | IGetTokenSuccess
  | IGetTokenFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed;
export type TUserState = {
  user: TUser;
  userRequest: boolean;
  userFailed: boolean;
};
