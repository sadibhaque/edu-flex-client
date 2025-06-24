import React, { use } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxios = () => {
    const { user } = use(AuthContext);
    instance.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxios;
