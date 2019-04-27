import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  getAccessToken,
  getChartDate,
  getChartPrice
} from "../selectors/selectors";
import { sortStockHistory } from "../utils/sortStockHistory";
import * as type from "../constants/types";
import * as stockActions from "../actions/stockActions";
import * as api from "../services/stockApi";
import { getStockHistorySucceed } from "../actions/chartActions";
import { getTransHistorySucceed } from "../actions/historyActions";

function* getInfoSaga() {
  const token = yield select(getAccessToken);
  try {
    const data = yield call(api.fetchInfo, token);
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
    const data = yield call(api.fetchTransHistory, token);

    yield put(getTransHistorySucceed(data));
  } catch (e) {
    yield put({ type: "GET_HISTORY_FAILED", message: e.message });
  }
}

function* getStockListSaga() {
  const token = yield select(getAccessToken);
  try {
    const data = yield call(api.fetchStockList, token);

    yield put(stockActions.getStockListSucceed(data));
  } catch (e) {
    yield put({ type: "GET_STOCK_LIST_FAILED", message: e.message });
  }
}

function* buyingStockSaga(action) {
  const token = yield select(getAccessToken);

  try {
    const data = yield call(api.fetchBuying, action.payload, token);

    yield put(stockActions.boughtStock(data));
  } catch (e) {
    yield put({ type: "BUYING_STOCK_FAILED", message: e.message });
  }
}

function* sellingStockSaga(action) {
  const token = yield select(getAccessToken);

  try {
    const data = yield call(api.fetchSelling, action.payload, token);

    yield put(stockActions.soldStock(data));
  } catch (e) {
    yield put({ type: "SELLING_STOCK_FAILED", message: e.message });
  }
}

function* gettingStockHistorySaga(action) {
  const token = yield select(getAccessToken);
  const date = yield select(getChartDate);
  const price = yield select(getChartPrice);

  try {
    const data = yield call(
      api.fetchStockHistory,
      action.payload.id,
      action.payload.range,
      token
    );
    const res = sortStockHistory(data);

    date.push(res.date);
    price.push(res.price);
    yield put(getStockHistorySucceed(date, price));
  } catch (e) {
    yield put({ type: "GETTING_STOCK_HISTORY_FAILED", message: e.message });
  }
}

function* mySaga() {
  yield takeEvery(type.GETINFO_START, getInfoSaga);
  yield takeEvery(type.GET_TRANS_HISTORY, getTransHistorySaga);
  yield takeEvery(type.GET_STOCK_LIST, getStockListSaga);
  yield takeEvery(type.BUYING_STOCK, buyingStockSaga);
  yield takeEvery(type.SELLING_STOCK, sellingStockSaga);
  yield takeEvery(type.GOT_STOCK_HISTORY_START, gettingStockHistorySaga);
}

export default mySaga;
