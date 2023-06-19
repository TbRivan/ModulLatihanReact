import axios from "axios";
import jwt_decode from "jwt-decode";

const ROOT_API = import.meta.env.VITE_API_URL;

export const LoginApi = (data: any, callback: any) => {
  axios
    .post(`${ROOT_API}/auth/signin`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err.response.data.message);
    });
};

export const RegisterApi = (data: any, callback: any) => {
  axios
    .post(`${ROOT_API}/auth/signup`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err.response.data.message);
    });
};

export const LoginGoogle = (callback: any) => {
  axios
    .get(`${ROOT_API}/auth/google`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err.response);
    });
};

export const getUsername = (token: string) => {
  const decoded: any = jwt_decode(token);
  return decoded.username;
};
