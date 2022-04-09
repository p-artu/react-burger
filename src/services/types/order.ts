import { TOrder, TAllOrders } from '../../utils/types';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
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

export type wsActionsType = {
  wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_MY_START;
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_MY_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_MY_CLOSED;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_MY_ERROR;
  onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_MY_MESSAGE;
};

export type TOrderActions =
  IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | ICloseOrderModal
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
