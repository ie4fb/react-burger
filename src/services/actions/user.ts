import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  getToken,
  resetPasswordRequest,
  forgotPasswordRequest,
} from '../burgerApi';
import { setCookie, getCookie } from '../utils';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_REQUEST_SUCCESS =
  'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';

export const SET_USER = 'SET_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginRequestSuccess {
  readonly type: typeof LOGIN_REQUEST_SUCCESS;
  readonly user: { email: string; name: string };
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly loginFailed: boolean;
  readonly loginRequest: boolean;
  readonly loginSuccess: boolean,
  readonly isLoggedIn: boolean,
  readonly isLoginRequestCompleted: boolean,
}

export interface ILoginRequestFailed {
  readonly type: typeof LOGIN_REQUEST_FAILED;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterRequestSuccess {
  readonly type: typeof REGISTER_REQUEST_SUCCESS;
  readonly user: { email: string; name: string };
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IRegisterRequestFailed {
  readonly type: typeof REGISTER_REQUEST_FAILED;
}
export interface ISetUser {
  readonly type: typeof SET_USER;
  readonly user: { email: string; name: string };
  readonly accessToken: string;
  readonly refreshToken: string;
}
export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
  readonly user: { email: string; name: string };
}
export interface ILogoutRequestSuccess {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
  readonly user: { email: string; name: string };
  readonly isLoggedIn: boolean;
}
export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
  readonly forgotPasswordRequest: boolean;
}
export interface IForgotPasswordRequestSuccess {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
  readonly forgotPasswordSuccess: boolean;
}
export interface IResetPasswordRequestSuccess {
  readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
  readonly resetPasswordSuccess: boolean;
}


export type TUserActions =
  | ILoginRequestFailed
  | IRegisterRequest
  | IRegisterRequestSuccess
  | IRegisterRequestFailed
  | ISetUser
  | IGetUserFailed
  | ILoginRequest
  | ILoginRequestSuccess
  | ILogoutRequestSuccess
  | IForgotPasswordRequest
  | IForgotPasswordRequestSuccess
  | IResetPasswordRequestSuccess;

export function login(data: { email: string; password: string }) {
  return function (dispatch: any) {
    dispatch({
      type: LOGIN_REQUEST,
    });

    loginRequest(data)
      .then(({ user, accessToken, refreshToken }) => {
        dispatch({
          type: LOGIN_REQUEST_SUCCESS,
          user,
          accessToken,
          refreshToken,
        });
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: LOGIN_REQUEST_FAILED,
        });
      });
  };
}

export function register(data: {
  email: string;
  name: string;
  password: string;
}) {
  return function (dispatch: any) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerRequest(data)
      .then(({ user, accessToken, refreshToken }) => {
        dispatch({
          type: REGISTER_REQUEST_SUCCESS,
          user,
          accessToken,
          refreshToken,
        });

        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: REGISTER_REQUEST_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch: any) {
    const refreshToken = localStorage.getItem('refreshToken');
    logoutRequest({ token: refreshToken })
      .then(() => {
        dispatch({
          type: LOGOUT_REQUEST_SUCCESS,
        });
        localStorage.removeItem('refreshToken');
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function forgotPassword(data: { email: string}) {
  return function (dispatch: any) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPasswordRequest(data)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST_SUCCESS,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function resetPassword(data: { email: string; password: string }) {
  return function (dispatch: any) {
    resetPasswordRequest(data)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_REQUEST_SUCCESS,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function getUser() {
  return function (dispatch: any) {
    getUserRequest()
      .then(({ user }) => {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = getCookie('token');
        console.log(user)
        dispatch({
          type: SET_USER,
          user,
          accessToken,
          refreshToken,
        });
      })
      .catch(err => {
        if (err === 'jwt expired') {
          dispatch(refreshToken(getUser()));
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      });
  };
}

export function updateUser(data: { email: string; name: string; password?: string }) {
  return function (dispatch: any) {
    updateUserRequest(data)
      .then(({ user }) => {
        dispatch({
          type: SET_USER,
          user,
        });
      })
      .catch(err => {
        if (err === 'jwt expired') {
          dispatch(refreshToken(getUser()));
        } else {
          console.error(err);
        }
      });
  };
}

const refreshToken = (callback: any) => {
  return function (dispatch: any) {
    const refreshToken = localStorage.getItem('refreshToken');
    getToken({ token: refreshToken }).then(({ accessToken, refreshToken }) => {
      setCookie('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(callback);
    });
  };
};
