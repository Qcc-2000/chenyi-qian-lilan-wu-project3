import MaxWidth from "./MaxWidth";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavAfterLogin({ username }) {
    const navigate = useNavigate();

    async function handleLogout() {
        await axios.post('/api/users/logOut');
        navigate('/');
    }


    return (
        <div className="sticky inset-x-0 top-0 z-30 w-full bg-white">
            <MaxWidth>
                <div className="flex justify-between items-center h-30 border-b border-gray-300">
                    <div className="flex items-center">
                        <div className="text-2xl font-bold text-red-900">
                            Password Manager
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                        <div className="hover:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <NavLink to="/home" className={({ isActive }) => {
                                return isActive ? 'text-red-900 font-bold' : ''
                            }}>
                                Home
                            </NavLink>
                        </div>

                        <div className="hover:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <NavLink to="/passwordsmanager" className={({ isActive }) => {
                            return isActive ? 'text-red-900 font-bold' : ''
                        }}>
                            Passwords Manager Page
                        </NavLink>
                        </div>

                        <div className="hover:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <button onClick={handleLogout}>Logout</button>
                        </div>

                        <div className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{username}</div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
}
