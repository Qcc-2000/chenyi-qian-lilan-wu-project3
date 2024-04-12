import MaxWidth from "./MaxWidth";
import { NavLink, Outlet } from "react-router-dom";

export default function NavBeforeLogin() {
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full">
      <MaxWidth>
        <div className="flex justify-between items-center h-10 border-b border-gray-300">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-red-900">
              Password Manager
            </div>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <div className="hover:bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <NavLink to="/" className={({ isActive }) => {
              return isActive ? 'text-red-900 font-bold' : ''
            }}>
              Home
            </NavLink>
            <Outlet />
            </div>
            
            <div className="hover:bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <NavLink to="/login" className={({ isActive }) => {
              return isActive ? 'text-red-900 font-bold' : ''
            }}>
              LogIn
            </NavLink>
            <Outlet />
            </div>
            
            <div className="hover:bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <NavLink to="/signup" className={({ isActive }) => {
              return isActive ? 'text-red-900 font-bold' : ''
            }}>
              SignUp
              </NavLink>
              <Outlet />
              </div>
            
          </div>
        </div>
      </MaxWidth>
    </div>
  );
}
