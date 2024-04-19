import MaxWidth from "./MaxWidth";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavAfterLoginHome() {
    const { loginState, setLoginState } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {

        const newLoginState = {
            isLogin: false,
            loginUsername: ''
        };
        setLoginState(newLoginState);
        navigate('/');
    }

    return (
        <div className="sticky inset-x-0 top-0 z-30 w-full bg-white">
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
                        <NavLink to="/passwordsmanager" className={({ isActive }) => {
                            return isActive ? 'text-red-900 font-bold' : ''
                        }}>
                            Passwords Manager Page
                        </NavLink>
                        <Outlet />
                        </div>

                        
                        <div className="hover:bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <button onClick={handleLogout}>Logout</button>
                        </div>
                        
                        <div className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{loginState.loginUsername}</div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
}
