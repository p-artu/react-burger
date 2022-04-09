import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';

type wsActionsType = {
  wsInit: "WS_CONNECTION_START" | "WS_CONNECTION_MY_START";
  onOpen: "WS_CONNECTION_SUCCESS" | "WS_CONNECTION_MY_SUCCESS";
  onClose: "WS_CONNECTION_CLOSED" | "WS_CONNECTION_MY_CLOSED";
  onError: "WS_CONNECTION_ERROR" | "WS_CONNECTION_MY_ERROR";
  onMessage: "WS_GET_MESSAGE" | "WS_GET_MY_MESSAGE";
};

export const socketMiddleware = (wsUrl: string, wsActions: wsActionsType): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return next => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen });
        };
        socket.onerror = event => {
          dispatch({ type: onError });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData);
          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = event => {
          dispatch({ type: onClose });
        };
      }
      next(action);
    };
  }) as Middleware;
};
