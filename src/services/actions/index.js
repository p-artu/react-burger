import { BurgersApi } from '../../utils/BurgersApi';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_NUMBER = 'GET_NUMBER';
export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const REDUCE_COUNTER = 'REDUCE_COUNTER';

export function getIngredients() {
  return function(dispatch) {
    BurgersApi.getIngredientsRequest()
    .then(res => {
      if (res && res.success) {
        console.log(res.data);
        dispatch({
          type: GET_INGREDIENTS,
          ingredients: res.data
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
  }
}
export function getNumber(dataIds) {
  return function(dispatch) {
    BurgersApi.getNumberRequest(dataIds)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_NUMBER,
          orderNumber: res.order.number.toString()
        });
        dispatch({
          type: OPEN_ORDER_MODAL,
          orderNumber: res.order.number.toString()
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
  }
}
