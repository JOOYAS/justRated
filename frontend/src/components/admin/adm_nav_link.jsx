import { NavLink } from "react-router-dom"

const AdmNavItem = ({ to, label, exact }) => {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                `md:w-full md:px-3 my-2 md:m-0 md:py-2 text-gray-600 md:text-current md:rounded-lg border-b-4 border-transparent hover:border-b-indigo-950/50 md:hover:bg-indigo-950/80 md:hover:text-gray-200 ${isActive ? "border-b-indigo-800 md:bg-indigo-700 text-indigo-800 md:text-white" : ""
                }`
            }
        >
            {label}
        </NavLink>
    )
}

export default AdmNavItem