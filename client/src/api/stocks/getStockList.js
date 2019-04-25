export default function getStockList(accessToken) {
  return fetch("https://stockstore.herokuapp.com/api/stocks?count=30", {
    method: "GET",
    headers: new Headers({
      Authorization: accessToken
    })
  }).then(r => r.json());
}
