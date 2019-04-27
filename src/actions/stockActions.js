import {
  GETINFO_START,
  GETINFO_SUCCEED,
  REFRESH_START,
  GET_STOCK_LIST,
  GET_STOCK_LIST_SUCCEED,
  BUYING_STOCK,
  BOUGHT_STOCK,
  SELLING_STOCK,
  SOLD_STOCK
} from "../constants/types";

export const getInfoStart = () => ({
  type: GETINFO_START
});

export const getInfoFetchSucceed = data => ({
  type: GETINFO_SUCCEED,
  payload: data
});

export const getInfoFetchFailed = () => ({
  type: REFRESH_START
});

export const getStockList = () => ({
  type: GET_STOCK_LIST
});
export const getStockListSucceed = data => ({
  type: GET_STOCK_LIST_SUCCEED,
  payload: data
});

export const buyingStock = data => ({
  type: BUYING_STOCK,
  payload: data
});

export const boughtStock = data => ({
  type: BOUGHT_STOCK,
  payload: data
});

export const sellingStock = data => ({
  type: SELLING_STOCK,
  payload: data
});

export const soldStock = data => ({
  type: SOLD_STOCK,
  payload: data
});

