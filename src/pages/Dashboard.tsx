import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/Elements/FormInput";
import TableData from "../components/Fragments/TableData";

export default function DashboardPage() {
  const [search, setSearch] = useState("");

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
        <TableData />
      </div>
    </>
  );
}
