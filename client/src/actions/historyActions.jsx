import axios from "axios";
import {
  GOT_TRANS_HISTORY,
  FAILED_TRANS_HISTORY
} from "./types";

export const getHistory = () => (dispatch, getState) => {
  const token = getState().auth.token;
  axios
    .get(`https://stockstore.herokuapp.com/api/transaction/history`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: GOT_TRANS_HISTORY,
        payload: res
      });
    })
    .catch(err => {
      dispatch({ type: FAILED_TRANS_HISTORY });
    });
};
