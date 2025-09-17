import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearUser, setLoading, setUser } from "../store/user_slice";
import axiosInstance from "../../utils/axios_instance";

const AuthInitializer = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, info } = useSelector(s => s.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(setLoading(true));
        axiosInstance.get(`/auth/me`)
            .then(res => {
                if (res.data?.tokenData)
                    dispatch(setUser(res.data.tokenData));
                else dispatch(clearUser());
            })
            .catch(error => {
                setTimeout(() => dispatch(clearUser()), 300);
                console.error("Error fetching user data:", error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            const currentPath = location.pathname;

            // Redirect only if on root or unauthorized path
            if (currentPath === "/" || currentPath === "/login") {
                if (info.role === "admin") {
                    navigate("/su", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            }
        }
    }, [isLoggedIn, info, navigate]);

    return <Outlet />;
};

export default AuthInitializer