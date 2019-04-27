import {
  GET_TRANS_HISTORY,
  GET_TRANS_HISTORY_SUCCEED
} from "../constants/types";

export const getTransHistory = () => ({
  type: GET_TRANS_HISTORY
});

export const getTransHistorySucceed = data => ({
  type: GET_TRANS_HISTORY_SUCCEED,
  payload: data
});
