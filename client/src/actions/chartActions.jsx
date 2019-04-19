import axios from "axios";
import { returnErrors } from "./errorActions";
import { CHART, GET_INFO, GET_INFO_FAILED } from "./types";

export const getChart = () => (dispatch, getState) => {
  dispatch({ type: CHART });

  const token = getState().auth.token;
  axios
    .get(`https://stockstore.herokuapp.com/api/stocks/1/history`, {
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
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
