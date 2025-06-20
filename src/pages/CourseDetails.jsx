import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, User, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { div } from "motion/react-client";

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
        instructor: {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            avatar: "/placeholder.svg?height=40&width=40&text=JD",
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
        instructor: {
            name: "John Smith",
            email: "john.smith@example.com",
            avatar: "/placeholder.svg?height=40&width=40&text=JS",
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
        instructor: {
            name: "Emily White",
            email: "emily.white@example.com",
            avatar: "/placeholder.svg?height=40&width=40&text=EW",
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
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center px-4">
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
            className="container mx-auto py-12 md:py-16"
        >
            <Card className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="relative w-full h-64 md:h-96">
                        <img
                            src={course.imageUrl || "/placeholder.svg"}
                            alt={course.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
                                {course.title}
                            </CardTitle>
                            <CardDescription className="text-lg text-gray-200">
                                {course.shortDescription}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">
                            About This Course
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            {course.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center text-muted-foreground">
                                <Clock className="h-5 w-5 mr-2 text-primary" />
                                <span>Duration: {course.duration}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-5 w-5 mr-2 text-primary" />
                                <span>Added on: {course.addedAt}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <User className="h-5 w-5 mr-2 text-primary" />
                                <span>
                                    Instructor: {course.instructor.name}
                                </span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                <span>Category: Web Development</span>{" "}
                                {/* Placeholder */}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3">
                            What You'll Learn
                        </h3>
                        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1">
                            <li>
                                Build responsive user interfaces with React
                                components.
                            </li>
                            <li>
                                Manage application state effectively using React
                                Hooks.
                            </li>
                            <li>
                                Integrate with RESTful APIs to fetch and display
                                data.
                            </li>
                            <li>
                                Understand component lifecycle and performance
                                optimization.
                            </li>
                            <li>
                                Deploy your React applications to production.
                            </li>
                        </ul>

                        <h3 className="text-xl font-bold mb-3">Requirements</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>
                                Basic understanding of HTML, CSS, and
                                JavaScript.
                            </li>
                            <li>Familiarity with command line interface.</li>
                            <li>A code editor like VS Code.</li>
                        </ul>
                    </div>

                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <Card className="p-4">
                            <h3 className="text-xl font-bold mb-4">
                                Enroll Now
                            </h3>
                            <Button
                                onClick={handleEnrollToggle}
                                className="w-full text-lg py-6 transition-all duration-300"
                                disabled={isLoading || !isLoggedIn}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                    "Enrolled (Click to Unenroll)"
                                ) : (
                                    "Enroll Now"
                                )}
                            </Button>
                            {!isLoggedIn && (
                                <p className="text-sm text-center text-red-400 mt-2">
                                    Please log in to enroll in this course.
                                </p>
                            )}
                            {isLoggedIn &&
                                userEnrollments.length >= MAX_ENROLLMENTS &&
                                !isEnrolled && (
                                    <p className="text-sm text-center text-yellow-400 mt-2">
                                        You have reached your enrollment limit (
                                        {MAX_ENROLLMENTS} courses).
                                    </p>
                                )}
                        </Card>

                        <Card className="p-4">
                            <h3 className="text-xl font-bold mb-4">
                                Instructor
                            </h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        course.instructor.avatar ||
                                        "/placeholder.svg"
                                    }
                                    alt={course.instructor.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        {course.instructor.name}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        {course.instructor.email}
                                    </p>
                                    <Link
                                        href="#"
                                        className="text-primary text-sm hover:underline mt-1 block transition-colors"
                                    >
                                        View Instructor Profile
                                    </Link>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm mt-4">
                                {course.instructor.name} is a seasoned expert
                                with over 10 years of experience in web
                                development, specializing in React and Node.js.
                                He is passionate about teaching and helping
                                students achieve their career goals.
                            </p>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
