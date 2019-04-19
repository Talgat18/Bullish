import { GOT_TRANS_HISTORY } from "../actions/types";


const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_TRANS_HISTORY:
      return {
        ...state,
        items: action.payload.data
      };
    default:
      return state;
  }
}
