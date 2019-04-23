export default function signUp(user) {
  console.log(user)
  return fetch("https://stockstore.herokuapp.com/api/auth/signup", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(data => data.json());
}
