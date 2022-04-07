import { TOrderActions, TOrderState } from '../types';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED
} from '../constants';

const initialState: TOrderState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
  allOrders: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0
  },
  allOrdersRequest: false,
  allOrdersFailed: false
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.orderNumber,
        orderRequest: false
      }
    case GET_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        orderDetails: null
      }
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        allOrdersRequest: true,
        allOrdersFailed: false
      }
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        allOrders: action.allOrders,
        allOrdersRequest: false
      }
    case GET_ORDERS_FAILED:
      return {
        ...state,
        allOrdersRequest: false,
        allOrdersFailed: true
      }
    default:
      return state
  }
} 
