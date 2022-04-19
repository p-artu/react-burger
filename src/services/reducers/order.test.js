import { orderReducer, initialState } from './order';
import * as types from '../constants/order';

describe('order reducer', () => {
  const allOrders = {
    orders: [{
      createdAt: 'string',
      ingredients: ['string'],
      name: 'string',
      number: 0,
      status: 'string',
      updatedAt: 'string',
      _id: 'string'
    }],
    success: false,
    total: 0,
    totalToday: 0
  };

  it('должно возвращать начальное состояние хранилища', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('должно обработать WS_CONNECTION_SUCCESS', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_CONNECTION_SUCCESS
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      wsError: false
    });
  });

  it('должно обработать WS_CONNECTION_ERROR', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_CONNECTION_ERROR
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      wsError: true
    });
  });

  it('должно обработать WS_CONNECTION_CLOSED', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_CONNECTION_CLOSED
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      wsError: false,
      allOrders: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0
      }
    });
  });

  it('должно обработать WS_GET_MESSAGE', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_GET_MESSAGE,
        payload: allOrders
      })
    ).toEqual({
      ...initialState,
      allOrders: allOrders
    });
  });

  it('должно обработать WS_CONNECTION_MY_SUCCESS', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_CONNECTION_MY_SUCCESS
      })
    ).toEqual({
      ...initialState,
      wsMyConnected: true,
      wsMyError: false
    });
  });

  it('должно обработать WS_CONNECTION_MY_ERROR', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_CONNECTION_MY_ERROR
      })
    ).toEqual({
      ...initialState,
      wsMyConnected: false,
      wsMyError: true
    });
  });

  it('должно обработать WS_CONNECTION_MY_CLOSED', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_CONNECTION_MY_CLOSED
      })
    ).toEqual({
      ...initialState,
      wsMyConnected: false,
      wsMyError: false,
      allMyOrders: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0
      }
    });
  });

  it('должно обработать WS_GET_MY_MESSAGE', () => {
    expect(
      orderReducer(initialState, {
        type: types.WS_GET_MY_MESSAGE,
        payload: allOrders
      })
    ).toEqual({
      ...initialState,
      allMyOrders: allOrders
    });
  });

  it('должно обработать GET_ORDER_REQUEST', () => {
    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_REQUEST
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false
    });
  });

  it('должно обработать GET_ORDER_SUCCESS', () => {
    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_SUCCESS,
        orderNumber: 'orderNumber'
      })
    ).toEqual({
      ...initialState,
      orderDetails: 'orderNumber',
      orderRequest: false
    });
  });

  it('должно обработать GET_ORDER_FAILED', () => {
    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_FAILED
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true
    });
  });

  it('должно обработать CLOSE_ORDER_MODAL', () => {
    expect(
      orderReducer(initialState, {
        type: types.CLOSE_ORDER_MODAL
      })
    ).toEqual({
      ...initialState,
      orderDetails: null
    });
  });
});
