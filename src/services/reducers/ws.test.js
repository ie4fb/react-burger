import { wsReducer } from './wsReducer';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,

} from '../actions/wsActions';

const initialState = {
  wsConnected: false,
  wsError: false,
  wsData: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  const order = {
    _id: 'string',
    number: 'string',
    createdAt: 'string',
    name: 'string',
    status: 'string',
    price: 123,
    ingredients: ['string'],
  };

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
        },
        {
          type: WS_CONNECTION_SUCCESS,
        },
      ),
    ).toEqual({
      wsConnected: true,
    });
  });
  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          wsError: false
        },
        {
          type: WS_CONNECTION_ERROR,
        },
      ),
    ).toEqual({
      wsConnected: false,
      wsError: true,
    });
  });
  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          wsError: false
        },
        {
          type: WS_CONNECTION_CLOSED,
        },
      ),
    ).toEqual({
      wsConnected: false,
      wsError: false,
    });
  });
  it('should handle WS_GET_ORDERS', () => {
    expect(
      wsReducer(
        {
          wsData: []
        },
        {
          type: WS_GET_ORDERS,
          payload: [order, order, order]
        },
      ),
    ).toEqual({
      wsData: [order, order, order]
    });
  });
 
});
