export default function accountInfo(imgUrl) {
  return fetch(`https://stockstore.herokuapp.com/${imgUrl}`, {
    method: "GET"
  }).then(r => r);
}
