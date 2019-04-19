import axios from "axios";
import {
  GET_INFO,
  GETTING_INFO,
  GET_INFO_FAILED,
  GET_STOCK_LIST,
  GET_STOCK_LIST_FAILED,
  GETTING_STOCK_HISTORY,
  GOT_STOCK_HISTORY,
  FAILED_STOCK_HISTORY,
  BUYING_STOCK,
  BOUGHT_STOCK,
  BUYING_STOCK_FAILED,
  SELLING_STOCK,
  SOLD_STOCK,
  SELLING_STOCK_FAILED
} from "./types";


export const getInfo = () => (dispatch, getState) => {
  dispatch({ type: GETTING_INFO });

  const token = getState().auth.token;
  axios
    .get(`https://stockstore.herokuapp.com/api/account/info`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: GET_INFO_FAILED });
    });
};

export const getStockList = () => (dispatch, getState) => {
  const token = getState().auth.token;
  axios
    .get(`https://stockstore.herokuapp.com/api/stocks?count=${20}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: GET_STOCK_LIST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: GET_STOCK_LIST_FAILED });
    });
};

export const getStockHistory = id => (dispatch, getState) => {
  dispatch({ type: GETTING_STOCK_HISTORY });

  const token = getState().auth.token;
  axios
    .get(
      `https://stocks-mocks.herokuapp.com/api/stocks/${id}/history?range=${"month"}`,
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => {
      let price = [];
      let date = [];
      const data = res.data.history;

      data.map(obj => price.push(obj.price));
      data.map(obj => date.push(obj.date));

      res.data.price = price;
      res.data.date = date;

      dispatch({
        type: GOT_STOCK_HISTORY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: FAILED_STOCK_HISTORY });
    });
};

export const buyingStock = ({ stockId, amount }) => (dispatch, getState) => {
  dispatch({ type: BUYING_STOCK });
  const token = getState().auth.token;

  axios
    .post(
      `https://stockstore.herokuapp.com/api/transaction/buy`,
      {
        stockId: stockId,
        amount: amount
      },
      {
        headers: { "Content-Type": "application/json", Authorization: token }
      }
    )
    .then(res => {
      dispatch({
        type: BOUGHT_STOCK,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: BUYING_STOCK_FAILED });
    });
};

export const sellingStock = ({ stockId, amount }) => (dispatch, getState) => {
  dispatch({ type: SELLING_STOCK });

  const token = getState().auth.token;

  console.log(stockId, amount);
  axios
    .post(
      `https://stockstore.herokuapp.com/api/transaction/sell`,
      {
        stockId: stockId,
        amount: amount
      },
      {
        headers: { "Content-Type": "application/json", Authorization: token }
      }
    )
    .then(res => {
      dispatch({
        type: SOLD_STOCK,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: SELLING_STOCK_FAILED });
    });
};
