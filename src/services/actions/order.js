import { BurgersApi } from '../../utils/BurgersApi';
import { clearIngredients } from './constructor-ingredients';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_INGREDIENTS_FAILED';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const getOrderRequest = () => ({type: GET_ORDER_REQUEST});
export const getOrderSuccess = orderNumber => ({type: GET_ORDER_SUCCESS, orderNumber});
export const getOrderFailed = () => ({type: GET_ORDER_FAILED});
export const closeOrderModal = () => ({type: CLOSE_ORDER_MODAL});

export function getNumber(dataIds) {
  return function(dispatch) {
    dispatch(getOrderRequest());
    BurgersApi.getNumberRequest(dataIds)
    .then(res => {
      if (res && res.success) {
        dispatch(getOrderSuccess(res.order.number.toString()));
        dispatch(clearIngredients());
      } else {
        dispatch(getOrderFailed());
      }
    })
    .catch(err => {
      dispatch(getOrderFailed());
      console.error(err);
    });
  }
}

