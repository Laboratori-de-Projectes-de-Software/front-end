import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider"

const PrivateRoute = () => {
    const auth = useAuth();
    return auth!.user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;