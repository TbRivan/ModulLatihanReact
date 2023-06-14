import axios from "axios";
import jwt_decode from "jwt-decode";

export const LoginApi = (data: any, callback: any) => {
  axios
    .post("http://localhost:3000/api/auth/signin", data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err.response.data.message);
    });
};

export const RegisterApi = (data: any, callback: any) => {
  axios
    .post("http://localhost:3000/api/auth/signup", data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err.response.data.message);
    });
};

export const getUsername = (token: string) => {
  const decoded: any = jwt_decode(token);
  return decoded.username;
};
