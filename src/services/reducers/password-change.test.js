import { passwordChangeReducer } from './password-change';
import * as types from '../constants/password-change';

describe('password change reducer', () => {
  it('должно возвращать начальное состояние хранилища', () => {
    expect(passwordChangeReducer(undefined, {})).toEqual({});
  });

  it('должно обработать RESET_PASSWORD_REQUEST', () => {
    expect(
      passwordChangeReducer({}, {type: types.RESET_PASSWORD_REQUEST})).toEqual({});
  });
  it('должно обработать RESET_PASSWORD_SUCCESS', () => {
    expect(
      passwordChangeReducer({}, {type: types.RESET_PASSWORD_SUCCESS})).toEqual({});
  });
  it('должно обработать RESET_PASSWORD_FAILED', () => {
    expect(
      passwordChangeReducer({}, {type: types.RESET_PASSWORD_FAILED})).toEqual({});
  });
  it('должно обработать SET_NEW_PASSWORD_REQUEST', () => {
    expect(
      passwordChangeReducer({}, {type: types.SET_NEW_PASSWORD_REQUEST})).toEqual({});
  });
  it('должно обработать SET_NEW_PASSWORD_SUCCESS', () => {
    expect(
      passwordChangeReducer({}, {type: types.SET_NEW_PASSWORD_SUCCESS})).toEqual({});
  });
  it('должно обработать SET_NEW_PASSWORD_FAILED', () => {
    expect(
      passwordChangeReducer({}, {type: types.SET_NEW_PASSWORD_FAILED})).toEqual({});
  });
});
