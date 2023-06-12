import { useState } from "react";
import FormInput from "../components/molecules/FormInput";
import Button from "../components/molecules/Button";

export default function TambahDataPages() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      nama,
      alamat,
      noTelp,
      email,
    };
    localStorage.setItem("data", JSON.stringify(data));
    window.location.href = "/";
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
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
    </>
  );
}
