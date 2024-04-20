import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


import PasswordsManager from "./components/PasswordManager";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Message from "./components/Message.jsx";
import UserContext from "./components/UserContext";
import { Toaster } from "sonner";
import { useState } from "react";
import HomeAfterLogin from "./components/HomeAfterLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/home",
    element: <HomeAfterLogin />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/passwordsmanager",
    element: <PasswordsManager />,
    errorElement: <NotFoundPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
  
)
