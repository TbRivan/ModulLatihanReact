import Button from "../../Elements/Button";
import FormInput from "../../Elements/FormInput";
import { RegisterApi } from "../../../services/auth.services";
import { toast } from "react-toastify";

export default function FormRegister() {
  const handleRegister = (e: any) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Password tidak sama");
    } else if (password.length && confirmPassword <= 8) {
      toast.error("Panjang password minimal 8 huruf");
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
          toast.error(res);
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
    </form>
  );
}
