import { LoginApi } from "../../../services/auth.services";
import Cookies from "js-cookie";
import Button from "../../Elements/Button";
import FormInput from "../../Elements/FormInput";
import { toast } from "react-toastify";

export default function FormLogin() {
  const handleLogin = (e: any) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    LoginApi(data, (status: boolean, res: any) => {
      if (status) {
        // localStorage.setItem("token", res);
        toast("success");
        const token = res.data.token;
        const tokenBase64 = btoa(token);
        Cookies.set("token", tokenBase64, { expires: 1 });
        window.location.href = "/dashboard";
      } else {
        toast.error(res);
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
    </form>
  );
}
