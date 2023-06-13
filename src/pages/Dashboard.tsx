import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/Elements/FormInput";
import TableData from "../components/Fragments/TableData";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
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

      setTableEmpty(false);
      setTable(dataLocal);
    }
  }, [tableEmpty]);

  useEffect(() => {
    if (search.length <= 0) {
      const dataLocal = JSON.parse(localStorage.getItem("data") || "[]");

      setTable(dataLocal);
    }
  }, [search]);

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    let filterData = table.filter((item: any) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
    setTable(filterData);
  };

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
              onChange={handleSearch}
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
        <TableData tables={table} empty={tableEmpty} />
      </div>
    </>
  );
}
