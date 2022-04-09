import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState, wsActionsType } from '../types';

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
