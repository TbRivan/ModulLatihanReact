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
  empty: boolean;
}

export default function TableData({ tables, empty }: TableProps) {
  const handleDelete = (id: number) => {
    let dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
    dataLocal = dataLocal.filter((item: any) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(dataLocal));
    window.location.href = "/";
  };
  return (
    <table className=" text-center text-sm font-light mt-10">
      <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
        <tr>
          <th scope="col" className=" px-6 py-4">
            No
          </th>
          <th scope="col" className=" px-6 py-4">
            Nama
          </th>
          <th scope="col" className=" px-6 py-4">
            Alamat
          </th>
          <th scope="col" className=" px-6 py-4">
            No Telp
          </th>
          <th scope="col" className=" px-6 py-4">
            Email
          </th>
          <th scope="col" className=" px-6 py-4">
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
          tables.length > 0 &&
          tables.map((item, index) => {
            return (
              <tr key={index} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 text-center font-semibold text-lg">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg">
                  {item.nama}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg">
                  {item.alamat}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg">
                  {item.noTelp}
                </td>
                <td className="whitespace-nowrap  px-6 py-4 font-semibold text-lg">
                  {item.email}
                </td>
                <td className="w-[200px] whitespace-nowrap  px-6 py-4 flex justify-around">
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
