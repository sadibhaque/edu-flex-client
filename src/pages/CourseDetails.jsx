import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Calendar,
    Clock,
    BookOpen,
    Star,
    Users,
    Award,
    PlayCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useParams } from 'react-router';

// Mock Course Data (replace with actual API fetch)
const mockCourses = [
    {
        id: "1",
        title: "React for Beginners: Build Your First App",
        shortDescription:
            "Learn the fundamentals of React.js, including components, props, state, and hooks, by building a simple application from scratch.",
        description:
            "This comprehensive course is designed for absolute beginners to React.js. You'll start with the basics of JavaScript ES6, then dive into React components, JSX, props, and state management. We'll cover functional components, the useState and useEffect hooks, and how to build interactive user interfaces. By the end of the course, you'll have built a complete, small-scale React application and gained the confidence to tackle more complex projects.",
        imageUrl: "/placeholder.svg?width=800&height=450&text=React+Course",
        duration: "12 hours",
        addedAt: "2025-06-15",
        rating: 4.8,
        students: 1250,
        level: "Beginner",
        category: "Web Development",
        instructor: {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            avatar: "/placeholder.svg?height=40&width=40&text=JD",
            title: "Senior React Developer",
            experience: "8+ years",
        },
    },
    {
        id: "2",
        title: "Advanced Node.js: REST APIs & Microservices",
        shortDescription:
            "Dive deep into Node.js to build robust RESTful APIs, implement authentication, and explore microservice architecture patterns.",
        description:
            "Take your Node.js skills to the next level. This course covers advanced topics like building scalable REST APIs with Express, implementing JWT authentication, integrating with MongoDB, and designing microservices. You'll learn about error handling, logging, testing, and deployment strategies to build production-ready backend applications.",
        imageUrl: "/placeholder.svg?width=800&height=450&text=Node.js+Course",
        duration: "18 hours",
        addedAt: "2025-06-10",
        rating: 4.9,
        students: 890,
        level: "Advanced",
        category: "Backend Development",
        instructor: {
            name: "John Smith",
            email: "john.smith@example.com",
            avatar: "/placeholder.svg?height=40&width=40&text=JS",
            title: "Full Stack Engineer",
            experience: "10+ years",
        },
    },
    {
        id: "3",
        title: "UI/UX Design with Figma: From Concept to Prototype",
        shortDescription:
            "Master Figma to create stunning user interfaces and engaging user experiences. Learn wireframing, prototyping, and design systems.",
        description:
            "This course is your complete guide to UI/UX design using Figma. You'll learn the entire design process, from understanding user needs and creating user flows to wireframing, prototyping, and building interactive mockups. We'll cover best practices for visual design, typography, color theory, and how to create reusable design components and systems. Perfect for aspiring UI/UX designers and developers looking to enhance their design skills.",
        imageUrl: "/placeholder.svg?width=800&height=450&text=Figma+Course",
        duration: "15 hours",
        addedAt: "2025-06-05",
        rating: 4.7,
        students: 2100,
        level: "Intermediate",
        category: "Design",
        instructor: {
            name: "Emily White",
            email: "emily.white@example.com",
            avatar: "/placeholder.svg?height=40&width=40&text=EW",
            title: "Senior UX Designer",
            experience: "6+ years",
        },
    },
];

// Mock User Data and Enrollments (replace with actual auth/backend)
const MOCK_LOGGED_IN_USER_EMAIL = "testuser@example.com";
const MAX_ENROLLMENTS = 3;

// Simulate local storage for persistent enrollment
const getInitialEnrollments = () => {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userEnrollments");
        return stored ? JSON.parse(stored) : [];
    }
    return [];
};

export default function CourseDetails() {
    const params = useParams();
    const courseId = params.id;
    const course = mockCourses.find((c) => c.id === courseId);

    // Simulate login status
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for testing logged-in state
    // Simulate user's enrolled courses (array of course IDs)
    const [userEnrollments, setUserEnrollments] = useState(
        getInitialEnrollments()
    );
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking enrollment status on page load
        setIsLoading(true);
        const storedEnrollments = getInitialEnrollments();
        setUserEnrollments(storedEnrollments);
        setIsEnrolled(storedEnrollments.includes(courseId));
        setIsLoading(false);
    }, [courseId]);

    useEffect(() => {
        // Persist enrollments to local storage
        if (typeof window !== "undefined") {
            localStorage.setItem(
                "userEnrollments",
                JSON.stringify(userEnrollments)
            );
        }
    }, [userEnrollments]);

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

    const handleEnrollToggle = async () => {
        if (!isLoggedIn) {
            toast.error("Please log in to enroll in courses.", {
                description: "You need an account to manage your enrollments.",
            });
            return;
        }

        setIsLoading(true); // Show loading spinner on button

        // Simulate API call for enrollment/unenrollment
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (isEnrolled) {
            // Unenroll
            const updatedEnrollments = userEnrollments.filter(
                (id) => id !== courseId
            );
            setUserEnrollments(updatedEnrollments);
            setIsEnrolled(false);
            toast.info("Unenrolled successfully!", {
                description: `You have been unenrolled from "${course.title}".`,
            });
        } else {
            // Enroll
            if (userEnrollments.length >= MAX_ENROLLMENTS) {
                toast.error("Enrollment limit reached!", {
                    description: `You can only enroll in a maximum of ${MAX_ENROLLMENTS} courses at a time. Please unenroll from another course first.`,
                });
                setIsLoading(false);
                return;
            }

            // In a real app, you'd send MOCK_LOGGED_IN_USER_EMAIL and courseId to your backend
            // to store in a separate collection (e.g., 'enrollments').
            const updatedEnrollments = [...userEnrollments, courseId];
            setUserEnrollments(updatedEnrollments);
            setIsEnrolled(true);
            toast.success("Enrolled successfully!", {
                description: `You are now enrolled in "${course.title}".`,
            });
        }
        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen "
        >
            {/* Hero Section */}
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
                                    src={"https://i.ibb.co/DDcpNXBf/image.png"}
                                    alt={course.title}
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
                                    {course.category}
                                </Badge>
                                <Badge variant="outline" className="text-sm">
                                    {course.level}
                                </Badge>
                            </div>

                            {/* Course Title */}
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                {course.title}
                            </h1>

                            {/* Short Description */}
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {course.shortDescription}
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
                                                    Math.floor(course.rating)
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold">
                                        {course.rating}
                                    </span>
                                    <span className="text-muted-foreground">
                                        ({course.students.toLocaleString()}{" "}
                                        students)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Updated {course.addedAt}</span>
                                </div>
                            </div>

                            {/* Enrollment Button */}
                            <div className="pt-4">
                                <Button
                                    onClick={handleEnrollToggle}
                                    size="lg"
                                    className="w-full sm:w-auto text-lg px-8 py-4 transition-all duration-300"
                                    disabled={isLoading || !isLoggedIn}
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
                                            Enrolled - Continue Learning
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5" />
                                            Enroll Now
                                        </span>
                                    )}
                                </Button>
                                {!isLoggedIn && (
                                    <p className="text-sm text-red-400 mt-2">
                                        Please log in to enroll in this course.
                                    </p>
                                )}
                                {isLoggedIn &&
                                    userEnrollments.length >= MAX_ENROLLMENTS &&
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
            <div className="container mx-auto py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* About Course */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    About This Course
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {course.description}
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
                        </Card>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Course Features */}
                        <Card className="shadow-lg">
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
                                        {course.duration}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary" />
                                        <span>Students</span>
                                    </div>
                                    <span className="font-semibold">
                                        {course.students.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        <span>Level</span>
                                    </div>
                                    <Badge variant="outline">
                                        {course.level}
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
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Your Instructor
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4">
                                    <img
                                        src={
                                            course.instructor.avatar ||
                                            "/placeholder.svg"
                                        }
                                        alt={course.instructor.name}
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover border-2 border-primary/20"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">
                                            {course.instructor.name}
                                        </h3>
                                        <p className="text-primary text-sm font-medium">
                                            {course.instructor.title}
                                        </p>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            {course.instructor.experience}{" "}
                                            experience
                                        </p>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 w-full"
                                        >
                                            <Link
                                                href={`mailto:${course.instructor.email}`}
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
