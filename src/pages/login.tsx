import FormLogin from "../components/Fragments/FormLogin";
import AuthLayout from "../components/Layout/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout type="login" title="Login">
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
