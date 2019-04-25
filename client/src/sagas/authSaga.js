import { call, put, takeEvery, select } from "redux-saga/effects";
import { getAccessToken } from "../selectors/selectors";
import { getRefreshToken } from "../selectors/selectors";
import { sortStockHistory } from "../utils/sortStockHistory";
import {
  SIGNUP_START,
  SIGNIN_START,
  REFRESH_START,
  GETINFO_START,
  GET_TRANS_HISTORY,
  GET_STOCK_LIST,
  BUYING_STOCK,
  SELLING_STOCK,
  GOT_STOCK_HISTORY_START
} from "../constants/types";
import signUp from "../api/auth/signUp";
import login from "../api/auth/signIn";
import refresh from "../api//auth/refresh";
import getInfo from "../api/getInfo";
import getTransHistory from "../api/getTransHistory";
import getStockList from "../api/stocks/getStockList";
import buyingStock from "../api/stocks/buyStock";
import sellingStock from "../api/stocks/sellStock";
import getChart from "../api/getChart";
import * as authActions from "../actions/authActions";
import * as stockActions from "../actions/stockActions";
import { getStockHistorySucceed } from "../actions/chartActions";
import { getTransHistorySucceed } from "../actions/historyActions";
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

function* getInfoSaga() {
  const token = yield select(getAccessToken);
  try {
    const data = yield call(getInfo, token);
    if (data.code === "401") {
      yield put(stockActions.getInfoFetchFailed());
    } else yield put(stockActions.getInfoFetchSucceed(data));
  } catch (e) {
    yield put({ type: "GET_INFO_FAILED", message: e.message });
  }
}

function* getTransHistorySaga() {
  const token = yield select(getAccessToken);
  try {
    const data = yield call(getTransHistory, token);

    yield put(getTransHistorySucceed(data));
  } catch (e) {
    yield put({ type: "GET_HISTORY_FAILED", message: e.message });
  }
}

function* getStockListSaga() {
  const token = yield select(getAccessToken);
  try {
    const data = yield call(getStockList, token);

    yield put(stockActions.getStockListSucceed(data));
  } catch (e) {
    yield put({ type: "GET_STOCK_LIST_FAILED", message: e.message });
  }
}

function* buyingStockSaga(action) {
  const token = yield select(getAccessToken);

  try {
    const data = yield call(buyingStock, action.payload, token);

    yield put(stockActions.boughtStock(data));
  } catch (e) {
    yield put({ type: "BUYING_STOCK_FAILED", message: e.message });
  }
}

function* sellingStockSaga(action) {
  const token = yield select(getAccessToken);

  try {
    const data = yield call(sellingStock, action.payload, token);

    yield put(stockActions.soldStock(data));
  } catch (e) {
    yield put({ type: "SELLING_STOCK_FAILED", message: e.message });
  }
}

function* gettingStockHistorySaga(action) {
  const token = yield select(getAccessToken);

  try {
    const data = yield call(getChart, action.payload, token);
    const res = sortStockHistory(data);
    yield put(getStockHistorySucceed(res));
  } catch (e) {
    yield put({ type: "GETTING_STOCK_HISTORY_FAILED", message: e.message });
  }
}

function* mySaga() {
  yield takeEvery(SIGNUP_START, signUpSaga);
  yield takeEvery(SIGNIN_START, signIn);
  yield takeEvery(REFRESH_START, refreshSaga);
  yield takeEvery(GETINFO_START, getInfoSaga);
  yield takeEvery(GET_TRANS_HISTORY, getTransHistorySaga);
  yield takeEvery(GET_STOCK_LIST, getStockListSaga);
  yield takeEvery(BUYING_STOCK, buyingStockSaga);
  yield takeEvery(SELLING_STOCK, sellingStockSaga);
  yield takeEvery(GOT_STOCK_HISTORY_START, gettingStockHistorySaga);
}

export default mySaga;
