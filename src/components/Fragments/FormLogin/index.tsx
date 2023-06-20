import { LoginApi } from "../../../services/auth.services";
import Cookies from "js-cookie";
import Button from "../../Elements/Button";
import FormInput from "../../Elements/FormInput";
import { toast } from "react-toastify";
import GoogleLoginForm from "./GoogleLoginForm";
import FacebookLoginForm from "./FacebookLoginForm";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const navigate = useNavigate();
  const handleLogin = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length && password.length < 5) {
      toast.error("Please enter a valid email and password");
    } else {
      const data = {
        email,
        password,
      };

      LoginApi(data, (status: boolean, res: any) => {
        if (status) {
          // localStorage.setItem("token", res);
          toast("success");
          const token = res.data.token;
          const tokenBase64 = btoa(token);
          Cookies.set("token", tokenBase64, { expires: 1 });
          navigate("/dashboard");
        } else {
          toast.error(res);
        }
      });
    }
  };
  return (
    <>
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

      <div className="flex flex-row items-center mt-4 -mb-2">
        <div className="flex w-full h-[1px] bg-black" />
        <div>
          <p className="font-bold flex w-[40px] justify-center text-slate-800">
            OR
          </p>
        </div>
        <div className="flex w-full h-[1px] bg-black" />
      </div>
      <GoogleLoginForm />
      <FacebookLoginForm />
    </>
  );
}
