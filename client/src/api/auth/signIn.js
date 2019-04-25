

export default function login(user) {
  return fetch("https://stockstore.herokuapp.com/api/auth/signin", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(data => data.json());
}
