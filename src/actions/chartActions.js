import { GOT_STOCK_HISTORY_START, GOT_STOCK_HISTORY } from "../constants/types";

export const getStockHistory = (id, range) => ({
  type: GOT_STOCK_HISTORY_START,
  payload: { id, range }
});

export const getStockHistorySucceed = (date, price) => ({
  type: GOT_STOCK_HISTORY,
  payload: { date, price }
});
