import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { clearUser, setUser } from "../store/user_slice";
import axiosInstance from "../../utils/axios_instance";

const Header = () => {
    const dispatch = useDispatch()
    const [showHeader, setShowHeader] = useState(true)
    const lastScroll = useRef(0);

    const [userData, setUserData] = useState(null)
    const userStoreData = useSelector(s => s.user);

    useEffect(() => {
        if (userStoreData.isLoggedIn) {
            axiosInstance.get(`/auth/me`)
                .then(res => res.data)
                .then(data => {
                    if (data?.userData)
                        setUserData(data?.userData)
                })
                .catch(error => {
                    dispatch(clearUser());
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userStoreData])


    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            setShowHeader(current < lastScroll.current || current < 10);
            lastScroll.current = current;
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    // bg - gradient - to - r from - rose - 600 to - stone - 600
    return (
        <header className={`bg-amber-50 dark:bg-neutral-500 border-t-8 border-t-amber-700 shadow-lg top-0 fixed w-screen z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : " -translate-y-full"}`}>
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                <div>
                    <img className="h-12" src="/just_rated_logo_new3.svg" alt="logo" />
                </div>

                <nav className="flex items-center gap-6 text-lg font-normal text-amber-900 dark:text-amber-50">
                    <Link to="/" className="hover:text-yellow-500 hover:underline underline-offset-4 transition">Home</Link>
                    <Link to="/movies" className="hover:text-yellow-500 hover:underline underline-offset-4 transition">Movies</Link>
                    <Link to="/about" className="hover:text-yellow-500 hover:underline underline-offset-4 transition">About</Link>
                    <Link to="/profile" className="hover:text-yellow-500 hover:underline underline-offset-4 transition">Account</Link>
                    {
                        !userData
                            ? <Link to="/login" className="hover:text-yellow-500 hover:underline underline-offset-4 transition">Login</Link>
                            : <div className="ms-12 h-12 w-12 border-2 bg-amber-900 text-amber-50 font-extrabold border-amber-800 rounded-full flex items-center justify-center overflow-hidden">
                                {
                                    userData?.profile
                                        ? <img className="hover:rotate-12 duration-300" src='https://i.pravatar.cc/150?img=4' alt='user avatar' />
                                        : <span>S</span>
                                }
                            </div>
                    }

                </nav>
            </div>
        </header>
    )
}

export default Header