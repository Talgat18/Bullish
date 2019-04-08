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
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: { _id: null, score: 0 },
  name: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_TOKEN:
      return {
        ...state,
        isLoading: true
      };
    case TOKEN_UP:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    case TOKEN_DOWN:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case REFRESHED_TOKEN:
      console.log("registered", action.payload);
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      localStorage.setItem("score", action.payload.score);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        score: action.payload.score
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log("registered", action.payload);
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        name: action.payload.name
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case ADD_SCORE:
      return {
        ...state,
        isAuthenticated: true
      };
    default:
      return state;
  }
}
