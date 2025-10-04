import React from "react";
import { useSelector, useDispatch } from "react-redux";
import logoutHandler from "../../utils/logout_handler";
import { Link } from "react-router-dom";

const CurrentUser = () => {
    const user = useSelector((state) => state.user.info);

    const dispatch = useDispatch();

    return (
        <div className="h-screen w-full flex items-center backdrop-blur-xs bg-black/5 transition-all duration-150">
            <div className="px-12 py-6 rounded-4xl bg-emerald-50/80 dark:bg-indigo-950/50 max-w-md m-auto text-center border-4 border-amber-100 text-neutral-900 dark:text-neutral-50">
                <p className="text-lg font-extralight">You are Loggedin</p>
                <p className="text-lg font-extralight mt-2 mb-4">As <span className="text-3xl font-medium text-amber-600">{user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}</span></p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => logoutHandler(dispatch)}
                        className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-red-400 to-red-500 text-black font-semibold shadow-lg border-4 border-transparent hover:border-amber-100 hover:shadow-xl transition-transform hover:scale-105 duration-200"
                    >
                        Logout
                    </button>
                    <Link to={user?.role === "admin" ? '/su' : '/'}
                        className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg border-4 border-transparent hover:border-amber-100 hover:shadow-xl transition-transform hover:scale-105 duration-200">{user?.role === "admin" ? 'Dashboard' : 'Go home'}</Link>
                </div>
            </div>
        </div>
    );
};

export default CurrentUser;