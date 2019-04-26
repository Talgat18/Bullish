import { GOT_STOCK_HISTORY_START, GOT_STOCK_HISTORY } from "../constants/types";

const getStockHistory = (id, range) => ({
  type: GOT_STOCK_HISTORY_START,
  payload: { id, range }
});

const getStockHistorySucceed = data => ({
  type: GOT_STOCK_HISTORY,
  payload: data
});

export { getStockHistory, getStockHistorySucceed };
