import { TOrderActions, TOrderState } from '../types';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_MY_CLOSED,
  WS_CONNECTION_MY_ERROR,
  WS_CONNECTION_MY_SUCCESS,
  WS_GET_MY_MESSAGE
} from '../constants';

export const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderDetails: null,
  allOrders: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0
  },
  wsConnected: false,
  wsError: false,
  allMyOrders: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0
  },
  wsMyConnected: false,
  wsMyError: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: false
      }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false,
        allOrders: {
          orders: [],
          success: false,
          total: 0,
          totalToday: 0
        }
      }
    case WS_GET_MESSAGE:
      return {
        ...state,
        allOrders: action.payload
      }
    case WS_CONNECTION_MY_SUCCESS:
      return {
        ...state,
        wsMyConnected: true,
        wsMyError: false
      }
    case WS_CONNECTION_MY_ERROR:
      return {
        ...state,
        wsMyConnected: false,
        wsMyError: true
      }
    case WS_CONNECTION_MY_CLOSED:
      return {
        ...state,
        wsMyConnected: false,
        wsMyError: false,
        allMyOrders: {
          orders: [],
          success: false,
          total: 0,
          totalToday: 0
        }
      }
    case WS_GET_MY_MESSAGE:
      return {
        ...state,
        allMyOrders: action.payload
      }
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
    default:
      return state
  }
} 
