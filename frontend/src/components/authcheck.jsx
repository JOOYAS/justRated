import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearUser, setLoading, setUser } from "../store/user_slice";
import axiosInstance from "../../utils/axios_instance";

const AuthInitializer = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, info } = useSelector(s => s.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setLoading(true));
        axiosInstance.get(`/auth/me`)
            .then(res => {
                if (res.data?.tokenData)
                    dispatch(setUser(res.data.tokenData));
                else dispatch(clearUser());
            })
            .catch(error => {
                dispatch(clearUser());
                console.error("Error fetching user data:", error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            if (info.role === "admin")
                navigate("/su", { replace: true });
            else navigate("/", { replace: true });
        }
    }, [isLoggedIn, info, navigate]);

    return <Outlet />;
};

export default AuthInitializer