import { Link, Outlet } from "react-router-dom";

import NavBeforeLogin from "./NavBeforeLogin";

export default function Home () {
    return (
        <div>
            <NavBeforeLogin />
            
            <div className="flex flex-col justify-center items-center m-10">
                <h1 className="text-2xl text-slate-800 font-bold m-5">The Password Manageer introduction</h1>
                <div className="flex flex-col justify-start items-start gap-5 m-10">
                    <p>
                        If it is your first time to use the Password Manger, please sign up a new account. If you already have an account, please log in.
                    </p>
                    <h2 className="text-xl text-slate-800 font-bold">Functions</h2>
                    <ul>
                        <li>You can store new url and password. You can create the password by your own. 
                            If you leave the password blank, the password manager will randomly create a neww password for you. 
                            Please at least select one check box for alphabet, numerals, symbols, and input a length between 4-50.
                        </li>
                        <li>
                            You can see all your passwords and you can delete or update each individual password.
                        </li>
                        <li>You can share your password with another user by inputing the sharer's username.
                            After the share invite receiver accept your share request, both of you can see each other's passwords.
                            In addition, if someone sent a share invite to you, you would see a message in your password manager page. 
                            You can open the message and choose reject or accept.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    );
}