import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateDataPage from "./pages/updateData.tsx";
import TambahDataPage from "./pages/tambahData.tsx";
import DashboardPage from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
