import axios from "axios";
import { returnErrors } from "./errorActions";
import { GETTING_NEWS, GOT_NEWS, FAILED_NEWS } from "./types";

const apiKey = "5221c592094742ffb3319227e101a89d";

export const getNews = () => (dispatch, getState) => {
  // Headers
  dispatch({ type: GETTING_NEWS });
  axios
    .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
    .then(res => {
      console.log(res.data);

      dispatch({
        type: GOT_NEWS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("cant get news list");
      dispatch({ type: FAILED_NEWS });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
