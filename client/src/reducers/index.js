import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import stockReducer from './stockReducer';
import newsReducer from './newsReducer';

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  stock: stockReducer,
  news: newsReducer
});
