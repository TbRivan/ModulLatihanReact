import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { PayloadTypes } from "../../services/types/data-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setLogin } from "../../redux/slices/loginSlice";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { getSender } from "../../services/chatLogic";
import { ChatState } from "../../context/ChatProvider";

export default function NavbarLayout() {
  const [username, setUsername] = useState("");
  const isLogin = useSelector((state: any) => state.login.isLogin);
  const dispatch = useDispatch();
  const { setSelectedChat, notification, setNotification, user } = ChatState();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: PayloadTypes = jwt_decode(jwtToken);
      dispatch(setLogin(payload.user.id));
      setUsername(payload.user.username || "New User");
    }
  }, [isLogin]);

  const onLogout = () => {
    Cookies.remove("token");
    dispatch(setLogout());
  };

  return (
    <>
      <div className="bg-gray-100 font-sans">
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
                <a
                  href="/chat"
                  className="text-gray-800 text-2xl font-semibold hover:text-purple-600 mr-4"
                >
                  Chat
                </a>
              </div>

              <div className="hidden sm:flex sm:items-center">
                {isLogin ? (
                  <>
                    <Box>
                      <Menu>
                        <MenuButton p={1}>
                          <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        <MenuList pl={2}>
                          {!notification.length && "No New Messages"}
                          {notification.length > 0 &&
                            notification.map((notif: any) => {
                              return (
                                <MenuItem
                                  key={notif._id}
                                  onClick={() => {
                                    setSelectedChat(notif.chat);
                                    setNotification(
                                      notification.filter(
                                        (n: any) => n !== notif
                                      )
                                    );
                                  }}
                                >
                                  {notif.chat.isGroupChat
                                    ? `New Message in ${notif.chat.chatName}`
                                    : `New Message From ${getSender(
                                        user,
                                        notif.chat.users
                                      )}`}
                                </MenuItem>
                              );
                            })}
                        </MenuList>
                      </Menu>
                    </Box>
                    <p className="text-gray-800 text-lg font-medium mr-5">
                      Hello <span className="text-indigo-800">{username}!</span>
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
