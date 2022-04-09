import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import {
  TConstructorIngredientsActions,
  TIngredientsActions,
  TOrderActions,
  TPasswordChangeActions,
  TUserActions
} from '../types';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  TConstructorIngredientsActions
  | TIngredientsActions
  | TOrderActions
  | TPasswordChangeActions
  | TUserActions;

export type AppThunk<TReturn = void> =
  ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
  >;
export type AppDispatch = typeof store.dispatch;

export * from './constructor-ingredients';
export * from './ingredients';
export * from './order';
export * from './password-change';
export * from './user';
