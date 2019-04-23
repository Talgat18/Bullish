export default function getChart(id, accessToken) {
  return fetch(`https://stockstore.herokuapp.com/api/stocks/${id}/history`, {
    method: "GET",
    headers: new Headers({
      Authorization: accessToken
    })
  }).then(r => r.json());
}
