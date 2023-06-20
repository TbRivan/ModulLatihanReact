import { useState } from "react";
import { Link } from "react-router-dom";

interface TableDataProps {
  _id: string;
  nama: string;
  alamat: string;
  noTelp: string;
  email: string;
}
interface TableProps {
  tables: TableDataProps[];
  empty: boolean;
  login: boolean;
}

export default function TableData2({ tables, empty, login }: TableProps) {
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  const handleDelete = (id: number) => {
    let dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
    dataLocal = dataLocal.filter((item: any) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(dataLocal));
    window.location.href = "/dashboard";
  };
  return (
    <table className="w-1/2 text-center text-sm font-light mt-10 border-2">
      <thead className="border-b bg-neutral-500 text-lg text-white">
        <tr>
          <th scope="col" className=" px-6 py-4 border">
            No
          </th>
          <th
            onClick={() => handleSort("nama")}
            scope="col"
            className=" px-6 py-4 border hover:bg-neutral-400 cursor-ns-resize"
          >
            Nama
          </th>
          <th scope="col" className=" px-6 py-4 border">
            Alamat
          </th>
          <th scope="col" className=" px-6 py-4 border">
            No Telp
          </th>
          <th scope="col" className=" px-6 py-4 border">
            Email
          </th>
          <th scope="col" className=" px-6 py-4 border">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {empty && (
          <tr>
            <td
              colSpan={6}
              className="border border-slate-300 p-3 text-center font-bold text-lg"
            >
              Data Kosong, Silahkan Masukkan Data
            </td>
          </tr>
        )}
        {!empty &&
          sortedTableData.length > 0 &&
          sortedTableData.map((item, index) => {
            return (
              <tr key={index} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 text-center font-semibold text-lg border">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg border">
                  {item.nama}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg border">
                  {item.alamat}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg border">
                  {item.noTelp}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg border">
                  {item.email}
                </td>
                <td className="w-full whitespace-nowrap  px-6 py-4 flex justify-around">
                  {login ? (
                    <>
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
                    </>
                  ) : (
                    <p>Silahkan login terlebih dahulu</p>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
