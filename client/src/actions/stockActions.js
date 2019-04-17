import axios from "axios";
import { returnErrors } from "./errorActions";
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

const proxy = "https://cors-anywhere.herokuapp.com/";

export const getInfo = () => (dispatch, getState) => {
  dispatch({ type: GETTING_INFO });
  // Headers

  const token = getState().auth.token;
  axios
    .get(`${proxy}https://stockstore.herokuapp.com/api/account/info`, {
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
      console.log(err.response);
      console.log("бля нужен новый токен");
      // dispatch(
      //   returnErrors(
      //     err.response.data.message,
      //     err.response.status,
      //     "INVALID_TOKEN"
      //   )
      // );
      dispatch({ type: GET_INFO_FAILED });
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getStockList = () => (dispatch, getState) => {
  // Headers

  const token = getState().auth.token;
  axios
    .get(
      `${proxy}https://stockstore.herokuapp.com/api/stocks?search=${2}&count=${5}`,
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => {
      console.log(res.data);

      dispatch({
        type: GET_STOCK_LIST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("cant get stock list");
      dispatch({ type: GET_STOCK_LIST_FAILED });
      // dispatch(
      //   returnErrors(
      //     err.response.data.message,
      //     err.response.status,
      //     "INVALID_TOKEN"
      //   )
      // );
    });
};

export const getStockHistory = id => (dispatch, getState) => {
  // Headers
  dispatch({ type: GETTING_STOCK_HISTORY });

  const token = getState().auth.token;
  axios
    .get(
      `${proxy}https://stocks-mocks.herokuapp.com/api/stocks/${id}/history?range=${"month"}`,
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

      console.log(res.data);

      dispatch({
        type: GOT_STOCK_HISTORY,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("cant get stock list");
      dispatch({ type: FAILED_STOCK_HISTORY });
    });
};

export const buyingStock = ({ stockId, amount }) => (dispatch, getState) => {
  dispatch({ type: BUYING_STOCK });
  // Headers
  const token = getState().auth.token;

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: token
  //   }
  // };

  // Request body
  //const body = JSON.stringify({ stockId, amount });

  axios
    .post(
      `${proxy}https://stockstore.herokuapp.com/api/transaction/buy`,
      {
        stockId: stockId,
        amount: amount
      },
      {
        headers: { "Content-Type": "application/json", Authorization: token }
      }
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: BOUGHT_STOCK,
        payload: res.data
      });
    })
    .catch(err => {
      // dispatch(
      //   returnErrors(
      //     err.response.data.invalidFields[0].message,
      //     err.response.status,
      //     "LOGIN_FAIL"
      //   )
      // );
      console.log(err.response.status);
      dispatch({ type: BUYING_STOCK_FAILED });
    });
};

export const sellingStock = ({ stockId, amount }) => (dispatch, getState) => {
  dispatch({ type: SELLING_STOCK });
  // Headers
  const token = getState().auth.token;

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: token
  //   }
  // };

  // Request body
  //const body = JSON.stringify({ stockId, amount });
  console.log(stockId, amount);
  axios
    .post(
      `${proxy}https://stockstore.herokuapp.com/api/transaction/sell`,
      {
        stockId: stockId,
        amount: amount
      },
      {
        headers: { "Content-Type": "application/json", Authorization: token }
      }
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: SOLD_STOCK,
        payload: res.data
      });
    })
    .catch(err => {
      // dispatch(
      //   returnErrors(
      //     err.response.data.invalidFields[0].message,
      //     err.response.status,
      //     "LOGIN_FAIL"
      //   )
      // );
      console.log(err.response);
      dispatch({ type: SELLING_STOCK_FAILED });
    });
};
