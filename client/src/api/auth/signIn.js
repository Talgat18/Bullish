import { returnErrors } from "../../actions/errorsActions";

export default function login(user) {
  return fetch("https://stockstore.herokuapp.com/api/auth/signin", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
    .catch(err => {
      returnErrors(
        err.response.data.message,
        err.response.status,
        "REGISTER_FAIL"
      );
    });
}
