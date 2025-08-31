import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/user_slice";
import axiosInstance from "../../utils/axios_instance";
import logoutHandler from "../../utils/logout_handler";
import { Link } from "react-router-dom";

const CurrentUser = () => {
    const user = useSelector((state) => state.user.info);

    const dispatch = useDispatch();

    return (
        <div className="h-screen w-full flex items-center backdrop-blur-sm bg-indigo-500/15">
            <div className="p-8 rounded-4xl bg-indigo-800/80 max-w-md m-auto text-center border-4 border-amber-100 text-white">
                <h1 className="text-3xl font-extralight">Already logged In</h1>
                <h2 className="text-2xl font-semibold mt-6 mb-4">{user?.name}</h2>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => logoutHandler(dispatch)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                    <Link to={'/'}
                        className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-green-300">Go home</Link>
                </div>

            </div>
        </div>

    );
};

export default CurrentUser;