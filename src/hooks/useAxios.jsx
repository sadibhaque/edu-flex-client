import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: "https://eduflex-server.vercel.app/",
});

const useAxios = () => {
    const { user } = useAuth();

    instance.interceptors.request.use((config) => {
        if (user?.accessToken) {
            config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error);
            if (error.status === 401 || error.status === 403) {
                console.log("messed up");
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxios;
