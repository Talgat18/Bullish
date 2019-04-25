import {
  SIGNUP_FETCH_SUCCEEDED,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNIN_START,
  SIGNIN_FAILED,
  SIGNIN_FETCH_SUCCEEDED,
  LOGOUT,
  CHECK_USER,
  REFRESH_START,
  REFRESH_SUCCEED,
  REFRESH_FAILED
} from "../constants/types";

const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const LOGIN = createRequestTypes("LOGIN");
export const REGISTER = createRequestTypes("REGISTER");

function action(type, payload = {}) {
  return { type, ...payload };
}

export const loginUser = {
  request: login => action(LOGIN[REQUEST], { login }),
  success: (login, response) => action(LOGIN[SUCCESS], { login, response }),
  failure: (login, error) => action(LOGIN[FAILURE], { login, error })
};

const loginStart = user => ({
  type: SIGNIN_START,
  payload: user
});

const loginFetchSucceed = tokens => ({
  type: SIGNIN_FETCH_SUCCEEDED,
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
  type: SIGNUP_FETCH_SUCCEEDED,
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
