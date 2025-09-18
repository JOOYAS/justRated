import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from "react-router-dom";
import axiosInstance from '../../utils/axios_instance';
import { clearUser } from '../store/user_slice';
import AdmNavItem from '../components/admin/adm_nav_link';
import LazyImage from '../components/lazy_image';
const AdminDropDownMenu = lazy(() => import('../components/admin/adm_drop_down_menu'));
const ErrorPage = lazy(() => import('../pages/public/errorPage'));
const SearchBar = lazy(() => import('../components/admin/adm_search_bar'));

export default function AdminLayout() {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false)
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

    if (!userStoreData?.info?.role === "admin") return <ErrorPage />

    return (
        <div className="h-screen  bg-gray-100 dark:bg-gray-800 flex flex-col">

            {/* Header */}
            <header className="w-full px-4 py-2">
                <div className='flex justify-between items-center'>
                    <Link to={"/about"} className='flex items-center'>
                        <img className="h-12 bg-amber-950 dark:bg-transparent rounded-md" src="/just_rated_logo_new3.svg" alt="logo" /><span className='text-xl md:text-3xl font-extrabold'>Admin</span>
                    </Link>
                    <div className='hidden md:block'>
                        <SearchBar
                            onSearch={({ type, query }) => {
                                console.log("Searching:", type, query);
                                //axiosInstance(`${env.API}/admin/${type}?q=${query}`)
                            }}
                        />
                    </div>

                    <button
                        data-dropdown-toggle //a custom attribute to ign9ore click when needed
                        onClick={(e) => {
                            setOpen(!open)
                        }}
                        className="ms-12 size-12 rounded-xl flex items-center justify-center overflow-hidden hover:border-4 border-amber-900 dark:border-amber-100">
                        {
                            userData?.profile
                                ? <LazyImage publicId={userData?.profile?.public_id} alt={"profile picture"} className={"w-full h-full object-cover"} />
                                : <img src={`https://ui-avatars.com/api/?name=${userData?.name}`} className='roup-hover:rotate-12 duration-300 object-cover h-full' />
                        }
                    </button>
                </div>

            </header>
            <div className="absolute right-2 mt-3 z-50 bg-white/10 dark:bg-black/10">
                <AdminDropDownMenu user={userData} setOpen={setOpen} open={open} />
            </div>

            <div className="flex flex-col md:flex-row flex-1 min-h-0">
                {/* Navigation */}
                <aside className="w-full md:w-64 shadow-md bg-gray-100 dark:bg-gray-900">
                    <nav className="flex flex-row md:flex-col gap-2 md:p-4 justify-center md:justify-start items-center md:items-start">
                        <AdmNavItem to="/su" label="Dashboard" exact />
                        <AdmNavItem to="/su/movies" label="Movies" />
                        <AdmNavItem to={"/su/persons"} label="Persons" />
                        <AdmNavItem to="/su/users" label="Users" />
                        <AdmNavItem to="/su/reviews" label="Reviews" />
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-950">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}