import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import stockReducer from "./stockReducer";
import chartReducer from "./chartReducer";
import historyReducer from "./historyReducer";

export default combineReducers({
  chart: chartReducer,
  error: errorReducer,
  auth: authReducer,
  stock: stockReducer,
  history: historyReducer
});
