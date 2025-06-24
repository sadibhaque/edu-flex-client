import { useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { motion } from "framer-motion";
import { useState } from "react";
import Loading from "../components/Loading";

motion;

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                fetch(
                    "https://eduflex-server.vercel.app/courses?limit=6&sort=lastAdded",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // Assuming the data is an array of course objects
                        setIsLoading(false);
                        setCourses(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching courses:", error);
                    });
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="container mx-auto py-16"
        >
            <h1 className="text-4xl font-bold text-center mb-12">
                All Courses
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {isLoading ? (
                    <Loading />
                ) : (
                    courses.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))
                )}
            </div>
        </motion.div>
    );
}
