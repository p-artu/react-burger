import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED
} from '../constants';

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface ISetNewPasswordRequest {
  readonly type: typeof SET_NEW_PASSWORD_REQUEST;
}
export interface ISetNewPasswordSuccess {
  readonly type: typeof SET_NEW_PASSWORD_SUCCESS;
}
export interface ISetNewPasswordFailed {
  readonly type: typeof SET_NEW_PASSWORD_FAILED;
}
export type TPasswordChangeActions =
  IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | ISetNewPasswordRequest
  | ISetNewPasswordSuccess
  | ISetNewPasswordFailed;
