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
  GET_ORDERS_FAILED,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAILED
} from '../constants';
import {
  IGetOrderRequest,
  IGetOrderSuccess,
  IGetOrderFailed,
  ICloseOrderModal,
  IGetOrdersRequest,
  IGetOrdersSuccess,
  IGetOrdersFailed,
  IGetMyOrdersRequest,
  IGetMyOrdersSuccess,
  IGetMyOrdersFailed
} from '../types';

export const getOrderRequest = (): IGetOrderRequest => ({type: GET_ORDER_REQUEST});
export const getOrderSuccess = (orderNumber: string): IGetOrderSuccess => ({type: GET_ORDER_SUCCESS, orderNumber});
export const getOrderFailed = (): IGetOrderFailed => ({type: GET_ORDER_FAILED});
export const closeOrderModal = (): ICloseOrderModal => ({type: CLOSE_ORDER_MODAL});

export const getOrdersRequest = (): IGetOrdersRequest => ({type: GET_ORDERS_REQUEST});
export const getOrdersSuccess = (allOrders: TAllOrders): IGetOrdersSuccess => ({type: GET_ORDERS_SUCCESS, allOrders});
export const getOrdersFailed = (): IGetOrdersFailed => ({type: GET_ORDERS_FAILED});

export const getMyOrdersRequest = (): IGetMyOrdersRequest => ({type: GET_MY_ORDERS_REQUEST});
export const getMyOrdersSuccess = (allMyOrders: TAllOrders): IGetMyOrdersSuccess => ({type: GET_MY_ORDERS_SUCCESS, allMyOrders});
export const getMyOrdersFailed = (): IGetMyOrdersFailed => ({type: GET_MY_ORDERS_FAILED});

export const getNumber: AppThunk = (dataIds) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequest());
  const accessToken: any = localStorage.getItem('accessToken');
  // const authToken = accessToken.split('Bearer ')[1];
  BurgersApi.getNumberRequest(dataIds, accessToken)
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
export const getAllMyOrders: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getMyOrdersRequest());
  const accessToken: any = localStorage.getItem('accessToken');
  BurgersApi.getAllMyOrdersRequest(accessToken)
  .then(res => {
    console.log(res);
    if (res && res.success) {
      dispatch(getMyOrdersSuccess(res));
    } else {
      dispatch(getMyOrdersFailed());
    }
  })
  .catch(err => {
    dispatch(getMyOrdersFailed());
    console.error(err);
  });
}

