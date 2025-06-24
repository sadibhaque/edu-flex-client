import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useInView } from "framer-motion";
motion;
import { Link } from "react-router";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ArrowRight,
    Calendar,
    Star,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Image } from "@radix-ui/react-avatar";
import { useRef } from "react";
import CourseCard from "../components/CourseCard";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";

const sliderItems = [
    {
        bgImage: "/placeholder.svg?width=1200&height=800&text=Modern+Web+Dev",
        title: "Master Modern Web Development",
        subtitle:
            "From fundamentals to advanced topics, become a full-stack developer with our project-based curriculum.",
    },
    {
        bgImage: "/placeholder.svg?width=1200&height=800&text=Data+Science",
        title: "Unlock the Power of Data Science",
        subtitle:
            "Learn Python, Machine Learning, and data visualization to solve real-world problems.",
    },
    {
        bgImage: "/placeholder.svg?width=1200&height=800&text=UI/UX+Design",
        title: "Design Stunning User Experiences",
        subtitle:
            "Master the art of UI/UX design with Figma, from wireframing to high-fidelity prototypes.",
    },
];

const testimonials = [
    {
        name: "Alex Johnson",
        role: "Software Engineer",
        text: "EduFlex transformed my career. The hands-on projects were invaluable.",
        avatar: "/placeholder.svg?height=48&width=48&text=AJ",
    },
    {
        name: "Maria Garcia",
        role: "UX Designer",
        text: "The design courses are top-notch. I landed my dream job thanks to the portfolio I built here.",
        avatar: "/placeholder.svg?height=48&width=48&text=MG",
    },
    {
        name: "Sam Lee",
        role: "Data Analyst",
        text: "I went from zero to hero in Python and data analysis. The instructors are amazing!",
        avatar: "/placeholder.svg?height=48&width=48&text=SL",
    },
];

const faqItems = [
    {
        q: "Are the courses self-paced?",
        a: "Yes, all of our courses are 100% self-paced. You can start, pause, and resume your learning anytime to fit your schedule.",
    },
    {
        q: "Do I get a certificate upon completion?",
        a: "Upon successful completion of any course, you will receive a verifiable certificate that you can share on your LinkedIn profile and resume.",
    },
    {
        q: "Is there support available if I get stuck?",
        a: "Of course. Each course has a dedicated Q&A section where you can ask questions. Our instructors and a community of fellow students are there to help you.",
    },
    {
        q: "What is the refund policy?",
        a: "We offer a 30-day money-back guarantee. If you're not satisfied with a course for any reason, you can request a full refund within 30 days of purchase.",
    },
];

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [popularCourses, setPopularCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                fetch("https://eduflex-server.vercel.app/latest-courses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
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

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                fetch("https://eduflex-server.vercel.app/latest-courses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Assuming the data is an array of course objects
                        setIsLoading(false);
                        setPopularCourses(data);
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

    const sectionTitleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const faqItemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    // Refs for useInView hook
    const latestCoursesRef = useRef(null);
    const latestCoursesInView = useInView(latestCoursesRef, {
        once: true,
        amount: 0.3,
    });

    const popularCoursesRef = useRef(null);
    const popularCoursesInView = useInView(popularCoursesRef, {
        once: true,
        amount: 0.3,
    });

    const testimonialsRef = useRef(null);
    const testimonialsInView = useInView(testimonialsRef, {
        once: true,
        amount: 0.3,
    });

    const faqRef = useRef(null);
    const faqInView = useInView(faqRef, { once: true, amount: 0.3 });
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div>
            <section>
                <Slider {...settings}>
                    {sliderItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative h-[60vh] md:h-[80vh]"
                        >
                            <img
                                src={item.bgImage || "/placeholder.svg"}
                                alt={item.title}
                                layout="fill"
                                className="z-0"
                            />
                            <div className="absolute inset-0 bg-black/60 z-10" />
                            <div className="relative z-20 container mx-auto flex flex-col items-center justify-center h-full text-center text-white">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-bold mb-4"
                                >
                                    {item.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="text-lg md:text-xl max-w-3xl mb-8"
                                >
                                    {item.subtitle}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                >
                                    <Button
                                        size="lg"
                                        asChild
                                        className="transition-all duration-300"
                                    >
                                        <Link href="/courses">
                                            Explore Courses{" "}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* Latest Courses Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto">
                    <motion.h2
                        ref={latestCoursesRef}
                        variants={sectionTitleVariants}
                        initial="hidden"
                        animate={latestCoursesInView ? "visible" : "hidden"}
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                    >
                        Latest Courses
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate={latestCoursesInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {isLoading ? (
                            <Loading />
                        ) : (
                            courses.slice(0, 6).map((course) => (
                                <motion.div
                                    key={course._id}
                                    variants={cardVariants}
                                >
                                    <CourseCard course={course} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Popular Courses Section */}
            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto">
                    <motion.h2
                        ref={popularCoursesRef}
                        variants={sectionTitleVariants}
                        initial="hidden"
                        animate={popularCoursesInView ? "visible" : "hidden"}
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                    >
                        Popular Courses
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate={popularCoursesInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {isLoading ? (
                            <Loading />
                        ) : (
                            popularCourses.slice(0, 3).map((course) => (
                                <motion.div
                                    key={course._id}
                                    variants={cardVariants}
                                >
                                    <CourseCard course={course} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto">
                    <motion.h2
                        ref={testimonialsRef}
                        variants={sectionTitleVariants}
                        initial="hidden"
                        animate={testimonialsInView ? "visible" : "hidden"}
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                    >
                        What Our Students Say
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        animate={testimonialsInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} variants={cardVariants}>
                                <Card className="flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
                                    <CardContent className="pt-6 flex-grow">
                                        <div className="flex mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground">
                                            {testimonial.text}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    testimonial.avatar ||
                                                    "/placeholder.svg"
                                                }
                                            />
                                            <AvatarFallback>
                                                {testimonial.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto max-w-3xl">
                    <motion.h2
                        ref={faqRef}
                        variants={sectionTitleVariants}
                        initial="hidden"
                        animate={faqInView ? "visible" : "hidden"}
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={faqItemVariants}
                                initial="hidden"
                                animate={faqInView ? "visible" : "hidden"}
                                transition={{ delay: index * 0.1 }}
                            >
                                <AccordionItem value={`item-${index + 1}`}>
                                    <AccordionTrigger className="text-lg">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </section>
        </div>
    );
};

export default Home;
