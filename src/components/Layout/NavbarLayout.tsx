import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { PayloadTypes } from "../../services/types/data-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setLogin } from "../../redux/slices/loginSlice";

export default function NavbarLayout() {
  const [user, setUser] = useState("");
  const isLogin = useSelector((state: any) => state.login.isLogin);
  const dispatch = useDispatch();
  // const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: PayloadTypes = jwt_decode(jwtToken);
      dispatch(setLogin(payload.user.id));
      setUser(payload.user.username || "New User");
    }
  }, [isLogin]);

  const onLogout = () => {
    Cookies.remove("token");
    dispatch(setLogout());
    // setIsLogin(false);
  };

  return (
    <>
      <div className="bg-gray-100 font-sans mb-20">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <img src="/icon/navbaricon.svg" alt="navbar" />
              </div>

              <div className="hidden sm:flex sm:items-center">
                <Link
                  to="/dashboard"
                  className="text-gray-800 text-2xl font-semibold hover:text-purple-600 mr-4"
                >
                  Dashboard
                </Link>
              </div>

              <div className="hidden sm:flex sm:items-center">
                {isLogin ? (
                  <>
                    <p className="text-gray-800 text-lg font-medium mr-5">
                      Hello <span className="text-indigo-800">{user}!</span>
                    </p>
                    <button
                      onClick={onLogout}
                      type="button"
                      className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
