import { orderReducer } from './order';
import {
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  RESET_ORDER_DETAILS,
  SET_ORDERS,
  SHOW_ORDER_INFO,
  RESET_ORDER_DATA,
  GET_ORDERS_FEED,
  GET_ORDERS_FEED_SUCCESS,
  GET_ORDERS_FEED_FAILURE,
} from '../actions/order';

const initialState = {
  name: null,
  order: null,
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  orders: {
    orders: [],
    totalToday: 0,
    total: 0,
  },
  orderInfo: null,
  orderInfoRequested: false,
  orderFeedRequest: false,
  orderFeedRequestSuccess: false,
  orderFeedRequestFailed: false,
};
describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
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

  it('should handle PLACE_ORDER', () => {
    expect(
      orderReducer(
        {
          orderRequest: false,
        },
        {
          type: PLACE_ORDER,
        },
      ),
    ).toEqual({
      orderRequest: true,
    });
  });
  it('should handle PLACE_ORDER_SUCCESS', () => {
    expect(
      orderReducer(
        {
          orderFailed: false,
          orderRequest: true,
          orderSuccess: false,
        },
        {
          type: PLACE_ORDER_SUCCESS,
        },
      ),
    ).toEqual({
      orderFailed: false,
      orderRequest: false,
      orderSuccess: true,
    });
  });
  it('should handle PLACE_ORDER_FAILURE', () => {
    expect(
      orderReducer(
        {
          orderFailed: false,
          orderRequest: true,
          orderSuccess: false,
        },
        {
          type: PLACE_ORDER_FAILURE,
        },
      ),
    ).toEqual({
      orderFailed: true,
      orderRequest: false,
      orderSuccess: false,
    });
  });
  it('should handle RESET_ORDER_DETAILS', () => {
    expect(
      orderReducer(
        {
          name: 'some',
          order: 'null',
          orderRequest: false,
          orderFailed: false,
          orderSuccess: true,
        },
        {
          type: RESET_ORDER_DETAILS,
        },
      ),
    ).toEqual({
      name: null,
      order: null,
      orderRequest: false,
      orderFailed: false,
      orderSuccess: false,
    });
  });
  it('should handle SET_ORDERS', () => {
    expect(
      orderReducer(
        {
          orders: [],
        },
        {
          type: SET_ORDERS,
          orders: [order, order, order],
        },
      ),
    ).toEqual({
      orders: [order, order, order],
    });
  });
  it('should handle SHOW_ORDER_INFO', () => {
    expect(
      orderReducer(
        {
          orderInfo: null,
          orderInfoRequested: false,
        },
        {
          type: SHOW_ORDER_INFO,
          order: order,
        },
      ),
    ).toEqual({
      orderInfo: order,
      orderInfoRequested: true,
    });
  });
  it('should handle RESET_ORDER_DATA', () => {
    expect(
      orderReducer(
        {
          orderInfo: order,
          orderInfoRequested: true,
        },
        {
          type: RESET_ORDER_DATA,
        },
      ),
    ).toEqual({
      orderInfo: null,
      orderInfoRequested: false,
    });
  });
  it('should handle GET_ORDERS_FEED', () => {
    expect(
      orderReducer(
        {
          orderFeedRequest: false,
        },
        {
          type: GET_ORDERS_FEED,
        },
      ),
    ).toEqual({
      orderFeedRequest: true,
    });
  });
  it('should handle GET_ORDERS_FEED_SUCCESS', () => {
    expect(
      orderReducer(
        {
          orderFeedRequest: true,
          orders: [],
        },
        {
          type: GET_ORDERS_FEED_SUCCESS,
          orders: [order, order, order],
        },
      ),
    ).toEqual({
      orders: [order, order, order],
      orderFeedRequest: false,
    });
  });
  it('should handle GET_ORDERS_FEED_FAILURE', () => {
    expect(
      orderReducer(
        {
          orderFeedRequest: true,
          orders: [order, order, order],
        },
        {
          type: GET_ORDERS_FEED_FAILURE,
        },
      ),
    ).toEqual({
      orders: [],
      orderFeedRequest: false,
    });
  });
});
