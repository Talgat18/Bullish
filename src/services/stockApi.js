import callApi from "./api";

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

export const fetchStockHistory = (id, range, accessToken) =>
  callApi(`/api/stocks/${id}/history?range=${range}`, "GET", {
    Authorization: accessToken
  });
