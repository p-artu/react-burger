import { BurgersApi } from '../../utils/BurgersApi';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED = 'SET_NEW_PASSWORD_FAILED';

export const resetPasswordRequest = () => ({type: RESET_PASSWORD_REQUEST});
export const resetPasswordSuccess = () => ({type: RESET_PASSWORD_SUCCESS});
export const resetPasswordFailed = () => ({type: RESET_PASSWORD_FAILED});
export const setNewPasswordRequest = () => ({type: SET_NEW_PASSWORD_REQUEST});
export const setNewPasswordSuccess = () => ({type: SET_NEW_PASSWORD_SUCCESS});
export const setNewPasswordFailed = () => ({type: SET_NEW_PASSWORD_FAILED});

export function recoverPassword(email) {
  return function(dispatch) {
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
}
export function setNewPassword(token, password) {
  return function(dispatch) {
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
}
