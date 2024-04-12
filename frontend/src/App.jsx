import PasswordsManager from "./components/PasswordManager";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Message from "./components/Message.jsx";
import UserContext from "./components/UserContext";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/passwordsmanager',
    element: <PasswordsManager />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/message',
    element: <Message />,
    errorElement: <NotFoundPage />,
  }

]);

function App() {
  const [loginState, setLoginState] = useState({
    isLogin: false,
    loginUsername: ''
  });

  return (
    <UserContext.Provider value={{ loginState, setLoginState }}>

      <RouterProvider router={router} />
    </UserContext.Provider>

  );
}

export default App;
