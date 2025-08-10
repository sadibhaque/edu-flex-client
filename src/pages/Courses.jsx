import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

motion;

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("title-asc");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                fetch("https://eduflex-server.vercel.app/courses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setIsLoading(false);
                        setCourses(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching courses:", error);
                        setIsLoading(false);
                    });
            } catch (error) {
                console.error("Error fetching courses:", error);
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const sortedCourses = useMemo(() => {
        const arr = [...courses];
        switch (sortBy) {
            case "title-asc":
                return arr.sort((a, b) =>
                    (a.title || "").localeCompare(b.title || "")
                );
            case "title-desc":
                return arr.sort((a, b) =>
                    (b.title || "").localeCompare(a.title || "")
                );
            case "popular":
                return arr.sort((a, b) => (b.added || 0) - (a.added || 0));
            default:
                return arr.sort((a, b) =>
                    (a.title || "").localeCompare(b.title || "")
                );
        }
    }, [courses, sortBy]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="container mx-auto py-1 px-5 lg:px-0 my-10"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-3xl md:text-4xl font-bold">All Courses</h1>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="sort"
                        className="text-sm text-muted-foreground"
                    >
                        Sort by
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-md border bg-background px-3 py-2 text-sm"
                    >
                        <option value="title-asc">Title A–Z</option>
                        <option value="title-desc">Title Z–A</option>
                        <option value="popular">Most enrolled</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                {isLoading ? (
                    <Loading />
                ) : sortedCourses.length === 0 ? (
                    <p className="text-muted-foreground">No courses found.</p>
                ) : (
                    sortedCourses.map((course) => (
                        <div key={course._id} className="h-full">
                            <CourseCard course={course} />
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
}
