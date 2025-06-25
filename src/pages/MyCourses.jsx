import { use, useEffect, useState } from "react";
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
import Loading from "../components/Loading";
import { Link } from "react-router";
motion;

export default function MyCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = use(AuthContext);
    const axiosSecure = useAxios();

    useEffect(() => {
        const fetchCourses = async () => {
            const email = await user?.email;
            axiosSecure.get(`/get-my-courses/${email}`).then((response) => {
                setIsLoading(false);
                setEnrolledCourses(response.data);
            });
        };
        fetchCourses();
    }, [user]);

    const handleRemoveEnrollment = async (id) => {
        setIsLoading(true);

        axiosSecure.delete(`/remove-course/${id}`).then((response) => {
            console.log("Course removal result:", response.data);
            toast.success("Course Removed Successfully.");
        });

        const updatedCourses = enrolledCourses.filter(
            (course) => course._id !== id
        );
        setEnrolledCourses(updatedCourses);
        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="container mx-auto px-5 lg:px-0 py-12 md:py-16"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">
                        Courses Added by You
                    </CardTitle>
                    <CardDescription>
                        View and manage all the courses you added.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {enrolledCourses.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground text-lg mb-4">
                                You haven't added any courses yet.
                            </p>
                            <Button
                                asChild
                                className="transition-all text-white duration-300"
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
                                        <TableHead>Title</TableHead>
                                        <TableHead className="">
                                            Description
                                        </TableHead>
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
                                            <TableCell className="text-muted-foreground max-w-[200px] truncate">
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
