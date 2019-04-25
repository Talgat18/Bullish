export default function refresh(token) {
  return fetch("https://stockstore.herokuapp.com/api/auth/refresh", {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ refreshToken: token })
  }).then(data => data.json());
}
