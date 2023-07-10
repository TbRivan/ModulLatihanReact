import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { refreshTokenApi } from "../config/api/refreshTokenApi";

export const refreshToken = async () => {
  const refresh = await refreshTokenApi();
  if (refresh?.error) {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    toast.error("Please login again");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
    return false;
  } else {
    return true;
  }
};
