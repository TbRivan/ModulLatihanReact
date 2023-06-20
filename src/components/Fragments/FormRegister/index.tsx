import Button from "../../Elements/Button";
import FormInput from "../../Elements/FormInput";
import { RegisterApi } from "../../../services/auth.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FormRegister() {
  const navigate = useNavigate();
  const handleRegister = (e: any) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (username.length < 3) {
      toast.error("Username at least have 3 character");
    } else if (email.length <= 3) {
      toast.error("Please enter a valid email");
    } else if (password.length < 7) {
      toast.error("Password length at least 8 Character");
    } else if (password !== confirmPassword) {
      toast.error("Password not same");
    } else {
      const data = {
        email,
        username,
        password,
      };
      RegisterApi(data, (status: boolean, res: any) => {
        if (status) {
          toast.success("Success register new Account");
          navigate("/login");
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
