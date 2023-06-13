import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface TableDataProps {
  id: number;
  nama: string;
  alamat: string;
  noTelp: string;
  email: string;
}
interface TableProps {
  tables: TableDataProps[];
}

export default function TableData({ tables }: TableProps) {
  const [tableEmpty, setTableEmpty] = useState(false);
  const [table, setTable] = useState([
    {
      id: 0,
      nama: "",
      alamat: "",
      noTelp: "",
      email: "",
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      setTableEmpty(true);
      setTable([]);
    } else {
      const dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
      setTable(dataLocal);
    }
  }, []);

  const handleDelete = (id: number) => {
    let dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
    dataLocal = dataLocal.filter((item: any) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(dataLocal));
    window.location.href = "/";
  };
  return (
    <table className="table-auto border-collapse border border-slate-400 mt-10">
      <thead>
        <tr>
          <th className="border border-slate-300 p-3 text-center">No</th>
          <th className="border border-slate-300 p-3">Nama</th>
          <th className="border border-slate-300 p-3">Alamat</th>
          <th className="border border-slate-300 p-3">No Telp</th>
          <th className="border border-slate-300 p-3">Email</th>
          <th className="border border-slate-300 p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {tableEmpty && (
          <tr>
            <td colSpan={6} className="border border-slate-300 p-3 text-center">
              Data Kosong, Silahkan Masukkan Data
            </td>
          </tr>
        )}
        {!tableEmpty &&
          table.length > 0 &&
          table.map((item, index) => {
            return (
              <tr key={index}>
                <td className="border border-slate-300 p-3 text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-300 p-3">{item.nama}</td>
                <td className="border border-slate-300 p-3">{item.alamat}</td>
                <td className="border border-slate-300 p-3">{item.noTelp}</td>
                <td className="border border-slate-300 p-3">{item.email}</td>
                <td className="w-[200px] border border-slate-300 p-3 flex justify-around">
                  <Link
                    to={`/edit/${item.id}`}
                    className="flex w-300 h-10 justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className={`flex w-full h-10 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mx-1`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
