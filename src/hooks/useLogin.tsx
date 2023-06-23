import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const isLogin = useSelector((state: any) => state.login.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      // window.location.href = "/dashboard";
      navigate("/dashboard");
    }
  }, [isLogin]);

  return isLogin;
};
