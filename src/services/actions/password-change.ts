import { BurgersApi } from '../../utils/BurgersApi';
import { AppThunk, AppDispatch } from '../types';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED
} from '../constants';
import {
  IResetPasswordRequest,
  IResetPasswordSuccess,
  IResetPasswordFailed,
  ISetNewPasswordRequest,
  ISetNewPasswordSuccess,
  ISetNewPasswordFailed
} from '../types';

export const resetPasswordRequest = (): IResetPasswordRequest => ({type: RESET_PASSWORD_REQUEST});
export const resetPasswordSuccess = (): IResetPasswordSuccess => ({type: RESET_PASSWORD_SUCCESS});
export const resetPasswordFailed = (): IResetPasswordFailed => ({type: RESET_PASSWORD_FAILED});
export const setNewPasswordRequest = (): ISetNewPasswordRequest => ({type: SET_NEW_PASSWORD_REQUEST});
export const setNewPasswordSuccess = (): ISetNewPasswordSuccess => ({type: SET_NEW_PASSWORD_SUCCESS});
export const setNewPasswordFailed = (): ISetNewPasswordFailed => ({type: SET_NEW_PASSWORD_FAILED});

export const recoverPassword: AppThunk = (email) => (dispatch: AppDispatch) => {
  dispatch(resetPasswordRequest());
  BurgersApi.resetPassword(email)
  .then(res => {
    if (res && res.success) {
      dispatch(resetPasswordSuccess());
    } else {
      dispatch(resetPasswordFailed());
    }
  })
  .catch(err => {
    dispatch(resetPasswordFailed());
    console.error(err);
  });
}
export const setNewPassword: AppThunk = (token, password) => (dispatch: AppDispatch) => {
  dispatch(setNewPasswordRequest());
  BurgersApi.setNewPassword(token, password)
  .then(res => {
    if (res && res.success) {
      dispatch(setNewPasswordSuccess());
    } else {
      dispatch(setNewPasswordFailed());
    }
  })
  .catch(err => {
    dispatch(setNewPasswordFailed());
    console.error(err);
  });
}
