import { TIngredient } from '../../utils/types';

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  INCREASE_COUNTER,
  REDUCE_COUNTER,
  MOVE_INGREDIENT,
  CLEAR_INGREDIENTS
} from '../constants';
import {
  IAddIngredient,
  IDeleteIngredient,
  IIncreaseCounter,
  IReduceCounter,
  IMoveIngredient,
  IClearIngredients
} from '../types';

export const addIngredient = (item: TIngredient): IAddIngredient => ({type: ADD_INGREDIENT, item});
export const deleteIngredient = (unId: number): IDeleteIngredient => ({type: DELETE_INGREDIENT, unId});
export const increaseCounter = (item: TIngredient): IIncreaseCounter => ({type: INCREASE_COUNTER, item});
export const reduceCounter = (item: TIngredient): IReduceCounter => ({type: REDUCE_COUNTER, item});
export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredient => ({type: MOVE_INGREDIENT, dragIndex, hoverIndex});
export const clearIngredients = (): IClearIngredients => ({type: CLEAR_INGREDIENTS});
