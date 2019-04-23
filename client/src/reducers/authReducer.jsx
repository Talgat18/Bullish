import {
  SIGNUP_FETCH_SUCCEEDED,
  SIGNUP_START,
  SIGNIN_START,
  SIGNIN_FETCH_SUCCEEDED,
  LOGOUT,
  REFRESH_SUCCEED
} from "../constants/types";

const initialState = {
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
      return {
        ...state,
        isLoading: true
      };
    case SIGNUP_FETCH_SUCCEEDED:
    case SIGNIN_FETCH_SUCCEEDED:
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        isLoading: false,
        tokens: action.payload,
        isAuthenticated: true
      };
    case LOGOUT:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case REFRESH_SUCCEED:
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
