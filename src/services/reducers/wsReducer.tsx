import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,

} from '../actions/wsActions';
import { TOrderItem } from '../../types/data';
import { TWSActions } from '../actions/wsActions';

type TWSinitialState = {
  wsConnected: boolean;
  wsError: boolean;
  wsData: {
    orders: TOrderItem[];
    total: number;
    totalToday: number;
  };
};

const WSinitialState: TWSinitialState = {
  wsConnected: false,
  wsError: false,
  wsData: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsReducer = (state = WSinitialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        wsData: action.payload,
      };
    default:
      return state;
  }
};
