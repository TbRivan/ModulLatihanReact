import { callAPI } from "../config/api";

const ROOT_API = import.meta.env.VITE_API_URL;
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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

export async function addUserToGroup(data: any) {
  const url = `${ROOT_API}/chat/groupadd`;

  return callAPI({
    url,
    data,
    method: "PUT",
    token: true,
    forChat: true,
  });
}

export async function removeUserFromGroup(data: any) {
  const url = `${ROOT_API}/chat/groupremove`;

  return callAPI({
    url,
    data,
    method: "PUT",
    token: true,
    forChat: true,
  });
}

export async function postMessage(data: any) {
  const url = `${ROOT_API}/message`;

  return callAPI({
    url,
    data,
    method: "POST",
    token: true,
    forChat: true,
  });
}

export async function getAllMessages(id: string) {
  const url = `${ROOT_API}/message/${id}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
    forChat: true,
  });
}
