import { BurgersApi } from '../../utils/BurgersApi';
import { TIngredient } from '../../utils/types';
import { AppThunk, AppDispatch } from '../types';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../constants';
import {
  IGetIngredientsRequest,
  IGetIngredientsSuccess,
  IGetIngredientsFailed
} from '../types';

export const getIngredientsRequest = (): IGetIngredientsRequest => ({type: GET_INGREDIENTS_REQUEST});
export const getIngredientsSuccess = (ingredients: TIngredient[]): IGetIngredientsSuccess => ({type: GET_INGREDIENTS_SUCCESS, ingredients});
export const getIngredientsFailed = (): IGetIngredientsFailed => ({type: GET_INGREDIENTS_FAILED});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  BurgersApi.getIngredientsRequest()
  .then(res => {
    if (res && res.success) {
      dispatch(getIngredientsSuccess(res.data));
    } else {
      dispatch(getIngredientsFailed());
    }
  })
  .catch(err => {
    dispatch(getIngredientsFailed());
    console.error(err);
  });
}
