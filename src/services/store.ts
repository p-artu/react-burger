import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import {
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
} from './constants';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};
export const wsMyActions = {
  wsInit: WS_CONNECTION_MY_START,
  onOpen: WS_CONNECTION_MY_SUCCESS,
  onClose: WS_CONNECTION_MY_CLOSED,
  onError: WS_CONNECTION_MY_ERROR,
  onMessage: WS_GET_MY_MESSAGE
};
const composeEnhancers =
  typeof window === 'object' && (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsMyActions)));

export const store = createStore(rootReducer, enhancer);
