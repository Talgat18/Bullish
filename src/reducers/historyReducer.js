import { GET_TRANS_HISTORY_SUCCEED } from "../constants/types";

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANS_HISTORY_SUCCEED:
      return {
        ...state,
        items: action.payload.items
      };
    default:
      return state;
  }
}
