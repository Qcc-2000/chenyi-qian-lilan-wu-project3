import PasswordsManager from "./components/PasswordManager";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
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

function App() {


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
