import { call, put, takeEvery, select } from "redux-saga/effects";
import { getRefreshToken } from "../selectors/selectors";
import * as type from "../constants/types";
import * as authActions from "../actions/authActions";
import * as api from "../services/authApi";
import { returnErrors } from "../actions/errorsActions";

function* signUpSaga(action) {
  try {
    const data = yield call(api.fetchSignUp, action.payload);

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

function* signInSaga(action) {
  try {
    const data = yield call(api.fetchSignIn, action.payload);

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
    const data = yield call(api.fetchRefresh, refreshToken);
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
  yield takeEvery(type.SIGNUP_START, signUpSaga);
  yield takeEvery(type.SIGNIN_START, signInSaga);
  yield takeEvery(type.REFRESH_START, refreshSaga);
}

export default mySaga;
