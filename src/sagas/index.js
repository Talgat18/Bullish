import { all } from "redux-saga/effects";

import authSaga from "./authSaga";
import stockSaga from "./stockSaga";

export default function* rootSaga() {
  yield all([authSaga(),stockSaga()]);
}
