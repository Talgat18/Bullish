export default function sellStock(data, accessToken) {
  return fetch("https://stockstore.herokuapp.com/api/transaction/sell", {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: accessToken
    }),
    body: JSON.stringify(data)
  }).then(data => data.json());
}
