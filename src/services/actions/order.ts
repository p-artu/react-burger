import { BurgersApi } from '../../utils/BurgersApi';
import { clearIngredients } from './constructor-ingredients';
import { AppThunk, AppDispatch } from '../types';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL
} from '../constants';
import {
  IGetOrderRequest,
  IGetOrderSuccess,
  IGetOrderFailed,
  ICloseOrderModal
} from '../types';

export const getOrderRequest = (): IGetOrderRequest => ({type: GET_ORDER_REQUEST});
export const getOrderSuccess = (orderNumber: string): IGetOrderSuccess => ({type: GET_ORDER_SUCCESS, orderNumber});
export const getOrderFailed = (): IGetOrderFailed => ({type: GET_ORDER_FAILED});
export const closeOrderModal = (): ICloseOrderModal => ({type: CLOSE_ORDER_MODAL});

export const getNumber: AppThunk = (dataIds) => (dispatch: AppDispatch) => {
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

