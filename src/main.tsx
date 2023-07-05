import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateDataPage from "./pages/updateData.tsx";
import TambahDataPage from "./pages/tambahData.tsx";
import DashboardPage from "./pages/Dashboard.tsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import ErrorPage from "./pages/404.tsx";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import ChatProvider from "./context/ChatProvider.tsx";
import ChatPage from "./pages/chat.tsx";

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
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatProvider>
        <ChakraProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </ChakraProvider>
      </ChatProvider>
    </Provider>
  </React.StrictMode>
);
