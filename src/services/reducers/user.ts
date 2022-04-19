import { TUserActions, TUserState } from '../types';
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../constants';

export const initialState: TUserState = {
  user: {
    name: '',
    email: ''
  },
  userRequest: false,
  userFailed: false
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false
      }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.user,
        userRequest: false
      }
    case GET_USER_INFO_FAILED:
      return {
        ...state,
        userRequest: false,
        userFailed: true
      }
    case EDIT_USER_INFO_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false
      }
    case EDIT_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.user,
        userRequest: false
      }
    case EDIT_USER_INFO_FAILED:
      return {
        ...state,
        userRequest: false,
        userFailed: true
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        userRequest: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        userRequest: false,
        userFailed: true
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
        userRequest: false
      }
    case REGISTER_FAILED:
      return {
        ...state,
        userRequest: false,
        userFailed: true
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {
          name: '',
          email: ''
        },
        userRequest: false
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        userRequest: false,
        userFailed: true
      }
    default:
      return state
  }
}
