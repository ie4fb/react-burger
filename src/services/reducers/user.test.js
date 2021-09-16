import { userReducer } from './user';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_SUCCESS,
  SET_USER,
  GET_USER_FAILED,
} from '../actions/user';

const initialState = {
  user: { email: '', name: '' },
  accessToken: null,
  refreshToken: null,
  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,
  isLoggedIn: false,
  isLoginRequestCompleted: false,
  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
};

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
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
  const user = { email: 'test@email', name: 'test' };
  const accessToken = '123';
  const refreshToken = '345';

  it('should handle LOGIN_REQUEST', () => {
    expect(
      userReducer(
        {
          loginRequest: false,
        },
        {
          type: LOGIN_REQUEST,
        },
      ),
    ).toEqual({
      loginRequest: true,
    });
  });
  it('should handle LOGIN_REQUEST_SUCCESS', () => {
    expect(
      userReducer(
        {
          user: null,
          accessToken: null,
          refreshToken: null,
          loginFailed: false,
          loginRequest: true,
          loginSuccess: false,
          isLoggedIn: true,
          isLoginRequestCompleted: false,
        },
        {
          type: LOGIN_REQUEST_SUCCESS,
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      ),
    ).toEqual({
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      loginFailed: false,
      loginRequest: false,
      loginSuccess: true,
      isLoggedIn: true,
      isLoginRequestCompleted: true,
    });
  });
  it('should handle LOGIN_REQUEST_FAILED', () => {
    expect(
      userReducer(
        {
          loginRequest: true,
          loginFailed: false,
        },
        {
          type: LOGIN_REQUEST_FAILED,
        },
      ),
    ).toEqual({
      loginRequest: false,
      loginFailed: true,
    });
  });
  it('should handle REGISTER_REQUEST', () => {
    expect(
      userReducer(
        {
          registerRequest: false,
        },
        {
          type: REGISTER_REQUEST,
        },
      ),
    ).toEqual({
      registerRequest: true,
    });
  });
  it('should handle REGISTER_REQUEST_SUCCESS', () => {
    expect(
      userReducer(
        {
          user: null,
          accessToken: null,
          refreshToken: null,
          registerFailed: false,
          registerRequest: true,
          isLoggedIn: false,
          registerSuccess: false,
        },
        {
          type: REGISTER_REQUEST_SUCCESS,
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      ),
    ).toEqual({
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      registerFailed: false,
      registerRequest: false,
      isLoggedIn: true,
      registerSuccess: true,
    });
  });
  it('should handle REGISTER_REQUEST_FAILED', () => {
    expect(
      userReducer(
        {
          registerFailed: false,
          registerRequest: true,
        },
        {
          type: REGISTER_REQUEST_FAILED,
        },
      ),
    ).toEqual({
      registerFailed: true,
      registerRequest: false,
    });
  });
  it('should handle LOGOUT_REQUEST_SUCCESS', () => {
    expect(
      userReducer(
        {
          isLoggedIn: true,
          user: user,
        },
        {
          type: LOGOUT_REQUEST_SUCCESS,
        },
      ),
    ).toEqual({
      isLoggedIn: false,
      user: {},
    });
  });
  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      userReducer(
        {
          forgotPasswordRequest: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST,
        },
      ),
    ).toEqual({
      forgotPasswordRequest: true,
    });
  });
  it('should handle FORGOT_PASSWORD_REQUEST_SUCCESS', () => {
    expect(
      userReducer(
        {
          forgotPasswordSuccess: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST_SUCCESS,
        },
      ),
    ).toEqual({
      forgotPasswordSuccess: true,
    });
  });
  it('should handle SET_USER', () => {
    expect(
      userReducer(
        {
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
          isLoginRequestCompleted: false,
        },
        {
          type: SET_USER,
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      ),
    ).toEqual({
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      isLoggedIn: true,
      isLoginRequestCompleted: true,
    });
  });
  it('should handle GET_USER_FAILED', () => {
    expect(
      userReducer(
        {
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
          isLoggedIn: true,
          isLoginRequestCompleted: true,
        },
        {
          type: GET_USER_FAILED,
        },
      ),
    ).toEqual({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      isLoginRequestCompleted: true,
    });
  });
  it('should handle RESET_PASSWORD_REQUEST_SUCCESS', () => {
    expect(
      userReducer(
        {
          resetPasswordSuccess: false,
        },
        {
          type: RESET_PASSWORD_REQUEST_SUCCESS,
        },
      ),
    ).toEqual({
      resetPasswordSuccess: true,
    });
  });
});
