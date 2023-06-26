import axios from "axios";
import { callAPI } from "../config/api";

const ROOT_API = import.meta.env.VITE_API_URL;

export const getAllDataTable = (callback: any) => {
  axios
    .get(`${ROOT_API}/tugas`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => console.log(err));
};

export const getDataTableByID = (id: any, callback: any) => {
  axios
    .get(`${ROOT_API}/tugas/${id}`)
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export async function postDataTable(data: any) {
  const url = `${ROOT_API}/tugas`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function updateDataTable(id: any, data: any) {
  const url = `${ROOT_API}/tugas/${id}`;

  return callAPI({
    url,
    method: "PATCH",
    data,
    token: true,
  });
}

export async function deleteTugas(id: any) {
  const url = `${ROOT_API}/tugas/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}
