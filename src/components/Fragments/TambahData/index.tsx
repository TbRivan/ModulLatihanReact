import { useLogin } from "../../../hooks/useLogin";
import { postDataTable } from "../../../services/table.services";
import Button from "../../Elements/Button";
import FormInput from "../../Elements/FormInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TambahData() {
  const navigate = useNavigate();
  useLogin();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      // id: Math.floor(Math.random() * 100 + 1),
      nama: event.target.nama.value,
      alamat: event.target.alamat.value,
      noTelp: event.target.noTelp.value,
      email: event.target.email.value,
    };

    const response = await postDataTable(data);

    if (response) {
      toast.success("Data Ditambahkan");
      navigate("/dashboard");
    } else {
      toast.error(response);
    }

    // if (localStorage.getItem("data") === null) {
    //   localStorage.setItem("data", JSON.stringify([data]));
    // } else {
    //   const dataLocal = JSON.parse(localStorage.getItem("data") || "[]");
    //   dataLocal.push(data);
    //   localStorage.setItem("data", JSON.stringify(dataLocal));
    // }
    // postDataTable(data, (status: boolean) => {
    //   if (status) {
    //   }
    // });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="border-4 rounded-2xl p-14">
          <p className="text-2xl font-bold text-teal-600 mb-10">
            Form Input Data
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Nama"
              name="nama"
              type="text"
              placeholder="Masukkan Nama"
            />
            <FormInput
              label="Alamat"
              name="alamat"
              type="text"
              placeholder="Masukkan Alamat"
            />
            <FormInput
              label="No Telp"
              name="noTelp"
              type="number"
              placeholder="Masukkan No Telp"
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <div className="w-100 mt-10">
              <Button text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
