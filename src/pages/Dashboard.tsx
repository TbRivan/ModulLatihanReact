import { useState, useEffect } from "react";
import Button from "../components/molecules/Button";
import FormInput from "../components/molecules/FormInput";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [table, setTable] = useState([
    {
      nama: "",
      alamat: "",
      noTelp: "",
      email: "",
    },
  ]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") || "{}");
    if (data) {
      setTable([data]);
    }
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-full flex justify-evenly items-stretch">
          <div className="w-100">
            <FormInput
              label="Cari Nama"
              name="nama"
              type="text"
              placeholder="Masukkan Nama"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="self-end">
            <Link
              to="/add"
              className="flex w-200 h-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              Tambah Data
            </Link>
          </div>
        </div>
        <table className="table-auto border-collapse border border-slate-400 mt-10">
          <thead>
            <tr>
              <th className="border border-slate-300 p-3">No</th>
              <th className="border border-slate-300 p-3">Nama</th>
              <th className="border border-slate-300 p-3">Alamat</th>
              <th className="border border-slate-300 p-3">No Telp</th>
              <th className="border border-slate-300 p-3">Email</th>
              <th className="border border-slate-300 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {table.length > 0 &&
              table.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-slate-300 p-3">{index + 1}</td>
                    <td className="border border-slate-300 p-3">{item.nama}</td>
                    <td className="border border-slate-300 p-3">
                      {item.alamat}
                    </td>
                    <td className="border border-slate-300 p-3">
                      {item.noTelp}
                    </td>
                    <td className="border border-slate-300 p-3">
                      {item.email}
                    </td>
                    <td className="w-[200px] border border-slate-300 p-3 flex justify-around">
                      <Link
                        to="/edit"
                        className="flex w-300 h-10 justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                      >
                        Edit
                      </Link>
                      <Button text="Delete" type="button" color="red" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
