import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL
} from '../actions/order';

const initialState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
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
    default:
      return state
  }
} 
