import { useState } from "react";
import { LoginApi } from "../../../services/auth.services";
import Button from "../../Elements/Button";
import FormInput from "../../Elements/FormInput";

export default function FormLogin() {
  const [loginFailed, setLoginFailed] = useState("");
  const handleLogin = (e: any) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    LoginApi(data, (status: boolean, res: any) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/dashboard";
      } else {
        setLoginFailed(res);
      }
    });
  };
  return (
    <form onSubmit={handleLogin}>
      <FormInput
        label="Email"
        type="email"
        placeholder="johndoe@gmail.com"
        name="email"
      />
      <FormInput
        label="Password"
        type="password"
        placeholder="******"
        name="password"
      />
      <div className="mt-6">
        <Button type="submit" text="Login" />
      </div>

      {loginFailed && (
        <p className="text-red-500 text-center mt-5">{loginFailed}</p>
      )}
    </form>
  );
}
