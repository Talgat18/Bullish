import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHECK_TOKEN,
  TOKEN_UP,
  TOKEN_DOWN,
  REFRESHED_TOKEN,
  CLEAR_ERRORS
} from "./types";

export const register = ({ login, password }) => dispatch => {
  dispatch({ type: USER_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ login, password });

  axios
    .post(
      `https://stockstore.herokuapp.com/api/auth/signup`,
      body,
      config
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
      console.log(err.response.status);
      dispatch({ type: REGISTER_FAIL });
    });
};

export const login = ({ login, password }) => dispatch => {
  dispatch({ type: USER_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ login, password });

  axios
    .post(
      `https://stockstore.herokuapp.com/api/auth/signin`,
      body,
      config
    )
    .then(res => {
      console.log(res);
      res.data.name = login;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          "LOGIN_FAIL"
        )
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const refreshToken = () => dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const refreshToken = localStorage.getItem("refreshToken");

  const body = JSON.stringify({ refreshToken });
  console.log(refreshToken);
  axios
    .post(
      `https://stockstore.herokuapp.com/api/auth/refresh`,
      body,
      config
    )
    .then(res => {
      console.log(res.data);
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: REFRESHED_TOKEN,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.accessToken;
  console.log(getState().auth.accessToken);
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
};

export const checkToken = () => dispatch => {
  // User loading
  dispatch({ type: CHECK_TOKEN });
  const token = localStorage.getItem("token");
  if (token) {
    dispatch({ type: TOKEN_UP });
  } else {
    dispatch({ type: TOKEN_DOWN });
  }
};
