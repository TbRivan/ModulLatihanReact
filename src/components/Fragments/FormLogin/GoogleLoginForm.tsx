// import { LoginGoogle } from "../../../services/auth.services";

const ROOT_API = import.meta.env.VITE_API_URL;

export default function GoogleLoginForm() {
  const handleLogin = (e: any) => {
    e.preventDefault();

    // LoginGoogle((status: boolean) => {
    //   if (status) {
    //     console.log("success");
    //   } else {
    //     console.log("failed");
    //   }
    // });
    window.location.href = `${ROOT_API}/auth/google`;
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="mt-6">
        <button
          type="submit"
          className="flex w-full text-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-medium font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <span className="text-center w-full">Continue with Google</span>
          <img src="/icon/googleicon.svg" className="-ml-12" alt="googleicon" />
        </button>
      </div>
    </form>
  );
}
