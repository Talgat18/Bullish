import callApi from "./api";
import { contentHeader } from "../constants/settings";

export const fetchSignIn = user =>
  callApi(`/api/auth/signin`, "POST", contentHeader, user);
export const fetchSignUp = user =>
  callApi(`/api/auth/signup/full`, "POST", contentHeader, user);
export const fetchRefresh = token =>
  callApi(`/api/auth/refresh`, "POST", contentHeader, { refreshToken: token });
