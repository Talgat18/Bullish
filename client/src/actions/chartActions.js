import axios from "axios";
import { returnErrors } from "./errorActions";
import {
} from "./types";


export const getChart = () => (dispatch, getState) => {

    dispatch({ type: CHART });
      // Headers
      
      const token = getState().auth.token;
      axios
        .get(`${proxy}https://stockstore.herokuapp.com/api/account/info`, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
       
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
  