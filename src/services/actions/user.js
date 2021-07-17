import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  getToken,
  resetPasswordRequest,
  forgotPasswordRequest,
} from '../../services/burgerApi';
import { setCookie, getCookie } from '../../services/utils';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_REQUEST_SUCCESS =
  'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';

export const SET_USER = 'SET_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export function login(data) {
  return function (dispatch) {
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

export function register(data) {
  return function (dispatch) {
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
  return function (dispatch) {
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

export function forgotPassword(data) {
  return function (dispatch) {
    dispatch({
      type:FORGOT_PASSWORD_REQUEST
    })
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

export function resetPassword(data) {
  return function (dispatch) {
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
  return function (dispatch) {
    getUserRequest()
      .then(({ user }) => {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = getCookie('token');
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
          dispatch({type: GET_USER_FAILED});
        }
      });
  };
}

export function updateUser(data) {
  return function (dispatch) {
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

const refreshToken = callback => {
  return function (dispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    getToken({ token: refreshToken }).then(
      ({ accessToken, refreshToken }) => {
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(callback);
      },
    );
  };
};
