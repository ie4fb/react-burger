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
  GET_USER_FAILED
} from '../actions/user';

const initialState = {
  user: {},
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

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loginFailed: false,
        loginRequest: false,
        loginSuccess: true,
        isLoggedIn: true,
        isLoginRequestCompleted: true,
      };
    }
    case LOGIN_REQUEST_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        registerFailed: false,
        registerRequest: false,
        isLoggedIn: true,
        registerSuccess: true,
      };
    }
    case REGISTER_REQUEST_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return { ...state, isLoggedIn: false, user: {} };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }
    case FORGOT_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        forgotPasswordSuccess: true,
      };
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        resetPasswordSuccess: true,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLoggedIn: true,
        isLoginRequestCompleted: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false,
        isLoginRequestCompleted: true,
      };
    }
    default: {
      return state;
    }
  }
};
