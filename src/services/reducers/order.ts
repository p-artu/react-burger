import { TOrderActions, TOrderState } from '../types';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  // GET_ORDERS_REQUEST,
  // GET_ORDERS_SUCCESS,
  // GET_ORDERS_FAILED,
  // GET_MY_ORDERS_REQUEST,
  // GET_MY_ORDERS_SUCCESS,
  // GET_MY_ORDERS_FAILED,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_MY_CLOSED,
  WS_CONNECTION_MY_ERROR,
  WS_CONNECTION_MY_SUCCESS,
  WS_GET_MY_MESSAGE
} from '../constants';

const initialState: TOrderState = {
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
        wsError: false
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
        wsMyError: false
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
    // case GET_ORDERS_REQUEST:
    //   return {
    //     ...state,
    //     allOrdersRequest: true,
    //     allOrdersFailed: false
    //   }
    // case GET_ORDERS_SUCCESS:
    //   return {
    //     ...state,
    //     allOrders: action.allOrders,
    //     allOrdersRequest: false
    //   }
    // case GET_ORDERS_FAILED:
    //   return {
    //     ...state,
    //     allOrdersRequest: false,
    //     allOrdersFailed: true
    //   }
    // case GET_MY_ORDERS_REQUEST:
    //   return {
    //     ...state,
    //     allMyOrdersRequest: true,
    //     allMyOrdersFailed: false
    //   }
    // case GET_MY_ORDERS_SUCCESS:
    //   return {
    //     ...state,
    //     allMyOrders: action.allMyOrders,
    //     allMyOrdersRequest: false
    //   }
    // case GET_MY_ORDERS_FAILED:
    //   return {
    //     ...state,
    //     allMyOrdersRequest: false,
    //     allMyOrdersFailed: true
    //   }
    default:
      return state
  }
} 
