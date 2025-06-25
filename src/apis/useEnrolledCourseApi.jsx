import useAxios from "../hooks/useAxios";

const useEnrolledCourseApi = () => {
    const axiosSecure = useAxios();

    const data = async (email, id) => {
        return axiosSecure
            .get(`/get-enrolled-courses/${email}/${id}`)
            .then((res) => {
                console.log(res.data);
                return res.data;
            });
    };

    return {
        data,
    };
};

export default useEnrolledCourseApi;
