import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../../Elements/FormInput";
import Button from "../../Elements/Button";
import { useLogin } from "../../../hooks/useLogin";
import { toast } from "react-toastify";
import {
  getDataTableByID,
  updateDataTable,
} from "../../../services/table.services";

export default function UpdateData() {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  useLogin();

  useEffect(() => {
    getDataTableByID(id, (status: boolean, data: any) => {
      if (status) {
        setNama(data.nama);
        setAlamat(data.alamat);
        setNoTelp(data.noTelp);
        setEmail(data.email);
      }
    });
    // const dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
    // dataLocal.map((item: any) => {
    //   if (item.id == id) {
    //     setNama(item.nama);
    //     setAlamat(item.alamat);
    //     setNoTelp(item.noTelp);
    //     setEmail(item.email);
    //   }
    // });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      // id,
      nama,
      alamat,
      noTelp,
      email,
    };

    const response = await updateDataTable(id, data);

    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Data Berhasil diupdate");
      window.location.href = "/dashboard";
    }
    // const dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
    // dataLocal.map((item: any) => {
    //   if (item.id == id) {
    //     item.nama = data.nama;
    //     item.alamat = data.alamat;
    //     item.noTelp = data.noTelp;
    //     item.email = data.email;
    //   }
    // });
    // localStorage.setItem("data", JSON.stringify(dataLocal));
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-4 rounded-2xl p-14">
        <p className="text-2xl font-bold text-teal-600 mb-10">
          Form Update Data
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Nama"
            name="nama"
            type="text"
            placeholder="Masukkan Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <FormInput
            label="Alamat"
            name="alamat"
            type="text"
            placeholder="Masukkan Alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
          <FormInput
            label="No Telp"
            name="noTelp"
            type="number"
            placeholder="Masukkan No Telp"
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-100 mt-10">
            <Button text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
