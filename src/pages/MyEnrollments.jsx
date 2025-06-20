import { useState } from "react";
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

// Mock Course Data (reused from course details page for consistency)
const mockCourses = [
    {
        id: "1",
        title: "React for Beginners: Build Your First App",
        shortDescription:
            "Learn the fundamentals of React.js, including components, props, state, and hooks.",
        imageUrl: "/placeholder.svg?width=400&height=225&text=React+Course",
        duration: "12 hours",
        addedAt: "2025-06-15",
        instructor: { name: "Jane Doe" },
    },
    {
        id: "2",
        title: "Advanced Node.js: REST APIs & Microservices",
        shortDescription:
            "Dive deep into Node.js to build robust RESTful APIs and explore microservice architecture.",
        imageUrl: "/placeholder.svg?width=400&height=225&text=Node.js+Course",
        duration: "18 hours",
        addedAt: "2025-06-10",
        instructor: { name: "John Smith" },
    },
    {
        id: "3",
        title: "UI/UX Design with Figma: From Concept to Prototype",
        shortDescription:
            "Master Figma to create stunning user interfaces and engaging user experiences.",
        imageUrl: "/placeholder.svg?width=400&height=225&text=Figma+Course",
        duration: "15 hours",
        addedAt: "2025-06-05",
        instructor: { name: "Emily White" },
    },
    {
        id: "4",
        title: "Python for Data Science",
        shortDescription:
            "Learn Python, Machine Learning, and data visualization to solve real-world problems.",
        imageUrl: "/placeholder.svg?width=400&height=225&text=Python+Course",
        duration: "20 hours",
        addedAt: "2025-06-01",
        instructor: { name: "John Smith" },
    },
    {
        id: "5",
        title: "DevOps on AWS",
        shortDescription:
            "Master cloud deployment and infrastructure management on Amazon Web Services.",
        imageUrl: "/placeholder.svg?width=400&height=225&text=AWS+Course",
        duration: "25 hours",
        addedAt: "2025-05-28",
        instructor: { name: "Michael Brown" },
    },
];

export default function MyEnrollments() {
    const [enrolledCourses, setEnrolledCourses] = useState(mockCourses);
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveEnrollment = async (courseId, courseTitle) => {
        setIsLoading(true);

        // Simulate API call to remove enrollment
        await new Promise((resolve) => setTimeout(resolve, 800));

        const updatedCourses = enrolledCourses.filter(
            (course) => course.id !== courseId
        );
        setEnrolledCourses(updatedCourses);

        toast.success("Enrollment removed!", {
            description: `You have been unenrolled from "${courseTitle}".`,
        });
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
                                <Link href="/courses">Browse Courses</Link>
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
                                        <TableHead>Instructor</TableHead>
                                        <TableHead className="text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {enrolledCourses.map((course) => (
                                        <TableRow key={course.id}>
                                            <TableCell>
                                                <img
                                                    src={
                                                        "https://i.ibb.co/DDcpNXBf/image.png"
                                                    }
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
                                            <TableCell>
                                                {course.instructor.name}
                                            </TableCell>
                                            <TableCell className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-black text-white transition-all duration-300"
                                                >
                                                    <Link
                                                        href={`/courses/${course.id}`}
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
                                                            course.id,
                                                            course.title
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
