import { useState } from "react";
import Button from "../../Elements/Button";
import FormInput from "../../Elements/FormInput";
import { RegisterApi } from "../../../services/auth.services";

export default function FormRegister() {
  const [registerFailed, setRegisterFailed] = useState("");
  const handleRegister = (e: any) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setRegisterFailed("Password not Match");
    } else if (password.length && confirmPassword <= 8) {
    } else {
      const data = {
        email: e.target.email.value,
        username: e.target.password.value,
        password: e.target.password.value,
      };
      RegisterApi(data, (status: boolean, res: any) => {
        if (status) {
          window.location.href = "/login";
        } else {
          setRegisterFailed(res);
        }
      });
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <FormInput
        label="Username"
        type="text"
        placeholder="Enter your Username"
        name="username"
      />
      <FormInput
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
      />
      <FormInput
        label="Password"
        type="password"
        placeholder="******"
        name="password"
      />
      <FormInput
        label="Confirm Password"
        type="password"
        placeholder="******"
        name="confirmPassword"
      />
      <div className="mt-6">
        <Button type="submit" text="Register" />
      </div>

      {registerFailed && (
        <p className="text-red-500 text-center mt-5">{registerFailed}</p>
      )}
    </form>
  );
}
