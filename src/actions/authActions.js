import * as actionTypes from "../constants/types";

export const loginStart = user => ({
  type: actionTypes.SIGNIN_START,
  payload: user
});

export const loginFetchSucceed = tokens => ({
  type: actionTypes.SIGNIN_SUCCEED,
  payload: tokens
});

export const loginFail = () => ({
  type: actionTypes.SIGNIN_FAILED
});

export const registerStart = user => ({
  type: actionTypes.SIGNUP_START,
  payload: user
});

export const registerFetchSucceed = tokens => ({
  type: actionTypes.SIGNUP_SUCCEED,
  payload: tokens
});

export const registerFail = () => ({
  type: actionTypes.SIGNUP_FAILED
});

export const refreshStart = () => ({
  type: actionTypes.REFRESH_START
});

export const refreshSucceed = tokens => ({
  type: actionTypes.REFRESH_SUCCEED,
  payload: tokens
});

export const refreshFailed = () => ({
  type: actionTypes.REFRESH_FAILED
});

export const logout = () => ({
  type: actionTypes.LOGOUT
});

export const checkUser = () => ({
  type: actionTypes.CHECK_USER
});
