import axios from "axios";

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

export const postDataTable = (data: any, callback: any) => {
  axios
    .post(`${ROOT_API}/tugas`, data)
    .then(() => {
      callback(true);
    })
    .catch((err) => console.log(err));
};

export const updateDataTable = (id: any, data: any, callback: any) => {
  axios
    .patch(`${ROOT_API}/tugas/${id}`, data)
    .then(() => {
      callback(true);
    })
    .catch((err) => console.log(err));
};

export const deleteTugas = (id: any, callback: any) => {
  axios
    .delete(`${ROOT_API}/tugas/${id}`)
    .then(() => {
      callback(true);
    })
    .catch((err) => {
      console.log(err);
    });
};
