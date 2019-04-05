import {
  GET_INFO,
  GET_INFO_FAILED,
  GET_STOCK_LIST,
  GET_STOCK_LIST_FAILED,
  LOGOUT_SUCCESS
} from "../actions/types";

import { refreshToken } from "../actions/authActions";

const initialState = {
  stocks: [],
  loading: false,
  balance: {
    name: "Bull",
    stocks: [],
    balance: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INFO:
      return {
        ...state,
        balance: action.payload,
        loading: false
      };
    case GET_INFO_FAILED:
      refreshToken();
      return {
        ...state
      };
    case GET_STOCK_LIST:
      console.log(action.payload.items);
      return {
        ...state,
        stocks: action.payload.items
      };
    case GET_STOCK_LIST_FAILED:
      refreshToken();
      return {
        ...state
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: {
          name: "Bull",
          stocks: [],
          balance: 0
        }
      };
    default:
      return state;
  }
}
