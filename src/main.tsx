import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx"
import UserDataTable from "./pages/UserDataTable.tsx";
import ForgotPassord from "./pages/ForgotPassword.tsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: `/users/:userID`,
    element: <UserDataTable/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassord />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
