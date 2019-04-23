import {
  GETINFO_START,
  GETINFO_FETCH_SUCCEEDED,
  GET_STOCK_LIST,
  GET_STOCK_LIST_SUCCEED
} from "../constants/types";

const initialState = {
  stocks: [],
  loading: false,
  balance: {
    name: "",
    stocks: [],
    balance: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETINFO_START:
      return { ...state, loading: true };
    case GETINFO_FETCH_SUCCEEDED:
      console.log(action.payload);
      return {
        ...state,
        balance: action.payload,
        loading: false
      };
    case "GET_INFO_FAILED":
      console.log(action.payload);
      return {
        ...state
      };
    case GET_STOCK_LIST:
      return {
        ...state,
        loading: true
      };
    case GET_STOCK_LIST_SUCCEED:
      console.log(action.payload);
      return {
        ...state,
        stocks: action.payload.items,
        loading: false
      };
    default:
      return state;
  }
}
