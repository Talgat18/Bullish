import { GOT_STOCK_HISTORY } from "../actions/types";

const initialState = {
  opacity: 0,
  data: [0, 100, 200, 300, 100, 400],
  date: ["2013", "2014", "2015", "2016", "2017", "2018"],
  chartData: {
    labels: [
      "Boston",
      "Worcester",
      "Springfield",
      "Lowell",
      "Cambridge",
      "New Bedford"
    ],
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
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.price,
        date: action.payload.date
      };
    default:
      return state;
  }
}
