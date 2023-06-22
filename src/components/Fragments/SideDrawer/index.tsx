import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { chatUser, searchUser } from "../../../services/user.sevices";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../../context/ChatProvider";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setSelectedChat, chats, setChats } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Input something in search");
    }
    try {
      setLoading(true);
      const { data } = await searchUser(search);
      setLoading(false);
      setSearchResult(data.data);
    } catch (error) {
      toast.error("Failed to load the search results");
    }
  };

  const accessChat = async (userId: string) => {
    try {
      setLoadingChat(true);

      const response = await chatUser({ userId });
      const data = response.data.data;
      if (!chats.find((c: any) => c._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast.error("Error fetching the chat");
    }
  };

  return (
    <>
      <Box mt="-14" mb="4" ml="2">
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="outline" onClick={onOpen}>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
      </Box>
      <Box mt="-14" mb="4" ml="1400">
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : searchResult.length > 0 ? (
              searchResult.map((user: any) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : (
              <span>No User Found</span>
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
