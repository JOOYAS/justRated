import { useRef, useEffect, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import logoutHandler from "../../utils/logout_handler";
import LazyImage from "./lazy_image";
import { useDispatch } from "react-redux";
const ThemeToggle = lazy(() => import("./theme_toggle"));

const DropDownMenu = ({ user, setOpen, open }) => {
    const location = useLocation();
    const menuRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const handler = (e) => {
            //-------click outside closes the dropdown menus----------
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !e.target.closest('[data-dropdown-toggle]')
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [setOpen]);

    useEffect(() => {
        setOpen(false) // close modal
    }, [location.pathname]);

    return (

        <div
            ref={menuRef}
            className={`z-50 w-52 md:w-64 
    backdrop-blur-3xl
    text-black dark:text-amber-50 
    rounded-xl shadow-2xl overflow-hidden 
    transition-[max-height] duration-300 ease-out cursor-pointer
    ${open ? 'max-h-96' : 'max-h-0'}`}
        >
            <div to="/profile" className="group p-4 flex items-center gap-3 border-b bg-transparent dark:border-gray-700">
                <div className="size-20 bg-amber-90 font-extrabold rounded-full flex items-center justify-center overflow-hidden hover:border-2 border-amber-900 dark:border-amber-100">
                    {
                        user
                            ? <img className="object-cover h-full" src={user?.profile?.url} alt='user avatar' />
                            : <img src={`https://ui-avatars.com/api/?name=${user?.name}`} className='o' />
                        // : <span className="object-cover h-full">{user?.name}</span>
                    }
                </div>
                <Link className="text-xl font-bold mb-1 dark:group-hover:text-blue-600 group-hover:text-blue-800 group-hover:underline">{user?.name}</Link>
            </div>
            <ThemeToggle />

            {/* Navlinks (only on mobile) */}
            <nav className="flex flex-col md:hidden">
                <Link to="/" className="cursor-pointer px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">Home</Link>
                <Link to="/movies" className="cursor-pointer px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">Movies</Link>
                <Link to="/watchlist" className="cursor-pointer px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">Watchlist</Link>
                <Link to="/about" className="cursor-pointer px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">About</Link>
            </nav>

            <button
                onClick={() => logoutHandler(dispatch)}
                className="w-full px-4 py-2 text-left text-sm bg-red-400 hover:bg-red-600  dark:hover:bg-red-700 border-t dark:border-gray-700"
            >
                Logout
            </button>
        </div>
    )
}

export default DropDownMenu;
