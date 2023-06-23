import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgmeItem";
import UserListItem from "../UserAvatar/UserListItem";
import {
  addUserToGroup,
  removeUserFromGroup,
  renameGroup,
  searchUser,
} from "../../../services/user.sevices";
import { toast } from "react-toastify";

const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleRemove = async (userRemove: any) => {
    if (selectedChat.groupAdmin._id !== user.id && userRemove._id !== user.id) {
      toast.error("Only admin can remove");
      return;
    }

    const payload = {
      chatId: selectedChat._id,
      userId: userRemove._id,
    };

    try {
      setLoading(true);
      const { data } = await removeUserFromGroup(payload);
      userRemove._id === user.id
        ? setSelectedChat()
        : setSelectedChat(data.data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error("Error Removing user");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    setRenameLoading(true);

    const payload = {
      chatId: selectedChat._id,
      chatName: groupChatName,
    };
    try {
      const { data } = await renameGroup(payload);
      setSelectedChat(data.data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error("Failed updated Group");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await searchUser(search);
      setLoading(false);
      setSearchResult(data.data);
    } catch (error) {
      toast.error("Failed to load the Chat");
    }
  };

  const handleAddUser = async (userAdd: any) => {
    if (selectedChat.users.find((u: any) => u._id === userAdd._id)) {
      toast.error("User already in group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user.id) {
      toast.error("Only admin can add someone");
      return;
    }

    const payload = {
      chatId: selectedChat._id,
      userId: userAdd._id,
    };

    try {
      setLoading(true);

      const { data } = await addUserToGroup(payload);

      setSelectedChat(data.data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error("Error adding a user");
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        aria-label="test"
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u: any) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user: any) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
