import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface CallApiProps extends AxiosRequestConfig {
  token?: boolean;
  forChat?: boolean;
}

export async function callAPI({
  url,
  method,
  data,
  token,
  forChat,
}: CallApiProps) {
  let headers = {};
  if (token) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies);
      headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  if (response?.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  if (forChat) {
    const res = {
      error: false,
      message: "success",
      data: response,
    };
    return res;
  }

  const length = Object.keys(response.data).length;

  const res = {
    error: false,
    message: "success",
    data: length > 1 ? response.data : response.data.data,
  };

  return res;
}
