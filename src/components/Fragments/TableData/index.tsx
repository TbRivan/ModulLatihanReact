import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { PayloadTypes } from "../../../services/types/data-types";
import jwt_decode from "jwt-decode";
import { DataTableTypes } from "../../../services/types/data-types";
import { deleteTugas } from "../../../services/table.services";
import { toast } from "react-toastify";
import Modal from "../../Elements/Modal";

interface TableProps {
  tables: DataTableTypes[];
  empty: boolean;
  login: boolean;
}

export default function TableData({ tables, empty, login }: TableProps) {
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [userId, setUserId] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState<any>({});

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: PayloadTypes = jwt_decode(jwtToken);
      setUserId(payload.user.id);
    }
  }, []);

  // Function to handle table sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      // If the same key is clicked again, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different key is clicked, set the sort key and default sort direction
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  // Function to sort the table data based on the sort key and direction
  const sortTableData = (data: any[]) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  // Sort the table data before rendering
  const sortedTableData = sortTableData(tables);

  const handleDelete = async (id: number) => {
    const response = await deleteTugas(id);

    if (response.error) {
      toast.error(response.message);
    } else {
      setVisible(false);
      toast.success("Success delete data");
      window.location.href = "/dashboard";
    }
    // let dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
    // dataLocal = dataLocal.filter((item: any) => item.id !== id);
    // localStorage.setItem("data", JSON.stringify(dataLocal));
  };
  return (
    <table className="min-w-max w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left text-lg">No</th>
          <th
            className="py-3 px-6 text-left cursor-pointer text-lg flex justify-evenly hover:bg-gray-300"
            onClick={() => handleSort("nama")}
          >
            <img
              src="icon/sort.png"
              alt="sort"
              className="w-4 h-5  mt-1 order-2"
            />{" "}
            Nama
          </th>
          <th className="py-3 px-6 text-center text-lg">Alamat</th>
          <th className="py-3 px-6 text-center text-lg">No Telp</th>
          <th className="py-3 px-6 text-center text-lg">Email</th>
          <th className="py-3 px-6 text-center text-lg">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {empty && (
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-center whitespace-nowrap" colSpan={6}>
              <div className="flex items-center">
                <div className="mr-2"></div>
                <span className="font-medium">Data Kosong</span>
              </div>
            </td>
          </tr>
        )}
        {!empty &&
          sortedTableData.length > 0 &&
          sortedTableData.map((item, index) => {
            return (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2"></div>
                    <span className="font-medium">{index + 1}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2"></div>
                    <span className="font-bold">{item.nama}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center">
                    <div className="mr-2"></div>
                    <span className="font-medium">{item.alamat}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    {item.noTelp}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-sm font-medium">
                    {item.email}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    {login && item.user === userId ? (
                      <>
                        <div className="w-4 mr-5 transform hover:text-purple-500 hover:scale-110">
                          <Link to={`/edit/${item._id}`}>
                            <img src="/icon/edit.svg" alt="edit" />
                          </Link>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <a
                            onClick={() => {
                              setVisible(true);
                              setModalData(item);
                            }}
                            className="cursor-pointer"
                          >
                            <img src="/icon/delete.svg" alt="delete" />
                          </a>
                        </div>
                      </>
                    ) : (
                      <p>Action Forbidden</p>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        <Modal
          name={modalData.nama}
          visible={visible}
          onClickConfirm={() => handleDelete(modalData._id)}
          onClickCancel={() => setVisible(!visible)}
        />
      </tbody>
    </table>
  );
}
