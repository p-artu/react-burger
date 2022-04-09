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
  GET_MY_ORDERS_FAILED,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_MY_CLOSED,
  WS_CONNECTION_MY_ERROR,
  WS_CONNECTION_MY_START,
  WS_CONNECTION_MY_SUCCESS,
  WS_GET_MY_MESSAGE
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

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TAllOrders;
}

export interface IWSConnectionMyClosed {
  readonly type: typeof WS_CONNECTION_MY_CLOSED;
}
export interface IWSConnectionMyError {
  readonly type: typeof WS_CONNECTION_MY_ERROR;
}
export interface IWSConnectionMyStart {
  readonly type: typeof WS_CONNECTION_MY_START;
  readonly payload: string;
}
export interface IWSConnectionMySuccess {
  readonly type: typeof WS_CONNECTION_MY_SUCCESS;
}
export interface IWSConnectionMyMessage {
  readonly type: typeof WS_GET_MY_MESSAGE;
  readonly payload: TAllOrders;
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
  | IGetMyOrdersFailed
  | IWSConnectionClosed
  | IWSConnectionError
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionMessage
  | IWSConnectionMyClosed
  | IWSConnectionMyError
  | IWSConnectionMyStart
  | IWSConnectionMySuccess
  | IWSConnectionMyMessage;
export type TOrderState = TOrder;
