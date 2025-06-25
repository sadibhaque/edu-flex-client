import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Star, Users, Award } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
motion;

export default function CourseDetails() {
    const course = useLoaderData();
    const MAX_ENROLLMENTS = 3;
    const [userEnrollments] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [enrolledCourse, setEnrolledCourse] = useState(null);
    const [students, setStudents] = useState(course.added);
    const axiosSecure = useAxios();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) {
            return;
        }
        axiosSecure
            .get(`/get-enrolled-courses/${user.email}/${course._id}`)
            .then((res) => {
                console.log(res.data);
                setEnrolledCourse(res.data);
                if (course._id === res.data.courseId) {
                    setIsEnrolled(true);
                }
                setIsLoading(false);
            });
    }, [user]);

    useEffect(() => {
        if (loading) {
            return;
        }
        axiosSecure.get(`/get-enrolled-courses/${user.email}`).then((res) => {
            console.log(res.data);
            setEnrolledCourses(res.data);
            setIsLoading(false);
        });
    }, [user]);

    const handleEnrollToggle = () => {
        setIsLoading(true);

        setTimeout(() => {
            if (isEnrolled) {
                setIsEnrolled(false);

                axiosSecure
                    .patch(`/decrease-course-count/${course._id}`)
                    .then(() => setStudents(students - 1));

                axiosSecure
                    .delete(`/remove-enrollment/${enrolledCourse?._id}`)
                    .then(() =>
                        toast.success(
                            "You have been unenrolled from the course."
                        )
                    );
            } else {
                if (enrolledCourses.length >= MAX_ENROLLMENTS) {
                    setIsLoading(false);
                    return toast.error(
                        `You can only enroll in a maximum of ${MAX_ENROLLMENTS} courses.`
                    );
                } else if (course.added >= 10) {
                    setIsLoading(false);
                    return toast.error(`No seats left.`);
                }
                setIsEnrolled(true);

                const data = {
                    courseId: course._id,
                    addBy: user?.email,
                    title: course.title,
                    shortDescription: course.shortDescription,
                    imageUrl: course.imageUrl,
                };

                axiosSecure
                    .patch(`/increase-course-count/${course._id}`)
                    .then(() => setStudents(students + 1));

                axiosSecure.post(`/enroll`, data).then(() => {
                    toast.success("Course added successfully!");
                });
            }
            setIsLoading(false);
        }, 1000);
    };

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center">
                <h1 className="text-9xl font-black text-primary/20">404</h1>
                <h2 className="text-3xl font-bold mt-4">Course Not Found</h2>
                <p className="mt-2 text-muted-foreground max-w-md">
                    Sorry, the course you are looking for does not exist.
                </p>
                <Button asChild className="mt-8 transition-all duration-300">
                    <Link href="/courses">Browse All Courses</Link>
                </Button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen "
        >
            <div className="max-w-10/12 mx-auto">
                <div className="" />
                <div className="relative container mx-auto py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Course Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl border">
                                <img
                                    src={
                                        course?.imageUrl ||
                                        "https://i.ibb.co/DDcpNXBf/image.png"
                                    }
                                    alt={course?.title || "Course"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Course Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Course Category & Level */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="text-sm">
                                    {course?.category || "Course"}
                                </Badge>
                                <Badge variant="outline" className="text-sm">
                                    {course?.level || "All Levels"}
                                </Badge>
                            </div>

                            {/* Course Title */}
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                {course?.title || "Course Title"}
                            </h1>

                            {/* Short Description */}
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {course?.shortDescription ||
                                    course?.description ||
                                    "Course description"}
                            </p>

                            {/* Course Stats */}
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i <
                                                    Math.floor(
                                                        course?.rating || 0
                                                    )
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold">
                                        {course?.rating || "New"}
                                    </span>
                                    <span className="text-muted-foreground">
                                        ({students}
                                        {"/10 "}
                                        students)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {course?.duration || "Self-paced"}
                                    </span>
                                </div>
                            </div>

                            {/* Enrollment Button */}
                            <div className="pt-4">
                                <Button
                                    onClick={handleEnrollToggle}
                                    size="lg"
                                    className="w-full sm:w-auto text-lg px-8 py-4 transition-all duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <svg
                                                className="animate-spin h-5 w-5"
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
                                            {isEnrolled
                                                ? "Unenrolling..."
                                                : "Enrolling..."}
                                        </span>
                                    ) : isEnrolled ? (
                                        <span className="flex items-center gap-2">
                                            <Award className="h-5 w-5" />
                                            Unenroll
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5" />
                                            Enroll Now
                                        </span>
                                    )}
                                </Button>
                                {userEnrollments.length >= MAX_ENROLLMENTS &&
                                    !isEnrolled && (
                                        <p className="text-sm text-yellow-400 mt-2">
                                            You have reached your enrollment
                                            limit ({MAX_ENROLLMENTS} courses).
                                        </p>
                                    )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-10/12 container mx-auto py-16">
                <div className="gap-12">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* About Course */}
                        {/* <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    About This Course
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {course?.description ||
                                        "Course description not available."}
                                </p>

                                <Separator />

                                <div>
                                    <h3 className="text-xl font-semibold mb-4">
                                        What You'll Learn
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            "Build responsive user interfaces with React components",
                                            "Manage application state effectively using React Hooks",
                                            "Integrate with RESTful APIs to fetch and display data",
                                            "Understand component lifecycle and performance optimization",
                                            "Deploy your React applications to production",
                                            "Best practices for modern React development",
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-xl font-semibold mb-4">
                                        Requirements
                                    </h3>
                                    <ul className="space-y-2">
                                        {[
                                            "Basic understanding of HTML, CSS, and JavaScript",
                                            "Familiarity with command line interface",
                                            "A code editor like VS Code",
                                            "Node.js installed on your computer",
                                        ].map((req, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">
                                                    {req}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card> */}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mx-5 lg:mx-0 space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-5"
                    >
                        {/* Course Features */}
                        <Card className="shadow-lg w-full lg:mx-0">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Course Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <span>Duration</span>
                                    </div>
                                    <span className="font-semibold">
                                        {course?.duration || "Self-paced"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary" />
                                        <span>Students</span>
                                    </div>
                                    <span className="font-semibold">
                                        {`${students} /10`}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        <span>Level</span>
                                    </div>
                                    <Badge variant="outline">
                                        {course?.level || "All Levels"}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-5 w-5 text-primary" />
                                        <span>Certificate</span>
                                    </div>
                                    <span className="font-semibold">Yes</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Instructor */}
                        <Card className="shadow-lg w-full lg:mx-0">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Your Instructor
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4">
                                    <img
                                        src={
                                            course?.instructor?.avatar ||
                                            "https://media.licdn.com/dms/image/v2/D4D03AQETAp6s0-agkA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695071989377?e=2147483647&v=beta&t=R34TxTbPGVzCqijmv8JBKKBYf5GlkXSSClv8ldRksxs"
                                        }
                                        alt={
                                            course?.instructor?.name ||
                                            "Instructor"
                                        }
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover border-2 border-primary/20"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">
                                            {course?.instructor?.name ||
                                                course?.instructorName ||
                                                "Course Instructor"}
                                        </h3>
                                        <p className="text-primary text-sm font-medium">
                                            {course?.instructor?.title ||
                                                "Experienced Educator"}
                                        </p>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            {course?.instructor?.experience ||
                                                "Professional experience"}
                                        </p>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 w-full"
                                        >
                                            <Link
                                                href={`mailto:${
                                                    course?.instructor?.email ||
                                                    course?.instructorEmail ||
                                                    "instructor@example.com"
                                                }`}
                                            >
                                                Contact Instructor
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
