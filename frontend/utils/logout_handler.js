import axiosInstance from "./axios_instance";
import { clearUser } from "../src/store/user_slice";

const logoutHandler = async (dispatch) => {
    try {
        await axiosInstance.get("/auth/logout");
        dispatch(clearUser());
    } catch (err) {
        console.error("Logout failed", err);
    }
}

export default logoutHandler;