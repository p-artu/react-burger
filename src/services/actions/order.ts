import { BurgersApi } from '../../utils/BurgersApi';
import { clearIngredients } from './constructor-ingredients';
import { AppThunk, AppDispatch } from '../types';
import { TAllOrders } from '../../utils/types';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED
} from '../constants';
import {
  IGetOrderRequest,
  IGetOrderSuccess,
  IGetOrderFailed,
  ICloseOrderModal,
  IGetOrdersRequest,
  IGetOrdersSuccess,
  IGetOrdersFailed
} from '../types';

export const getOrderRequest = (): IGetOrderRequest => ({type: GET_ORDER_REQUEST});
export const getOrderSuccess = (orderNumber: string): IGetOrderSuccess => ({type: GET_ORDER_SUCCESS, orderNumber});
export const getOrderFailed = (): IGetOrderFailed => ({type: GET_ORDER_FAILED});
export const closeOrderModal = (): ICloseOrderModal => ({type: CLOSE_ORDER_MODAL});

export const getOrdersRequest = (): IGetOrdersRequest => ({type: GET_ORDERS_REQUEST});
export const getOrdersSuccess = (allOrders: TAllOrders): IGetOrdersSuccess => ({type: GET_ORDERS_SUCCESS, allOrders});
export const getOrdersFailed = (): IGetOrdersFailed => ({type: GET_ORDERS_FAILED});

export const getNumber: AppThunk = (dataIds) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequest());
  const accessToken: any = localStorage.getItem('accessToken');
  console.log(accessToken);
  const authToken = accessToken.split('Bearer ')[1];
  BurgersApi.getNumberRequest(dataIds, authToken)
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
export const getAllOrders: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getOrdersRequest());
  BurgersApi.getAllOrdersRequest()
  .then(res => {
    console.log(res);
    if (res && res.success) {
      dispatch(getOrdersSuccess(res));
    } else {
      dispatch(getOrdersFailed());
    }
  })
  .catch(err => {
    dispatch(getOrdersFailed());
    console.error(err);
  });
}

