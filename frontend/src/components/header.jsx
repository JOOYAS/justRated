import { useState, useEffect, useRef, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { clearUser, setUser } from "../store/user_slice";
import axiosInstance from "../../utils/axios_instance";
import UserNavItem from "./user_nav_link";
import LazyImage from "./lazy_image";
import SearchModal from "./search_modal";
const DropDownMenu = lazy(() => import("./dropdown_menu"));
const Hamburger = lazy(() => import("./hamburger_button"));

const Header = () => {
    const dispatch = useDispatch()
    const [showHeader, setShowHeader] = useState(true)
    const lastScroll = useRef(0);

    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false);
    const userStoreData = useSelector(s => s.user);

    useEffect(() => {
        if (userStoreData.isLoggedIn) {
            axiosInstance.get(`/auth/me`)
                .then(res => res.data)
                .then(data => {
                    if (data?.userData)
                        console.log("userData :", data?.userData);
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

    return (
        <header className={`backdrop-blur-xl bg-emerald-50/35 dark:bg-neutral-500/35 border-t-8 border-t-amber-700 top-0 fixed w-screen z-[9999] transition-transform duration-300 ${showHeader ? "translate-y-0" : " -translate-y-full"}`}>
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                <Link to={"/about"}>
                    <img className="h-12 bg-amber-950 dark:bg-transparent rounded-md" src="/just_rated_logo_new3.svg" alt="logo" />
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-lg font-normal text-amber-500 dark:text-amber-300">
                    <nav className="hidden md:flex items-center gap-6 text-lg font-normal text-amber-500 dark:text-amber-300">
                        {/* Search Trigger */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className="hover:text-amber-500 text-4xl font-extrabold flex items-center justify-center cursor-pointer"
                        >
                            ⌕
                        </button>
                    </nav>
                    <UserNavItem to="/" label="Home" exact />
                    <UserNavItem to="/movies" label="Movies" />
                    <UserNavItem to="/watchlist" label="Watchlist" />
                    <UserNavItem to="/about" label="About" />                    
                    {
                        userData
                            ? <button
                                data-dropdown-toggle //a custom attribute to ign9ore click when needed
                                onClick={(e) => {
                                    setOpen(!open)
                                }}
                                className="ms-12 size-12 border-2 bg-amber-900 text-amber-50 text-3xl font-extrabold border-amber-800 rounded-full flex items-center justify-center overflow-hidden hover:rotate-12 duration-300">
                                {
                                    userData?.profile
                                        ? < LazyImage publicId={userData?.profile?.public_id} className={"object-cover h-full"} />
                                        // ? <img className="hover:rotate-12 duration-300 object-cover h-full" src={} alt='user profile picture' />
                                        : <img src={`https://ui-avatars.com/api/?name=${userData?.name}`} className='h-full object-cover' />
                                }
                            </button>
                            : null
                    }
                </nav>
                <div className="flex md:hidden gap-4">
                    <nav className="flex items-center gap-6 text-lg font-normal text-amber-500 dark:text-amber-300">
                        {/* Search Trigger */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className="hover:text-amber-500 text-4xl font-extrabold flex items-center justify-center cursor-pointer"
                        >
                            ⌕
                        </button>
                    </nav>
                    <Hamburger open={open} setOpen={setOpen} /> 
                </div>
            </div>
            <div className="absolute right-2 mt-3 z-50 bg-white/30 dark:bg-black/30 rounded-lg backdrop-blur-3xl">
                <DropDownMenu user={userData} setOpen={setOpen} open={open} />
            </div>
            <SearchModal
                show={showSearch}
                onClose={() => setShowSearch(false)}
            />
        </header>
    )
}

export default Header