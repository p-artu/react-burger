import { TOrder, TAllOrders } from '../../utils/types';

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

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: string;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface IGetOrdersRequest {
  readonly type: typeof GET_ORDERS_REQUEST;
}
export interface IGetOrdersSuccess {
  readonly type: typeof GET_ORDERS_SUCCESS;
  readonly allOrders: TAllOrders;
}
export interface IGetOrdersFailed {
  readonly type: typeof GET_ORDERS_FAILED;
}

export interface IGetMyOrdersRequest {
  readonly type: typeof GET_MY_ORDERS_REQUEST;
}
export interface IGetMyOrdersSuccess {
  readonly type: typeof GET_MY_ORDERS_SUCCESS;
  readonly allMyOrders: TAllOrders;
}
export interface IGetMyOrdersFailed {
  readonly type: typeof GET_MY_ORDERS_FAILED;
}

export type TOrderActions =
  IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | ICloseOrderModal
  | IGetOrdersRequest
  | IGetOrdersSuccess
  | IGetOrdersFailed
  | IGetMyOrdersRequest
  | IGetMyOrdersSuccess
  | IGetMyOrdersFailed;
export type TOrderState = TOrder;
