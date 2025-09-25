import axiosInstance from "./axios_instance";
import { clearUser } from "../src/store/user_slice";
import toast from "react-hot-toast";

const logoutHandler = async (dispatch) => {
    try {
        await axiosInstance.get("/auth/logout");
        dispatch(clearUser());
        toast.success("Logout Successful");
    } catch (err) {
        console.error("Logout failed", err);
    }
}

export default logoutHandler;