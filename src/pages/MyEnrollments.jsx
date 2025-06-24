import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";
motion;

export default function MyEnrollments() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = use(AuthContext);
    const axiosSecure = useAxios();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                axiosSecure
                    .get(`/get-enrolled-courses/${user.email}`)
                    .then((response) => {
                        setIsLoading(false);
                        setEnrolledCourses(response.data);
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

    const handleRemoveEnrollment = async (id, courseId) => {
        setIsLoading(true);

        axiosSecure
            .patch(`/decrease-course-count/${courseId}`)
            .then((response) => {
                let data = {};
                try {
                    data = response.data ? JSON.parse(response.data) : {};
                    if (data) {
                        console.log("Course count decreased:");
                    }
                } catch (error) {
                    console.error("JSON parse error:", error);
                }
            })
            .catch((error) => {
                console.error("Error decreasing course count:", error);
            });

        axiosSecure
            .delete(`/remove-enrollment/${id}`)
            .then((response) => {
                console.log("Enrollment removal result:", response.data);
                toast.success("You have been unenrolled from the course.");
            })
            .catch((error) => {
                console.error("Error removing enrollment:", error);
                toast.error("Error during unenrollment!.");
            });

        const updatedCourses = enrolledCourses.filter(
            (course) => course._id !== id
        );
        setEnrolledCourses(updatedCourses);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
                <svg
                    className="animate-spin h-8 w-8 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <span className="ml-3 text-lg">
                    Loading your enrollments...
                </span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="container mx-auto py-12 md:py-16"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">
                        My Enrolled Courses
                    </CardTitle>
                    <CardDescription>
                        View and manage all the courses you are currently
                        enrolled in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {enrolledCourses.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground text-lg mb-4">
                                You haven't enrolled in any courses yet.
                            </p>
                            <Button
                                asChild
                                className="transition-all duration-300"
                            >
                                <Link to="/courses">Browse Courses</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">
                                            Image
                                        </TableHead>
                                        <TableHead>Course Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {enrolledCourses.map((course) => (
                                        <TableRow key={course._id}>
                                            <TableCell>
                                                <img
                                                    src={course.imageUrl}
                                                    alt={course.title}
                                                    width={60}
                                                    height={40}
                                                    className="rounded object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {course.title}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground max-w-[300px] truncate">
                                                {course.shortDescription}
                                            </TableCell>
                                            <TableCell className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-black text-white transition-all duration-300"
                                                >
                                                    <Link
                                                        to={`/courses/${course.courseId}`}
                                                    >
                                                        <ExternalLink className="h-4 w-4 mr-1" />{" "}
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleRemoveEnrollment(
                                                            course._id,
                                                            course.courseId
                                                        )
                                                    }
                                                    disabled={isLoading}
                                                    className="transition-all duration-300"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />{" "}
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
