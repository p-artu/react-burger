import { TIngredient, TCounterListData } from '../../utils/types';

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  INCREASE_COUNTER,
  REDUCE_COUNTER,
  MOVE_INGREDIENT,
  CLEAR_INGREDIENTS
} from '../constants';

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TIngredient;
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly unId: number;
}
export interface IIncreaseCounter {
  readonly type: typeof INCREASE_COUNTER;
  readonly item: TIngredient;
}
export interface IReduceCounter {
  readonly type: typeof REDUCE_COUNTER;
  readonly item: TIngredient;
}
export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}
export interface IClearIngredients {
  readonly type: typeof CLEAR_INGREDIENTS;
}
export type TConstructorIngredientsActions =
  IAddIngredient
  | IDeleteIngredient
  | IIncreaseCounter
  | IReduceCounter
  | IMoveIngredient
  | IClearIngredients;
export type TConstructorIngredientsState = {
  draggedIngredients: {
    content: TIngredient[];
    bun: TIngredient | null;
  };
  counterList: TCounterListData;
};
