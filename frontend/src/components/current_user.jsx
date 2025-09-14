import React from "react";
import { useSelector, useDispatch } from "react-redux";
import logoutHandler from "../../utils/logout_handler";
import { Link } from "react-router-dom";

const CurrentUser = () => {
    const user = useSelector((state) => state.user.info);

    const dispatch = useDispatch();

    return (
        <div className="h-screen w-full flex items-center backdrop-blur-sm bg-black/5">
            <div className="p-8 rounded-4xl bg-amber-50/80 dark:bg-neutral-900/50 max-w-md m-auto text-center border-4 border-amber-100 text-neutral-900 dark:text-neutral-50">
                <h1 className="text-3xl font-extralight">logged in as</h1>
                <h2 className="text-2xl font-semibold mt-2 mb-4">{user?.name}</h2>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => logoutHandler(dispatch)}
                        className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-red-400 to-red-500 text-black font-semibold shadow-lg border-4 border-transparent hover:border-amber-100 hover:shadow-xl transition-transform hover:scale-105 duration-200"
                    >
                        Logout
                    </button>
                    <Link to={'/'}
                        className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg border-4 border-transparent hover:border-amber-100 hover:shadow-xl transition-transform hover:scale-105 duration-200">Go home</Link>
                </div>
            </div>
        </div>
    );
};

export default CurrentUser;