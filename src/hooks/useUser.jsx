import React, { useEffect, useState } from "react";
import { use } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useUser = () => {
    const [newUser, setNewUser] = useState(null);
    const { user } = use(AuthContext);

    useEffect(() => {
        if (user) {
            setNewUser(user);
        }
    }, [user]);

    return newUser;
};

export default useUser;
