import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ChatState } from "../../../context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  SERVER_URL,
  getAllMessages,
  postMessage,
} from "../../../services/user.sevices";
import ProfileModal from "../ProfileModal";
import UpdateGroupChatModal from "../GroupChatModal/UpdateGroupChatModal";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ScrollableChat from "../ScrollableChat";
import { getSender, getSenderFull } from "../../../services/chatLogic";
import io from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../../../animations/typing.json";

const ENDPOINT = SERVER_URL;
let socket: any, selectedChatCompare: any;

const SingleChat = ({ fetchAgain, setFetchAgain }: any) => {
  const [messages, setMessages] = useState<object[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await getAllMessages(selectedChat._id);
      setMessages(data.data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      const payload = {
        content: newMessage,
        chatId: selectedChat._id,
      };

      try {
        setNewMessage("");
        const { data } = await postMessage(payload);

        socket.emit("new message", data.data);
        setMessages([...messages, data.data]);
      } catch (error) {
        toast.error("Error Occured");
      }
    }
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              aria-label="test"
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div>
                  <Lottie
                    animationData={animationData}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0, width: 70 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
