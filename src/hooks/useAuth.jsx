import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
    const { user, loading } = useContext(AuthContext);

    return { user, loading };
};

export default useAuth;
