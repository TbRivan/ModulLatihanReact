import { callAPI } from "../config/api";

const ROOT_API = import.meta.env.VITE_API_URL;

export async function searchUser(search: string) {
  const url = `${ROOT_API}/user?search=${search}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
    forChat: true,
  });
}

export async function chatUser(data: any) {
  const url = `${ROOT_API}/chat`;

  return callAPI({
    url,
    data,
    method: "POST",
    token: true,
    forChat: true,
  });
}

export async function getAllChat() {
  const url = `${ROOT_API}/chat`;

  return callAPI({
    url,
    method: "GET",
    token: true,
    forChat: true,
  });
}

export async function createChatGroup(data: any) {
  const url = `${ROOT_API}/chat/group`;

  return callAPI({
    url,
    data,
    method: "POST",
    token: true,
    forChat: true,
  });
}

export async function renameGroup(data: any) {
  const url = `${ROOT_API}/chat/rename`;

  return callAPI({
    url,
    data,
    method: "PUT",
    token: true,
    forChat: true,
  });
}

export const getSender = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser._id
    ? users[0].username
    : users[1].username;
};

export const getSenderFull = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser._id ? users[0] : users[1];
};
