import { BurgersApi } from '../../utils/BurgersApi';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_INGREDIENTS_FAILED';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export function getNumber(dataIds) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    BurgersApi.getNumberRequest(dataIds)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: res.order.number.toString()
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ORDER_FAILED
      });
      console.error(err);
    });
  }
}

