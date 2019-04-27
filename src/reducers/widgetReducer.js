import { SET_POSITION, ADD_CHART } from "../constants/types";

const initialState = {
  styles: {
    width: ["635px"]
  },
  position: {
    positionTop: ["120px"],
    positionLeft: ["120px"],
    zIndex: [1]
  },
  chartList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSITION:
      return {
        ...state,
        position: action.payload
      };
    case ADD_CHART:
      return {
        ...state,
        chartList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
