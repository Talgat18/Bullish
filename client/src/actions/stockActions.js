import {
  GETINFO_START,
  GETINFO_FETCH_SUCCEEDED,
  GET_STOCK_LIST,
  GET_STOCK_LIST_SUCCEED,
  BUYING_STOCK,
  BOUGHT_STOCK,
  SELLING_STOCK,
  SOLD_STOCK
} from "../constants/types";

const getInfoStart = () => ({
  type: GETINFO_START
});

const getInfoFetchSucceed = data => ({
  type: GETINFO_FETCH_SUCCEEDED,
  payload: data
});

const getStockList = () => ({
  type: GET_STOCK_LIST
});
const getStockListSucceed = data => ({
  type: GET_STOCK_LIST_SUCCEED,
  payload: data
});

const buyingStock = data => ({
  type: BUYING_STOCK,
  payload: data
});

const boughtStock = data => ({
  type: BOUGHT_STOCK,
  payload: data
});

const sellingStock = data => ({
  type: SELLING_STOCK,
  payload: data
});

const soldStock = data => ({
  type: SOLD_STOCK,
  payload: data
});


export {
  getInfoStart,
  getInfoFetchSucceed,
  getStockList,
  getStockListSucceed,
  buyingStock,
  boughtStock,
  sellingStock,
  soldStock
};
