export default function getTransHistory(accessToken) {
  return fetch("https://stockstore.herokuapp.com/api/transaction/history", {
    method: "GET",
    headers: new Headers({
      Authorization: accessToken
    })
  }).then(r => r.json());
}
