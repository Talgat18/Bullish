import callApi from "./callApi";

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
export const fetchInfo = accessToken =>
  callApi(`/api/account/info/full`, "GET", {
    Authorization: accessToken
  });

export const fetchTransHistory = accessToken =>
  callApi(`/api/transaction/history`, "GET", {
    Authorization: accessToken
  });

export const fetchStockList = accessToken =>
  callApi(`/api/stocks?count=30`, "GET", {
    Authorization: accessToken
  });

export const fetchBuying = (data, accessToken) =>
  callApi(
    `/api/transaction/buy`,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: accessToken
    },
    data
  );

export const fetchSelling = (data, accessToken) =>
  callApi(
    `/api/transaction/sell`,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: accessToken
    },
    data
  );

export const fetchStockHistory = (id, accessToken) =>
  callApi(`/api/stocks/${id}/history`, "GET", {
    Authorization: accessToken
  });
