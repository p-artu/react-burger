import { TOrder } from '../../utils/types';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL
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
export type TOrderActions =
  IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | ICloseOrderModal;
export type TOrderState = TOrder;
