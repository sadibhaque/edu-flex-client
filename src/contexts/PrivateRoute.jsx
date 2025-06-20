import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to={`/login`}></Navigate>;
};

export default PrivateRoute;
