import {
  SIGNUP_SUCCEED,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNIN_START,
  SIGNIN_FAILED,
  SIGNIN_SUCCEED,
  LOGOUT,
  CHECK_USER,
  REFRESH_START,
  REFRESH_SUCCEED,
  REFRESH_FAILED
} from "../constants/types";

const loginStart = user => ({
  type: SIGNIN_START,
  payload: user
});

const loginFetchSucceed = tokens => ({
  type: SIGNIN_SUCCEED,
  payload: tokens
});

const loginFail = () => ({
  type: SIGNIN_FAILED
});

const registerStart = user => ({
  type: SIGNUP_START,
  payload: user
});

const registerFetchSucceed = tokens => ({
  type: SIGNUP_SUCCEED,
  payload: tokens
});

const registerFail = () => ({
  type: SIGNUP_FAILED
});

const refreshStart = () => ({
  type: REFRESH_START
});

const refreshSucceed = tokens => ({
  type: REFRESH_SUCCEED,
  payload: tokens
});

const refreshFailed = () => ({
  type: REFRESH_FAILED
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
  refreshSucceed,
  refreshFailed,
  loginFail,
  registerFail
};
