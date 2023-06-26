import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { UserChatTypes } from "../services/types/data-types";

const ChatContext = createContext<any>({});

const ChatProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserChatTypes>();
  const [selectedChat, setSelectedChat] = useState<any>();
  const [chats, setChats] = useState<any[]>([]);
  const [notification, setNotification] = useState<any[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: any = jwt_decode(jwtToken);
      setUser(payload.user);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
