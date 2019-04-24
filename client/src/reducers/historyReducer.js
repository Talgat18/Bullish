import { GET_TRANS_HISTORY_SUCCEEDED } from "../constants/types";

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANS_HISTORY_SUCCEEDED:
      return {
        ...state,
        items: action.payload.items
      };
    default:
      return state;
  }
}
