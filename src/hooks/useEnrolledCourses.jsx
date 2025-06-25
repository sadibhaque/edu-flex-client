import useAxios from "./useAxios";
import { useState } from "react";

const useEnrolledCourses = (user, course) => {
    const axiosSecure = useAxios();

    console.log(axiosSecure);

    // console.log(user, course);

    const [enrolledCourse, setEnrolledCourse] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);

    if (user && course) {
        axiosSecure
            .get(`/get-enrolled-courses/${user.email}`)
            .then((response) => {
                setEnrolledCourses(response.data);
            });

        axiosSecure
            .get(`/get-enrolled-courses/${user.email}/${course._id}`)
            .then((response) => {
                if (response.data.length > 0) {
                    setIsEnrolled(true);
                    setEnrolledCourse(response.data[0]);
                }
            });
    }

    return [enrolledCourse, enrolledCourses, isEnrolled];
};

export default useEnrolledCourses;
