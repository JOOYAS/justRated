import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearUser, setLoading, setUser } from "../store/user_slice";
import axiosInstance from "../../utils/axios_instance";

const AuthInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        axiosInstance.get(`/auth/me`)
            .then(res => res.data)
            .then(data => {
                if (data?.tokenData)
                    dispatch(setUser(data.tokenData));
                else dispatch(clearUser());

            })
            .catch(error => {
                dispatch(clearUser());
                console.error("Error fetching user data:", error);
            });
    }, [dispatch]);

    const userData = useSelector(s => s.user);
    console.log(userData);



    return <Outlet />;
}

export default AuthInitializer