import {
  GET_TRANS_HISTORY,
  GET_TRANS_HISTORY_SUCCEEDED
} from "../constants/types";

const getTransHistory = () => ({
  type: GET_TRANS_HISTORY
});

const getTransHistorySucceed = data => ({
  type: GET_TRANS_HISTORY_SUCCEEDED,
  payload: data
});

export { getTransHistory, getTransHistorySucceed };
