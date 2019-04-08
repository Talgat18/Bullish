import {
  GET_INFO,
  GETTING_INFO,
  GET_INFO_FAILED,
  GET_STOCK_LIST,
  GET_STOCK_LIST_FAILED,
  LOGOUT_SUCCESS
} from "../actions/types";

import { refreshToken } from "../actions/authActions";

const initialState = {
  good: false,
  stocks: [],
  loading: false,
  balance: {
    name: null,
    stocks: [],
    balance: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_INFO:
      return {
        ...state,
        loading: true,
        good:false
      };
    case GET_INFO:
      return {
        ...state,
        balance: action.payload,
        loading: false,
        good:true
      };
    case GET_INFO_FAILED:
      refreshToken();
      return {
        ...state,
        good:false,
        loading: false
      };
    case GET_STOCK_LIST:
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
          name: null,
          stocks: [],
          balance: 0
        }
      };
    default:
      return state;
  }
}
