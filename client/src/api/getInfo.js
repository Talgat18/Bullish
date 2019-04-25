export default function accountInfo(accessToken) {
  return fetch("https://stockstore.herokuapp.com/api/account/info/full", {
    method: "GET",
    headers: new Headers({
      Authorization: accessToken
    })
  }).then(r => r.json());
}
