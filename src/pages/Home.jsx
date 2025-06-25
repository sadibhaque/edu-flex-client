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
import useAxios from "../hooks/useAxios";
import PopularCourseCard from "../components/PopularCourseCard";

const sliderItems = [
    {
        bgImage:
            "https://i.ibb.co/5WpdR09b/BCO-74d5729d-5f8d-4385-9b01-de8b6b479893.png",
        title: "Master Modern Web Development",
        subtitle:
            "From fundamentals to advanced topics, become a full-stack developer with our project-based curriculum.",
    },
    {
        bgImage:
            "https://i.ibb.co/3m7vkcy8/BCO-e3c472f7-9ada-4048-a3ef-63b27cf62a33.png",
        title: "Unlock the Power of Data Science",
        subtitle:
            "Learn Python, Machine Learning, and data visualization to solve real-world problems.",
    },
    {
        bgImage: "https://i.ibb.co/ZzYzjXhX/image.png",
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
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLfKxbQZ0BC6G_eNtYTFSvGt_GNIGkmjeu0ly1kfsLnkHyRetZKEqoWR1tOUqNjjtfQo4&usqp=CAU",
    },
    {
        name: "Maria Garcia",
        role: "UX Designer",
        text: "The design courses are top-notch. I landed my dream job thanks to the portfolio I built here.",
        avatar: "https://www.chalmers.se/_next/image/?url=https%3A%2F%2Fcms.www.chalmers.se%2FMedia%2Fpyibgfo0%2Femmary.jpg%3Fwidth%3D512%26height%3D512%26v%3D1da3f07f5c79670%26quality%3D60%26format%3Dwebp&w=3840&q=90",
    },
    {
        name: "Sam Lee",
        role: "Data Analyst",
        text: "I went from zero to hero in Python and data analysis. The instructors are amazing!",
        avatar: "https://media.licdn.com/dms/image/v2/D4E03AQGt6lxaitBD9Q/profile-displayphoto-shrink_400_400/B4EZZeeJ_qHMAk-/0/1745341689600?e=2147483647&v=beta&t=DLu1cGkjNqmnqi08Anhf2Y2bcNg6kREGPSKG85Nwpds",
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
    const axiosSecure = useAxios();

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
                axiosSecure
                    .get(`/popular-courses`)
                    .then((response) => {
                        setIsLoading(false);
                        setPopularCourses(response.data);
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
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const [isLoading, setIsLoading] = useState(true);
    return (
        <div>
            <section className="relative">
                <Slider {...settings}>
                    {sliderItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative h-[60vh] md:h-[80vh]"
                        >
                            <img
                                src={item.bgImage}
                                alt={item.title}
                                className="absolute z-0 w-full h-full object-cover"
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
                                        className="transition-all text-white duration-300"
                                    >
                                        <Link to="/courses">
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
            <section className="px-5 lg:px-0 py-16 md:py-24 bg-background">
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
            <section className="px-5 lg:px-0 py-16 md:py-24 bg-accent">
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
                                    <PopularCourseCard course={course} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="px-5 lg:px-0 py-16 md:py-24 bg-background">
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
            <section className="px-5 lg:px-0 py-16 md:py-24 bg-accent">
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

const NextArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 cursor-pointer"
        onClick={onClick}
    >
        <ChevronRight size={30} color="white" />
    </div>
);
const PrevArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 cursor-pointer"
        onClick={onClick}
    >
        <ChevronLeft size={30} color="white" />
    </div>
);
