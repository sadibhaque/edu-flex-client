import CourseCard from "../components/CourseCard";
import { motion } from 'framer-motion';

motion;

const allCourses = [
    {
        id: 1,
        title: "React for Beginners",
        date: "2025-06-15",
        image: "/placeholder.svg?width=400&height=225&text=React",
    },
    {
        id: 2,
        title: "Advanced Node.js",
        date: "2025-06-10",
        image: "/placeholder.svg?width=400&height=225&text=Node.js",
    },
    {
        id: 3,
        title: "UI/UX with Figma",
        date: "2025-06-05",
        image: "/placeholder.svg?width=400&height=225&text=Figma",
    },
    {
        id: 4,
        title: "Python for Data Science",
        date: "2025-06-01",
        image: "/placeholder.svg?width=400&height=225&text=Python",
    },
    {
        id: 5,
        title: "DevOps on AWS",
        date: "2025-05-28",
        image: "/placeholder.svg?width=400&height=225&text=AWS",
    },
    {
        id: 6,
        title: "Introduction to SQL",
        date: "2025-05-25",
        image: "/placeholder.svg?width=400&height=225&text=SQL",
    },
    {
        id: 7,
        title: "Advanced CSS and Sass",
        date: "2025-05-20",
        image: "/placeholder.svg?width=400&height=225&text=CSS",
    },
    {
        id: 8,
        title: "Go Programming (Golang)",
        date: "2025-05-15",
        image: "/placeholder.svg?width=400&height=225&text=Go",
    },
];

export default function CoursesPage() {
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
                {allCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </motion.div>
    );
}
