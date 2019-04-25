import { call, put, takeEvery, select } from "redux-saga/effects";
import { getRefreshToken } from "../selectors/selectors";
import { SIGNUP_START, SIGNIN_START, REFRESH_START } from "../constants/types";
import signUp from "../api/auth/signUp";
import login from "../api/auth/signIn";
import refresh from "../api//auth/refresh";
import * as authActions from "../actions/authActions";
import { returnErrors } from "../actions/errorsActions";

// import * as actions from "../actions/authActions";

// const { loginUser } = actions;

function* signUpSaga(action) {
  try {
    const data = yield call(signUp, action.payload);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    if (data.code) {
      yield put(returnErrors(data.message, data.code, "REGISTER_FAIL"));
      yield put(authActions.loginFail());
    } else {
      yield put(authActions.registerFetchSucceed(data));
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* signIn(action) {
  try {
    const data = yield call(login, action.payload);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    if (data.code) {
      yield put(returnErrors(data.message, data.code, "LOGIN_FAIL"));
      yield put(authActions.loginFail());
    } else {
      yield put(authActions.loginFetchSucceed(data));
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* refreshSaga() {
  const refreshToken = yield select(getRefreshToken);
  try {
    const data = yield call(refresh, refreshToken);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    if (data.code === "401") {
      yield put(authActions.refreshFailed());
    } else yield put(authActions.refreshSucceed(data));
  } catch (e) {
    yield put({ type: "REFRESH_FAILED", message: e.message });
  }
}

function* mySaga() {
  yield takeEvery(SIGNUP_START, signUpSaga);
  yield takeEvery(SIGNIN_START, signIn);
  yield takeEvery(REFRESH_START, refreshSaga);
}

export default mySaga;
