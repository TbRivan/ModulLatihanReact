import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateDataPage from "./pages/updateData.tsx";
import TambahDataPage from "./pages/tambahData.tsx";
import DashboardPage from "./pages/dashboard.tsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import ErrorPage from "./pages/404.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/add",
    element: <TambahDataPage />,
  },
  {
    path: "/edit/:id",
    element: <UpdateDataPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
