// import { LoginGoogle } from "../../../services/auth.services";

const ROOT_API = import.meta.env.VITE_API_URL;

export default function FacebookLoginForm() {
  const handleLogin = (e: any) => {
    e.preventDefault();

    // LoginGoogle((status: boolean) => {
    //   if (status) {
    //     console.log("success");
    //   } else {
    //     console.log("failed");
    //   }
    // });
    window.location.href = `${ROOT_API}/auth/facebook`;
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="mt-6">
        <button
          type="submit"
          className="py-2 px-4 max-w-md flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-medium font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
          <span className="text-center w-full">Facebook</span>
          <img src="/icon/facebookicon.svg" className="-ml-24" alt="facebook" />
        </button>
      </div>
    </form>
  );
}
