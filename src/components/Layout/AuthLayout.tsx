import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface AuthLayoutprops {
  children: any;
  title: string;
  type: string;
}

const AuthLayout = (props: AuthLayoutprops) => {
  const { children, title, type } = props;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md border-4 rounded-2xl p-14">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className="font-medium text-slate-500 mb-8">
          Welcome, please enter your details
        </p>
        {children}
        <p className="text-sm mt-6 text-center">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          {type === "login" && (
            <Link to="/register" className="font-bold text-blue-600">
              Register
            </Link>
          )}
          {type === "register" && (
            <Link to="/login" className="font-bold text-blue-600">
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
