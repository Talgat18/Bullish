import {
  GETINFO_START,
  GETINFO_SUCCEED,
  GETINFO_FAILED,
  GET_STOCK_LIST,
  GET_STOCK_LIST_SUCCEED
} from "../constants/types";

import { userIconURL } from "../constants/url";

const initialState = {
  stocks: [],
  loading: false,
  userIcon: userIconURL,
  balance: {
    icon: userIconURL,
    name: "",
    stocks: [],
    balance: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETINFO_START:
      return { ...state, loading: true };
    case GETINFO_SUCCEED:
      return {
        ...state,
        balance: action.payload,
        loading: false
      };
    case GETINFO_FAILED:
      return {
        ...state
      };
    case GET_STOCK_LIST:
      return {
        ...state,
        loading: true
      };
    case GET_STOCK_LIST_SUCCEED:
      return {
        ...state,
        stocks: action.payload.items,
        loading: false
      };
    default:
      return state;
  }
}
