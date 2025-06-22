import { Link } from "react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
motion;
import { useRef } from "react";

// Mock Instructor Data
const instructors = [
    {
        id: "inst1",
        name: "Jane Doe",
        title: "Lead Web Development Instructor",
        bio: "Jane is a seasoned full-stack developer with over 10 years of experience in building scalable web applications. She specializes in React, Node.js, and modern database technologies. Jane is passionate about teaching and empowering the next generation of developers.",
        image: "/placeholder.svg?width=150&height=150&text=Jane+Doe",
        courses: [
            { id: "1", title: "React for Beginners: Build Your First App" },
            { id: "2", title: "Advanced Node.js: REST APIs & Microservices" },
            { id: "5", title: "DevOps on AWS" },
        ],
        email: "jane.doe@example.com",
    },
    {
        id: "inst2",
        name: "John Smith",
        title: "Data Science & AI Expert",
        bio: "John holds a Ph.D. in Artificial Intelligence and has worked on various data-driven projects for Fortune 500 companies. His expertise lies in Machine Learning, Python, and Big Data analytics. He loves simplifying complex concepts for his students.",
        image: "/placeholder.svg?width=150&height=150&text=John+Smith",
        courses: [
            { id: "4", title: "Python for Data Science" },
            { id: "6", title: "Introduction to SQL" },
            { id: "7", title: "Advanced Machine Learning" }, // Example new course
        ],
        email: "john.smith@example.com",
    },
    {
        id: "inst3",
        name: "Emily White",
        title: "UI/UX Design Lead",
        bio: "Emily is an award-winning UI/UX designer with a keen eye for aesthetics and user-centric design. She has led design teams for major tech companies and is proficient in Figma, Sketch, and Adobe XD. Emily believes good design can change the world.",
        image: "/placeholder.svg?width=150&height=150&text=Emily+White",
        courses: [
            {
                id: "3",
                title: "UI/UX Design with Figma: From Concept to Prototype",
            },
            { id: "8", title: "Design Systems Masterclass" }, // Example new course
        ],
        email: "emily.white@example.com",
    },
    {
        id: "inst4",
        name: "Michael Brown",
        title: "Cloud & Cybersecurity Specialist",
        bio: "Michael is a certified cloud architect and cybersecurity professional. He has extensive experience in securing cloud infrastructures and implementing robust network defenses. He's dedicated to teaching practical skills for real-world security challenges.",
        image: "/placeholder.svg?width=150&height=150&text=Michael+Brown",
        courses: [
            { id: "5", title: "DevOps on AWS" },
            { id: "9", title: "Cybersecurity Fundamentals" }, // Example new course
        ],
        email: "michael.brown@example.com",
    },
];

export default function Instructors() {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, amount: 0.3 });

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <div className="container mx-auto py-12 md:py-16">
            <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl font-bold text-center mb-12"
            >
                Meet Our Expert Instructors
            </motion.h1>
            <motion.p
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-16"
            >
                Learn from industry leaders and passionate educators. Our
                instructors bring real-world experience and a commitment to your
                success.
            </motion.p>

            <motion.div
                ref={containerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {instructors.map((instructor) => (
                    <motion.div key={instructor.id} variants={cardVariants}>
                        <Card className="flex flex-col items-center text-center p-6 max-w-11/12 mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02]">
                            <img
                                src={"https://i.ibb.co/DDcpNXBf/image.png"}
                                alt={instructor.name}
                                className="rounded-full w-50 h-50 fill object-cover border"
                            />
                            <div className="mx-auto mb-4">
                                <CardTitle className="text-2xl font-bold">
                                    {instructor.name}
                                </CardTitle>
                                <CardDescription className="text-primary font-medium">
                                    {instructor.title}
                                </CardDescription>
                            </div>
                            <CardContent className="p-0 flex-grow">
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-4">
                                    {instructor.bio}
                                </p>
                                <div className="text-left w-full mb-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center justify-center md:justify-start">
                                        <BookOpenCheck className="h-5 w-5 mr-2 text-primary" />
                                        Courses Taught:
                                    </h3>
                                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                        {instructor.courses.map((course) => (
                                            <li key={course.id}>
                                                <Link
                                                    href={`/courses/${course.id}`}
                                                    className="hover:underline hover:text-primary transition-colors"
                                                >
                                                    {course.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                            <div className="w-full bg-primary rounded-sm">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full h-full text-white border-primary bg-primary transition-all duration-300"
                                >
                                    <a href={`mailto:${instructor.email}`}>
                                        <Mail className="h-4 w-4 mr-2" />{" "}
                                        Contact {instructor.name.split(" ")[0]}
                                    </a>
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
