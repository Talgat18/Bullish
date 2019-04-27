import callApi from "./api";

export const fetchSignIn = user =>
  callApi(
    `/api/auth/signin`,
    "POST",
    {
      "Content-Type": "application/json"
    },
    user
  );
export const fetchSignUp = user =>
  callApi(
    `/api/auth/signup/full`,
    "POST",
    {
      "Content-Type": "application/json"
    },
    user
  );
export const fetchRefresh = token =>
  callApi(
    `/api/auth/refresh`,
    "POST",
    {
      "Content-Type": "application/json"
    },
    { refreshToken: token }
  );
