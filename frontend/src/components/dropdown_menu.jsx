import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logoutHandler from "../../utils/logout_handler";
import { useDispatch } from "react-redux";
import ThemeToggle from "./theme_toggle";

const DropDownMenu = ({ user, setOpen, open }) => {
    const dispatch = useDispatch();
    const menuRef = useRef(null);

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
    return (
        <div ref={menuRef} className={`z-50 w-52 md:w-64 
        backdrop-blur-3xl bg-white/25 dark:bg-gray-800/25 
        text-black dark:text-amber-50 
        rounded-xl shadow-2xl overflow-hidden 
        transition-[max-height,opacity] duration-300 ease-out
        ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Link to="/profile" className="p-4 flex items-center gap-3 border-b dark:border-gray-700">
                <div className="size-20 border-2 bg-amber-90 font-extrabold border-amber-800 rounded-full flex items-center justify-center overflow-hidden">
                    {
                        user
                            ? <img className="hover:rotate-12 duration-300 object-cover h-full" src={user?.profile?.url} alt='user avatar' />
                            : <span className="hover:rotate-12 duration-300">{user?.name}</span>
                    }
                </div>
                <h3 className="text-xl font-bold mb-1">{user?.name}</h3>
            </Link>
            <ThemeToggle />


            {/* Navlinks (only on mobile) */}
            <nav className="flex flex-col md:hidden">

                <Link to="/" className="px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700">Home</Link>
                <Link to="/movies" className="px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700">Movies</Link>
                <Link to="/watchlist" className="px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700">Watchlist</Link>
                <Link to="/about" className="px-4 py-2 text-sm hover:underline hover:bg-gray-300 dark:hover:bg-gray-700">About</Link>
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
