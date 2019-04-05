import axios from "axios";
import { returnErrors } from "./errorActions";
import {

  GET_INFO,
  GET_INFO_FAILED,
  GET_STOCK_LIST,
  GET_STOCK_LIST_FAILED
} from "./types";

const proxy = "https://cors-anywhere.herokuapp.com/";



export const getInfo = () => (dispatch, getState) => {
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
        console.log('бля нужен новый токен');
        dispatch({ type: GET_INFO_FAILED });
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };


  export const getStockList = () => (dispatch, getState) => {
    // Headers
  
    const token = getState().auth.token;
    axios
      .get(`${proxy}https://stockstore.herokuapp.com/api/stocks?search=${1}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log(res.data);
     
        dispatch({
          type: GET_STOCK_LIST,
          payload: res.data
        });
      })
      .catch(err => {
        console.log('cant get stock list');
        dispatch({ type: GET_STOCK_LIST_FAILED });
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
  


