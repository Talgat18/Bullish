import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADD_SCORE,
  CHECK_TOKEN,
  TOKEN_UP,
  TOKEN_DOWN,
  REFRESHED_TOKEN
} from "./types";

const proxy = "https://cors-anywhere.herokuapp.com/";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User
export const register = ({ login, password }) => dispatch => {
  dispatch({ type: USER_LOADING });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ login, password });

  axios
    .post(
      `${proxy}https://stockstore.herokuapp.com/api/auth/signup`,
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
          err.response.data.invalidFields[0].message,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
      console.log(err.response.status);
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login User
export const login = ({ login, password }) => dispatch => {
  dispatch({ type: USER_LOADING });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ login, password });

  axios
    .post(
      `${proxy}https://stockstore.herokuapp.com/api/auth/signin`,
      body,
      config
    )
    .then(res => {
      console.log(res);
      res.data.name = login;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data.invalidFields[0].message,
          err.response.status,
          "LOGIN_FAIL"
        )
      );
      console.log(err.response.status);
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const addScore = (id, score) => (dispatch, getState) => {
  // Headers

  // Request body
  const body = JSON.stringify({ score });

  axios
    .put(`/api/auth/score/${id}`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_SCORE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Register User
export const refreshToken = () => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const refreshToken = localStorage.getItem("refreshToken");

  // Request body
  const body = JSON.stringify({ refreshToken });

  axios
    .post(
      `${proxy}https://stockstore.herokuapp.com/api/auth/refresh`,
      body,
      config
    )
    .then(res => {
      console.log(res.data);
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
