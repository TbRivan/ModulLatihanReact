import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useLogin = () => {
  const isLogin = useSelector((state: any) => state.login);

  useEffect(() => {
    if (!isLogin) {
      window.location.href = "/dashboard";
    }
  }, [isLogin]);

  return isLogin;
};
