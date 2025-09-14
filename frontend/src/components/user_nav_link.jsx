import { NavLink } from "react-router-dom"

const UserNavItem = ({ to, label, exact }) => {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                `px-2 relative transition-all duration-200 
            after:content-[''] after:absolute after:left-0 after:top-0
				after:h-full after:w-0 after:bg-indigo-950/30 dark:after:bg-amber-50/25 after:rounded-4xl after:transition-all after:duration-300 hover:after:w-full
				hover:text-yellow-500
				${isActive ? "font-bold after:w-full" : ""}`
            }
        >
            {label}
        </NavLink>
    )
}

export default UserNavItem