import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoaderOverlay from "./loader_overlay";

const PrivateRoute = ({ allowedRoles, children }) => {
    const { info, isLoggedIn, loading } = useSelector(s => s.user);

    if (loading) return <LoaderOverlay />;

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    // role check
    if (allowedRoles && !allowedRoles.includes(info.role)) {
        // fallback: user role not allowed
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PrivateRoute;