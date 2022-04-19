import { userReducer, initialState } from './user';
import * as types from '../constants/user';

describe('user reducer', () => {
  const user = {
    name: 'string',
    email: 'string'
  };

  it('должно возвращать начальное состояние хранилища', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('должно обработать GET_USER_INFO_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: types.GET_USER_INFO_REQUEST
      })
    ).toEqual({
      ...initialState,
      userRequest: true,
      userFailed: false
    });
  });

  it('должно обработать GET_USER_INFO_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: types.GET_USER_INFO_SUCCESS,
        user
      })
    ).toEqual({
      ...initialState,
      user,
      userRequest: false
    });
  });

  it('должно обработать GET_USER_INFO_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: types.GET_USER_INFO_FAILED
      })
    ).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: true
    });
  });

  it('должно обработать EDIT_USER_INFO_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: types.EDIT_USER_INFO_REQUEST
      })
    ).toEqual({
      ...initialState,
      userRequest: true,
      userFailed: false
    });
  });

  it('должно обработать EDIT_USER_INFO_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: types.EDIT_USER_INFO_SUCCESS,
        user
      })
    ).toEqual({
      ...initialState,
      user,
      userRequest: false
    });
  });

  it('должно обработать EDIT_USER_INFO_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: types.EDIT_USER_INFO_FAILED
      })
    ).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: true
    });
  });

  it('должно обработать LOGIN_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: types.LOGIN_REQUEST
      })
    ).toEqual({
      ...initialState,
      userRequest: true,
      userFailed: false
    });
  });

  it('должно обработать LOGIN_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: types.LOGIN_SUCCESS,
        user
      })
    ).toEqual({
      ...initialState,
      user,
      userRequest: false
    });
  });

  it('должно обработать LOGIN_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: types.LOGIN_FAILED
      })
    ).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: true
    });
  });

  it('должно обработать REGISTER_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: types.REGISTER_REQUEST
      })
    ).toEqual({
      ...initialState,
      userRequest: true,
      userFailed: false
    });
  });

  it('должно обработать REGISTER_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: types.REGISTER_SUCCESS,
        user
      })
    ).toEqual({
      ...initialState,
      user,
      userRequest: false
    });
  });

  it('должно обработать REGISTER_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: types.REGISTER_FAILED
      })
    ).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: true
    });
  });

  it('должно обработать LOGOUT_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: types.LOGOUT_REQUEST
      })
    ).toEqual({
      ...initialState,
      userRequest: true,
      userFailed: false
    });
  });

  it('должно обработать LOGOUT_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: types.LOGOUT_SUCCESS
      })
    ).toEqual({
      ...initialState,
      user: {
        name: '',
        email: ''
      },
      userRequest: false
    });
  });

  it('должно обработать LOGOUT_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: types.LOGOUT_FAILED
      })
    ).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: true
    });
  });
});
