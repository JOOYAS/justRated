import { NavLink } from "react-router-dom"

const AdmNavItem = ({ to, label, exact }) => {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-indigo-900/80 hover:text-white ${isActive ? "bg-indigo-700 text-white" : ""
                }`
            }
        >
            {label}
        </NavLink>
    )
}

export default AdmNavItem