import { TIngredients, TIngredient } from '../../utils/types';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../constants';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export type TIngredientsActions =
  IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;
export type TIngredientsState = TIngredients;
