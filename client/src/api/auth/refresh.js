export default function refresh(token) {
  return fetch("https://stocks-mocks.herokuapp.com/api/auth/refresh", {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: { refreshToken: token }
  }).then(data => data);
}
