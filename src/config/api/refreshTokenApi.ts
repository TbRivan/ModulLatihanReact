import axios from "axios";
import Cookies from "js-cookie";

const ROOT_API = import.meta.env.VITE_API_URL;

export async function refreshTokenApi() {
  const refreshTokenCookies = Cookies.get("refreshToken");
  if (refreshTokenCookies) {
    const refreshToken = atob(refreshTokenCookies);
    const response = await axios({
      method: "POST",
      url: `${ROOT_API}/auth/token`,
      data: {
        token: refreshToken,
      },
    }).catch((err) => err.response);

    if (response?.status > 300) {
      const res = {
        error: true,
      };
      return res;
    }

    const data = response.data.data;

    const token = data.accessToken;
    const newRefreshToken = data.refreshToken;
    const tokenBase64 = btoa(token);
    const refreshTokenBase64 = btoa(newRefreshToken);
    Cookies.set("token", tokenBase64, { expires: 1 });
    Cookies.set("refreshToken", refreshTokenBase64, { expires: 7 });

    const res = {
      error: false,
      message: "Success refresh token",
    };
    return res;
  }
}
