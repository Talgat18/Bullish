import {
  SIGNUP_SUCCEED,
  SIGNUP_START,
  SIGNIN_START,
  SIGNIN_SUCCEED,
  LOGOUT,
  REFRESH_SUCCEED,
  REFRESH_FAILED,
  SIGNIN_FAILED,
  SIGNUP_FAILED
} from "../constants/types";

const initialState = {
  refreshFailed: false,
  isLoading: false,
  name: "",
  tokens: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken")
  },
  isAuthenticated: localStorage.getItem("accessToken") ? true : false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START:
    case SIGNIN_START:
      localStorage.setItem("name", action.payload.login);
      return {
        ...state,
        isLoading: true,
        name: action.payload.login
      };
    case SIGNUP_SUCCEED:
    case SIGNIN_SUCCEED:
      return {
        ...state,
        isLoading: false,
        tokens: action.payload,
        isAuthenticated: true,
        refreshFailed: false
      };
    case SIGNIN_FAILED:
    case SIGNUP_FAILED:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("name");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        refreshFailed: false
      };
    case LOGOUT:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("name");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case REFRESH_SUCCEED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        refreshFailed: false
      };
    case REFRESH_FAILED:
      return {
        ...state,
        isLoading: false,
        refreshFailed: true,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default reducer;
