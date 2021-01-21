import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${process.env.REACT_APP_HOST}/api/users/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    //.post(`${process.env.REACT_APP_HOST}/api/users/register`, dataToSubmit)
    .post(`${process.env.REACT_APP_HOST}/api/users/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function auth() {
  const request = axios
    .get(`${process.env.REACT_APP_HOST}/api/users/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}
