import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/Elements/FormInput";
// import TableData from "../components/Fragments/TableData";
import TableData2 from "../components/Fragments/TableData/index2";
import NavbarLayout from "../components/Layout/NavbarLayout";
import { useSelector } from "react-redux";
import { getAllDataTable } from "../services/table.services";
import { getAllDataTableTypes } from "../services/types/data-types";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [tableEmpty, setTableEmpty] = useState(false);
  const isLogin = useSelector((state: any) => state.login);
  const [fetchTable, setFetchTable] = useState([
    {
      _id: "",
      nama: "",
      alamat: "",
      noTelp: "",
      email: "",
    },
  ]);
  const [table, setTable] = useState([
    {
      _id: "",
      nama: "",
      alamat: "",
      noTelp: "",
      email: "",
    },
  ]);
  // Change with Redux state for global next time
  // const dataLocal = JSON.parse(localStorage.getItem("data") || "[]");

  useEffect(() => {
    getAllDataTable((status: boolean, res: getAllDataTableTypes) => {
      if (!status) {
        setTableEmpty(true);
        setTable([]);
      } else {
        setTableEmpty(false);
        setTable(res.data);
        setFetchTable(res.data);
      }
    });
    // if (Object.keys(dataLocal).length === 0) {
    //   setTableEmpty(true);
    //   setTable([]);
    // } else {
    //   setTableEmpty(false);
    //   setTable(dataLocal);
    // }
  }, [tableEmpty]);

  useEffect(() => {
    if (search.length < 1) {
      setTable(fetchTable);
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
      <NavbarLayout />
      <div className="overflow-x-auto -mt-10">
        <div className="min-w-screen flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-lg rounded my-6">
              <div className="w-full flex justify-between items-stretch">
                <div className="w-100 ml-5 mb-5">
                  <FormInput
                    label=""
                    name="nama"
                    type="text"
                    placeholder="Cari berdasarkan Nama"
                    onChange={handleSearch}
                  />
                </div>
                <div className="self-end mr-10 mb-5">
                  {isLogin ? (
                    <Link
                      to="/add"
                      className="flex w-200 h-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                    >
                      Tambah Data
                    </Link>
                  ) : null}
                </div>
              </div>
              {/* <TableData tables={table} empty={tableEmpty} login={isLogin} /> */}
              <TableData2 tables={table} empty={tableEmpty} login={isLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
