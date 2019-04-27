import { SET_POSITION, ADD_CHART } from "../constants/types";

export const setPosition = data => ({
  type: SET_POSITION,
  payload: data
});

export const addChart = list => {
  return {
    type: ADD_CHART,
    payload: list
  };
};