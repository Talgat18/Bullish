import { GOT_STOCK_HISTORY } from "../constants/types";

const initialState = {
  data: [],
  date: [],
  chartData: {
    datasets: {
      label: "USD",
      data: [100, 200],
      backgroundColor: ["#689F38"]
    }
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STOCK_HISTORY:
      return {
        ...state,
        data: action.payload.price,
        date: action.payload.date
      };
    default:
      return state;
  }
}
