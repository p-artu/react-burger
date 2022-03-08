import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED
} from '../actions/password-change';

const initialState = {};

export const passwordChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return state
    case RESET_PASSWORD_SUCCESS:
      return state
    case RESET_PASSWORD_FAILED:
      return state
    case SET_NEW_PASSWORD_REQUEST:
      return state
    case SET_NEW_PASSWORD_SUCCESS:
      return state
    case SET_NEW_PASSWORD_FAILED:
      return state
    default:
      return state
  }
}
