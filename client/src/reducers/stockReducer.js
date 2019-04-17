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
  needRefresh: false,
  stocks: [],
  loading: false,
  balance: {
    name: '',
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
        
      };
    case GET_INFO:
      return {
        ...state,
        balance: action.payload,
        loading: false,
        
      };
    case GET_INFO_FAILED:
      refreshToken();
      return {
        ...state,
        needRefresh:true,
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
