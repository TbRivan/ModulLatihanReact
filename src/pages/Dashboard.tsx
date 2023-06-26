import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FormInput from "../components/Elements/FormInput";
import TableData from "../components/Fragments/TableData";
import NavbarLayout from "../components/Layout/NavbarLayout";
import { useSelector } from "react-redux";
import { getAllDataTable } from "../services/table.services";
import {
  DataTableTypes,
  getAllDataTableTypes,
} from "../services/types/data-types";
import { Select, Space } from "antd";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [tableEmpty, setTableEmpty] = useState(false);
  const isLogin = useSelector((state: any) => state.login.isLogin);
  const [select, setSelect] = useState(1);
  const [fetchTable, setFetchTable] = useState<DataTableTypes[]>([]);
  const [table, setTable] = useState<DataTableTypes[]>([]);
  const userId = useSelector((state: any) => state.login.userId);
  const queryURL = useLocation().search;

  useEffect(() => {
    const token = new URLSearchParams(queryURL).get("token") || "";
    if (token) {
      const tokenBase64 = btoa(token);
      Cookies.set("token", tokenBase64, { expires: 1 });
      window.location.href = "/dashboard";
    }
  }, []);

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
  }, [tableEmpty]);

  useEffect(() => {
    if (select === 1) {
      setTable(fetchTable);
    } else if (select === 2) {
      let userTable = table.filter((item: any) => item.user.includes(userId));
      setTable(userTable);
    }
  }, [select]);

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

  const selectChange = (value: number) => {
    setSelect(value);
  };

  return (
    <>
      <NavbarLayout />
      <div className="overflow-x-auto ">
        <div className="min-w-screen flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className=" bg-white shadow-lg rounded my-6">
              <div className="w-full flex justify-between justify-items-stretch">
                <div className="w-100 ml-5 mb-5">
                  <Space wrap>
                    <Select
                      className="mt-5 w-32"
                      defaultValue={1}
                      onChange={selectChange}
                      options={[
                        { value: 1, label: "All Data" },
                        { value: 2, label: "User Data" },
                      ]}
                    />
                    <FormInput
                      label=""
                      name="nama"
                      type="text"
                      placeholder="Find by Name"
                      onChange={handleSearch}
                    />
                  </Space>
                </div>

                <div className="self-end mr-10 mb-5">
                  {isLogin ? (
                    <Link
                      to="/add"
                      className="flex w-200 h-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                    >
                      Add New Data
                    </Link>
                  ) : null}
                </div>
              </div>
              <TableData tables={table} empty={tableEmpty} login={isLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
