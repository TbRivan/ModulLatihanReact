import { Box } from "@chakra-ui/react";
import { useState } from "react";
import NavbarLayout from "../components/Layout/NavbarLayout";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/Fragments/SideDrawer";
import MyChats from "../components/Fragments/MyChats";
import ChatBox from "../components/Fragments/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <>
      <NavbarLayout />
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </>
  );
};

export default ChatPage;
