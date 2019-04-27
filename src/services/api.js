import { API_ROOT } from "../constants/url";

export default function callApi(endpoint, method, headers, body) {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, {
    method,
    mode: "cors",
    headers,
    body: JSON.stringify(body)
  }).then(data => data.json());
}
