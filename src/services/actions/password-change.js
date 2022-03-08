import { BurgersApi } from '../../utils/BurgersApi';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED = 'SET_NEW_PASSWORD_FAILED';

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
