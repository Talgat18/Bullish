import { GET_ERRORS, CLEAR_ERRORS } from "../constants/types";

// RETURN ERRORS
export const returnErrors = (msg, status, id) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
