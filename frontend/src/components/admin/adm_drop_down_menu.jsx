import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logoutHandler from "../../../utils/logout_handler";
import { useDispatch } from "react-redux";
import ThemeToggle from "../theme_toggle";

const AdminDropDownMenu = ({ user, setOpen, open }) => {
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
        <div ref={menuRef} className={`w-52 md:w-64 
        backdrop-blur-3xl text-black dark:text-amber-50 
        rounded-lg shadow-2xl overflow-hidden 
        transition-[max-height] duration-300 ease-out z-50
        ${open ? 'max-h-96' : 'max-h-0'}`}>
            <Link to="/profile" className="group p-4 flex items-center gap-3 border-b dark:border-gray-700">
                <div className="size-20 bg-amber-90 font-extrabold rounded-xl flex items-center justify-center overflow-hidden hover:border-2 border-amber-900 dark:border-amber-100">
                    {
                        user?.profile
                            ? <img className="object-cover h-full" src={user?.profile?.url} alt='user avatar' />
                            : <img src={`https://ui-avatars.com/api/?name=${user?.name}`} className='h-full object-cover' />
                    }
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 group-hover:underline">{user?.name}</h3>
            </Link>
            <ThemeToggle />


            {/* Navlinks (only on mobile) */}
            <nav className="flex flex-col md:hidden">


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

export default AdminDropDownMenu;