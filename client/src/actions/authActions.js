import {
  SIGNUP_FETCH_SUCCEEDED,
  SIGNUP_START,
  SIGNIN_START,
  SIGNIN_FETCH_SUCCEEDED,
  LOGOUT,
  CHECK_USER,
  REFRESH_START,
  REFRESH_SUCCEED
} from "../constants/types";

const loginStart = user => ({
  type: SIGNIN_START,
  payload: user
});

const loginFetchSucceed = tokens => ({
  type: SIGNIN_FETCH_SUCCEEDED,
  payload: tokens
});

const registerStart = user => ({
  type: SIGNUP_START,
  payload: user
});

const registerFetchSucceed = tokens => ({
  type: SIGNUP_FETCH_SUCCEEDED,
  payload: tokens
});

const refreshStart = refreshToken => ({
  type: REFRESH_START,
  payload: refreshToken
});

const refreshSucceed = tokens => ({
  type: REFRESH_SUCCEED,
  payload: tokens
});

const logout = () => ({
  type: LOGOUT
});

const checkUser = () => ({
  type: CHECK_USER
});

export {
  loginStart,
  loginFetchSucceed,
  registerStart,
  registerFetchSucceed,
  logout,
  checkUser,
  refreshStart,
  refreshSucceed
};
